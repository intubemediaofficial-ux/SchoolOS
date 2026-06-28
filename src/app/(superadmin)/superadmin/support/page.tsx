export default function SupportPage() {
  const tickets = [
    { id: "T-1001", school: "DPS Jaipur", subject: "Fee module not loading", priority: "high", status: "open", created: "2 hours ago" },
    { id: "T-1002", school: "St. Xavier's", subject: "WhatsApp integration issue", priority: "medium", status: "in_progress", created: "5 hours ago" },
    { id: "T-1003", school: "Modern Academy", subject: "Need help with data import", priority: "low", status: "open", created: "1 day ago" },
    { id: "T-1004", school: "Sunrise Intl", subject: "Custom domain setup", priority: "medium", status: "resolved", created: "2 days ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
        <p className="text-sm text-gray-500">Manage school support requests and issue tracking</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Open Tickets", value: "23", color: "text-red-600" },
          { label: "In Progress", value: "12", color: "text-yellow-600" },
          { label: "Resolved Today", value: "8", color: "text-green-600" },
          { label: "Avg. Resolution", value: "4.2h", color: "text-blue-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Ticket</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">School</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Subject</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Priority</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-mono text-primary">{t.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{t.school}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.subject}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${
                    t.priority === "high" ? "bg-red-50 text-red-600" : t.priority === "medium" ? "bg-yellow-50 text-yellow-600" : "bg-gray-50 text-gray-600"
                  }`}>{t.priority}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${
                    t.status === "open" ? "bg-blue-50 text-blue-600" : t.status === "in_progress" ? "bg-yellow-50 text-yellow-600" : "bg-green-50 text-green-600"
                  }`}>{t.status.replace("_", " ")}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-400">{t.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
