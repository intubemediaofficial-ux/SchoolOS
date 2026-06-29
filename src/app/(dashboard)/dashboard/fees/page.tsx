"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface FeePayment {
  id: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  paidDate?: string;
  status: string;
  paymentMethod?: string;
  receiptNo?: string;
  student: { name: string; admissionNo: string };
  feeStructure: { name: string };
}

interface FeeStructure {
  id: string;
  name: string;
  amount: number;
  frequency: string;
}

interface Student {
  id: string;
  name: string;
  admissionNo: string;
}

export default function FeesPage() {
  const [payments, setPayments] = useState<FeePayment[]>([]);
  const [structures, setStructures] = useState<FeeStructure[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showCollect, setShowCollect] = useState(false);
  const [showStructure, setShowStructure] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [formData, setFormData] = useState({ studentId: "", feeStructureId: "", amount: "", paidAmount: "", dueDate: "", paymentMethod: "cash" });
  const [structureForm, setStructureForm] = useState({ name: "", amount: "", frequency: "monthly", dueDay: "10" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: FeePayment[]; pagination: { total: number } }>(`/api/fees?limit=50${statusFilter ? `&status=${statusFilter}` : ""}`);
      setPayments(res.data);
      setTotal(res.pagination.total);
    } catch { setPayments([]); }
    finally { setLoading(false); }
  }, [statusFilter]);

  const fetchStructures = useCallback(async () => {
    try {
      const res = await api.get<{ data: FeeStructure[] }>("/api/fees/structures");
      setStructures(res.data);
    } catch { /* ignore */ }
  }, []);

  const fetchStudents = useCallback(async () => {
    try {
      const res = await api.get<{ data: Student[] }>("/api/students?limit=100");
      setStudents(res.data);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchPayments(); }, [fetchPayments]);
  useEffect(() => { fetchStructures(); fetchStudents(); }, [fetchStructures, fetchStudents]);

  const handleCollect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.feeStructureId || !formData.amount) {
      setMsg("Select student, fee type and enter amount"); return;
    }
    setSaving(true); setMsg("");
    try {
      await api.post("/api/fees", {
        studentId: formData.studentId,
        feeStructureId: formData.feeStructureId,
        amount: parseFloat(formData.amount),
        paidAmount: parseFloat(formData.paidAmount || "0"),
        dueDate: formData.dueDate || new Date().toISOString(),
        paymentMethod: formData.paymentMethod,
      });
      setMsg("Fee collected successfully!");
      setShowCollect(false);
      setFormData({ studentId: "", feeStructureId: "", amount: "", paidAmount: "", dueDate: "", paymentMethod: "cash" });
      fetchPayments();
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  const handleCreateStructure = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!structureForm.name || !structureForm.amount) { setMsg("Name and amount required"); return; }
    setSaving(true); setMsg("");
    try {
      await api.post("/api/fees/structures", {
        name: structureForm.name,
        amount: parseFloat(structureForm.amount),
        frequency: structureForm.frequency,
        dueDay: parseInt(structureForm.dueDay),
      });
      setMsg("Fee structure created!");
      setShowStructure(false);
      setStructureForm({ name: "", amount: "", frequency: "monthly", dueDay: "10" });
      fetchStructures();
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  const totalCollected = payments.filter(p => p.status === "paid").reduce((s, p) => s + p.paidAmount, 0);
  const totalPending = payments.filter(p => p.status === "pending" || p.status === "partial").reduce((s, p) => s + (p.amount - p.paidAmount), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee Management</h1>
          <p className="text-sm text-gray-500">{total} records</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowStructure(!showStructure)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">+ Fee Structure</button>
          <button onClick={() => setShowCollect(!showCollect)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">Collect Fee</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Total Collected</div>
          <div className="text-2xl font-bold text-green-600">₹{totalCollected.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Pending Amount</div>
          <div className="text-2xl font-bold text-red-600">₹{totalPending.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Fee Structures</div>
          <div className="text-2xl font-bold text-blue-600">{structures.length}</div>
        </div>
      </div>

      {msg && <div className={`p-3 rounded-lg text-sm ${msg.includes("success") || msg.includes("created") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg}</div>}

      {showStructure && (
        <form onSubmit={handleCreateStructure} className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold">Create Fee Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" value={structureForm.name} onChange={(e) => setStructureForm({ ...structureForm, name: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Fee Name (Tuition, Transport...)" />
            <input type="number" value={structureForm.amount} onChange={(e) => setStructureForm({ ...structureForm, amount: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Amount (₹)" />
            <select value={structureForm.frequency} onChange={(e) => setStructureForm({ ...structureForm, frequency: e.target.value })} className="border rounded-lg px-3 py-2 text-sm">
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="one_time">One Time</option>
            </select>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50">Create</button>
          </div>
        </form>
      )}

      {showCollect && (
        <form onSubmit={handleCollect} className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold">Collect Fee</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student *</label>
              <select value={formData.studentId} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select Student</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.admissionNo} - {s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fee Type *</label>
              <select value={formData.feeStructureId} onChange={(e) => { const str = structures.find(s => s.id === e.target.value); setFormData({ ...formData, feeStructureId: e.target.value, amount: str?.amount.toString() || "" }); }} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select Fee Type</option>
                {structures.map(s => <option key={s.id} value={s.id}>{s.name} - ₹{s.amount}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
              <input type="number" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount</label>
              <input type="number" value={formData.paidAmount} onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="0 = pending" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select value={formData.paymentMethod} onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="cash">Cash</option>
                <option value="upi">UPI</option>
                <option value="online_gateway">Online</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 disabled:opacity-50">
            {saving ? "Processing..." : "Collect Fee"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border">
        <div className="p-4 border-b flex gap-2">
          {["", "paid", "pending", "partial", "overdue"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1 rounded-full text-xs ${statusFilter === s ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>
              {s || "All"}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Student</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Fee Type</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Amount</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Paid</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Due Date</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Method</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">No fee records found</td></tr>
              ) : payments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{p.student.name}<br/><span className="text-xs text-gray-400">{p.student.admissionNo}</span></td>
                  <td className="px-4 py-3 text-sm">{p.feeStructure.name}</td>
                  <td className="px-4 py-3 text-sm font-medium">₹{p.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-green-600">₹{p.paidAmount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{new Date(p.dueDate).toLocaleDateString("en-IN")}</td>
                  <td className="px-4 py-3 text-sm capitalize">{p.paymentMethod?.replace("_", " ") || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${p.status === "paid" ? "bg-green-100 text-green-700" : p.status === "pending" ? "bg-yellow-100 text-yellow-700" : p.status === "overdue" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>{p.status}</span>
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
