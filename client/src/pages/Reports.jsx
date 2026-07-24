import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getSummaryReport,
  getMonthlyReport,
  getStudentReport,
  getTop3ByGroup,
} from "../services/reportService";

import SummaryCards from "../components/reports/SummaryCards";
import GroupSummary from "../components/reports/GroupSummary";
import MonthlyReportTable from "../components/reports/MonthlyReportTable";
import ReportFilters from "../components/reports/ReportFilters";
import StudentReportModal from "../components/reports/StudentReportModal";
import Top3Cards from "../components/reports/Top3Cards";

export default function Reports() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [students, setStudents] = useState([]);

  const [group, setGroup] = useState("All");

  const currentMonth = new Date().toISOString().slice(0, 7);

  const [month, setMonth] = useState(currentMonth);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [loadingStudent, setLoadingStudent] = useState(false);

  const loadSummary = async () => {
    const data = await getSummaryReport(group);
    setSummary(data);
  };

  const loadMonthly = async () => {
    const data = await getMonthlyReport(group, month);
    setStudents(data.students || []);
  };

  const [top3, setTop3] = useState({
  Junior: [],
  Senior: [],
  Youth: [],
});

const loadTop3 = async () => {
  try {
    const data = await getTop3ByGroup(month);
    setTop3(data);
  } catch (err) {
    console.error(err);
  }
};
const handleView = async (rollNo) => {
  try {
    const student = await getStudentReport(rollNo);

    console.log(student);

    setSelectedStudent(student);
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    loadSummary();
    loadMonthly();
    loadTop3();
  }, [group, month]);

  useEffect(() => {
  console.log(selectedStudent);
}, [selectedStudent]);

  if (!summary) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <button
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        <h2>Attendance Reports</h2>

        <button>
          {/* Export PDF */}
        </button>

        {/* <button className="btn btn-danger">
          Export PDF
        </button> */}

      </div>

      {/* <SummaryCards summary={summary.summary} /> */}


      <div className="mt-4">
        <GroupSummary groups={summary.groups} />
      </div>

      <div className="mt-5">

        <ReportFilters
          group={group}
          month={month}
          onGroupChange={setGroup}
          onMonthChange={setMonth}
        />


        {/* <Top3Cards
        title="🏆 Junior Top 3"
        students={top3.Junior}
      />

      <Top3Cards
        title="🏆 Senior Top 3"
        students={top3.Senior}
      />

      <Top3Cards
        title="🏆 Youth Top 3"
        students={top3.Youth}
      /> */}

        <MonthlyReportTable
            students={students}
            onView={handleView}
        />
        

      </div>

      <StudentReportModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />

    </div>
  );
}