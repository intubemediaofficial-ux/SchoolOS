"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import Link from "next/link";

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalFeeCollected: number;
  pendingFees: number;
  todayAttendance: number;
  totalClasses: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({ totalStudents: 0, totalTeachers: 0, totalFeeCollected: 0, pendingFees: 0, todayAttendance: 0, totalClasses: 0 });

  const fetchStats = useCallback(async () => {
    try {
      const res = await api.get<{ data: DashboardStats }>("/api/dashboard/stats");
      setStats(res.data);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  const modules = [
    { label: "Students", href: "/dashboard/students", icon: "👨‍🎓", desc: "Manage student records", color: "bg-blue-50" },
    { label: "Teachers", href: "/dashboard/teachers", icon: "👩‍🏫", desc: "Manage staff & teachers", color: "bg-purple-50" },
    { label: "Fees", href: "/dashboard/fees", icon: "💰", desc: "Fee collection & reports", color: "bg-green-50" },
    { label: "Attendance", href: "/dashboard/attendance", icon: "📋", desc: "Mark & view attendance", color: "bg-orange-50" },
    { label: "Examination", href: "/dashboard/examination", icon: "📝", desc: "Exams & results", color: "bg-red-50" },
    { label: "Timetable", href: "/dashboard/timetable", icon: "🕐", desc: "Class schedules", color: "bg-cyan-50" },
    { label: "Library", href: "/dashboard/library", icon: "📚", desc: "Books & issues", color: "bg-yellow-50" },
    { label: "Transport", href: "/dashboard/transport", icon: "🚌", desc: "Routes & vehicles", color: "bg-indigo-50" },
    { label: "Communication", href: "/dashboard/communication", icon: "📢", desc: "Notices & circulars", color: "bg-pink-50" },
    { label: "Admissions", href: "/dashboard/admissions", icon: "📄", desc: "Admission CRM", color: "bg-emerald-50" },
    { label: "HR & Payroll", href: "/dashboard/hr", icon: "👥", desc: "Staff management", color: "bg-slate-50" },
    { label: "Reports", href: "/dashboard/reports", icon: "📊", desc: "Analytics & reports", color: "bg-violet-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name || "Admin"}</h1>
        <p className="text-sm text-gray-500">School Dashboard • {user?.school?.name || "Your School"}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Total Students</div>
          <div className="text-2xl font-bold text-blue-600">{stats.totalStudents}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Total Teachers</div>
          <div className="text-2xl font-bold text-purple-600">{stats.totalTeachers}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Fee Collected</div>
          <div className="text-2xl font-bold text-green-600">₹{stats.totalFeeCollected.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Pending Fees</div>
          <div className="text-2xl font-bold text-red-600">₹{stats.pendingFees.toLocaleString()}</div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Modules</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {modules.map(m => (
            <Link key={m.href} href={m.href} className={`${m.color} rounded-xl p-4 hover:shadow-md transition`}>
              <div className="text-2xl mb-2">{m.icon}</div>
              <div className="text-sm font-medium">{m.label}</div>
              <div className="text-xs text-gray-500 mt-1">{m.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
