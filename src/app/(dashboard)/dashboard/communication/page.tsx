"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: string;
  createdAt: string;
}

export default function CommunicationPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", type: "circular" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchNotices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: Notice[] }>("/api/notices");
      setNotices(res.data);
    } catch { setNotices([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchNotices(); }, [fetchNotices]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) { setMsg("Title and content required"); return; }
    setSaving(true); setMsg("");
    try {
      await api.post("/api/notices", formData);
      setMsg("Notice published!");
      setShowForm(false);
      setFormData({ title: "", content: "", type: "circular" });
      fetchNotices();
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Communication</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          {showForm ? "Cancel" : "+ New Notice"}
        </button>
      </div>

      {msg && <div className={`p-3 rounded-lg text-sm ${msg.includes("published") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4">
          <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Notice Title" />
          <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm h-32" placeholder="Notice content..." />
          <div className="flex gap-4 items-center">
            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="border rounded-lg px-3 py-2 text-sm">
              <option value="circular">Circular</option>
              <option value="notice">Notice</option>
              <option value="event">Event</option>
              <option value="holiday">Holiday</option>
            </select>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50">{saving ? "Publishing..." : "Publish"}</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : notices.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No notices yet</div>
        ) : notices.map(n => (
          <div key={n.id} className="bg-white rounded-xl border p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{n.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${n.type === "circular" ? "bg-blue-100 text-blue-700" : n.type === "holiday" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{n.type}</span>
            </div>
            <p className="text-sm text-gray-600">{n.content}</p>
            <div className="text-xs text-gray-400 mt-2">{new Date(n.createdAt).toLocaleDateString("en-IN")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
