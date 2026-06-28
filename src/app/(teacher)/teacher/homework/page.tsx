"use client";

const homeworks = [
  { id: 1, title: "Quadratic Equations Practice", class: "Class 10-A", subject: "Mathematics", dueDate: "Jul 2, 2026", submissions: 35, total: 42, status: "Active" },
  { id: 2, title: "Newton's Laws Assignment", class: "Class 11-A", subject: "Physics", dueDate: "Jul 1, 2026", submissions: 30, total: 35, status: "Active" },
  { id: 3, title: "Trigonometry Worksheet", class: "Class 9-B", subject: "Mathematics", dueDate: "Jun 28, 2026", submissions: 38, total: 38, status: "Completed" },
  { id: 4, title: "Linear Equations", class: "Class 8-C", subject: "Mathematics", dueDate: "Jun 25, 2026", submissions: 40, total: 40, status: "Completed" },
];

export default function TeacherHomeworkPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Homework</h1>
          <p className="text-sm text-gray-500">Create and manage homework assignments</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Homework
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {homeworks.map((hw) => (
          <div key={hw.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900">{hw.title}</h3>
                <p className="text-sm text-gray-500">{hw.class} &middot; {hw.subject}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                hw.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"
              }`}>{hw.status}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Due Date</span>
                <span className="text-gray-900">{hw.dueDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Submissions</span>
                <span className="text-gray-900">{hw.submissions}/{hw.total}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(hw.submissions / hw.total) * 100}%` }} />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 text-xs bg-emerald-50 text-emerald-600 py-2 rounded-lg hover:bg-emerald-100 transition font-medium">View Submissions</button>
              <button className="flex-1 text-xs bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition font-medium">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
