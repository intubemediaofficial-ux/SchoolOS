"use client";

import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function TeacherDashboard() {
  const { user } = useAuth();

  const quickActions = [
    { label: "Mark Attendance", href: "/teacher/attendance", icon: "📋", color: "bg-green-50 text-green-700" },
    { label: "My Classes", href: "/teacher/my-classes", icon: "🏫", color: "bg-blue-50 text-blue-700" },
    { label: "Homework", href: "/teacher/homework", icon: "📝", color: "bg-purple-50 text-purple-700" },
    { label: "Enter Marks", href: "/teacher/marks", icon: "📊", color: "bg-orange-50 text-orange-700" },
    { label: "Timetable", href: "/teacher/timetable", icon: "🕐", color: "bg-cyan-50 text-cyan-700" },
    { label: "Leave Request", href: "/teacher/leave", icon: "🏖️", color: "bg-yellow-50 text-yellow-700" },
    { label: "Communication", href: "/teacher/communication", icon: "💬", color: "bg-pink-50 text-pink-700" },
    { label: "My Profile", href: "/teacher/profile", icon: "👤", color: "bg-gray-50 text-gray-700" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name || "Teacher"}</h1>
        <p className="text-sm text-gray-500">Teacher Dashboard • {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map(action => (
          <Link key={action.href} href={action.href} className={`${action.color} rounded-xl p-4 hover:shadow-md transition text-center`}>
            <div className="text-2xl mb-2">{action.icon}</div>
            <div className="text-sm font-medium">{action.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Today&apos;s Schedule</h2>
          <div className="space-y-3">
            {[
              { time: "8:00 AM", class: "Class 10-A", subject: "Mathematics" },
              { time: "9:00 AM", class: "Class 9-B", subject: "Mathematics" },
              { time: "10:30 AM", class: "Class 11-A", subject: "Physics" },
              { time: "11:30 AM", class: "Class 10-B", subject: "Mathematics" },
              { time: "1:30 PM", class: "Class 12-A", subject: "Physics" },
            ].map((slot, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-xs font-mono text-gray-500 w-16">{slot.time}</span>
                <span className="text-sm font-medium">{slot.class}</span>
                <span className="text-xs text-gray-500">{slot.subject}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Pending Tasks</h2>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <div className="text-sm font-medium">Mark attendance for Class 10-A</div>
              <div className="text-xs text-gray-500">Due today</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
              <div className="text-sm font-medium">Submit marks for UT-2</div>
              <div className="text-xs text-gray-500">Due in 2 days</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <div className="text-sm font-medium">Check homework submissions</div>
              <div className="text-xs text-gray-500">15 pending</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
