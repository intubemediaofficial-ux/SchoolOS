"use client";

import Link from "next/link";
import { dashboardStats, revenueData, attendanceData } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";

const statCards = [
  { label: "Total Students", value: dashboardStats.totalStudents.toLocaleString(), change: "+12%", color: "bg-blue-50 text-blue-600", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  { label: "Total Teachers", value: dashboardStats.totalTeachers.toLocaleString(), change: "+5%", color: "bg-purple-50 text-purple-600", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { label: "Fee Collected", value: `₹${(dashboardStats.totalRevenue / 100000).toFixed(1)}L`, change: "+18%", color: "bg-green-50 text-green-600", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "Pending Fees", value: `₹${(dashboardStats.pendingFees / 100000).toFixed(1)}L`, change: "-8%", color: "bg-red-50 text-red-600", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
  { label: "Today Attendance", value: `${dashboardStats.todayAttendance}%`, change: "+2.1%", color: "bg-indigo-50 text-indigo-600", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { label: "New Admissions", value: dashboardStats.newAdmissions.toLocaleString(), change: "+24%", color: "bg-orange-50 text-orange-600", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
];

const quickActions = [
  { name: "Add Student", href: "/dashboard/students", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
  { name: "Collect Fee", href: "/dashboard/fees", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" },
  { name: "Mark Attendance", href: "/dashboard/attendance", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { name: "Send Notice", href: "/dashboard/communication", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" },
  { name: "AI Tools", href: "/dashboard/ai-tools", icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
  { name: "View Reports", href: "/dashboard/reports", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome, {user?.name || "Admin"}! {user?.school?.name || "School"} overview.</p>
        </div>
        <div className="flex gap-2">
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
            <option>Today</option><option>This Week</option><option>This Month</option><option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                </svg>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${card.change.startsWith("+") ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                {card.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-xs text-gray-500 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Fee Collection Trend</h3>
          <div className="space-y-3">
            {revenueData.map((d) => (
              <div key={d.month} className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-8">{d.month}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                  <div
                    className="bg-primary/20 h-full rounded-full absolute inset-y-0 left-0"
                    style={{ width: `${(d.revenue / 3500000) * 100}%` }}
                  />
                  <div
                    className="bg-primary h-full rounded-full absolute inset-y-0 left-0"
                    style={{ width: `${(d.collected / 3500000) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-16 text-right">
                  ₹{(d.collected / 100000).toFixed(1)}L
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-primary rounded" /> Collected</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-primary/20 rounded" /> Billed</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Weekly Attendance</h3>
          <div className="flex items-end gap-4 h-48">
            {attendanceData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-100 rounded-t-lg relative flex-1 flex flex-col justify-end">
                  <div
                    className="bg-red-200 rounded-t-lg"
                    style={{ height: `${d.absent}%` }}
                  />
                  <div
                    className="bg-green-400 rounded-t-lg"
                    style={{ height: `${d.present}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-green-400 rounded" /> Present</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-red-200 rounded" /> Absent</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-blue-50/50 transition"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={action.icon} />
                </svg>
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Admissions</h3>
            <Link href="/dashboard/admissions" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {[
              { name: "Priya Meena", class: "Class 6", status: "Applied", time: "2 hours ago" },
              { name: "Arjun Jain", class: "Class 3", status: "Interview", time: "5 hours ago" },
              { name: "Sneha Yadav", class: "Class 1", status: "Accepted", time: "1 day ago" },
              { name: "Vikash Rathore", class: "Class 8", status: "Enquiry", time: "Just now" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {item.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-400">{item.class}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === "Accepted" ? "bg-green-50 text-green-600" :
                    item.status === "Interview" ? "bg-yellow-50 text-yellow-600" :
                    item.status === "Applied" ? "bg-blue-50 text-blue-600" :
                    "bg-gray-50 text-gray-600"
                  }`}>{item.status}</span>
                  <div className="text-xs text-gray-400 mt-1">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
            <Link href="/dashboard/communication" className="text-sm text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {[
              { title: "Mid-Term Examinations", date: "Jul 15-22", type: "Exam", color: "bg-red-50 text-red-600" },
              { title: "Annual Day Celebration", date: "Jul 20", type: "Event", color: "bg-purple-50 text-purple-600" },
              { title: "Parent-Teacher Meeting", date: "Jul 25", type: "Meeting", color: "bg-blue-50 text-blue-600" },
              { title: "Summer Vacation Starts", date: "Aug 1", type: "Holiday", color: "bg-green-50 text-green-600" },
            ].map((event) => (
              <div key={event.title} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                <div className="w-12 text-center">
                  <div className="text-xs text-gray-400">{event.date.split(" ")[0]}</div>
                  <div className="text-sm font-bold text-gray-900">{event.date.split(" ")[1] || event.date}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{event.title}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${event.color}`}>{event.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
