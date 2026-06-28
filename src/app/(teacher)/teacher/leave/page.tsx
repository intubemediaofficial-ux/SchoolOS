"use client";

const leaveHistory = [
  { id: 1, type: "Casual Leave", from: "Jul 15, 2026", to: "Jul 16, 2026", days: 2, reason: "Personal work", status: "Approved" },
  { id: 2, type: "Sick Leave", from: "Jun 10, 2026", to: "Jun 10, 2026", days: 1, reason: "Not feeling well", status: "Approved" },
  { id: 3, type: "Casual Leave", from: "May 20, 2026", to: "May 21, 2026", days: 2, reason: "Family function", status: "Approved" },
];

const leaveBalance = [
  { type: "Casual Leave", total: 12, used: 4, remaining: 8 },
  { type: "Sick Leave", total: 10, used: 1, remaining: 9 },
  { type: "Earned Leave", total: 15, used: 0, remaining: 15 },
];

export default function TeacherLeavePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-sm text-gray-500">Apply for leave and track your leave balance</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Apply Leave
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {leaveBalance.map((lb) => (
          <div key={lb.type} className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="text-sm font-medium text-gray-500 mb-3">{lb.type}</h3>
            <div className="flex items-end gap-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">{lb.remaining}</div>
                <div className="text-xs text-gray-400">Remaining</div>
              </div>
              <div className="flex-1">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(lb.remaining / lb.total) * 100}%` }} />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Used: {lb.used}</span>
                  <span>Total: {lb.total}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Leave History</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Type</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">From</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">To</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">Days</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Reason</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveHistory.map((leave) => (
              <tr key={leave.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{leave.type}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{leave.from}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{leave.to}</td>
                <td className="text-center px-4 py-3 text-sm text-gray-600">{leave.days}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{leave.reason}</td>
                <td className="text-center px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    leave.status === "Approved" ? "bg-green-50 text-green-600" :
                    leave.status === "Pending" ? "bg-yellow-50 text-yellow-600" :
                    "bg-red-50 text-red-600"
                  }`}>{leave.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
