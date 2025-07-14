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
            {paginatedData.map((item, index) => (
              <tr
                key={item.id || index}
                onClick={() => setSelectedItem(item)}
                className={`cursor-pointer transition-all duration-200 relative ${
                  selectedItem?.id === item.id
                    ? "bg-blue-50 border-l-4 border-blue-500 shadow-sm"
                    : "hover:bg-gray-50 border-l-4 border-transparent"
                }`}
              >
                {columns.map((col, colIndex) => (
                  <td key={col.key} className="px-6 py-4 relative">
                    {colIndex === 0 && selectedItem?.id === item.id && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"></div>
                    )}
                    {Array.isArray(item[col.key])
                      ? item[col.key].join(", ")
                      : col.key === "cvFile" && item[col.key] ? (
                          <a 
                            href={item[col.key]} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-200"
                          >
                            View CV
                          </a>
                        ) : col.key === "geminiScore" ? (
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              item[col.key] >= 80 ? 'bg-green-100 text-green-800' :
                              item[col.key] >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item[col.key]}%
                            </span>
                            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${
                                  item[col.key] >= 80 ? 'bg-green-500' :
                                  item[col.key] >= 60 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${item[col.key]}%` }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          <span className={selectedItem?.id === item.id ? "font-semibold text-gray-900" : ""}>
                            {item[col.key]}
                          </span>
                        )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-4">
          {selectedItem && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">
                Selected: <span className="font-semibold text-gray-900">
                  {selectedItem?.username || selectedItem?.companyName || selectedItem?.fullName}
                </span>
              </span>
              <button
                className="text-red-600 hover:text-red-800 hover:underline text-sm font-medium transition-colors duration-200"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete
              </button>
              {onEdit && (
                <button
                  className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors duration-200"
                  onClick={() => onEdit(selectedItem)}
                >
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, data.length)} of {data.length}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200"
            >
              &lt;
            </button>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors duration-200"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[400px] border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Confirm Deletion</h2>
            </div>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to delete <strong className="text-gray-900">
                {selectedItem?.companyName || selectedItem?.fullName || selectedItem?.username}
              </strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (onDelete) {
                    try {
                      await onDelete(selectedItem);
                      setShowDeleteConfirm(false);
                      setSelectedItem(null);
                    } catch (error) {
                      console.error('Delete failed:', error);
                    }
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 cursor-pointer"
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
