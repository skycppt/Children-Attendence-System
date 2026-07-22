export default function GroupSummary({ groups }) {
  return (
    <div className="rounded-xl shadow">

      <div className="p-5 border-b">
        <h2 className="text-xl font-bold">
          Group Summary
        </h2>
      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">Group</th>

            <th>Total</th>

            <th>Present</th>

            <th>Late</th>

            <th>Absent</th>

          </tr>

        </thead>

        <tbody>

          {groups.map((group) => (

            <tr
              key={group.group}
              className="border-t text-center"
            >

              <td className="p-3 text-left font-medium">
                {group.group}
              </td>

              <td>{group.totalStudents}</td>

              <td>{group.present}</td>

              <td>{group.late}</td>

              <td>{group.absent}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}