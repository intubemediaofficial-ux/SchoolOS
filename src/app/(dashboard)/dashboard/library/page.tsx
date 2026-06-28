"use client";

import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api-client";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
}

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", author: "", isbn: "", category: "General", totalCopies: "1" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: Book[]; pagination: { total: number } }>(`/api/library?search=${search}`);
      setBooks(res.data);
      setTotal(res.pagination.total);
    } catch { setBooks([]); }
    finally { setLoading(false); }
  }, [search]);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author) { setMsg("Title and author required"); return; }
    setSaving(true); setMsg("");
    try {
      await api.post("/api/library", { ...formData, totalCopies: parseInt(formData.totalCopies) });
      setMsg("Book added!");
      setShowForm(false);
      setFormData({ title: "", author: "", isbn: "", category: "General", totalCopies: "1" });
      fetchBooks();
    } catch (err) { setMsg((err as Error).message); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Library</h1>
          <p className="text-sm text-gray-500">Total: {total} books</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          {showForm ? "Cancel" : "+ Add Book"}
        </button>
      </div>

      {msg && <div className={`p-3 rounded-lg text-sm ${msg.includes("added") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>{msg}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Book Title" />
            <input type="text" value={formData.author} onChange={(e) => setFormData({ ...formData, author: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Author" />
            <input type="text" value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="ISBN (optional)" />
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="border rounded-lg px-3 py-2 text-sm">
              <option>General</option><option>Science</option><option>Mathematics</option><option>English</option><option>Hindi</option><option>Social Science</option><option>Computer</option><option>Reference</option>
            </select>
            <input type="number" value={formData.totalCopies} onChange={(e) => setFormData({ ...formData, totalCopies: e.target.value })} className="border rounded-lg px-3 py-2 text-sm" placeholder="Copies" min="1" />
          </div>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50">{saving ? "Adding..." : "Add Book"}</button>
        </form>
      )}

      <div className="bg-white rounded-xl border">
        <div className="p-4 border-b">
          <input type="text" placeholder="Search books..." value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded-lg px-3 py-2 text-sm w-64" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Title</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Author</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Category</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">ISBN</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Available</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading...</td></tr>
              ) : books.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400">No books found</td></tr>
              ) : books.map(b => (
                <tr key={b.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{b.title}</td>
                  <td className="px-4 py-3 text-sm">{b.author}</td>
                  <td className="px-4 py-3 text-sm">{b.category}</td>
                  <td className="px-4 py-3 text-sm font-mono">{b.isbn || "-"}</td>
                  <td className="px-4 py-3 text-sm">{b.availableCopies}/{b.totalCopies}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
