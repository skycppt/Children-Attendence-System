import {
  appendAttendance,
  getAttendanceRows,
} from "../services/attendanceService.js";

export const markAttendance = async (req, res) => {
  try {
    const student = req.body;

    const group =
      student.group.startsWith("Junior")
        ? "Junior"
        : student.group.startsWith("Senior")
        ? "Senior"
        : "Youth";

    const now = new Date();
    // const now = new Date("2026-07-05T10:30:00");

    // Sunday = 0
    if (now.getDay() !== 0) {
      return res.status(400).json({
        success: false,
        message: "Attendance is available only on Sundays.",
      });
    }

    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentMinutes = hour * 60 + minute;

    const OPEN_TIME = 10 * 60 + 30;   // 10:30
    const PRESENT_END = 11 * 60 + 30; // 11:30
    const CLOSE_TIME = 13 * 60;       // 1:00 PM

    if (currentMinutes < OPEN_TIME) {
      return res.status(400).json({
        success: false,
        message: "Attendance has not started yet.",
      });
    }

    if (currentMinutes > CLOSE_TIME) {
      return res.status(400).json({
        success: false,
        message: "Attendance is closed for today.",
      });
    }

    const today = now.toISOString().split("T")[0];

    const currentTime = now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const normalize = (value) => String(value).trim().toUpperCase();
    const rows = await getAttendanceRows(group);

    const alreadyMarked = rows.some(
    (row) =>
      normalize(row.date) === normalize(today) &&
      normalize(row.rollNo) === normalize(student.rollNo)
  );

    if (alreadyMarked) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked today.",
      });
    }

    const status =
      currentMinutes <= PRESENT_END
        ? "Present"
        : "Late";

    await appendAttendance({
      date: today,
      time: currentTime,
      rollNo: student.rollNo,
      name: student.name,
      group,
      status,
    });

    res.json({
      success: true,
      status,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};