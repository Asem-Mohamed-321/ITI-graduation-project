import { useState, useEffect } from "react";
import DataTable from "./dataTable";
import axios from "axios";

export default function Resumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/score-cv/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const formatted = res.data.map((resume) => ({
  id: resume._id,
  username: resume.username,
  overallScore: resume.scoreResult?.overall_score ?? "N/A",
  jobTitle: resume.jobSection ?? "N/A",
  jobDescription: resume.jobDescription ?? "N/A", // ✅ full description for modal/edit
  jobDescriptionShort:
    resume.jobDescription?.length > 30
      ? resume.jobDescription.slice(0, 30) + "..."
      : resume.jobDescription ?? "N/A", // ✅ short version for display
  createdAt: new Date(resume.createdAt).toLocaleDateString(),
  updatedAt: new Date(resume.updatedAt).toLocaleDateString(),
  cvFile: resume.cvFileUrl
    ? `http://localhost:3000/${resume.cvFileUrl.replace(/\\/g, "/")}`
    : null,
}));
        setResumes(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch resumes", err);
        setLoading(false);
      });
  };

  const handleDelete = (resume) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/score-cv/admin/${resume.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setResumes((prev) => prev.filter((r) => r.id !== resume.id));
      })
      .catch((err) => {
        console.error("Failed to delete resume", err);
      });
  };

  const handleEditSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const token = localStorage.getItem("token");

  const updatedFields = {
    username: form.username.value,
    jobSection: form.jobTitle.value,
    jobDescription: form.jobDescription.value,
  };

  axios
    .patch(`http://localhost:3000/score-cv/admin/${selectedResume.id}`, updatedFields, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      fetchResumes(); // Refresh your list after update
      setShowModal(false);
    })
    .catch((err) => {
      console.error("Failed to update resume", err);
    });
};


  const resumeColumns = [
    { label: "Username", key: "username" },
    { label: "Field", key: "jobTitle" }, 
 { label: "Description", key: "jobDescriptionShort" },
     { label: "Score", key: "overallScore" },
    { label: "Submitted On", key: "createdAt" },
    { label: "Last Update", key: "updatedAt" },
    { label: "CV", key: "cvFile" },
  ];

  if (loading) return <div className="p-6">Loading resumes...</div>;

  return (
    <>
      <DataTable
        columns={resumeColumns}
        data={resumes}
        onDelete={(resume) => {
          setSelectedResume(resume);
          setShowDeleteConfirm(true);
        }}
        onEdit={(resume) => {
          setSelectedResume(resume);
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
            <h2 className="text-lg font-semibold mb-4">Edit Resume</h2>
            <label className="block mb-2">
              Username:
              <input
                name="username"
                defaultValue={selectedResume.username}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>
            <label className="block mb-2">
              Field:
              <input
                name="jobTitle"
                defaultValue={selectedResume.jobTitle}
                className="w-full border p-2 mt-1 rounded"
              />
            </label>
            <label className="block mb-2">
              Job Description:
              <textarea
  name="jobDescription"
  defaultValue={selectedResume.jobDescription}
  className="w-full border p-2 mt-1 rounded h-32 resize-y"
/>
            </label>
            <div className="flex justify-end space-x-2 mt-4">
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

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md shadow w-[300px]">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6 text-sm text-gray-600">
              This action will permanently delete the resume of{" "}
              <strong>{selectedResume.username}</strong>.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedResume);
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
