export default function ReportFilters({
  group,
  month,
  onGroupChange,
  onMonthChange,
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-5">

      <select
        value={group}
        onChange={(e) =>
          onGroupChange(e.target.value)
        }
        className="border rounded-lg p-2"
      >
        <option>All</option>
        <option>Junior</option>
        <option>Senior</option>
        <option>Youth</option>
      </select>

      <input
        type="month"
        value={month}
        onChange={(e) =>
          onMonthChange(e.target.value)
        }
        className="border rounded-lg p-2"
      />

    </div>
  );
}