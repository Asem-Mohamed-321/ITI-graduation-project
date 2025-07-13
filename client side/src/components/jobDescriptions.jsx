import { useState, useEffect } from "react";
import DataTable from "./dataTable";
import axios from "axios";

export default function JobDescriptions() {
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formattedData = rawData.map((job) => ({
    id: job._id,
    title: job.title,
    description:
      job.description.length > 30
        ? job.description.slice(0, 30) + "..."
        : job.description,
    fullDescription: job.description, // this will be used in the edit modal
    companyName: job.company?.companyName ?? "N/A",
    companyEmail: job.company?.email ?? "N/A",
    fields: job.fields,
  }));

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:3000/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRawData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/jobs/${selectedJob.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRawData((prev) => prev.filter((j) => j._id !== selectedJob.id));
      setShowDeleteConfirm(false);
      setSelectedJob(null);
    } catch (err) {
      console.error("Failed to delete job:", err);
      alert("Failed to delete job.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const token = localStorage.getItem("token");

    const updatedJob = {
      title: form.title.value,
      description: form.description.value,
      fields: form.fields.value.split(",").map((f) => f.trim()),
    };

    try {
      await axios.put(
        `http://localhost:3000/jobs/${selectedJob.id}`,
        updatedJob,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRawData((prev) =>
        prev.map((j) =>
          j._id === selectedJob.id ? { ...j, ...updatedJob } : j
        )
      );
      setShowModal(false);
    } catch (err) {
      console.error("Failed to edit job:", err);
      alert("Failed to update job.");
    }
  };

  return (
    <>
      <DataTable
        columns={[
          { label: "Title", key: "title" },
          { label: "Description", key: "description" },
          { label: "Company", key: "companyName" },
          { label: "Company Email", key: "companyEmail" },
          { label: "Fields", key: "fields" },
        ]}
        data={formattedData}
        onDelete={(job) => {
          setSelectedJob(job);
          setShowDeleteConfirm(true);
        }}
        onEdit={(job) => {
          setSelectedJob(job);
          setShowModal(true);
        }}
      />

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-40">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded-md w-[400px] shadow"
          >
            <h2 className="text-lg font-semibold mb-4">Edit Job</h2>

            <label className="block mb-2">
              Title:
              <input
                name="title"
                defaultValue={selectedJob.title}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>

            <label className="block mb-2">
              Description:
              <textarea
                name="description"
                defaultValue={selectedJob.fullDescription}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>

            <label className="block mb-4">
              Fields (comma separated):
              <input
                name="fields"
                defaultValue={selectedJob.fields?.join(", ")}
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

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md shadow w-[300px]">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6 text-sm text-gray-600">
              This will delete <strong>{selectedJob?.title}</strong>.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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
