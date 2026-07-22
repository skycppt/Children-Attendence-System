export default function SummaryCards({ summary }) {
  const cards = [
    {
      title: "Total Students",
      value: summary.totalStudents,
      color: "bg-blue-500",
    },
    {
      title: "Present",
      value: summary.present,
      color: "bg-green-500",
    },
    {
      title: "Late",
      value: summary.late,
      color: "bg-yellow-500",
    },
    {
      title: "Absent",
      value: summary.absent,
      color: "bg-red-500",
    },
    {
      title: "Attendance %",
      value: `${summary.attendancePercentage}%`,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} rounded-xl shadow text-white p-6`}
        >
          <h3 className="text-sm font-medium">{card.title}</h3>

          <p className="text-3xl font-bold mt-3">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}