import { students } from "@/lib/mock-data";

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-sm text-gray-500">Manage all student records, profiles, and documents</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Import
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Student
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "2,847", color: "text-blue-600 bg-blue-50" },
          { label: "Active", value: "2,710", color: "text-green-600 bg-green-50" },
          { label: "Fee Defaulters", value: "234", color: "text-red-600 bg-red-50" },
          { label: "New This Year", value: "312", color: "text-orange-600 bg-orange-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color.split(" ")[0]}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <option>All Classes</option>
              {["1","2","3","4","5","6","7","8","9","10","11","12"].map(c => <option key={c}>Class {c}</option>)}
            </select>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <option>All Sections</option><option>A</option><option>B</option><option>C</option><option>D</option>
            </select>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <option>All Status</option><option>Active</option><option>Inactive</option><option>Graduated</option><option>Transferred</option>
            </select>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
              <option>Fee Status</option><option>Paid</option><option>Pending</option><option>Overdue</option>
            </select>
          </div>
          <div className="relative">
            <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input type="text" placeholder="Search students..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-60" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Adm. No</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Student Name</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Class</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Father Name</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Phone</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Attendance</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Fee Status</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                  <td className="px-4 py-3 text-sm font-mono text-gray-500">{s.admissionNo}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-medium">{s.name[0]}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{s.name}</div>
                        <div className="text-xs text-gray-400">{s.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{s.class}-{s.section}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{s.fatherName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{s.phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div className={`h-1.5 rounded-full ${s.attendancePercent >= 90 ? "bg-green-500" : s.attendancePercent >= 75 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${s.attendancePercent}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{s.attendancePercent}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      s.feeStatus === "paid" ? "bg-green-50 text-green-600" :
                      s.feeStatus === "pending" ? "bg-yellow-50 text-yellow-600" :
                      "bg-red-50 text-red-600"
                    }`}>{s.feeStatus}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="View">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Edit">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-500">Showing 1-5 of 2,847 students</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">3</button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
