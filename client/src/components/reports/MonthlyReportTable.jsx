export default function MonthlyReportTable({
  students,
  onView,
}) {
  return (
    <div className=" rounded-xl shadow overflow-auto">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th>Rank</th>

            <th>Roll</th>

            <th>Name</th>

            <th>Present</th>

            <th>Late</th>

            <th>Absent</th>

            <th>%</th>

            <th></th>

          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr
              key={student.rollNo}
              className="border-t text-center"
            >

              <td>{student.rank}</td>

              <td>{student.rollNo}</td>

              <td>{student.name}</td>

              <td>{student.present}</td>

              <td>{student.late}</td>

              <td>{student.absent}</td>

              <td>
                {student.attendancePercentage}%
              </td>

              <td>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => onView(student.rollNo)}
              >
                  View
              </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}