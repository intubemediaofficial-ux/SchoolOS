export default function HRPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HR &amp; Payroll</h1>
          <p className="text-sm text-gray-500">Staff management, payroll, PF/ESI/TDS, leave management &amp; compliance</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Process Payroll</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">Add Employee</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Staff", value: "142", color: "text-blue-600" },
          { label: "Monthly Payroll", value: "₹82.5L", color: "text-green-600" },
          { label: "Pending Leaves", value: "12", color: "text-yellow-600" },
          { label: "Open Positions", value: "5", color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Payroll Management</h3>
          <div className="space-y-2">
            {["Salary Structure Setup", "Monthly Payslip Generation", "PF/ESI/TDS Calculation", "Bank Transfer Integration", "Salary Advance & Loans", "Income Tax Declaration", "Form 16 Generation", "Payroll Register"].map((f) => (
              <button key={f} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 rounded-lg transition flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Leave Management</h3>
          <div className="space-y-3">
            {[
              { type: "Casual Leave", total: 12, used: 4, balance: 8 },
              { type: "Sick Leave", total: 10, used: 2, balance: 8 },
              { type: "Earned Leave", total: 15, used: 5, balance: 10 },
              { type: "Maternity Leave", total: 180, used: 0, balance: 180 },
            ].map((l) => (
              <div key={l.type} className="flex items-center justify-between p-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700">{l.type}</span>
                <div className="flex gap-4 text-xs">
                  <span className="text-gray-400">Total: {l.total}</span>
                  <span className="text-red-500">Used: {l.used}</span>
                  <span className="text-green-600 font-medium">Balance: {l.balance}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
