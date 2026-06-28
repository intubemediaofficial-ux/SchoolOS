export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Templates</h1>
          <p className="text-sm text-gray-500">Manage website templates available to schools</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">Add Template</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Modern Blue", schools: 234, status: "Active" },
          { name: "Classic Green", schools: 189, status: "Active" },
          { name: "Elegant Purple", schools: 156, status: "Active" },
          { name: "Minimal White", schools: 145, status: "Active" },
          { name: "Bold Red", schools: 98, status: "Active" },
          { name: "Nature Green", schools: 87, status: "Active" },
          { name: "Royal Blue", schools: 76, status: "Active" },
          { name: "Sunrise Orange", schools: 54, status: "Active" },
          { name: "Premium Dark", schools: 0, status: "Draft" },
        ].map((t) => (
          <div key={t.name} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">Template Preview</span>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{t.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${t.status === "Active" ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"}`}>{t.status}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{t.schools} schools using</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
