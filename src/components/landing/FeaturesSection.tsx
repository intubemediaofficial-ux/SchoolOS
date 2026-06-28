const features = [
  {
    title: "Fee management that runs itself",
    desc: "Set up once — SchoolOS handles fee structure, collection, reminders, and reconciliation automatically. 6+ payment gateways, eNACH, digital wallets included.",
    highlights: ["6+ payment gateway integrations", "eNACH mandate auto-debit", "Instant digital receipts", "Real-time collection dashboard"],
    stat: "40% reduction in fee defaults",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Track every bus. Assure every parent.",
    desc: "GPS-powered live tracking lets parents watch their child's bus on a map. Geofence alerts notify them the moment the bus arrives at school or reaches their stop.",
    highlights: ["Live map for parents", "Geofence entry/exit alerts", "Route & stop management", "Driver details on demand"],
    stat: "100% fleet visibility",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    title: "AI-powered tools for modern educators",
    desc: "Generate lesson plans, question papers, and report card comments in seconds. Give learners an always-on AI tutor safely inside your platform.",
    highlights: ["AI lesson plan generator", "Instant question paper creation", "Report card comment assistant", "Safe AI tutor for learners"],
    stat: "5+ hrs saved per educator per week",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    title: "Complete admission lifecycle",
    desc: "From QR-based enquiry to enrollment — capture leads from website, walk-ins, social media. Auto follow-ups, conversion tracking, and seamless onboarding.",
    highlights: ["QR & online admission forms", "Lead scoring & routing", "Auto follow-up reminders", "Conversion rate analytics"],
    stat: "3x admission conversion rate",
    icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">Key Features</span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Built for how institutions operate
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Every module designed with Indian educational institutions in mind — from K-12 to higher education and coaching institutes.
          </p>
        </div>

        <div className="space-y-12">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={`flex flex-col lg:flex-row gap-8 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="flex-1 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{feature.stat}</div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {feature.highlights.map((h, i) => (
                      <div key={h} className={`rounded-lg p-3 text-xs font-medium ${i % 2 === 0 ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
