"use client";

import { useState } from "react";

const students = [
  { id: 1, name: "Aarav Sharma", roll: "01", admNo: "250001" },
  { id: 2, name: "Aditya Verma", roll: "02", admNo: "250002" },
  { id: 3, name: "Ananya Gupta", roll: "03", admNo: "250003" },
  { id: 4, name: "Arjun Singh", roll: "04", admNo: "250004" },
  { id: 5, name: "Diya Patel", roll: "05", admNo: "250005" },
  { id: 6, name: "Ishaan Joshi", roll: "06", admNo: "250006" },
  { id: 7, name: "Kavya Mehra", roll: "07", admNo: "250007" },
  { id: 8, name: "Krish Agarwal", roll: "08", admNo: "250008" },
  { id: 9, name: "Mira Reddy", roll: "09", admNo: "250009" },
  { id: 10, name: "Neha Kumari", roll: "10", admNo: "250010" },
];

type AttendanceStatus = "present" | "absent" | "late" | "";

export default function TeacherAttendancePage() {
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({});

  const markAll = (status: AttendanceStatus) => {
    const all: Record<number, AttendanceStatus> = {};
    students.forEach((s) => (all[s.id] = status));
    setAttendance(all);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>
          <p className="text-sm text-gray-500">Select class and mark daily attendance</p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
          <option>Class 10-A - Mathematics</option>
          <option>Class 9-B - Mathematics</option>
          <option>Class 11-A - Physics</option>
          <option>Class 8-C - Mathematics</option>
        </select>
        <input type="date" defaultValue="2026-06-28" className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white" />
        <button onClick={() => markAll("present")} className="text-sm bg-green-50 text-green-600 px-4 py-2 rounded-lg hover:bg-green-100 transition font-medium">Mark All Present</button>
        <button onClick={() => markAll("absent")} className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium">Mark All Absent</button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Roll</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Student</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Adm No.</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">Present</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">Absent</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">Late</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 text-sm text-gray-600">{s.roll}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{s.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{s.admNo}</td>
                <td className="text-center px-4 py-3">
                  <button
                    onClick={() => setAttendance({ ...attendance, [s.id]: "present" })}
                    className={`w-8 h-8 rounded-full text-xs font-bold transition ${attendance[s.id] === "present" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400 hover:bg-green-100"}`}
                  >P</button>
                </td>
                <td className="text-center px-4 py-3">
                  <button
                    onClick={() => setAttendance({ ...attendance, [s.id]: "absent" })}
                    className={`w-8 h-8 rounded-full text-xs font-bold transition ${attendance[s.id] === "absent" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-400 hover:bg-red-100"}`}
                  >A</button>
                </td>
                <td className="text-center px-4 py-3">
                  <button
                    onClick={() => setAttendance({ ...attendance, [s.id]: "late" })}
                    className={`w-8 h-8 rounded-full text-xs font-bold transition ${attendance[s.id] === "late" ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-400 hover:bg-yellow-100"}`}
                  >L</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-4 text-sm text-gray-500">
          <span>Present: {Object.values(attendance).filter((v) => v === "present").length}</span>
          <span>Absent: {Object.values(attendance).filter((v) => v === "absent").length}</span>
          <span>Late: {Object.values(attendance).filter((v) => v === "late").length}</span>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition text-sm">
          Submit Attendance
        </button>
      </div>
    </div>
  );
}
