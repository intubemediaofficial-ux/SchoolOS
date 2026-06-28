export default function LibraryPage() {
  const books = [
    { id: "1", title: "Mathematics NCERT Class 10", isbn: "978-81-7450-123-4", author: "NCERT", copies: 45, available: 32, category: "Textbook" },
    { id: "2", title: "Physics Fundamentals", isbn: "978-81-7450-456-7", author: "HC Verma", copies: 30, available: 12, category: "Reference" },
    { id: "3", title: "Harry Potter and the Philosopher's Stone", isbn: "978-0-7475-3269-9", author: "J.K. Rowling", copies: 15, available: 3, category: "Fiction" },
    { id: "4", title: "Introduction to Algorithms", isbn: "978-0-262-03384-8", author: "Cormen", copies: 10, available: 7, category: "Reference" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Library Management</h1>
          <p className="text-sm text-gray-500">Book catalog, barcode scanning, issue/return tracking &amp; OPAC</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition">Scan Barcode</button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition">Add Book</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Books", value: "12,450", color: "text-blue-600" },
          { label: "Issued Today", value: "34", color: "text-green-600" },
          { label: "Overdue Returns", value: "23", color: "text-red-600" },
          { label: "New Arrivals", value: "45", color: "text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="text-xs text-gray-500">{s.label}</div>
            <div className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Book Catalog</h3>
          <input type="text" placeholder="Search by title, ISBN, author..." className="px-4 py-2 border border-gray-200 rounded-lg text-sm w-64" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Title</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">ISBN</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Author</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Category</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Copies</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Available</th>
                <th className="text-left text-xs font-medium text-gray-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{b.title}</td>
                  <td className="px-4 py-3 text-sm font-mono text-gray-500">{b.isbn}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{b.author}</td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{b.category}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-600">{b.copies}</td>
                  <td className="px-4 py-3 text-sm font-medium text-green-600">{b.available}</td>
                  <td className="px-4 py-3">
                    <button className="text-xs text-primary hover:underline">Issue</button>
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
