import { useState } from "react";

export default function DataTable({ columns, data, onDelete, onEdit }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log(columns,data)
  return (
    <div className="flex flex-col justify-between h-full bg-white rounded-md shadow overflow-hidden">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 font-light bg-gray-200">
            <tr>
              {columns.map(col => (
                <th key={col.key} className="px-6 py-3 font-medium">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(item => (
              <tr
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className={`cursor-pointer ${
                  selectedItem?.id === item.id ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
              >
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-4">
                    {Array.isArray(item[col.key])
  ? item[col.key].join(", ")
  : col.key === "cvFile" && item[col.key] ? (
      <a href={item[col.key]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
        View CV
      </a>
    ) : (
      item[col.key]
    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-6 py-2 bg-gray-200 text-sm text-gray-700">
        <div>
          {selectedItem && (
            <>
              <button
                className="text-red-600 hover:underline mr-4 cursor-pointer"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete
              </button>
              <button
                className="text-blue-600 hover:underline cursor-pointer"
                onClick={() => onEdit(selectedItem)}
              >
                Edit
              </button>
            </>
          )}
        </div>
        <span>
          {(currentPage - 1) * itemsPerPage + 1}–
          {Math.min(currentPage * itemsPerPage, data.length)} of {data.length}
          <button
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            &lt;
          </button>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            &gt;
          </button>
        </span>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md shadow w-[300px]">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6 text-sm text-gray-600">
              This will delete <strong>    {selectedItem?.companyName || selectedItem?.fullName || selectedItem?.username}
</strong>.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(selectedItem);
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
