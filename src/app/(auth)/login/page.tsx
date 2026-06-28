"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [method, setMethod] = useState<"otp" | "password">("otp");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-indigo-700 items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="text-2xl font-bold">SchoolOS</span>
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            AI-Powered School Management Platform
          </h2>
          <p className="mt-4 text-blue-100 text-lg">
            50+ modules, 5 mobile apps, website builder. Everything your school needs in one platform.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {["10,000+ Schools", "50L+ Students", "50+ Modules", "99.9% Uptime"].map((s) => (
              <div key={s} className="bg-white/10 rounded-xl p-4">
                <span className="text-sm font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SchoolOS</span>
          </Link>

          <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-2">Log in to your school dashboard</p>

          <div className="mt-8 flex gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setMethod("otp")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${method === "otp" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
            >
              OTP Login
            </button>
            <button
              onClick={() => setMethod("password")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${method === "password" ? "bg-white shadow text-gray-900" : "text-gray-500"}`}
            >
              Password
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {method === "otp" ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500">+91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter mobile number"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                    />
                  </div>
                </div>
                {otpSent && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Enter OTP</label>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          className="w-12 h-12 text-center border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-lg font-semibold"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    if (otpSent) {
                      window.location.href = "/dashboard";
                    } else {
                      setOtpSent(true);
                    }
                  }}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition"
                >
                  {otpSent ? "Verify & Login" : "Send OTP"}
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email or Phone</label>
                  <input
                    type="text"
                    placeholder="Enter email or phone"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" className="rounded" />
                    Remember me
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Link
                  href="/dashboard"
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition block text-center"
                >
                  Log in
                </Link>
              </>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Register your school
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="text-center text-xs text-gray-400 mb-4">Quick access for demo</div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: "Super Admin", href: "/superadmin" },
                { role: "School Admin", href: "/dashboard" },
                { role: "Teacher", href: "/dashboard" },
              ].map((item) => (
                <Link
                  key={item.role}
                  href={item.href}
                  className="text-center py-2 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-600"
                >
                  {item.role}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
