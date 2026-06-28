export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory &amp; Expenses</h1>
          <p className="text-sm text-gray-500">Asset tracking, purchase orders, vendor management &amp; expense reporting</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Purchase Order</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">Add Item</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Assets", value: "1,245", color: "text-blue-600" },
          { label: "Low Stock Items", value: "18", color: "text-red-600" },
          { label: "Monthly Expenses", value: "₹4.2L", color: "text-orange-600" },
          { label: "Active Vendors", value: "32", color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Inventory Modules</h3>
          <div className="grid grid-cols-2 gap-2">
            {["Asset Register", "Stock Management", "Purchase Orders", "Vendor Management", "Department Allocation", "Depreciation Tracking", "Maintenance Schedule", "Online Store (Students)"].map((m) => (
              <button key={m} className="text-left p-3 border border-gray-100 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:border-primary/20 transition">
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Expense Categories</h3>
          <div className="space-y-3">
            {[
              { category: "Salaries & Wages", amount: "₹82.5L", pct: 65 },
              { category: "Maintenance", amount: "₹8.2L", pct: 12 },
              { category: "Supplies", amount: "₹4.5L", pct: 8 },
              { category: "Utilities", amount: "₹3.2L", pct: 6 },
              { category: "Transport", amount: "₹2.8L", pct: 5 },
              { category: "Other", amount: "₹2.1L", pct: 4 },
            ].map((e) => (
              <div key={e.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{e.category}</span>
                  <span className="font-medium">{e.amount}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${e.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
