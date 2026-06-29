"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface Exam {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
}

export default function ExaminationPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", type: "unit_test", startDate: "", endDate: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchExams = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: Exam[] }>("/api/exams");
      setExams(res.data);
    } catch { setExams([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchExams(); }, [fetchExams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.startDate || !formData.endDate) { setMsg("Fill all fields"); return; }
    setSaving(true); setMsg("");
    try {
      await api.post("/api/exams", formData);
      setMsg("Exam created!");
      setShowForm(false);
      setFormData({ name: "", type: "unit_test", startDate: "", endDate: "" });
      fetchExams();
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Examination</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          {showForm ? "Cancel" : "+ Create Exam"}
        </button>
      </div>

      {msg && <div className={`p-3 rounded-lg text-sm ${msg.includes("created") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Exam Name (UT-1, Mid Term...)" />
            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="border rounded-lg px-3 py-2 text-sm">
              <option value="unit_test">Unit Test</option>
              <option value="mid_term">Mid Term</option>
              <option value="final">Final Exam</option>
              <option value="practice">Practice Test</option>
            </select>
            <input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" />
            <input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" />
          </div>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50">{saving ? "Creating..." : "Create Exam"}</button>
        </form>
      )}

      <div className="bg-white rounded-xl border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Exam Name</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Start Date</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">End Date</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : exams.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400">No exams scheduled</td></tr>
              ) : exams.map(e => (
                <tr key={e.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{e.name}</td>
                  <td className="px-4 py-3 text-sm capitalize">{e.type.replace("_", " ")}</td>
                  <td className="px-4 py-3 text-sm">{new Date(e.startDate).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3 text-sm">{new Date(e.endDate).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs ${e.status === "completed" ? "bg-green-100 text-green-700" : e.status === "ongoing" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>{e.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
