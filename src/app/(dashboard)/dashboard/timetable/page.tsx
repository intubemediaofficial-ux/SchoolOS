import { timetableEntries } from "@/lib/mock-data";

export default function TimetablePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timetable Management</h1>
          <p className="text-sm text-gray-500">Auto-generated, conflict-free scheduling with smart substitution</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Manage Substitutions</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">AI Generate Timetable</button>
        </div>
      </div>

      <div className="flex gap-2">
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"><option>Class 8</option><option>Class 9</option><option>Class 10</option></select>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"><option>Section A</option><option>Section B</option><option>Section C</option></select>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3 w-20">Period</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Time</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Subject</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Teacher</th>
              <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Room</th>
            </tr>
          </thead>
          <tbody>
            {timetableEntries.map((e) => (
              <tr key={e.id} className="border-b border-gray-50 hover:bg-blue-50/30">
                <td className="px-4 py-3">
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">P{e.period}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{e.startTime} - {e.endTime}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{e.subject}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{e.teacher}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{e.room}</td>
              </tr>
            ))}
            <tr className="border-b border-gray-50 bg-yellow-50/50">
              <td className="px-4 py-3 text-sm text-gray-500 italic" colSpan={5}>Lunch Break: 13:00 - 13:45</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Smart Features</h3>
          <div className="space-y-2">
            {["AI-powered conflict-free generation", "Auto substitution when teacher absent", "Period swap suggestions", "Subject load balancing", "Room allocation optimizer", "Multi-section parallel scheduling"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                {f}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Today&apos;s Substitutions</h3>
          <div className="space-y-3">
            {[
              { period: "P3", original: "Mrs. Gupta (Hindi)", substitute: "Mr. Rathore", reason: "Sick leave" },
              { period: "P5", original: "Mr. Saxena (Art)", substitute: "Ms. Joshi", reason: "Training" },
            ].map((s) => (
              <div key={s.period} className="border border-yellow-100 bg-yellow-50/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-medium">{s.period}</span>
                  <span className="text-xs text-gray-400">{s.reason}</span>
                </div>
                <div className="text-sm text-gray-600"><span className="line-through">{s.original}</span> → <span className="font-medium text-gray-900">{s.substitute}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
