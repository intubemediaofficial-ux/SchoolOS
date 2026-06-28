export default function SuperAdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
        <p className="text-sm text-gray-500">Configure platform-wide settings and controls</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "Feature Toggles", desc: "Enable/disable features per plan" },
          { title: "White Label", desc: "Branding and white label configuration" },
          { title: "Domain Management", desc: "Subdomain and custom domain settings" },
          { title: "Payment Settings", desc: "Gateway configuration and commission" },
          { title: "Email Templates", desc: "Transactional email templates" },
          { title: "SMS Templates", desc: "SMS gateway and templates" },
          { title: "Backup Management", desc: "Automated backup configuration" },
          { title: "Security Policies", desc: "Password, 2FA, and access policies" },
          { title: "API Configuration", desc: "Rate limits, keys, and webhooks" },
          { title: "Analytics & Monitoring", desc: "Error tracking and performance" },
          { title: "User Management", desc: "Platform admin users and roles" },
          { title: "System Health", desc: "Server status and uptime monitoring" },
        ].map((s) => (
          <button key={s.title} className="bg-white rounded-xl border border-gray-100 p-4 text-left hover:shadow-md hover:border-primary/20 transition">
            <h3 className="font-medium text-gray-900 text-sm">{s.title}</h3>
            <p className="text-xs text-gray-400 mt-1">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
