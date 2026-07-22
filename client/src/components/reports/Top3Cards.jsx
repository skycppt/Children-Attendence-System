const medals = ["🥇", "🥈", "🥉"];

export default function Top3Cards({ title, students }) {
  return (
    <div className="card shadow-sm mb-4">

      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">{title}</h5>
      </div>

      <div className="card-body">

        <div className="row">

          {students.map((student, index) => (

            <div className="col-md-4 mb-3" key={student.rollNo}>

              <div className="card border-0 shadow h-100">

                <div className="card-body text-center">

                  <h1>{medals[index]}</h1>

                  <h5>{student.name}</h5>

                  <p className="mb-1">
                    <strong>Roll:</strong> {student.rollNo}
                  </p>

                  <p className="mb-1">
                    <strong>Attendance:</strong>{" "}
                    {student.attendancePercentage}%
                  </p>

                  <p className="mb-1">
                    <strong>Present:</strong> {student.present}
                  </p>

                  <p className="mb-1">
                    <strong>Late:</strong> {student.late}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}