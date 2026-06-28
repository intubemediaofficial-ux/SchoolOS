export default function AIToolsPage() {
  const tools = [
    { name: "AI Lesson Plan Generator", desc: "Generate curriculum-aligned lesson plans instantly. Supports CBSE, ICSE, State Boards.", status: "Ready", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
    { name: "AI Question Paper Generator", desc: "Create question papers by topic, difficulty level, and marks distribution in seconds.", status: "Ready", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { name: "AI Report Card Comments", desc: "Auto-generate personalized, encouraging comments for each student based on their performance.", status: "Ready", icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" },
    { name: "AI Attendance Insights", desc: "Pattern detection, dropout risk prediction, and actionable attendance analytics.", status: "Ready", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    { name: "AI Timetable Generator", desc: "Automatically create conflict-free, optimized timetables considering all constraints.", status: "Ready", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { name: "AI Student Performance", desc: "Predictive analytics for student outcomes. Identify at-risk students early.", status: "Ready", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
    { name: "AI Tutor Chatbot", desc: "24/7 learning assistant for students. Answers questions, explains concepts safely.", status: "Beta", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
    { name: "AI Homework Generator", desc: "Auto-generate practice questions and homework based on curriculum progress.", status: "Ready", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI-Powered Tools</h1>
          <p className="text-sm text-gray-500">Save 5+ hours per educator per week with intelligent automation</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
          </div>
          <div>
            <h3 className="font-bold text-lg">Powered by Advanced AI</h3>
            <p className="text-blue-100 text-sm">All AI tools are designed for educational use, with content safety and board alignment built in.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <div key={tool.name} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tool.icon} />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${tool.status === "Ready" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>{tool.status}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{tool.desc}</p>
                <button className="mt-3 text-sm text-primary font-medium hover:underline">
                  Launch Tool →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
