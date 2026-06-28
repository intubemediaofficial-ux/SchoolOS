import { teachers } from "@/lib/mock-data";

export default function TeachersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers &amp; Staff</h1>
          <p className="text-sm text-gray-500">Faculty profiles, attendance, leave, and performance management</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Staff
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Faculty", value: "142", color: "text-blue-600" },
          { label: "Present Today", value: "138", color: "text-green-600" },
          { label: "On Leave", value: "4", color: "text-yellow-600" },
          { label: "Departments", value: "8", color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-2">
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
            <option>All Departments</option><option>Science</option><option>Languages</option><option>Computer</option><option>Mathematics</option><option>Social Science</option>
          </select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
            <option>All Status</option><option>Active</option><option>On Leave</option><option>Inactive</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Employee</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Subject</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Department</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Qualification</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Experience</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Designation</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-medium">{t.name[0]}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.subject}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.department}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{t.qualification}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{t.experience} yrs</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{t.designation}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${t.status === "active" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
