"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface ClassData {
  id: string;
  name: string;
  sections: { id: string; name: string }[];
}

interface Student {
  id: string;
  name: string;
  admissionNo: string;
}

export default function TeacherAttendancePage() {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchClasses = useCallback(async () => {
    try {
      const res = await api.get<{ data: ClassData[] }>("/api/classes");
      setClasses(res.data);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchClasses(); }, [fetchClasses]);

  const fetchStudents = useCallback(async () => {
    if (!selectedSection) return;
    try {
      setLoading(true);
      const res = await api.get<{ data: Student[] }>(`/api/students?sectionId=${selectedSection}&limit=100`);
      setStudents(res.data);
      const initial: Record<string, string> = {};
      res.data.forEach(s => { initial[s.id] = "present"; });
      setAttendance(initial);
    } catch { setStudents([]); }
    finally { setLoading(false); }
  }, [selectedSection]);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  const handleSubmit = async () => {
    if (!selectedSection || students.length === 0) { setMsg("Select class first"); return; }
    setSaving(true); setMsg("");
    try {
      const records = Object.entries(attendance).map(([studentId, status]) => ({ studentId, status }));
      await api.post("/api/attendance", { records, date, sectionId: selectedSection });
      setMsg(`Attendance marked for ${records.length} students!`);
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  const presentCount = Object.values(attendance).filter(v => v === "present").length;
  const absentCount = Object.values(attendance).filter(v => v === "absent").length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mark Attendance</h1>

      <div className="flex gap-4 items-end flex-wrap">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Class & Section</label>
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="">Select</option>
            {classes.map(c => c.sections.map(s => (
              <option key={s.id} value={s.id}>{c.name} - {s.name}</option>
            )))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border rounded-lg px-3 py-2 text-sm" />
        </div>
      </div>

      {msg && <div className={`p-3 rounded-lg text-sm ${msg.includes("marked") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg}</div>}

      {selectedSection && students.length > 0 && (
        <div className="bg-white rounded-xl border">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex gap-4 text-sm">
              <span className="text-green-600 font-medium">P: {presentCount}</span>
              <span className="text-red-600 font-medium">A: {absentCount}</span>
              <span className="text-gray-500">Total: {students.length}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { const u: Record<string, string> = {}; students.forEach(s => { u[s.id] = "present"; }); setAttendance(u); }} className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs">All P</button>
              <button onClick={() => { const u: Record<string, string> = {}; students.forEach(s => { u[s.id] = "absent"; }); setAttendance(u); }} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs">All A</button>
            </div>
          </div>
          <div className="divide-y">
            {students.map((s, i) => (
              <div key={s.id} className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 w-6">{i + 1}</span>
                  <div className="text-sm font-medium">{s.name}</div>
                </div>
                <div className="flex gap-1">
                  {["present", "absent", "late", "leave"].map(status => (
                    <button key={status} onClick={() => setAttendance({ ...attendance, [s.id]: status })}
                      className={`w-8 h-8 rounded text-xs font-bold ${attendance[s.id] === status
                        ? status === "present" ? "bg-green-600 text-white"
                        : status === "absent" ? "bg-red-600 text-white"
                        : status === "late" ? "bg-yellow-600 text-white"
                        : "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-500"}`}>
                      {status[0].toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <button onClick={handleSubmit} disabled={saving} className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50">
              {saving ? "Saving..." : "Submit Attendance"}
            </button>
          </div>
        </div>
      )}
      {loading && <div className="text-center py-8 text-gray-400">Loading students...</div>}
      {!selectedSection && <div className="text-center py-8 text-gray-400">Select a class to mark attendance</div>}
    </div>
  );
}
