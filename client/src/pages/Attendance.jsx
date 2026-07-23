import { useEffect, useState } from "react";
import { getStudents, markAttendance } from "../services/studentService";
import { getTodayStats } from "../services/dashboardService";

import AttendanceStatus from "../components/attendance/AttendanceStatus";
import AttendanceStats from "../components/attendance/AttendanceStats";
import { getSummaryReport } from "../services/reportService";
import { useNavigate } from "react-router-dom";
import { getStudentReport } from "../services/reportService";

function Attendance() {
  const [group, setGroup] = useState("Junior");
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    late: 0,
    remaining: 0,
  });

  // Load Dashboard Stats
  const loadStats = async () => {
    try {
      const data = await getTodayStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };


  const handleViewStudent = async (rollNo) => {
  try {
    const data = await getStudentReport(rollNo, month);
    setSelectedStudent(data.student);
  } catch (err) {
    console.error(err);
  }
};

 const handleGenerateReport = async () => {
  try {
    const data = await getSummaryReport(group); // or "All" if you want all groups
    setReport(data);
  } catch (err) {
    console.error(err);
  }
};
  // Search Students
 const loadStudents = async () => {
  try {
    if (!search.trim()) {
      setStudents([]);
      return;
    }

    const data = await getStudents(group, search);

    setStudents(data.students || data);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadStudents();
  }, [search, group]);

  // Mark Attendance
  const handleAttendance = async () => {
    if (!selectedStudent) return;

    try {
      const result = await markAttendance(selectedStudent);

      alert(`✅ Attendance marked (${result.status})`);

      await loadStats();

      setSelectedStudent(null);
      setStudents([]);
      setSearch("");

    } catch (err) {
      alert(err.response?.data?.message || "Unable to mark attendance");
    }
  };

  return (
    <div className="container py-4">

      <h2 className="mb-4">Bal Sangat Attendance</h2>

      <AttendanceStatus />


      {/* <AttendanceStats stats={stats} /> */}
      
      <div className="row mb-4">

        <div className="col-md-3">

          <select
            className="form-select"
            value={group}
            onChange={(e) => {
              setGroup(e.target.value);
              setSearch("");
              setStudents([]);
              setSelectedStudent(null);
            }}
          >
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Youth">Youth</option>
          </select>

        </div>

        <div className="col-md-9">

          <input
            className="form-control"
            placeholder="Search Roll Number or Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      

      {students.length > 0 && (

        <div className="list-group mb-4">

          {students.map((student) => (

            <button
              key={student.rollNo}
              className="list-group-item list-group-item-action"
              onClick={() => setSelectedStudent(student)}
            >

              <strong>{student.rollNo}</strong>

              {" - "}

              {student.name}

            </button>

          ))}

        </div>

      )}

      {selectedStudent && (

        <div className="card shadow">

          <div className="card-body">


            <h3 className="text-center">
              {selectedStudent.name}
            </h3>

            <hr />

            <p><strong>Roll:</strong> {selectedStudent.rollNo}</p>

            <p><strong>Phone:</strong> {selectedStudent.phone}</p>

            {/* <p><strong>Blood Group:</strong> {selectedStudent.bloodGroup}</p> */}

            <p><strong>Group:</strong> {selectedStudent.group}</p>

            <button
              className="btn btn-success w-100"
              onClick={handleAttendance}
            >
              Confirm Attendance
            </button>

          </div>

        </div>

      )}

      <div className="card shadow-sm mt-4">

        <div className="card-body text-center">

          <h5 className="mb-3">
            Attendance Reports
          </h5>

          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/reports")}
          >
            📊 View Reports
          </button>

        </div>

      </div>

    </div>
  );
}

export default Attendance;