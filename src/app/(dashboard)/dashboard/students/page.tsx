"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface Student {
  id: string;
  admissionNo: string;
  name: string;
  gender: string;
  fatherName: string;
  fatherPhone?: string;
  dateOfBirth: string;
  status: string;
  section?: { name: string; class: { name: string } };
}

interface ClassData {
  id: string;
  name: string;
  sections: { id: string; name: string }[];
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", dateOfBirth: "", gender: "male", fatherName: "", fatherPhone: "", sectionId: "", motherName: "", address: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: Student[]; pagination: { total: number } }>(`/api/students?page=${page}&limit=20&search=${search}`);
      setStudents(res.data);
      setTotal(res.pagination.total);
    } catch { setStudents([]); }
    finally { setLoading(false); }
  }, [page, search]);

  const fetchClasses = useCallback(async () => {
    try {
      const res = await api.get<{ data: ClassData[] }>("/api/classes");
      setClasses(res.data);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);
  useEffect(() => { fetchClasses(); }, [fetchClasses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.sectionId || !formData.dateOfBirth || !formData.fatherName) {
      setMsg("Please fill all required fields"); return;
    }
    setSaving(true); setMsg("");
    try {
      await api.post("/api/students", formData);
      setMsg("Student added successfully!");
      setShowForm(false);
      setFormData({ name: "", dateOfBirth: "", gender: "male", fatherName: "", fatherPhone: "", sectionId: "", motherName: "", address: "" });
      fetchStudents();
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-sm text-gray-500">Total: {total} students</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
          {showForm ? "Cancel" : "+ Add Student"}
        </button>
      </div>

      {msg && <div className={`p-3 rounded-lg text-sm ${msg.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold">Add New Student</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Full Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
              <input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class & Section *</label>
              <select value={formData.sectionId} onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select Class-Section</option>
                {classes.map((c) => c.sections.map((s) => (
                  <option key={s.id} value={s.id}>{c.name} - {s.name}</option>
                )))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Father Name *</label>
              <input type="text" value={formData.fatherName} onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Father's Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Father Phone</label>
              <input type="tel" value={formData.fatherPhone} onChange={(e) => setFormData({ ...formData, fatherPhone: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="9876543210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mother Name</label>
              <input type="text" value={formData.motherName} onChange={(e) => setFormData({ ...formData, motherName: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Mother's Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Address" />
            </div>
          </div>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
            {saving ? "Saving..." : "Add Student"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border">
        <div className="p-4 border-b flex gap-3 items-center">
          <input type="text" placeholder="Search students..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="border rounded-lg px-3 py-2 text-sm w-64" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Adm No</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Name</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Class</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Father</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Phone</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Gender</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">No students found</td></tr>
              ) : students.map((s) => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono">{s.admissionNo}</td>
                  <td className="px-4 py-3 text-sm font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-sm">{s.section ? `${s.section.class.name} - ${s.section.name}` : "-"}</td>
                  <td className="px-4 py-3 text-sm">{s.fatherName}</td>
                  <td className="px-4 py-3 text-sm">{s.fatherPhone || "-"}</td>
                  <td className="px-4 py-3 text-sm capitalize">{s.gender}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs ${s.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>{s.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {total > 20 && (
          <div className="p-4 border-t flex justify-between items-center">
            <span className="text-sm text-gray-500">Page {page} of {Math.ceil(total / 20)}</span>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded text-sm disabled:opacity-50">Prev</button>
              <button onClick={() => setPage(p => p + 1)} disabled={page * 20 >= total} className="px-3 py-1 border rounded text-sm disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
