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
  rollNo?: number;
}

interface AttendanceRecord {
  id: string;
  date: string;
  status: string;
  student: { name: string; admissionNo: string };
  section: { name: string; class: { name: string } };
}

export default function AttendancePage() {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [viewMode, setViewMode] = useState<"mark" | "view">("mark");

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

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: "100" });
      if (selectedSection) params.set("sectionId", selectedSection);
      if (date) params.set("date", date);
      const res = await api.get<{ data: AttendanceRecord[] }>(`/api/attendance?${params}`);
      setRecords(res.data);
    } catch { setRecords([]); }
    finally { setLoading(false); }
  }, [selectedSection, date]);

  useEffect(() => { if (viewMode === "mark") fetchStudents(); else fetchRecords(); }, [viewMode, fetchStudents, fetchRecords]);

  const handleMarkAll = (status: string) => {
    const updated: Record<string, string> = {};
    students.forEach(s => { updated[s.id] = status; });
    setAttendance(updated);
  };

  const handleSubmit = async () => {
    if (!selectedSection || students.length === 0) { setMsg("Select class and section first"); return; }
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
          <p className="text-sm text-gray-500">Mark and view daily attendance</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setViewMode("mark")} className={`px-4 py-2 rounded-lg text-sm ${viewMode === "mark" ? "bg-blue-600 text-white" : "border"}`}>Mark Attendance</button>
          <button onClick={() => setViewMode("view")} className={`px-4 py-2 rounded-lg text-sm ${viewMode === "view" ? "bg-blue-600 text-white" : "border"}`}>View Records</button>
        </div>
      </div>

      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Class & Section</label>
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
            <option value="">Select Class-Section</option>
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

      {viewMode === "mark" ? (
        <div className="bg-white rounded-xl border">
          {selectedSection && students.length > 0 && (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex gap-4 text-sm">
                  <span className="text-green-600 font-medium">Present: {presentCount}</span>
                  <span className="text-red-600 font-medium">Absent: {absentCount}</span>
                  <span className="text-gray-500">Total: {students.length}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleMarkAll("present")} className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs">All Present</button>
                  <button onClick={() => handleMarkAll("absent")} className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs">All Absent</button>
                </div>
              </div>
              <div className="divide-y">
                {students.map((s, i) => (
                  <div key={s.id} className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-400 w-6">{i + 1}</span>
                      <div>
                        <div className="text-sm font-medium">{s.name}</div>
                        <div className="text-xs text-gray-400">{s.admissionNo}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {["present", "absent", "late", "leave"].map(status => (
                        <button key={status} onClick={() => setAttendance({ ...attendance, [s.id]: status })}
                          className={`px-3 py-1 rounded text-xs capitalize ${attendance[s.id] === status
                            ? status === "present" ? "bg-green-600 text-white"
                            : status === "absent" ? "bg-red-600 text-white"
                            : status === "late" ? "bg-yellow-600 text-white"
                            : "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-600"}`}>
                          {status === "present" ? "P" : status === "absent" ? "A" : status === "late" ? "L" : "Lv"}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <button onClick={handleSubmit} disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
                  {saving ? "Saving..." : "Submit Attendance"}
                </button>
              </div>
            </>
          )}
          {!selectedSection && <div className="p-8 text-center text-gray-400">Select class and section to mark attendance</div>}
          {selectedSection && students.length === 0 && !loading && <div className="p-8 text-center text-gray-400">No students in this section</div>}
          {loading && <div className="p-8 text-center text-gray-400">Loading...</div>}
        </div>
      ) : (
        <div className="bg-white rounded-xl border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Student</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Class</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={4} className="text-center py-8 text-gray-400">Loading...</td></tr>
                ) : records.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-8 text-gray-400">No records found</td></tr>
                ) : records.map(r => (
                  <tr key={r.id} className="border-b">
                    <td className="px-4 py-3 text-sm">{r.student.name}</td>
                    <td className="px-4 py-3 text-sm">{r.section.class.name} - {r.section.name}</td>
                    <td className="px-4 py-3 text-sm">{new Date(r.date).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${r.status === "present" ? "bg-green-100 text-green-700" : r.status === "absent" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
