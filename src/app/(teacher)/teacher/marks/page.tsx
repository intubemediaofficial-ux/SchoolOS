"use client";

const students = [
  { roll: "01", name: "Aarav Sharma", ut1: 18, ut2: 20, half: 72, ut3: null, final: null },
  { roll: "02", name: "Aditya Verma", ut1: 15, ut2: 17, half: 65, ut3: null, final: null },
  { roll: "03", name: "Ananya Gupta", ut1: 24, ut2: 23, half: 88, ut3: null, final: null },
  { roll: "04", name: "Arjun Singh", ut1: 20, ut2: 19, half: 75, ut3: null, final: null },
  { roll: "05", name: "Diya Patel", ut1: 22, ut2: 24, half: 82, ut3: null, final: null },
  { roll: "06", name: "Ishaan Joshi", ut1: 12, ut2: 14, half: 55, ut3: null, final: null },
  { roll: "07", name: "Kavya Mehra", ut1: 25, ut2: 25, half: 95, ut3: null, final: null },
  { roll: "08", name: "Krish Agarwal", ut1: 19, ut2: 21, half: 78, ut3: null, final: null },
];

export default function TeacherMarksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marks Entry</h1>
          <p className="text-sm text-gray-500">Enter and manage exam marks</p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
          <option>Class 10-A - Mathematics</option>
          <option>Class 9-B - Mathematics</option>
          <option>Class 11-A - Physics</option>
        </select>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white">
          <option>Unit Test 3</option>
          <option>Half Yearly</option>
          <option>Final Exam</option>
        </select>
        <span className="text-sm text-gray-400 flex items-center">Max Marks: 25</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Roll</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-gray-500">Student</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">UT-1 (25)</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">UT-2 (25)</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">Half Yearly (100)</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">UT-3 (25)</th>
              <th className="text-center px-4 py-3 text-xs font-medium text-gray-500">Final (100)</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.roll} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                <td className="px-4 py-3 text-sm text-gray-600">{s.roll}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{s.name}</td>
                <td className="text-center px-4 py-3 text-sm text-gray-600">{s.ut1}</td>
                <td className="text-center px-4 py-3 text-sm text-gray-600">{s.ut2}</td>
                <td className="text-center px-4 py-3 text-sm text-gray-600">{s.half}</td>
                <td className="text-center px-4 py-3">
                  <input type="number" max={25} min={0} className="w-16 text-center border border-gray-200 rounded-lg py-1 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" placeholder="-" />
                </td>
                <td className="text-center px-4 py-3">
                  <input type="number" max={100} min={0} className="w-16 text-center border border-gray-200 rounded-lg py-1 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none" placeholder="-" disabled />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition text-sm">
          Save Marks
        </button>
      </div>
    </div>
  );
}
