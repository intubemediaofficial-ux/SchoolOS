export default function TransportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transport Management</h1>
          <p className="text-sm text-gray-500">Live GPS tracking, route management, driver app &amp; parent notifications</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">Add Route</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Buses", value: "24", color: "text-blue-600" },
          { label: "Active Today", value: "22", color: "text-green-600" },
          { label: "Routes", value: "18", color: "text-purple-600" },
          { label: "Students Using", value: "1,245", color: "text-orange-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Live Tracking Map</h3>
          <div className="bg-gray-100 rounded-xl h-80 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm text-gray-400 mt-2">Live GPS Map Integration</p>
              <p className="text-xs text-gray-300">Google Maps API will show all bus locations</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Bus Status</h3>
            <div className="space-y-2">
              {[
                { bus: "Bus #1 - Route A", status: "En Route", eta: "8:15 AM", color: "bg-green-500" },
                { bus: "Bus #2 - Route B", status: "At School", eta: "Arrived", color: "bg-blue-500" },
                { bus: "Bus #3 - Route C", status: "En Route", eta: "8:22 AM", color: "bg-green-500" },
                { bus: "Bus #4 - Route D", status: "Breakdown", eta: "Delayed", color: "bg-red-500" },
                { bus: "Bus #5 - Route E", status: "At School", eta: "Arrived", color: "bg-blue-500" },
              ].map((b) => (
                <div key={b.bus} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${b.color}`} />
                    <span className="text-sm text-gray-700">{b.bus}</span>
                  </div>
                  <span className="text-xs text-gray-500">{b.eta}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
            <div className="space-y-1.5">
              {["Live GPS Tracking", "Geofence Alerts", "Parent ETA Notifications", "Route Optimization", "Driver App", "Student Boarding/Alighting", "SOS Alert", "Speed Limit Alerts"].map((f) => (
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
