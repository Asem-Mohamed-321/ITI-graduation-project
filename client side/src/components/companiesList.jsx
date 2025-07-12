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
        const formatted = res.data.map((company) => ({
          ...company,
          id: company._id,
        }));
        setCompanies(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch companies", err);
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

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(
        `http://localhost:3000/company/admin/${selectedCompany.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCompanies((prev) => prev.filter((c) => c.id !== selectedCompany.id));
      setSelectedCompany(null);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Failed to delete company", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedCompany = {
      companyName: form.companyName.value,
      email: form.email.value,
      Fields: form.Fields.value.split(",").map((f) => f.trim()),
    };

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:3000/company/admin/${selectedCompany.id}`,
        updatedCompany,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCompanies((prev) =>
        prev.map((c) => (c.id === selectedCompany.id ? res.data : c))
      );

      setShowModal(false);
      setSelectedCompany(null);
    } catch (err) {
      console.error("Failed to update company", err);
    }
  };

  console.log(selectedCompany);
  return (
    <>
      <div className="flex flex-col justify-between h-full bg-white rounded-md shadow overflow-hidden">
        <DataTable
          columns={[
            { label: "ID", key: "_id" },
            { label: "company name", key: "companyName" },
            { label: "Email", key: "email" },
            { label: "Fields", key: "Fields" },
          ]}
          data={companies}
          onDelete={(company) => {
            setSelectedCompany(company);
            setShowDeleteConfirm(true);
          }}
          onEdit={(company) => {
            setSelectedCompany(company);
            setShowModal(true);
          }}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-md w-[400px] shadow"
          >
            <h2 className="text-lg font-semibold mb-4">Edit Company</h2>
            <label className="block mb-2">
              Company Name:
              <input
                name="companyName"
                defaultValue={selectedCompany?.companyName}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                name="email"
                defaultValue={selectedCompany?.email}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>
            <label className="block mb-2">
              Password:
              <input
                name="password"
                type="password"
                className="w-full border p-2 mt-1 rounded"
              />
            </label>
            <label className="block mb-4">
              Fields (comma-separated):
              <input
                name="Fields"
                defaultValue={selectedCompany?.Fields?.join(", ")}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
        This action will permanently delete the company{" "}
        <strong>{selectedCompany?.companyName}</strong>.
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
