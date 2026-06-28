import { feePayments } from "@/lib/mock-data";

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Management</h1>
          <p className="text-sm text-gray-500">Manage fee structures, collections, and payment tracking</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Fee Structure</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Collect Fee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Billed", value: "₹71.4L", color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Collected", value: "₹48.5L", color: "text-green-600", bg: "bg-green-50" },
          { label: "Pending", value: "₹12.3L", color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "Overdue", value: "₹8.6L", color: "text-red-600", bg: "bg-red-50" },
          { label: "Today Collection", value: "₹1.2L", color: "text-purple-600", bg: "bg-purple-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Payments</h3>
            <div className="flex gap-2">
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                <option>All Status</option><option>Paid</option><option>Pending</option><option>Overdue</option><option>Partial</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Student</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Class</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Amount</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Paid</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Due Date</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {feePayments.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{p.studentName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{p.class}</td>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">₹{p.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">₹{p.paidAmount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{p.dueDate}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        p.status === "paid" ? "bg-green-50 text-green-600" :
                        p.status === "partial" ? "bg-yellow-50 text-yellow-600" :
                        p.status === "overdue" ? "bg-red-50 text-red-600" :
                        "bg-gray-50 text-gray-600"
                      }`}>{p.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {p.receiptNo ? (
                        <button className="text-primary text-xs hover:underline">{p.receiptNo}</button>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-3">
              {[
                { method: "UPI", pct: 45, color: "bg-blue-500" },
                { method: "Online Gateway", pct: 28, color: "bg-green-500" },
                { method: "Bank Transfer", pct: 15, color: "bg-purple-500" },
                { method: "Cash", pct: 8, color: "bg-yellow-500" },
                { method: "Cheque", pct: 4, color: "bg-gray-500" },
              ].map((m) => (
                <div key={m.method}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{m.method}</span>
                    <span className="font-medium text-gray-900">{m.pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className={`h-2 rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                "Send Fee Reminders (SMS)",
                "Send Fee Reminders (WhatsApp)",
                "Generate Fee Reports",
                "Setup eNACH Mandate",
                "Bulk Fee Receipt Print",
                "Fee Concession Management",
              ].map((a) => (
                <button key={a} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
