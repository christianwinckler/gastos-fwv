import { google } from 'googleapis'
import { readFileSync } from 'fs'

const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => [l.split('=')[0].trim(), l.slice(l.indexOf('=') + 1).trim()])
)

const SHEET_ID = env.EMMA_SHEET_ID
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: env.SERVICE_ACCOUNT_EMAIL,
    private_key: env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})
const sheets = google.sheets({ version: 'v4', auth })

async function main() {
  // 1. Leer PlanesItems
  const piRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'PlanesItems!A:K',
  })
  const piRows = piRes.data.values || []

  // 2. Construir mapa oldId → { nombre, hora, min }
  // piRows[0] = header, piRows[1] = primer dato (oldId=1), etc.
  const mapa = {}
  piRows.forEach((row, idx) => {
    if (idx === 0) return // header
    const oldId = idx // idx 1 → oldId 1, idx 2 → oldId 2, ...
    mapa[oldId] = {
      nombre: row[3] || '',
      hora:   parseInt(row[7]) || 0,
      min:    parseInt(row[8]) || 0,
    }
  })

  // 3. Leer RegistroDiario
  const rdRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'RegistroDiario!A:J',
  })
  const rdRows = rdRes.data.values || []

  // 4. Construir lista de updates
  const updates = []
  let sinMatch = 0

  rdRows.forEach((row, idx) => {
    if (idx === 0) return // header

    const rawId = row[9]
    const oldId = parseInt(rawId)

    if (!rawId || isNaN(oldId) || oldId === 0) {
      // Celda vacía o ya migrada — dejar en blanco
      updates.push({ range: `RegistroDiario!J${idx + 1}`, values: [['']] })
      return
    }

    const item = mapa[oldId]
    if (!item) {
      console.warn(`  ⚠ Fila ${idx + 1}: oldId=${oldId} no encontrado en PlanesItems — se dejará vacío`)
      updates.push({ range: `RegistroDiario!J${idx + 1}`, values: [['']] })
      sinMatch++
      return
    }

    const fecha = row[0] || ''
    const planItemKey = `${fecha}_${item.nombre}_${item.hora}_${item.min}`
    updates.push({ range: `RegistroDiario!J${idx + 1}`, values: [[planItemKey]] })
  })

  if (updates.length === 0) {
    console.log('No hay filas de datos en RegistroDiario. Nada que hacer.')
    return
  }

  // 5. batchUpdate
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SHEET_ID,
    requestBody: {
      valueInputOption: 'RAW',
      data: updates,
    },
  })

  const actualizadas = updates.length - sinMatch
  console.log(`Migración completada: ${actualizadas} filas actualizadas, ${sinMatch} filas sin match`)
}

main().catch(err => { console.error(err); process.exit(1) })
