export default function ProgressBar({ total, completed }) {

  const percentage =
    total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="mb-6">

      <div className="flex justify-between mb-2">

        <span>Attendance Progress</span>

        <span>{percentage.toFixed(0)}%</span>

      </div>

      <div className="bg-gray-300 rounded-full h-4">

        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        />

      </div>

    </div>
  );
}