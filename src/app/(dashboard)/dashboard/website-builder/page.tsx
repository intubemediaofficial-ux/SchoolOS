export default function WebsiteBuilderPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Website Builder</h1>
          <p className="text-sm text-gray-500">Drag &amp; drop website builder with 10+ premium templates, SEO &amp; analytics</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Preview Site</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">Edit Website</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="text-xs text-gray-500">Live URL</div>
          <div className="text-sm font-medium text-primary mt-1">dpsjaipur.schoolos.in</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="text-xs text-gray-500">Page Views (This Month)</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">12,450</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="text-xs text-gray-500">Template</div>
          <div className="text-sm font-medium text-gray-900 mt-1">Modern Blue</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Website Pages</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Home Page", "About Us", "Principal Message", "Management Team",
                "Academics", "Admission", "Fee Structure", "Faculty",
                "Gallery", "Events", "News & Notices", "Achievements",
                "Facilities", "Contact Us", "Blog", "Careers",
                "Download Center", "Alumni", "Virtual Tour", "Testimonials",
              ].map((page) => (
                <button key={page} className="text-left p-3 border border-gray-100 rounded-lg text-sm text-gray-600 hover:bg-blue-50 hover:border-primary/20 transition flex items-center justify-between">
                  <span>{page}</span>
                  <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Customization</h3>
            <div className="space-y-3">
              {[
                { label: "Logo", desc: "Upload school logo" },
                { label: "Color Theme", desc: "Customize brand colors" },
                { label: "Banner Images", desc: "Hero section slides" },
                { label: "Fonts", desc: "Choose typography" },
                { label: "Social Links", desc: "Connect social profiles" },
                { label: "Custom Domain", desc: "Connect your domain" },
              ].map((item) => (
                <button key={item.label} className="w-full text-left flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-700">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                  <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">SEO & Analytics</h3>
            <div className="space-y-1.5">
              {["Google Analytics", "Search Console", "Meta Tags", "Sitemap", "Robots.txt", "Schema Markup"].map((f) => (
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
