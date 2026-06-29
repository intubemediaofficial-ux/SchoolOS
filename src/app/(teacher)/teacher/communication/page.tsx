"use client";

const notices = [
  { id: 1, title: "Staff Meeting on July 5th", from: "Principal", date: "Jun 28, 2026", type: "Meeting" },
  { id: 2, title: "Submit Mid-Term Question Papers by July 10", from: "Exam Cell", date: "Jun 27, 2026", type: "Circular" },
  { id: 3, title: "Annual Day Preparation - Committee Formation", from: "Vice Principal", date: "Jun 25, 2026", type: "Notice" },
  { id: 4, title: "Holiday on July 4 - Independence Day", from: "Admin", date: "Jun 24, 2026", type: "Holiday" },
];

const messages = [
  { id: 1, from: "Parent - Mrs. Sharma", subject: "About Aarav's progress in Math", time: "2 hours ago", unread: true },
  { id: 2, from: "HOD - Dr. Mehta", subject: "Syllabus completion status", time: "Yesterday", unread: true },
  { id: 3, from: "Admin Office", subject: "Salary slip for June", time: "2 days ago", unread: false },
];

export default function TeacherCommunicationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Communication</h1>
        <p className="text-sm text-gray-500">Notices, circulars, and messages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Notices & Circulars</h3>
          <div className="space-y-3">
            {notices.map((notice) => (
              <div key={notice.id} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                  notice.type === "Meeting" ? "bg-blue-50 text-blue-600" :
                  notice.type === "Circular" ? "bg-purple-50 text-purple-600" :
                  notice.type === "Holiday" ? "bg-green-50 text-green-600" :
                  "bg-orange-50 text-orange-600"
                }`}>{notice.type[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{notice.title}</div>
                  <div className="text-xs text-gray-400">From: {notice.from} &middot; {notice.date}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                  notice.type === "Meeting" ? "bg-blue-50 text-blue-600" :
                  notice.type === "Circular" ? "bg-purple-50 text-purple-600" :
                  notice.type === "Holiday" ? "bg-green-50 text-green-600" :
                  "bg-orange-50 text-orange-600"
                }`}>{notice.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Messages</h3>
            <button className="text-sm text-emerald-600 hover:underline">Compose</button>
          </div>
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 py-3 border-b border-gray-50 last:border-0 ${msg.unread ? "bg-emerald-50/30 -mx-2 px-2 rounded-lg" : ""}`}>
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 flex-shrink-0">
                  {msg.from[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                    {msg.from}
                    {msg.unread && <span className="w-2 h-2 bg-emerald-500 rounded-full" />}
                  </div>
                  <div className="text-sm text-gray-600 truncate">{msg.subject}</div>
                  <div className="text-xs text-gray-400">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
