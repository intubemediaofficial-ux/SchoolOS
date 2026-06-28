import { revenueData } from "@/lib/mock-data";

export default function RevenuePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Revenue &amp; Analytics</h1>
        <p className="text-sm text-gray-500">Platform-wide financial analytics and reporting</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "₹2.84Cr", color: "text-green-600" },
          { label: "This Month", value: "₹32L", color: "text-blue-600" },
          { label: "MRR Growth", value: "+22%", color: "text-purple-600" },
          { label: "ARPU", value: "₹2,850", color: "text-orange-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Revenue Trend</h3>
        <div className="space-y-3">
          {revenueData.map((d) => (
            <div key={d.month} className="flex items-center gap-3">
              <span className="text-sm text-gray-500 w-8">{d.month}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: `${(d.collected / 3500000) * 100}%` }} />
              </div>
              <span className="text-xs text-gray-500 w-16 text-right">₹{(d.collected / 100000).toFixed(1)}L</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
