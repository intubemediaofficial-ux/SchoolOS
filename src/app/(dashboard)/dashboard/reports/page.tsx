export default function ReportsPage() {
  const reportCategories = [
    { title: "Financial Reports", reports: ["Fee Collection Summary", "Outstanding Fees", "Payment Mode Analysis", "Daily Collection", "Concession Report", "Revenue Forecast"] },
    { title: "Student Reports", reports: ["Student Strength", "Class-wise Distribution", "Gender Ratio", "New vs Leaving", "Fee Defaulter List", "Birthday List"] },
    { title: "Academic Reports", reports: ["Exam Results Summary", "Subject-wise Analysis", "Topper List", "Grade Distribution", "Attendance vs Performance", "Teacher Performance"] },
    { title: "Attendance Reports", reports: ["Daily Attendance", "Monthly Summary", "Student-wise", "Low Attendance Alert", "Staff Attendance", "Late Arrivals"] },
    { title: "HR & Payroll", reports: ["Salary Register", "Leave Balance", "Staff Strength", "Department-wise", "Experience Distribution", "PF/ESI Report"] },
    { title: "Transport Reports", reports: ["Route Occupancy", "Bus Utilization", "Speed Violations", "Route History", "Student Transport Fee", "Driver Report"] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports &amp; Analytics</h1>
          <p className="text-sm text-gray-500">Drag-drop custom reports, scheduled delivery, and real-time dashboards</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Custom Report Builder</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">Schedule Reports</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportCategories.map((cat) => (
          <div key={cat.title} className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">{cat.title}</h3>
            <div className="space-y-1">
              {cat.reports.map((r) => (
                <button key={r} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-primary rounded-lg transition flex items-center justify-between group">
                  <span>{r}</span>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
