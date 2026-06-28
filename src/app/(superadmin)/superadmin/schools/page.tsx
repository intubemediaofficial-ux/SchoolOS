import { schools } from "@/lib/mock-data";

export default function SchoolsManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schools Management</h1>
          <p className="text-sm text-gray-500">Manage all registered schools, tenants, and subscriptions</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">Add School Manually</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex gap-2">
          <input type="text" placeholder="Search schools..." className="px-4 py-2 border border-gray-200 rounded-lg text-sm flex-1" />
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"><option>All Plans</option><option>Starter</option><option>Professional</option><option>Enterprise</option></select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"><option>All Status</option><option>Active</option><option>Trial</option><option>Expired</option></select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">School</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Location</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Board</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Students</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Plan</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Since</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{s.name}</div>
                      <div className="text-xs text-primary">{s.subdomain}.schoolos.in</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{s.city}, {s.state}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{s.board}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{s.studentCount.toLocaleString()}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${
                    s.subscription === "enterprise" ? "bg-purple-50 text-purple-600" :
                    s.subscription === "professional" ? "bg-blue-50 text-blue-600" :
                    "bg-gray-50 text-gray-600"
                  }`}>{s.subscription}</span></td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${
                    s.subscriptionStatus === "active" ? "bg-green-50 text-green-600" :
                    s.subscriptionStatus === "trial" ? "bg-yellow-50 text-yellow-600" :
                    "bg-red-50 text-red-600"
                  }`}>{s.subscriptionStatus}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-400">{s.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
