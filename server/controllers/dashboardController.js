import { getAttendanceRows } from "../services/attendanceService.js";
import { getSheetData } from "../services/googleSheetService.js";

export const getTodayStats = async (req, res) => {
  try {
    const groups = [
      { name: "Junior", sheet: "Junior" },
      { name: "Senior", sheet: "Senior" },
      { name: "Youth", sheet: "Youth" },
    ];

    let totalStudents = 0;
    let present = 0;
    let late = 0;

    // Change this back to new Date() after testing
    const now = new Date("2026-07-19T11:00:00");
    const today = now.toLocaleDateString("en-CA");

    for (const group of groups) {

      // Get all students
      const students = await getSheetData(group.sheet);

      // Count only valid student rows
      const studentCount = students.filter((row) => {
        const rollNo = row[0]?.toString().trim();

        // Count only rows whose roll number starts with J, S or Y
        return /^[JSY]\d+$/i.test(rollNo);
      }).length;

      console.log(`${group.name}: ${studentCount}`);

      totalStudents += studentCount;

      // Get attendance
      const attendance = await getAttendanceRows(group.name);

      attendance.forEach((row) => {
        if (row[0] === today) {
          if (row[5] === "Present") {
            present++;
          } else if (row[5] === "Late") {
            late++;
          }
        }
      });
    }

    res.json({
      success: true,
      total: totalStudents,
      present,
      late,
      remaining: Math.max(totalStudents - present - late, 0),
    });

  } catch (err) {
    console.error("Dashboard Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};