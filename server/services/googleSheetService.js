import sheets from "../config/googleSheets.js";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

export async function getSheetData(sheetName) {
  console.log("Reading sheet:", sheetName);

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A1:P`,
  });

  console.log(response.data);

  return response.data.values || [];
}