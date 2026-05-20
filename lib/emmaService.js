import { google } from 'googleapis'

function getAuthClient() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

async function getSheetsClient() {
  const auth = getAuthClient()
  return google.sheets({ version: 'v4', auth })
}

const SHEET_ID = () => process.env.EMMA_SHEET_ID

// ════════════════════════════════════════
// COMIDAS
// Columnas: Nombre | Categoría | Tamaño | Unidad | Emoji | Activo  (A:F)
// ════════════════════════════════════════

export async function getComidas() {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'Comidas!A:F',
  })
  return res.data.values || []
}

export async function addComida({ nombre, categoria, tamano, unidad, emoji, activo = true }) {
  const sheets = await getSheetsClient()
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'Comidas!A:F',
    valueInputOption: 'RAW',
    requestBody: { values: [[nombre, categoria, tamano, unidad, emoji, activo]] }
  })
}

export async function updateComida(rowIndex, { nombre, categoria, tamano, unidad, emoji, activo }) {
  const sheets = await getSheetsClient()
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID(),
    range: `Comidas!A${rowIndex}:F${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[nombre, categoria, tamano, unidad, emoji, activo]] }
  })
}

export async function deleteComida(rowIndex) {
  const sheets = await getSheetsClient()
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID() })
  const tab = meta.data.sheets.find(s => s.properties.title === 'Comidas')
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID(),
    requestBody: {
      requests: [{
        deleteDimension: {
          range: { sheetId: tab.properties.sheetId, dimension: 'ROWS', startIndex: rowIndex - 1, endIndex: rowIndex }
        }
      }]
    }
  })
}

// ════════════════════════════════════════
// RUTINAS
// Columnas: Nombre | Descripción | Emoji | Tipo | Activo  (A:E)
// ════════════════════════════════════════

export async function getRutinas() {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'Rutinas!A:E',
  })
  return res.data.values || []
}

export async function addRutina({ nombre, descripcion, emoji, tipo, activo = true }) {
  const sheets = await getSheetsClient()
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'Rutinas!A:E',
    valueInputOption: 'RAW',
    requestBody: { values: [[nombre, descripcion, emoji, tipo, activo]] }
  })
}

export async function updateRutina(rowIndex, { nombre, descripcion, emoji, tipo, activo }) {
  const sheets = await getSheetsClient()
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID(),
    range: `Rutinas!A${rowIndex}:E${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: { values: [[nombre, descripcion, emoji, tipo, activo]] }
  })
}

export async function deleteRutina(rowIndex) {
  const sheets = await getSheetsClient()
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID() })
  const tab = meta.data.sheets.find(s => s.properties.title === 'Rutinas')
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID(),
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: tab.properties.sheetId,
            dimension: 'ROWS',
            startIndex: rowIndex - 1,
            endIndex: rowIndex
          }
        }
      }]
    }
  })
}

// ════════════════════════════════════════
// PLAN (hoja única con el plan vigente)
// Columnas: Nombre|Categoría|Etiqueta|Hora|Min|Flexible|Orden  (A:G)
// ════════════════════════════════════════

export async function getPlan() {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'Plan!A:I',
  })
  return res.data.values || []
}

export async function addPlanItem({
  nombre, categoria, etiqueta = '', tamano, unidad, hora, min, flexible, orden
}) {
  const sheets = await getSheetsClient()
  const colRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'Plan!A:A',
  })
  const newRowIndex = (colRes.data.values || []).length + 1
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'Plan!A:I',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[nombre, categoria, etiqueta, tamano, unidad, hora, min, flexible, orden]]
    }
  })
  return newRowIndex
}

export async function updatePlanItem(rowIndex, {
  nombre, categoria, etiqueta, tamano, unidad, hora, min, flexible, orden
}) {
  const sheets = await getSheetsClient()
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID(),
    range: `Plan!A${rowIndex}:I${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[nombre, categoria, etiqueta, tamano, unidad, hora, min, flexible, orden]]
    }
  })
}

export async function deletePlanItem(rowIndex) {
  const sheets = await getSheetsClient()
  const meta = await sheets.spreadsheets.get({ spreadsheetId: SHEET_ID() })
  const tab = meta.data.sheets.find(s => s.properties.title === 'Plan')
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: SHEET_ID(),
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: tab.properties.sheetId,
            dimension: 'ROWS',
            startIndex: rowIndex - 1,
            endIndex: rowIndex
          }
        }
      }]
    }
  })
}

// ════════════════════════════════════════
// REGISTRO DIARIO
// Columnas: Fecha|TipoRegistro|Hora|Cantidad|Unidad|Estado|SolidoNombre|Nota|FechaHoraRegistro|PlanItemKey  (A:J)
// ════════════════════════════════════════

export async function getRegistroDiario() {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'RegistroDiario!A:I',
  })
  return res.data.values || []
}

export async function getRegistroPorFecha(fecha) {
  const all = await getRegistroDiario()
  return all.filter((row, i) => i > 0 && row[0] === fecha)
}

export async function addRegistro({
  fecha, tipoRegistro, hora = '', cantidad, unidad = '',
  estado, solidoNombre = '', nota = ''
}) {
  const sheets = await getSheetsClient()
  const colRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'RegistroDiario!A:A',
  })
  const newRowIndex = (colRes.data.values || []).length + 1
  const fechaHoraRegistro = new Date().toISOString().replace('T', ' ').slice(0, 19)
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID(),
    range: 'RegistroDiario!A:I',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        fecha, tipoRegistro, hora, cantidad, unidad,
        estado, solidoNombre, nota, fechaHoraRegistro
      ]]
    }
  })
  return newRowIndex
}

export async function updateRegistro(rowIndex, {
  fecha, tipoRegistro, hora, cantidad, unidad,
  estado, solidoNombre, nota
}) {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: `RegistroDiario!A${rowIndex}:I${rowIndex}`,
  })
  const row = res.data.values?.[0] || []
  const fechaHoraRegistro = new Date().toISOString().replace('T', ' ').slice(0, 19)
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID(),
    range: `RegistroDiario!A${rowIndex}:I${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        fecha        ?? row[0],
        tipoRegistro ?? row[1],
        hora         ?? row[2],
        cantidad     ?? row[3],
        unidad       ?? row[4],
        estado       ?? row[5],
        solidoNombre ?? row[6],
        nota         ?? row[7],
        fechaHoraRegistro
      ]]
    }
  })
}

// ════════════════════════════════════════
// PAÑALES
// Columnas: Fecha | Pipí | Popó
// ════════════════════════════════════════

export async function getPanales() {
  const sheets = await getSheetsClient()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID(),
    range: 'Pañales!A:C',
  })
  return res.data.values || []
}

export async function getPanalesPorFecha(fecha) {
  const all = await getPanales()
  const row = all.find((r, i) => i > 0 && r[0] === fecha)
  return row ? { pipi: parseInt(row[1]) || 0, popo: parseInt(row[2]) || 0 } : { pipi: 0, popo: 0 }
}

export async function upsertPanales(fecha, { pipi, popo }) {
  const sheets = await getSheetsClient()
  const all = await getPanales()
  const rowIdx = all.findIndex((r, i) => i > 0 && r[0] === fecha)
  if (rowIdx > 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID(),
      range: `Pañales!A${rowIdx + 1}:C${rowIdx + 1}`,
      valueInputOption: 'RAW',
      requestBody: { values: [[fecha, pipi, popo]] }
    })
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID(),
      range: 'Pañales!A:C',
      valueInputOption: 'RAW',
      requestBody: { values: [[fecha, pipi, popo]] }
    })
  }
}
