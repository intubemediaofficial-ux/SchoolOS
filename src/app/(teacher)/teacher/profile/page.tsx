"use client";

import { useAuth } from "@/lib/auth-context";

export default function TeacherProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500">View and update your profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-emerald-600 text-3xl font-bold">{user?.name?.[0] || "T"}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{user?.name || "Teacher"}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-xs text-emerald-600 mt-1 font-medium">Teacher</p>
          <p className="text-sm text-gray-500 mt-1">{user?.school?.name || "School"}</p>
          <button className="mt-4 w-full text-sm bg-emerald-50 text-emerald-600 py-2 rounded-lg hover:bg-emerald-100 transition font-medium">Edit Profile</button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Full Name", value: user?.name || "N/A" },
                { label: "Email", value: user?.email || "N/A" },
                { label: "Phone", value: user?.phone || "N/A" },
                { label: "Employee ID", value: "EMP0001" },
                { label: "Department", value: "Mathematics & Physics" },
                { label: "Designation", value: "Senior Teacher" },
                { label: "Date of Joining", value: "Apr 1, 2020" },
                { label: "Qualification", value: "M.Sc., B.Ed." },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                  <div className="text-sm text-gray-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Teaching Summary</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              {[
                { label: "Classes", value: "4" },
                { label: "Students", value: "142" },
                { label: "Subjects", value: "2" },
                { label: "Experience", value: "6 yrs" },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
