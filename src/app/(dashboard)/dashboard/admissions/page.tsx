"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface Admission {
  id: string;
  studentName: string;
  parentName: string;
  phone: string;
  email?: string;
  classApplied: string;
  status: string;
  source?: string;
  createdAt: string;
}

export default function AdmissionsPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ studentName: "", parentName: "", phone: "", email: "", classApplied: "", source: "walk_in" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchAdmissions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: Admission[]; pagination: { total: number } }>(`/api/admissions?limit=50${statusFilter ? `&status=${statusFilter}` : ""}`);
      setAdmissions(res.data);
      setTotal(res.pagination.total);
    } catch { setAdmissions([]); }
    finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { fetchAdmissions(); }, [fetchAdmissions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName || !formData.phone || !formData.classApplied) { setMsg("Fill required fields"); return; }
    setSaving(true); setMsg("");
    try {
      await api.post("/api/admissions", formData);
      setMsg("Enquiry added!");
      setShowForm(false);
      setFormData({ studentName: "", parentName: "", phone: "", email: "", classApplied: "", source: "walk_in" });
      fetchAdmissions();
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.put(`/api/admissions/${id}`, { status });
      fetchAdmissions();
    } catch { /* ignore */ }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admissions CRM</h1>
          <p className="text-sm text-gray-500">{total} enquiries</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          {showForm ? "Cancel" : "+ New Enquiry"}
        </button>
      </div>

      {msg && <div className={`p-3 rounded-lg text-sm ${msg.includes("added") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={formData.studentName} onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Student Name *" />
            <input type="text" value={formData.parentName} onChange={(e) => setFormData({ ...formData, parentName: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Parent Name *" />
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Phone *" />
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Email" />
            <input type="text" value={formData.classApplied} onChange={(e) => setFormData({ ...formData, classApplied: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Class Applied For *" />
            <select value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })} className="border rounded-lg px-3 py-2 text-sm">
              <option value="walk_in">Walk-in</option>
              <option value="website">Website</option>
              <option value="referral">Referral</option>
              <option value="advertisement">Advertisement</option>
            </select>
          </div>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50">{saving ? "Saving..." : "Add Enquiry"}</button>
        </form>
      )}

      <div className="bg-white rounded-xl border">
        <div className="p-4 border-b flex gap-2 flex-wrap">
          {["", "enquiry", "applied", "interview", "accepted", "enrolled", "rejected"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1 rounded-full text-xs ${statusFilter === s ? "bg-blue-600 text-white" : "bg-gray-100"}`}>{s || "All"}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Student</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Parent</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Phone</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Class</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : admissions.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No enquiries</td></tr>
              ) : admissions.map(a => (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{a.studentName}</td>
                  <td className="px-4 py-3 text-sm">{a.parentName}</td>
                  <td className="px-4 py-3 text-sm">{a.phone}</td>
                  <td className="px-4 py-3 text-sm">{a.classApplied}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs capitalize ${a.status === "enrolled" ? "bg-green-100 text-green-700" : a.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{a.status}</span></td>
                  <td className="px-4 py-3">
                    <select onChange={(e) => { if (e.target.value) updateStatus(a.id, e.target.value); e.target.value = ""; }} className="text-xs border rounded px-2 py-1">
                      <option value="">Change Status</option>
                      <option value="applied">Applied</option>
                      <option value="interview">Interview</option>
                      <option value="accepted">Accepted</option>
                      <option value="enrolled">Enrolled</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
