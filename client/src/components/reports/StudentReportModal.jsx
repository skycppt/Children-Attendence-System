export default function StudentReportModal({ student, onClose }) {
  if (!student) return null;

  return (
    <>
      <div
        className="modal fade show"
        style={{
          display: "block",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Report</h5>

              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              />
            </div>

            <div className="modal-body">

              <h5>{student.name}</h5>

              <p>
                <strong>Roll No:</strong> {student.rollNo}
              </p>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {student.attendanceHistory.map((r, i) => (
                    <tr key={i}>
                      <td>{r.date}</td>
                      <td>{r.day}</td>
                      <td>{r.time}</td>
                      <td>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}