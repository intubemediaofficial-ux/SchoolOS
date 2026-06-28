export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-sm text-gray-500">Manage plans, billing, and school subscriptions</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Subscriptions", value: "1,089", color: "text-green-600" },
          { label: "Trial Accounts", value: "98", color: "text-yellow-600" },
          { label: "Expiring This Month", value: "34", color: "text-orange-600" },
          { label: "Renewal Rate", value: "94%", color: "text-blue-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Plan Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Starter", "Professional", "Enterprise"].map((plan) => (
            <div key={plan} className="border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900">{plan}</h4>
              <p className="text-sm text-gray-500 mt-1">Configure features, limits, and pricing for this plan.</p>
              <button className="mt-3 text-sm text-primary hover:underline">Edit Plan →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
