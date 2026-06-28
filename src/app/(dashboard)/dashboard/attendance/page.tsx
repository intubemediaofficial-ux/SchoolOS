import { attendanceRecords, attendanceData } from "@/lib/mock-data";

export default function AttendancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-sm text-gray-500">Track daily student &amp; staff attendance with biometric/RFID integration</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Download Report</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">Mark Attendance</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Present Today", value: "2,683", pct: "94.2%", color: "text-green-600 bg-green-50" },
          { label: "Absent Today", value: "112", pct: "3.9%", color: "text-red-600 bg-red-50" },
          { label: "Late Today", value: "35", pct: "1.2%", color: "text-yellow-600 bg-yellow-50" },
          { label: "On Leave", value: "17", pct: "0.6%", color: "text-blue-600 bg-blue-50" },
          { label: "Staff Present", value: "138/142", pct: "97.2%", color: "text-purple-600 bg-purple-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">{s.label}</div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${s.color}`}>{s.pct}</span>
            </div>
            <div className={`text-2xl font-bold mt-1 ${s.color.split(" ")[0]}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Today&apos;s Attendance — June 28, 2025</h3>
            <div className="flex gap-2">
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                <option>All Classes</option>
                {["7","8","9","10"].map(c => <option key={c}>Class {c}</option>)}
              </select>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white">
                <option>All Sections</option><option>A</option><option>B</option><option>C</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Student</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Class</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Marked By</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-medium">{r.studentName[0]}</div>
                        <span className="text-sm font-medium text-gray-900">{r.studentName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{r.class}-{r.section}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        r.status === "present" ? "bg-green-50 text-green-600" :
                        r.status === "absent" ? "bg-red-50 text-red-600" :
                        r.status === "late" ? "bg-yellow-50 text-yellow-600" :
                        "bg-blue-50 text-blue-600"
                      }`}>{r.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{r.markedBy}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{r.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Weekly Trend</h3>
            <div className="space-y-3">
              {attendanceData.map((d) => (
                <div key={d.day}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{d.day}</span>
                    <span className="font-medium text-green-600">{d.present}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: `${d.present}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Attendance Modes</h3>
            <div className="space-y-2">
              {[
                { mode: "Manual by Teacher", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0z" },
                { mode: "Biometric Device", icon: "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" },
                { mode: "RFID Card Scan", icon: "M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" },
                { mode: "QR Code Scan", icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
                { mode: "GPS-Based (Staff)", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" },
              ].map((m) => (
                <div key={m.mode} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={m.icon} />
                  </svg>
                  <span className="text-sm text-gray-700">{m.mode}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
