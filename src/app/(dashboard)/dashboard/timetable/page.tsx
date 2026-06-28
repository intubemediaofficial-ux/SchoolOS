"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface ClassData {
  id: string;
  name: string;
  sections: { id: string; name: string }[];
}

interface TimetableEntry {
  id: string;
  day: string;
  period: number;
  startTime: string;
  endTime: string;
  subject?: { name: string };
  teacher?: { name: string };
}

export default function TimetablePage() {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchClasses = useCallback(async () => {
    try {
      const res = await api.get<{ data: ClassData[] }>("/api/classes");
      setClasses(res.data);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchClasses(); }, [fetchClasses]);

  const fetchTimetable = useCallback(async () => {
    if (!selectedSection) return;
    try {
      setLoading(true);
      const res = await api.get<{ data: TimetableEntry[] }>(`/api/timetable?sectionId=${selectedSection}`);
      setEntries(res.data);
    } catch { setEntries([]); }
    finally { setLoading(false); }
  }, [selectedSection]);

  useEffect(() => { fetchTimetable(); }, [fetchTimetable]);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];

  const getEntry = (day: string, period: number) => entries.find(e => e.day === day && e.period === period);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Timetable</h1>
        <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="border rounded-lg px-3 py-2 text-sm">
          <option value="">Select Class-Section</option>
          {classes.map(c => c.sections.map(s => (
            <option key={s.id} value={s.id}>{c.name} - {s.name}</option>
          )))}
        </select>
      </div>

      {!selectedSection && <div className="text-center py-12 text-gray-400">Select a class to view timetable</div>}

      {selectedSection && (
        <div className="bg-white rounded-xl border overflow-x-auto">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left text-xs font-medium text-gray-500 px-3 py-3">Day / Period</th>
                  {periods.map(p => <th key={p} className="text-center text-xs font-medium text-gray-500 px-2 py-3">P{p}</th>)}
                </tr>
              </thead>
              <tbody>
                {days.map(day => (
                  <tr key={day} className="border-b">
                    <td className="px-3 py-3 text-sm font-medium">{day}</td>
                    {periods.map(p => {
                      const entry = getEntry(day, p);
                      return (
                        <td key={p} className="px-2 py-2 text-center">
                          {entry ? (
                            <div className="bg-blue-50 rounded p-1">
                              <div className="text-xs font-medium text-blue-700">{entry.subject?.name || "—"}</div>
                              <div className="text-[10px] text-gray-500">{entry.teacher?.name || ""}</div>
                            </div>
                          ) : (
                            <div className="text-xs text-gray-300">—</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
