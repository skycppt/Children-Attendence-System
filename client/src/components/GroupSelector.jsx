export default function GroupSelector({ group, setGroup }) {
  return (
    <div className="mb-5">

      <label className="font-semibold">
        Group
      </label>

      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        className="w-full mt-2 border rounded-lg p-3"
      >
        <option>Junior</option>
        <option>Senior</option>
        <option>Youth</option>
      </select>

    </div>
  );
}