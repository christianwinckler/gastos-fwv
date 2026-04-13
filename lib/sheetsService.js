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

async function getSheets() {
  const auth = getAuthClient()
  return google.sheets({ version: 'v4', auth })
}

export async function getDetalle() {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Detalle!A:J',
  })
  return res.data.values
}

export async function addGasto(row) {
  const sheets = await getSheets()
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Detalle!A:J',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] }
  })
}

export async function getParametros() {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Parámetros!A:C',
  })
  return res.data.values
}

export async function getPresupuesto() {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Presupuesto!A:D',
  })
  return res.data.values
}