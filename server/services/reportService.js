import { getSheetData } from "./googleSheetService.js";
import { getAttendanceRows } from "./attendanceService.js";

const GROUPS = [
  {
    name: "Junior",
    studentSheet: "Junior",
    attendanceSheet: "Junior",
  },
  {
    name: "Senior",
    studentSheet: "Senior",
    attendanceSheet: "Senior",
  },
  {
    name: "Youth",
    studentSheet: "Youth",
    attendanceSheet: "Youth",
  },
];

const SCHOOL_START = "10:30";

function normalize(value) {
  return String(value ?? "").trim().toUpperCase();
}

function timeToMinutes(time) {
  if (!time || time === "-") return null;

  const [hour, minute] = String(time).split(":").map(Number);

  if (Number.isNaN(hour) || Number.isNaN(minute)) {
    return null;
  }

  return hour * 60 + minute;
}

function calculateMinutesLate(time) {
  const attendanceMinutes = timeToMinutes(time);
  const schoolMinutes = timeToMinutes(SCHOOL_START);

  if (attendanceMinutes === null) return 0;

  return Math.max(0, attendanceMinutes - schoolMinutes);
}

function getDayName(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
  });
}

function getUniqueAttendanceDates(rows) {
  return [...new Set(rows.map((r) => r.date))]
    .sort((a, b) => new Date(a) - new Date(b));
}

