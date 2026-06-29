"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  teacher?: { name: string };
}

export default function HRPage() {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: LeaveRequest[] }>("/api/hr/leaves");
      setLeaves(res.data);
    } catch { setLeaves([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchLeaves(); }, [fetchLeaves]);

  const updateLeave = async (id: string, status: string) => {
    try {
      await api.put(`/api/hr/leaves`, { id, status });
      fetchLeaves();
    } catch { /* ignore */ }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">HR & Staff Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Pending Leaves</div>
          <div className="text-2xl font-bold text-yellow-600">{leaves.filter(l => l.status === "pending").length}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Approved</div>
          <div className="text-2xl font-bold text-green-600">{leaves.filter(l => l.status === "approved").length}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Total Requests</div>
          <div className="text-2xl font-bold text-blue-600">{leaves.length}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Leave Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Staff</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">From</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">To</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Reason</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : leaves.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">No leave requests</td></tr>
              ) : leaves.map(l => (
                <tr key={l.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{l.teacher?.name || "—"}</td>
                  <td className="px-4 py-3 text-sm capitalize">{l.type}</td>
                  <td className="px-4 py-3 text-sm">{new Date(l.startDate).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3 text-sm">{new Date(l.endDate).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3 text-sm">{l.reason}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs ${l.status === "approved" ? "bg-green-100 text-green-700" : l.status === "rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{l.status}</span></td>
                  <td className="px-4 py-3">
                    {l.status === "pending" && (
                      <div className="flex gap-1">
                        <button onClick={() => updateLeave(l.id, "approved")} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Approve</button>
                        <button onClick={() => updateLeave(l.id, "rejected")} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Reject</button>
                      </div>
                    )}
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
