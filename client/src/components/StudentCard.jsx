export default function StudentCard() {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex items-center gap-5">

        <img
          src="https://placehold.co/100x100"
          alt="Student"
          className="rounded-full"
        />

        <div>

          <h2 className="text-xl font-bold">
            Rahul Sharma
          </h2>

          <p>Roll No : 101</p>

          <p>Group : Junior</p>

          <p>Status : Present</p>

        </div>

      </div>

      <button
        className="mt-5 bg-green-600 text-white w-full rounded-lg py-3"
      >
        Confirm Attendance
      </button>

    </div>
  );
}