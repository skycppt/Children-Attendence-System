export default function TopPerformers({
  title,
  students,
}) {
  return (
    <div className="bg-white rounded-xl shadow">

      <div className="p-5 border-b">

        <h2 className="font-bold text-xl">
          {title}
        </h2>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th>Rank</th>

            <th>Name</th>

            <th>Roll</th>

            <th>%</th>

            <th>Present</th>

            <th>Late</th>

          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr
              key={student.rollNo}
              className="border-t text-center"
            >

              <td className="font-bold">

                {student.rank === 1 && "🥇"}

                {student.rank === 2 && "🥈"}

                {student.rank === 3 && "🥉"}

              </td>

              <td>{student.name}</td>

              <td>{student.rollNo}</td>

              <td>{student.attendancePercentage}%</td>

              <td>{student.present}</td>

              <td>{student.late}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}