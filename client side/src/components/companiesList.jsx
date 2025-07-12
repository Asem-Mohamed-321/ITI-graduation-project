import { useEffect, useState } from "react";
import DataTable from "./dataTable";
import axios from "axios";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/company/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCompanies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
        setLoading(false);
      });
  }, []);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(companies.length / itemsPerPage);

  const paginatedData = companies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleDelete = () => {
    setCompanies((prev) => prev.filter((u) => u.id !== selectedUser.id));
    setSelectedCompany(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      ...selectedCompany, /// you have to edit this part
      fullName: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
    };
    setCompanies((prev) =>
      prev.map((u) => (u.id === selectedCompany.id ? updated : u))
    );
    setShowModal(false);
  };

  console.log(selectedCompany);
  return (
    <>
      <div className="flex flex-col justify-between h-full bg-white rounded-md shadow overflow-hidden">
        <DataTable
          columns={[
            { label: "ID", key: "id" },
            { label: "company name", key: "companyName" },
            { label: "Email", key: "email" },
            { label: "Fields", key: "Fields" },
          ]}
          data={companies}
          onDelete={() => console.log("del")}
          onEdit={() => console.log("edit")}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-md w-[400px] shadow"
          >
            <h2 className="text-lg font-semibold mb-4">Edit User</h2>
            <label className="block mb-2">
              Full Name:
              <input
                name="fullName"
                defaultValue={selectedUser.fullName}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                name="email"
                defaultValue={selectedUser.email}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>
            <label className="block mb-4">
              Phone:
              <input
                name="phone"
                defaultValue={selectedUser.phone}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md shadow w-[300px]">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6 text-sm text-gray-600">
              This action will permanently delete the user{" "}
              <strong>{selectedUser?.fullName}</strong>.
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
                  handleDelete();
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
    </>
  );
}
