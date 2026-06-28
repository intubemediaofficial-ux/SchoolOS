import { admissions } from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  enquiry: "bg-gray-50 text-gray-600",
  applied: "bg-blue-50 text-blue-600",
  interview: "bg-yellow-50 text-yellow-600",
  accepted: "bg-green-50 text-green-600",
  enrolled: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-600",
};

export default function AdmissionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admissions &amp; CRM</h1>
          <p className="text-sm text-gray-500">Lead management, QR-based forms, enquiry tracking &amp; enrollment</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Generate QR</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">New Enquiry</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Enquiries", value: "456", color: "text-blue-600" },
          { label: "Applications", value: "234", color: "text-indigo-600" },
          { label: "Interviews", value: "89", color: "text-yellow-600" },
          { label: "Accepted", value: "156", color: "text-green-600" },
          { label: "Enrolled", value: "132", color: "text-emerald-600" },
          { label: "Conversion Rate", value: "67%", color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Admissions Pipeline</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Student</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Parent</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Class</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Source</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Applied</th>
                </tr>
              </thead>
              <tbody>
                {admissions.map((a) => (
                  <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{a.studentName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{a.parentName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">Class {a.class}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{a.source.replace("_", " ")}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[a.status]}`}>{a.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">{a.appliedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Lead Sources</h3>
            <div className="space-y-3">
              {[
                { source: "Website", count: 145, pct: 32 },
                { source: "Walk-in", count: 98, pct: 22 },
                { source: "Referral", count: 87, pct: 19 },
                { source: "Social Media", count: 76, pct: 17 },
                { source: "QR Code", count: 50, pct: 11 },
              ].map((s) => (
                <div key={s.source}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{s.source} ({s.count})</span>
                    <span className="font-medium">{s.pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
            <div className="space-y-1.5">
              {["QR-Based Form Fill", "Website Embed Form", "Facebook Lead Sync", "Auto Follow-ups", "Conversion Analytics", "Document Collection", "Fee Payment in Form"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600 py-1">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
