{report && (
  <div className="row mt-4">

    <div className="col-md-3">
      <div className="card text-center">
        <div className="card-body">
          <h6>Total Students</h6>
          <h3>{report.summary.totalStudents}</h3>
        </div>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card text-center">
        <div className="card-body">
          <h6>Present</h6>
          <h3>{report.summary.present}</h3>
        </div>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card text-center">
        <div className="card-body">
          <h6>Late</h6>
          <h3>{report.summary.late}</h3>
        </div>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card text-center">
        <div className="card-body">
          <h6>Absent</h6>
          <h3>{report.summary.absent}</h3>
        </div>
      </div>
    </div>

  </div>
)}

{report?.students?.length > 0 && (
  <div className="card mt-4 shadow-sm">
    <div className="card-header">
      <h5 className="mb-0">Attendance Report</h5>
    </div>

    <div className="table-responsive">
      <table className="table table-striped table-hover mb-0">
        <thead className="table-dark">
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Group</th>
            <th>Status</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {report.students.map((student, index) => (
            <tr key={index}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.group}</td>

              <td>
                <span
                  className={`badge ${
                    student.status === "Present"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {student.status}
                </span>
              </td>

              <td>{student.date}</td>
              <td>{student.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}