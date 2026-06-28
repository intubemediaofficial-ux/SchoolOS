"use client";

const classes = [
  { name: "Class 10-A", subject: "Mathematics", students: 42, room: "Room 201", schedule: "Mon, Wed, Fri - 08:00" },
  { name: "Class 9-B", subject: "Mathematics", students: 38, room: "Room 105", schedule: "Mon, Tue, Thu - 08:45" },
  { name: "Class 11-A", subject: "Physics", students: 35, room: "Lab 3", schedule: "Tue, Wed, Fri - 10:00" },
  { name: "Class 8-C", subject: "Mathematics", students: 40, room: "Room 302", schedule: "Mon, Thu - 10:45" },
];

export default function MyClassesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Classes</h1>
        <p className="text-sm text-gray-500">Classes and sections assigned to you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {classes.map((cls) => (
          <div key={cls.name} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-lg">{cls.name.split(" ")[1]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{cls.name}</h3>
                  <p className="text-sm text-gray-500">{cls.subject}</p>
                </div>
              </div>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">{cls.students} students</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {cls.room}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {cls.schedule}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 text-xs bg-emerald-50 text-emerald-600 py-2 rounded-lg hover:bg-emerald-100 transition font-medium">View Students</button>
              <button className="flex-1 text-xs bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition font-medium">Mark Attendance</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
