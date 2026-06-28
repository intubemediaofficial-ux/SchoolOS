import { exams } from "@/lib/mock-data";

export default function ExaminationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Examination &amp; Results</h1>
          <p className="text-sm text-gray-500">Exam scheduling, marks entry, report cards &amp; holistic progress cards (NEP 2020)</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Question Bank</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">Create Exam</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Upcoming Exams", value: "12", color: "text-blue-600" },
          { label: "Completed", value: "8", color: "text-green-600" },
          { label: "Pending Results", value: "3", color: "text-yellow-600" },
          { label: "Question Papers", value: "245", color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Exam Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Exam</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Class</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Subject</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Date</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Duration</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Max Marks</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((e) => (
                <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{e.name}</td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{e.type.replace("_", " ")}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-600">Class {e.class}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{e.subject}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{e.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{e.duration} min</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{e.maxMarks}</td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600">{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Exam Tools</h3>
          <div className="grid grid-cols-2 gap-2">
            {["AI Question Paper Generator", "Marks Entry (Bulk)", "Grade Calculator", "Report Card Designer", "Holistic Progress Card (NEP)", "Rank & Topper Lists", "Subject-wise Analysis", "Performance Trends"].map((t) => (
              <button key={t} className="text-left p-3 border border-gray-100 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:border-primary/20 transition">
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Report Card Types</h3>
          <div className="space-y-2">
            {[
              "Standard CBSE Report Card",
              "ICSE Report Card",
              "NEP 2020 Holistic Progress Card",
              "Custom Template Report Card",
              "Competency-Based Report Card",
              "Multi-Term Cumulative Card",
            ].map((r) => (
              <div key={r} className="flex items-center gap-2 text-sm text-gray-600 p-2 hover:bg-gray-50 rounded-lg">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
