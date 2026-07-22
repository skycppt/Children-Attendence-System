function AttendanceStats({ stats }) {
  return (
    <div className="row row-cols-4 g-3 mb-4">

      <div className="col">
        <div className="card text-center border-success h-100">
          <div className="card-body">
            <h6>Total</h6>
            <h2 className="text-success">{stats.total}</h2>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card text-center border-success h-100">
          <div className="card-body">
            <h6>Present</h6>
            <h2 className="text-success">{stats.present}</h2>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card text-center border-warning h-100">
          <div className="card-body">
            <h6>Late</h6>
            <h2 className="text-warning">{stats.late}</h2>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card text-center border-danger h-100">
          <div className="card-body">
            <h6>Remaining</h6>
            <h2 className="text-danger">{stats.remaining}</h2>
          </div>
        </div>
      </div>

    </div>
  );
}

export default AttendanceStats;