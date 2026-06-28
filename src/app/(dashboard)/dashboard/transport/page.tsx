"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface Route {
  id: string;
  name: string;
  startLocation: string;
  endLocation: string;
  distance?: number;
  fare?: number;
  vehicle?: { number: string; type: string };
  _count?: { students: number };
}

export default function TransportPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", startLocation: "", endLocation: "", fare: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchRoutes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: Route[] }>("/api/transport");
      setRoutes(res.data);
    } catch { setRoutes([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchRoutes(); }, [fetchRoutes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.startLocation || !formData.endLocation) { setMsg("Fill all fields"); return; }
    setSaving(true); setMsg("");
    try {
      await api.post("/api/transport", { ...formData, fare: formData.fare ? parseFloat(formData.fare) : undefined });
      setMsg("Route created!");
      setShowForm(false);
      setFormData({ name: "", startLocation: "", endLocation: "", fare: "" });
      fetchRoutes();
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Transport</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          {showForm ? "Cancel" : "+ Add Route"}
        </button>
      </div>

      {msg && <div className={`p-3 rounded-lg text-sm ${msg.includes("created") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Route Name (Route 1...)" />
            <input type="text" value={formData.startLocation} onChange={(e) => setFormData({ ...formData, startLocation: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Start Location" />
            <input type="text" value={formData.endLocation} onChange={(e) => setFormData({ ...formData, endLocation: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="End Location (School)" />
            <input type="number" value={formData.fare} onChange={(e) => setFormData({ ...formData, fare: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Monthly Fare (₹)" />
          </div>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50">{saving ? "Creating..." : "Create Route"}</button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 text-center py-8 text-gray-400">Loading...</div>
        ) : routes.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-400">No routes configured</div>
        ) : routes.map(r => (
          <div key={r.id} className="bg-white rounded-xl border p-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold">{r.name}</h3>
              {r.fare && <span className="text-sm font-medium text-green-600">₹{r.fare}/mo</span>}
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div>From: {r.startLocation}</div>
              <div>To: {r.endLocation}</div>
              {r.vehicle && <div>Vehicle: {r.vehicle.number} ({r.vehicle.type})</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
