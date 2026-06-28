"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface School {
  id: string;
  name: string;
  subdomain: string;
  email: string;
  phone: string;
  city: string;
  board: string;
  subscription: string;
  subscriptionStatus: string;
  createdAt: string;
  _count: { students: number; teachers: number; users: number };
}

interface Stats {
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  totalRevenue: number;
  activeSubscriptions: number;
  trialSubscriptions: number;
}

export default function SuperAdminPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateSchool, setShowCreateSchool] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [schoolForm, setSchoolForm] = useState({ name: "", email: "", phone: "", city: "", state: "", board: "CBSE", principalName: "", plan: "starter" });
  const [userForm, setUserForm] = useState({ name: "", email: "", phone: "", password: "", role: "school_admin", schoolId: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [schoolsRes, statsRes] = await Promise.all([
        api.get<{ data: School[] }>("/api/schools?limit=50"),
        api.get<{ data: Stats }>("/api/superadmin/stats").catch(() => null),
      ]);
      setSchools(schoolsRes.data);
      if (statsRes) setStats(statsRes.data);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleCreateSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolForm.name || !schoolForm.email || !schoolForm.phone) { setMsg("Name, email, and phone required"); return; }
    setSaving(true); setMsg("");
    try {
      await api.post("/api/schools", schoolForm);
      setMsg("School created successfully!");
      setShowCreateSchool(false);
      setSchoolForm({ name: "", email: "", phone: "", city: "", state: "", board: "CBSE", principalName: "", plan: "starter" });
      fetchData();
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.phone || !userForm.password || !userForm.schoolId) { setMsg("All fields required"); return; }
    setSaving(true); setMsg("");
    try {
      await api.post("/api/users", userForm);
      setMsg(`${userForm.role.replace("_", " ")} user created! They can now login.`);
      setShowCreateUser(false);
      setUserForm({ name: "", email: "", phone: "", password: "", role: "school_admin", schoolId: "" });
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  const totalStudents = schools.reduce((s, sc) => s + sc._count.students, 0);
  const totalTeachers = schools.reduce((s, sc) => s + sc._count.teachers, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
          <p className="text-sm text-gray-500">Manage all schools on the platform</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowCreateUser(!showCreateUser)} className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">+ Create User</button>
          <button onClick={() => setShowCreateSchool(!showCreateSchool)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">+ Add School</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Total Schools</div>
          <div className="text-2xl font-bold text-blue-600">{schools.length}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Total Students</div>
          <div className="text-2xl font-bold text-green-600">{totalStudents.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Total Teachers</div>
          <div className="text-2xl font-bold text-purple-600">{totalTeachers}</div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="text-xs text-gray-500">Active Subscriptions</div>
          <div className="text-2xl font-bold text-orange-600">{schools.filter(s => s.subscriptionStatus === "active" || s.subscriptionStatus === "trial").length}</div>
        </div>
      </div>

      {msg && <div className={`p-3 rounded-lg text-sm ${msg.includes("success") || msg.includes("created") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg}</div>}

      {showCreateSchool && (
        <form onSubmit={handleCreateSchool} className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold">Register New School</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
              <input type="text" value={schoolForm.name} onChange={(e) => setSchoolForm({ ...schoolForm, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Delhi Public School" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={schoolForm.email} onChange={(e) => setSchoolForm({ ...schoolForm, email: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="admin@school.edu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" value={schoolForm.phone} onChange={(e) => setSchoolForm({ ...schoolForm, phone: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="9876543210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Principal Name</label>
              <input type="text" value={schoolForm.principalName} onChange={(e) => setSchoolForm({ ...schoolForm, principalName: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Principal Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input type="text" value={schoolForm.city} onChange={(e) => setSchoolForm({ ...schoolForm, city: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Jaipur" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input type="text" value={schoolForm.state} onChange={(e) => setSchoolForm({ ...schoolForm, state: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Rajasthan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Board</label>
              <select value={schoolForm.board} onChange={(e) => setSchoolForm({ ...schoolForm, board: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="RBSE">RBSE</option>
                <option value="UP Board">UP Board</option>
                <option value="State Board">State Board</option>
                <option value="International">International</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
              <select value={schoolForm.plan} onChange={(e) => setSchoolForm({ ...schoolForm, plan: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="starter">Starter</option>
                <option value="professional">Professional</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50">
            {saving ? "Creating..." : "Create School"}
          </button>
        </form>
      )}

      {showCreateUser && (
        <form onSubmit={handleCreateUser} className="bg-white rounded-xl border p-6 space-y-4">
          <h2 className="text-lg font-semibold">Create User Login</h2>
          <p className="text-sm text-gray-500">Create login credentials for school admin or staff</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" value={userForm.name} onChange={(e) => setUserForm({ ...userForm, name: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Full Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="user@school.edu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" value={userForm.phone} onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="9876543210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <input type="text" value={userForm.password} onChange={(e) => setUserForm({ ...userForm, password: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Login password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="school_admin">School Admin</option>
                <option value="teacher">Teacher</option>
                <option value="accountant">Accountant</option>
                <option value="librarian">Librarian</option>
                <option value="receptionist">Receptionist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign to School *</label>
              <select value={userForm.schoolId} onChange={(e) => setUserForm({ ...userForm, schoolId: e.target.value })} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select School</option>
                {schools.map(s => <option key={s.id} value={s.id}>{s.name} ({s.city})</option>)}
              </select>
            </div>
          </div>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50">
            {saving ? "Creating..." : "Create User"}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Registered Schools</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">School</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">City</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Board</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Students</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Teachers</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Plan</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : schools.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-gray-400">No schools registered yet</td></tr>
              ) : schools.map(s => (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-gray-400">{s.subdomain}.schoolos.in</div>
                  </td>
                  <td className="px-4 py-3 text-sm">{s.city || "-"}</td>
                  <td className="px-4 py-3 text-sm">{s.board}</td>
                  <td className="px-4 py-3 text-sm font-medium">{s._count.students}</td>
                  <td className="px-4 py-3 text-sm font-medium">{s._count.teachers}</td>
                  <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700 capitalize">{s.subscription}</span></td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs ${s.subscriptionStatus === "active" ? "bg-green-100 text-green-700" : s.subscriptionStatus === "trial" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{s.subscriptionStatus}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
