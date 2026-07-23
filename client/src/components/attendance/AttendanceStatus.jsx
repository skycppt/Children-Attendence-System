function AttendanceStatus() {
  // Testing only
  // const now = new Date("2026-07-19T11:00:00");
  const now = new Date();

  const day = now.getDay();

  const minutes = now.getHours() * 60 + now.getMinutes();

  if (day !== 0)
    return (
      <div className="alert alert-warning">
        Attendance available only on Sunday.
      </div>
    );

  if (minutes < 630)
    return (
      <div className="alert alert-info">
        Attendance starts at 10:30 AM
      </div>
    );

  if (minutes <= 690)
    return (
      <div className="alert alert-success">
        🟢 Present Time
      </div>
    );

  if (minutes <= 780)
    return (
      <div className="alert alert-warning">
        🟡 Late Time
      </div>
    );

  return (
    <div className="alert alert-danger">
      🔴 Attendance Closed
    </div>
  );
}

export default AttendanceStatus;