import sheets from "../config/googleSheets.js";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

const SHEET_MAP = {
  Junior: "Junior Attendance",
  Senior: "Senior Attendance",
  Youth: "Youth Attendance",
};

export async function getAttendanceRows(group) {
  const sheetName = SHEET_MAP[group];

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A:F`,
  });

  const rows = response.data.values || [];

  return rows.slice(1).map((row) => ({
    date: row[0] || "",
    time: row[1] || "",
    rollNo: row[2] || "",
    name: row[3] || "",
    group: row[4] || "",
    status: row[5] || "",
  }));
}

export async function appendAttendance(data) {
  const sheetName = SHEET_MAP[data.group];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A:F`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        data.date,
        data.time,
        data.rollNo,
        data.name,
        data.group,
        data.status,
      ]],
    },
  });
}