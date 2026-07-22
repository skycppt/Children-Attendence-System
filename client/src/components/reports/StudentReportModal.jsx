export default function StudentReportModal({
  student,
  onClose,
}) {
  if (!student) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-4xl p-6">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            {student.name}
          </h2>

          <button
            onClick={onClose}
            className="text-red-600"
          >
            ✕
          </button>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

          <div>Present : {student.present}</div>

          <div>Late : {student.late}</div>

          <div>Absent : {student.absent}</div>

          <div>
            Attendance :
            {" "}
            {student.attendancePercentage}%
          </div>

          <div>
            Avg Arrival :
            {" "}
            {student.averageArrivalTime}
          </div>

          <div>
            Minutes Late :
            {" "}
            {student.totalMinutesLate}
          </div>

          <div>
            Rank :
            {" "}
            {student.rank}
          </div>

        </div>

        <table className="w-full mt-8">

          <thead>

            <tr>

              <th>Date</th>

              <th>Time</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {student.attendanceHistory.map(
              (record, index) => (

                <tr key={index}>

                  <td>{record.date}</td>

                  <td>{record.time}</td>

                  <td>{record.status}</td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}