function formatAverageTime(totalMinutes, count) {
  if (!count) return "-";

  const average = Math.round(totalMinutes / count);

  const hour = Math.floor(average / 60);
  const minute = average % 60;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function createStudentObject(row, group) {
  return {
    rollNo: normalize(row[0]),
    admissionNo: row[1] || "",
    name: row[2] || "",
    fatherName: row[3] || "",
    motherName: row[4] || "",
    mobile: row[5] || "",
    address: row[6] || "",
    group,
    present: 0,
    late: 0,
    absent: 0,
    attendancePercentage: 0,
    totalMinutesLate: 0,
    averageArrivalTime: "-",
    totalArrivalMinutes: 0,
    attendanceHistory: [],
  };
}

export async function getSummaryReport(group = "All") {
  const selectedGroups =
    group === "All"
      ? GROUPS
      : GROUPS.filter((g) => g.name === group);

  let totalStudents = 0;
  let present = 0;
  let late = 0;

  const students = [];
  const groups = [];

  for (const g of selectedGroups) {
    const studentRows = await getSheetData(g.studentSheet);

    const validStudents = studentRows
      .slice(2)
      .filter((row) => row[0]);

    totalStudents += validStudents.length;

    const attendanceRows = await getAttendanceRows(g.attendanceSheet);

    const attendanceMap = {};

    attendanceRows.forEach((row) => {
      if (!isToday(row.date)) return;

      attendanceMap[normalize(row.rollNo)] = row;
    });

    let groupPresent = 0;
    let groupLate = 0;

    validStudents.forEach((row) => {
      const student = createStudentObject(row, g.name);

      const attendance =
        attendanceMap[normalize(student.rollNo)];

      let status = "Absent";
      let date = "-";
      let time = "-";

      if (attendance) {
        status = attendance.status;
        date = attendance.date;
        time = attendance.time;

        if (status === "Present") {
          groupPresent++;
        }

        if (status === "Late") {
          groupLate++;
        }
      }

      students.push({
        rollNo: student.rollNo,
        name: student.name,
        group: student.group,
        status,
        date,
        time,
      });
    });

    present += groupPresent;
    late += groupLate;

    groups.push({
      group: g.name,
      totalStudents: validStudents.length,
      present: groupPresent,
      late: groupLate,
      absent:
        validStudents.length -
        groupPresent -
        groupLate,
    });
  }

  const absent = totalStudents - present - late;

  const attendancePercentage =
    totalStudents === 0
      ? 0
      : (
          ((present + late) / totalStudents) *
          100
        ).toFixed(2);

  return {
    summary: {
      totalStudents,
      present,
      late,
      absent,
      attendancePercentage,
    },
    groups,
    students,
  };
}

function parseDate(dateString) {
  if (!dateString || dateString === "-") return null;

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return null;

  return date;
}

function isSameMonth(dateString, month) {
  if (!month) return true;

  const date = parseDate(dateString);

  if (!date) return false;

  const year = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${m}` === month;
}

function calculateStudentStatistics(student) {
  const totalDays =
    student.present +
    student.late +
    student.absent;

  student.attendancePercentage =
    totalDays === 0
      ? 0
      : Number(
          (
            ((student.present + student.late) /
              totalDays) *
            100
          ).toFixed(2)
        );

  student.averageArrivalTime = formatAverageTime(
    student.totalArrivalMinutes,
    student.present + student.late
  );

  return student;
}

export async function getMonthlyReport(
  group = "All",
  month
) {
  const selectedGroups =
    group === "All"
      ? GROUPS
      : GROUPS.filter(
          (g) => g.name === group
        );

  const students = [];

  for (const g of selectedGroups) {
    const studentRows =
      await getSheetData(g.studentSheet);

    const validStudents = studentRows
      .slice(2)
      .filter((row) => row[0]);

    const attendanceRows =
      await getAttendanceRows(g.attendanceSheet);

    const studentMap = {};

    validStudents.forEach((row) => {
      const student = createStudentObject(
        row,
        g.name
      );

      studentMap[student.rollNo] = student;
    });

    // Attendance rows of selected month only
const filteredAttendance = attendanceRows.filter(
  (attendance) =>
    !month || isSameMonth(attendance.date, month)
);

// All attendance dates in this month
const attendanceDates = [
  ...new Set(filteredAttendance.map((a) => a.date)),
].sort((a, b) => new Date(a) - new Date(b));

// Initially every student is absent on every attendance day
Object.values(studentMap).forEach((student) => {
  attendanceDates.forEach((date) => {
    student.attendanceHistory.push({
      date,
      day: getDayName(date),
      time: "-",
      status: "Absent",
    });
  });

  student.absent = attendanceDates.length;
});

// Update Absent → Present/Late
filteredAttendance.forEach((attendance) => {
  const student =
    studentMap[normalize(attendance.rollNo)];

  if (!student) return;

  const record = student.attendanceHistory.find(
    (r) => r.date === attendance.date
  );

  if (!record) return;

  record.time = attendance.time;
  record.status = attendance.status;

  student.absent--;

  if (attendance.status === "Present") {
    student.present++;
  } else if (attendance.status === "Late") {
    student.late++;
  }

  const minutes = calculateMinutesLate(attendance.time);

  student.totalMinutesLate += minutes;

  const arrival = timeToMinutes(attendance.time);

  if (arrival !== null) {
    student.totalArrivalMinutes += arrival;
  }
});

    Object.values(studentMap).forEach(
      (student) => {

        calculateStudentStatistics(
          student
        );

        students.push(student);
      }
    );
  }

  students.sort((a, b) => {
  // 1. Higher attendance percentage
  if (b.attendancePercentage !== a.attendancePercentage) {
    return b.attendancePercentage - a.attendancePercentage;
  }

  // 2. Higher Present count
  if (b.present !== a.present) {
    return b.present - a.present;
  }

  // 3. Lower Late count
  if (a.late !== b.late) {
    return a.late - b.late;
  }

  // 4. Earlier average arrival time
  const avgA = timeToMinutes(a.averageArrivalTime);
  const avgB = timeToMinutes(b.averageArrivalTime);

  if (avgA !== avgB) {
    return avgA - avgB;
  }

  // 5. Lower total minutes late
  if (a.totalMinutesLate !== b.totalMinutesLate) {
    return a.totalMinutesLate - b.totalMinutesLate;
  }

  // 6. Roll number
  return a.rollNo.localeCompare(b.rollNo);
});

  students.forEach((student, index) => {
    student.rank = index + 1;
  });

  return students;
}

export async function getTopPerformers(
  group = "All",
  limit = 3,
  month
) {
  const students =
    await getMonthlyReport(
      group,
      month
    );

  return students.slice(0, limit);
}


export async function getStudentReport(
  rollNo,
  month = null
) {
  rollNo = normalize(rollNo);

  let student = null;
  let selectedGroup = null;

  // Find student
  for (const g of GROUPS) {
    const rows = await getSheetData(g.studentSheet);

    const validStudents = rows
      .slice(2)
      .filter((r) => r[0]);

    const row = validStudents.find(
      (r) => normalize(r[0]) === rollNo
    );

    if (row) {
      student = createStudentObject(row, g.name);
      selectedGroup = g;
      break;
    }
  }

  if (!student) {
    throw new Error("Student not found");
  }

  const attendanceRows =
    await getAttendanceRows(
      selectedGroup.attendanceSheet
    );

  const rows = month
    ? attendanceRows.filter((r) =>
        isSameMonth(r.date, month)
      )
    : attendanceRows;

  const allDates =
    getUniqueAttendanceDates(rows);

  for (const date of allDates) {

    const record = rows.find(
      (r) =>
        normalize(r.rollNo) === rollNo &&
        r.date === date
    );

    if (record) {

      student.attendanceHistory.push({

        date,

        day: getDayName(date),

        time: record.time,

        status: record.status,

      });

      if (record.status === "Present") {
        student.present++;
      }

      else if (record.status === "Late") {
        student.late++;
      }

      student.totalMinutesLate +=
        calculateMinutesLate(record.time);

      const arrival =
        timeToMinutes(record.time);

      if (arrival !== null) {
        student.totalArrivalMinutes +=
          arrival;
      }

    } else {

      student.attendanceHistory.push({

        date,

        day: getDayName(date),

        time: "-",

        status: "Absent",

      });

      student.absent++;

    }

  }

  calculateStudentStatistics(student);

  student.attendanceHistory.sort(
    (a, b) =>
      new Date(a.date) - new Date(b.date)
  );

  return student;
}


function isToday(dateString) {
  if (!dateString) return false;

  const attendanceDate = new Date(dateString);
  const today = new Date();

  return (
    attendanceDate.getFullYear() === today.getFullYear() &&
    attendanceDate.getMonth() === today.getMonth() &&
    attendanceDate.getDate() === today.getDate()
  );
}


export async function getDashboardSummary() {
  const summary = await getSummaryReport("All");

  const juniorTop = await getTopPerformers(
    "Junior",
    3
  );

  const seniorTop = await getTopPerformers(
    "Senior",
    3
  );

  const youthTop = await getTopPerformers(
    "Youth",
    3
  );

  return {
    summary: summary.summary,
    groups: summary.groups,
    topPerformers: {
      Junior: juniorTop,
      Senior: seniorTop,
      Youth: youthTop,
    },
  };
}

export async function getTopFive(
  group,
  month = null
) {
  return getTopPerformers(group, 5, month);
}

export async function getStarPerformer(
  group,
  month = null
) {
  const top = await getTopPerformers(
    group,
    1,
    month
  );

  return top.length ? top[0] : null;
}