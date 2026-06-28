import { superAdminStats, revenueData } from "@/lib/mock-data";

export default function SuperAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
        <p className="text-sm text-gray-500">Manage all schools, subscriptions, and platform settings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Schools", value: superAdminStats.totalSchools.toLocaleString(), change: "+15%", color: "text-blue-600 bg-blue-50" },
          { label: "Active Schools", value: superAdminStats.activeSchools.toLocaleString(), change: "+12%", color: "text-green-600 bg-green-50" },
          { label: "Total Students", value: `${(superAdminStats.totalStudents / 100000).toFixed(1)}L`, change: "+18%", color: "text-purple-600 bg-purple-50" },
          { label: "Monthly Revenue", value: `₹${(superAdminStats.monthlyRevenue / 100000).toFixed(0)}L`, change: "+22%", color: "text-orange-600 bg-orange-50" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">{card.label}</span>
              <span className="text-xs font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded-full">{card.change}</span>
            </div>
            <div className={`text-3xl font-bold ${card.color.split(" ")[0]}`}>{card.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Trial Schools", value: superAdminStats.trialSchools.toString(), color: "text-yellow-600" },
          { label: "Expired", value: superAdminStats.expiredSchools.toString(), color: "text-red-600" },
          { label: "Support Tickets", value: superAdminStats.supportTickets.toString(), color: "text-orange-600" },
          { label: "Total Revenue", value: `₹${(superAdminStats.totalRevenue / 10000000).toFixed(1)}Cr`, color: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
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

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Subscription Distribution</h3>
          <div className="space-y-4">
            {[
              { plan: "Starter", count: 420, pct: 34, color: "bg-blue-500" },
              { plan: "Professional", count: 534, pct: 43, color: "bg-green-500" },
              { plan: "Enterprise", count: 135, pct: 11, color: "bg-purple-500" },
              { plan: "Trial", count: 98, pct: 8, color: "bg-yellow-500" },
              { plan: "Expired", count: 60, pct: 5, color: "bg-red-500" },
            ].map((s) => (
              <div key={s.plan}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{s.plan} ({s.count})</span>
                  <span className="font-medium">{s.pct}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`h-2 rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Platform Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {["Manage Schools", "View Subscriptions", "Revenue Reports", "Support Tickets", "Website Templates", "Feature Toggles", "White Label", "Domain Management", "Backup Status", "User Management", "Analytics", "System Health"].map((a) => (
            <button key={a} className="p-3 border border-gray-100 rounded-xl text-sm text-gray-600 hover:bg-blue-50 hover:border-primary/20 transition text-center">
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
