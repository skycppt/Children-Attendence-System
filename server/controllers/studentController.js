import { getSheetData } from "../services/googleSheetService.js";

const SHEET_MAP = {
  Junior: "Junior",
  Senior: "Senior",
  Youth: "Youth",
};

export const getStudents = async (req, res) => {
  try {
    const { group = "Junior", search = "" } = req.query;

    const sheetName = SHEET_MAP[group] || "Junior";

    const rows = await getSheetData(sheetName);

    if (rows.length < 2) {
      return res.json({
        success: true,
        total: 0,
        students: [],
      });
    }

    const students = rows
  .slice(2) // Skip header + blank row
  .map((row) => ({
    rollNo: row[0] || "",
    photo: row[1] || "",
    name: row[2] || "",
    dob: row[3] || "",
    motherName: row[4] || "",
    fatherName: row[5] || "",
    guardianName: row[6] || "",
    phone: row[7] || "",
    address: row[8] || "",
    bloodGroup: row[9] || "",
    motherTongue: row[10] || "",
    languages: row[11] || "",
    skills: row[12] || "",
    group: row[13] || "",
    checkedBy: row[14] || "",
  }))
  .filter((student) => {
    const q = search.toLowerCase();

    return (
      student.rollNo.toLowerCase().includes(q) ||
      student.name.toLowerCase().includes(q)
    );
  });

    res.json({
      success: true,
      total: students.length,
      students,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};