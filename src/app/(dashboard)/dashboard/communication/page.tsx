import { communications } from "@/lib/mock-data";

export default function CommunicationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication Hub</h1>
          <p className="text-sm text-gray-500">SMS, Email, Push, WhatsApp — unified multi-channel messaging</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Message
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Sent", value: "12,450", channel: "All Channels", color: "text-blue-600" },
          { label: "SMS Sent", value: "3,200", channel: "This Month", color: "text-green-600" },
          { label: "WhatsApp", value: "5,800", channel: "This Month", color: "text-emerald-600" },
          { label: "Push Notifications", value: "8,500", channel: "This Month", color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.channel}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Recent Communications</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {communications.map((c) => (
              <div key={c.id} className="p-4 hover:bg-gray-50/50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        c.type === "sms" ? "bg-blue-50 text-blue-600" :
                        c.type === "whatsapp" ? "bg-green-50 text-green-600" :
                        c.type === "push" ? "bg-purple-50 text-purple-600" :
                        "bg-orange-50 text-orange-600"
                      }`}>{c.type.toUpperCase()}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        c.status === "sent" ? "bg-green-50 text-green-600" :
                        c.status === "scheduled" ? "bg-yellow-50 text-yellow-600" :
                        "bg-gray-50 text-gray-600"
                      }`}>{c.status}</span>
                    </div>
                    <h4 className="text-sm font-medium text-gray-900">{c.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{c.message}</p>
                    <div className="flex gap-4 mt-2 text-xs text-gray-400">
                      <span>To: {c.audience}</span>
                      <span>By: {c.sentBy}</span>
                      {c.sentAt && <span>{c.sentAt}</span>}
                    </div>
                  </div>
                  {c.status === "sent" && (
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{c.readCount}/{c.totalRecipients}</div>
                      <div className="text-xs text-gray-400">read</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Templates</h3>
            <div className="space-y-2">
              {[
                "Fee Payment Reminder",
                "Attendance Alert",
                "Exam Schedule",
                "Holiday Notice",
                "PTM Invitation",
                "Emergency Closure",
                "Report Card Ready",
                "Bus Route Update",
              ].map((t) => (
                <button key={t} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition">
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Channels</h3>
            <div className="space-y-2">
              {[
                { name: "SMS Gateway", status: "Connected", color: "bg-green-500" },
                { name: "WhatsApp Business", status: "Connected", color: "bg-green-500" },
                { name: "Email (SMTP)", status: "Connected", color: "bg-green-500" },
                { name: "Push (Firebase)", status: "Connected", color: "bg-green-500" },
              ].map((ch) => (
                <div key={ch.name} className="flex items-center justify-between p-2">
                  <span className="text-sm text-gray-700">{ch.name}</span>
                  <span className="flex items-center gap-1.5 text-xs text-green-600">
                    <span className={`w-2 h-2 rounded-full ${ch.color}`} />
                    {ch.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
