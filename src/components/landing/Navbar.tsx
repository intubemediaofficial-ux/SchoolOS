"use client";

import { useState } from "react";
import Link from "next/link";

const solutions = [
  { name: "ERP for Institutions", href: "/#erp", desc: "Complete school administration" },
  { name: "Learning Management", href: "/#lms", desc: "Digital classroom & academics" },
  { name: "Admissions & CRM", href: "/#crm", desc: "Lead management & enrollment" },
  { name: "Website Builder", href: "/#website", desc: "Drag & drop school websites" },
  { name: "AI Tools", href: "/#ai", desc: "AI-powered education tools" },
  { name: "Mobile Apps", href: "/#apps", desc: "Parent, Teacher & Student apps" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              School<span className="text-primary">OS</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1 text-sm font-medium"
              >
                Solutions
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-2">
                  {solutions.map((s) => (
                    <Link
                      key={s.name}
                      href={s.href}
                      className="block px-4 py-3 rounded-lg hover:bg-blue-50 transition"
                    >
                      <div className="font-medium text-gray-900 text-sm">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/#pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Plans</Link>
            <Link href="/#modules" className="text-gray-600 hover:text-gray-900 text-sm font-medium">Modules</Link>
            <Link href="/#about" className="text-gray-600 hover:text-gray-900 text-sm font-medium">About</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium px-4 py-2"
            >
              Log in
            </Link>
            <Link
              href="/register"
              className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-dark transition shadow-sm"
            >
              Start Free Trial
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
            {solutions.map((s) => (
              <Link key={s.name} href={s.href} className="block px-4 py-2 text-gray-600 text-sm">
                {s.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 px-4">
              <Link href="/login" className="text-center py-2 text-gray-600 border border-gray-200 rounded-lg text-sm">
                Log in
              </Link>
              <Link href="/register" className="text-center py-2 bg-primary text-white rounded-lg text-sm">
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
