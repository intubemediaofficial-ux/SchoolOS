"use client";

import { useState } from "react";
import Link from "next/link";

const steps = ["Verify", "School Info", "Plan", "Payment"];

export default function RegisterPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SchoolOS</span>
          </Link>
          <Link href="/login" className="text-sm text-gray-500 hover:text-gray-900">
            Already have an account? Log in
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Register Your School</h1>
          <p className="text-gray-500 mt-2">Get started in minutes with a free trial</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {i < step ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={`text-sm hidden sm:block ${i <= step ? "text-gray-900 font-medium" : "text-gray-400"}`}>
                {s}
              </span>
              {i < steps.length - 1 && <div className={`w-12 h-0.5 ${i < step ? "bg-primary" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {step === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Verify Your Identity</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
                <div className="flex gap-2">
                  <span className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">+91</span>
                  <input type="tel" placeholder="Enter mobile number" className="flex-1 px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input type="email" placeholder="school@example.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <button onClick={() => setStep(1)} className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition">
                Send OTP & Continue
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">School Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">School Name</label>
                  <input type="text" placeholder="e.g. Delhi Public School" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Board</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                    <option>CBSE</option><option>ICSE</option><option>RBSE</option><option>IB</option><option>IGCSE</option><option>State Board</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Students</label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                    <option>Less than 500</option><option>500 - 1000</option><option>1000 - 2000</option><option>2000 - 5000</option><option>5000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                  <input type="text" placeholder="City" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                  <input type="text" placeholder="State" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Principal Name</label>
                  <input type="text" placeholder="Principal name" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">School Website</label>
                  <input type="url" placeholder="https://yourschool.com (optional)" className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition">
                  Back
                </button>
                <button onClick={() => setStep(2)} className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition">
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Choose Your Plan</h2>
              <div className="space-y-3">
                {[
                  { name: "Starter", price: "Per Student Pricing", desc: "Basic ERP, Fee Management, Attendance" },
                  { name: "Professional", price: "Per Student Pricing", desc: "Exams, Library, Transport, Admissions, WhatsApp", popular: true },
                  { name: "Enterprise", price: "Custom Pricing", desc: "All modules, AI Tools, Website Builder, API" },
                ].map((plan) => (
                  <label key={plan.name} className={`block border-2 rounded-xl p-4 cursor-pointer transition ${plan.popular ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/30"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <input type="radio" name="plan" defaultChecked={plan.popular} className="text-primary" />
                          <span className="font-semibold text-gray-900">{plan.name}</span>
                          {plan.popular && <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Popular</span>}
                        </div>
                        <p className="text-sm text-gray-500 mt-1 ml-6">{plan.desc}</p>
                      </div>
                      <span className="text-sm font-medium text-primary">{plan.price}</span>
                    </div>
                  </label>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
                All plans include a <strong>14-day free trial</strong>. No credit card required.
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition">Start Free Trial</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6 py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your School is Ready!</h2>
              <p className="text-gray-500">
                Your ERP has been activated. Website is being generated.
                <br />Login credentials have been sent to your email &amp; phone.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subdomain</span>
                  <span className="font-medium text-primary">yourschool.schoolos.in</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Plan</span>
                  <span className="font-medium">Professional (14-day trial)</span>
                </div>
              </div>
              <Link
                href="/dashboard"
                className="inline-block bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-dark transition"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
