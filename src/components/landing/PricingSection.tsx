import Link from "next/link";

const plans = [
  {
    name: "Starter",
    tagline: "ESSENTIAL",
    price: "Per Student Pricing",
    cta: "Start Free Trial",
    popular: false,
    features: [
      "Student & Teacher Profiles",
      "Fee Management (Online/Offline)",
      "Attendance & Notifications",
      "SMS & Push Notifications",
      "AI / ChatGPT Integration",
      "Analytics Dashboard",
      "Mobile Apps (iOS, Android, Web)",
      "Email Support",
      "Daily Diary & Homework",
      "Calendar & Notice Board",
    ],
  },
  {
    name: "Professional",
    tagline: "MOST POPULAR",
    price: "Per Student Pricing",
    cta: "Start Free Trial",
    popular: true,
    features: [
      "Everything in Starter, plus...",
      "Enquiry & Admission Management",
      "Online & Offline Exams",
      "Library Management with Barcode",
      "Transport Management",
      "Expense Management",
      "Lesson Planning & Courses",
      "Holistic Progress Card (NEP 2020)",
      "QR-Based Admissions",
      "WhatsApp Integration",
      "Teacher Attendance & Leave",
      "Online Store",
      "Priority Support",
      "Dedicated Account Manager",
    ],
  },
  {
    name: "Enterprise",
    tagline: "UNLIMITED",
    price: "Custom Pricing",
    cta: "Contact Sales",
    popular: false,
    features: [
      "Everything in Professional, plus...",
      "Online Classes with Recording",
      "Biometric & RFID Integration",
      "GPS Transport Tracking",
      "Salary & Payroll Management",
      "Inventory & Vendor Management",
      "Multi-Campus Management",
      "Custom Reports & API Access",
      "Website Builder & CMS",
      "AI Tools (Full Suite)",
      "Visitor & Gate Pass Management",
      "Hostel Management",
      "Timetable with Substitution",
      "Approval Workflow",
      "White Label Option",
      "Premium SLA Support",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            Transparent Pricing
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Choose the right plan for your institution
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            All plans include assisted onboarding, data migration, and training.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 ${
                plan.popular
                  ? "bg-primary text-white ring-4 ring-primary/20 scale-105"
                  : "bg-white border border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className={`text-xs font-semibold tracking-wider mt-2 ${plan.popular ? "text-blue-200" : "text-primary"}`}>
                {plan.tagline}
              </div>
              <h3 className={`text-2xl font-bold mt-2 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                {plan.name}
              </h3>
              <div className={`mt-2 text-sm ${plan.popular ? "bg-white/20" : "bg-primary/10 text-primary"} inline-block px-3 py-1 rounded-full`}>
                {plan.price}
              </div>

              <Link
                href="/register"
                className={`block text-center mt-6 py-3 rounded-xl font-semibold text-sm transition ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-gray-100"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                {plan.cta}
              </Link>

              <div className="mt-8">
                <h4 className={`text-sm font-semibold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  Plan features
                </h4>
                <ul className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-green-300" : "text-green-500"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className={`text-sm ${plan.popular ? "text-blue-100" : "text-gray-600"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
