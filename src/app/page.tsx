import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ModulesSection from "@/components/landing/ModulesSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ModulesSection />
        <PricingSection />
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                Simple Onboarding
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mt-3">
                Up and running in 24 hours
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                No long implementation projects. No IT team needed.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Register Your School",
                  desc: "Sign up with mobile/email OTP. Fill basic school details.",
                },
                {
                  step: "02",
                  title: "Choose Your Plan",
                  desc: "Select a plan that fits. Start with a free trial.",
                },
                {
                  step: "03",
                  title: "Auto-Setup in Minutes",
                  desc: "ERP activates, website generates, subdomain creates automatically.",
                },
                {
                  step: "04",
                  title: "Go Live & Grow",
                  desc: "Import data, train staff, and start managing digitally.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-primary font-bold text-xl">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="apps" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">Mobile Apps</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-3">5 Dedicated Mobile Apps</h2>
              <p className="mt-4 text-lg text-gray-600">
                Real-time sync with ERP. Available on iOS &amp; Android.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { name: "Parent App", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", features: ["Attendance", "Fee Payment", "Homework", "Live Bus Tracking", "Report Cards", "Chat with Teachers"] },
                { name: "Teacher App", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", features: ["Mark Attendance", "Assignments", "Marks Entry", "Timetable", "Leave Apply", "AI Tools"] },
                { name: "Student App", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", features: ["Online Classes", "Homework", "Results", "AI Tutor", "Library", "Notifications"] },
                { name: "Admin App", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", features: ["Dashboard", "Fee Reports", "Staff Mgmt", "Notifications", "Analytics", "Settings"] },
                { name: "Driver App", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", features: ["Route View", "Student List", "Attendance", "SOS Alert", "GPS Tracking", "Notifications"] },
              ].map((app) => (
                <div key={app.name} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={app.icon} />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3">{app.name}</h3>
                  <ul className="space-y-1.5">
                    {app.features.map((f) => (
                      <li key={f} className="text-xs text-gray-500 flex items-center gap-1.5">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white">Ready to modernise your institution?</h2>
            <p className="mt-4 text-lg text-blue-100">
              Join 10,000+ schools that run smarter with SchoolOS. Start your free trial today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-white text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition"
              >
                Start Free Trial
              </Link>
              <Link
                href="/#modules"
                className="border border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
