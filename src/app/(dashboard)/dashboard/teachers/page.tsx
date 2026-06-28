"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface Teacher {
  id: string;
  employeeId: string;
  name: string;
  phone: string;
  email?: string;
  gender: string;
  department: string;
  designation: string;
  qualification: string;
  status: string;
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", gender: "male", qualification: "", department: "", designation: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: Teacher[]; pagination: { total: number } }>(`/api/teachers?search=${search}`);
      setTeachers(res.data);
      setTotal(res.pagination.total);
    } catch { setTeachers([]); }
    finally { setLoading(false); }
  }, [search]);

  useEffect(() => { fetchTeachers(); }, [fetchTeachers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.department || !formData.designation || !formData.qualification) {
      setMsg("Please fill all required fields"); return;
    }
    setSaving(true); setMsg("");
    try {
      // Create teacher record
      await api.post("/api/teachers", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        gender: formData.gender,
        qualification: formData.qualification,
        department: formData.department,
        designation: formData.designation,
      });
      // Also create user login for this teacher
      if (formData.email && formData.password) {
        try {
          await api.post("/api/users", {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            password: formData.password,
            role: "teacher",
          });
        } catch { /* user might already exist */ }
      }
      setMsg("Teacher added successfully! Login credentials created.");
      setShowForm(false);
      setFormData({ name: "", phone: "", email: "", gender: "male", qualification: "", department: "", designation: "", password: "" });
      fetchTeachers();
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers & Staff</h1>
          <p className="text-sm text-gray-500">Total: {total} teachers</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          {showForm ? "Cancel" : "+ Add Teacher"}
        </button>
      </div>

      {msg && <div className={`p-3 rounded-lg text-sm ${msg.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold">Add New Teacher</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Full Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="9876543210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (for login)</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="teacher@school.edu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Login Password</label>
              <input type="text" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Set login password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
              <input type="text" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="B.Ed, M.Sc, etc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
              <select value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select Department</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Social Science">Social Science</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Physical Education">Physical Education</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
              <select value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select Designation</option>
                <option value="PRT">PRT (Primary Teacher)</option>
                <option value="TGT">TGT (Trained Graduate)</option>
                <option value="PGT">PGT (Post Graduate)</option>
                <option value="Vice Principal">Vice Principal</option>
                <option value="HOD">HOD</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-gray-500">Note: If email and password are provided, teacher can login to Teacher Portal</p>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
            {saving ? "Saving..." : "Add Teacher"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border">
        <div className="p-4 border-b">
          <input type="text" placeholder="Search teachers..." value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded-lg px-3 py-2 text-sm w-64" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">ID</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Name</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Phone</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Department</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Designation</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Qualification</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : teachers.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">No teachers found. Add your first teacher.</td></tr>
              ) : teachers.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-mono">{t.employeeId}</td>
                  <td className="px-4 py-3 text-sm font-medium">{t.name}</td>
                  <td className="px-4 py-3 text-sm">{t.phone}</td>
                  <td className="px-4 py-3 text-sm">{t.department}</td>
                  <td className="px-4 py-3 text-sm">{t.designation}</td>
                  <td className="px-4 py-3 text-sm">{t.qualification}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs ${t.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
