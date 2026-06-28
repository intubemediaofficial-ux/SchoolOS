const moduleCategories = [
  {
    title: "ERP for Institutions",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    modules: [
      { name: "Student Information System", desc: "360° digital profile for every student" },
      { name: "Fee Management & Wallet", desc: "Flexible fee structure, digital wallet, auto-reminders" },
      { name: "Payment Gateway & eNACH", desc: "6+ gateways, UPI, cards, eNACH mandates" },
      { name: "Faculty Management & Payroll", desc: "HR lifecycle, PF/ESI/TDS, automated payslips" },
      { name: "Inventory & Expense Management", desc: "Assets, purchase orders, vendor management" },
      { name: "Task Management", desc: "Assignment, tracking, priority & deadlines" },
      { name: "Multi-Channel Communication", desc: "SMS, Email, Push, WhatsApp unified" },
      { name: "360° Feedback & Surveys", desc: "Custom surveys, anonymous feedback, analytics" },
      { name: "Transport with Live GPS", desc: "Real-time tracking, geofence, parent ETAs" },
      { name: "Library Management", desc: "Barcode/ISBN, issue/return, OPAC" },
      { name: "Custom Report Builder", desc: "Drag-drop reports, custom fields, scheduled delivery" },
      { name: "Analytics & Dashboard", desc: "Real-time KPIs, attendance heatmaps" },
      { name: "Alumni Management", desc: "Directory, events, donation tracking" },
      { name: "Gate-Pass & Visitor Management", desc: "OTP verification, QR check-in" },
      { name: "Hostel Management", desc: "Room allocation, fees, visitor tracking" },
      { name: "Security & Access Control", desc: "RBAC, audit logs, 2FA, encryption" },
    ],
  },
  {
    title: "Learning Management",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    modules: [
      { name: "Classroom Management", desc: "Digital attendance, notes, behavior log" },
      { name: "Curriculum Planning", desc: "Board-aligned (CBSE, ICSE, State, IB, IGCSE)" },
      { name: "Assignments & Homework", desc: "Rich-text creation, digital submission, grading" },
      { name: "Question Bank", desc: "Topic-based, MCQ/subjective, Bloom's taxonomy" },
      { name: "Online Classes with Recording", desc: "Live video, whiteboard, auto-recording" },
      { name: "Evaluation & Progress Reports", desc: "Multi-term reports, grade calculation" },
      { name: "Holistic Progress Card (NEP 2020)", desc: "NCERT & PARAKH aligned, digital publishing" },
      { name: "Timetable with Substitutions", desc: "Auto-generated, conflict-free, smart substitution" },
      { name: "Academic & Skill Courses", desc: "Course catalog, enrollment, certificates" },
      { name: "Content Hosting", desc: "Video/PDF streaming, access control" },
      { name: "Daily Diary", desc: "Homework tracking, parent visibility" },
      { name: "Baseline Assessment", desc: "Learning level evaluation, gap analysis" },
    ],
  },
  {
    title: "Admissions & CRM",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    modules: [
      { name: "QR-Based Admissions", desc: "Scan & fill forms on mobile" },
      { name: "Admission Form Builder", desc: "Drag-drop builder, website embed" },
      { name: "Lead Management", desc: "Multi-source capture, follow-ups, conversion analytics" },
      { name: "Documents Management", desc: "Centralized repository, version control" },
      { name: "Enquiry Tracking", desc: "Walk-in, phone, social media tracking" },
      { name: "Facebook Lead Integration", desc: "Auto-sync Facebook ads to CRM" },
    ],
  },
  {
    title: "AI-Powered Tools",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    modules: [
      { name: "AI Lesson Plan Generator", desc: "Auto-create curriculum-aligned lesson plans" },
      { name: "AI Question Paper Generator", desc: "Instant question papers by topic & difficulty" },
      { name: "AI Report Card Comments", desc: "Personalized comments for each student" },
      { name: "AI Attendance Insights", desc: "Pattern detection, dropout prediction" },
      { name: "AI Timetable Generator", desc: "Conflict-free optimal scheduling" },
      { name: "AI Student Performance Analysis", desc: "Predictive analytics, learning gaps" },
      { name: "AI Tutor Chatbot", desc: "24/7 student learning assistant" },
      { name: "AI Homework Generator", desc: "Auto-generate practice questions" },
    ],
  },
  {
    title: "Website & Branding",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
    modules: [
      { name: "Drag & Drop Website Builder", desc: "No-code, 10+ premium templates" },
      { name: "Custom Domain & Subdomain", desc: "abc.schoolos.in or your own domain" },
      { name: "SEO & Analytics", desc: "Google Analytics, Search Console" },
      { name: "Blog & News", desc: "Content management system" },
      { name: "Gallery & Events", desc: "Photo gallery, event management" },
      { name: "Online Admission Page", desc: "Integrated with CRM" },
      { name: "ID Card & Certificate Designer", desc: "Custom templates, bulk printing" },
      { name: "Marketing Creatives", desc: "Auto-branded social media posts" },
    ],
  },
  {
    title: "Integrations",
    icon: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    modules: [
      { name: "WhatsApp Business", desc: "Bulk broadcasts, fee reminders, 2-way chat" },
      { name: "Biometric Attendance", desc: "Device integration, real-time sync" },
      { name: "RFID Attendance", desc: "Contactless card-based marking" },
      { name: "GPS Vehicle Tracking", desc: "Live tracking, route history" },
      { name: "Payment Gateways", desc: "Razorpay, PhonePe, UPI, eNACH" },
      { name: "Bank Integration", desc: "Direct fee collection, auto-reconciliation" },
      { name: "Fee Financing & EMI", desc: "Installment plans, scholarship management" },
      { name: "Online Store", desc: "Books, uniforms, supplies store" },
    ],
  },
];

export default function ModulesSection() {
  return (
    <section id="modules" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase">
            50+ Modules
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            Everything you need to run your institution
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            From first enquiry to alumni engagement — manage every aspect with purpose-built tools
            that work together seamlessly.
          </p>
        </div>

        <div className="space-y-16">
          {moduleCategories.map((category) => (
            <div key={category.title}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.modules.map((mod) => (
                  <div
                    key={mod.name}
                    className="border border-gray-100 rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition group"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm group-hover:text-primary transition">
                      {mod.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{mod.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
