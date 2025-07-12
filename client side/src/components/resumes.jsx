import { useState, useEffect } from "react";
import DataTable from "./dataTable";
import axios from "axios";

export default function Resumes() {
  const [formattedResumes, setFormattedResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/score-cv/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const resumes = res.data;

        const formatted = resumes.map((resume) => ({
          id: resume._id,
          username: resume.username,
          overallScore: resume.scoreResult?.overall_score ?? "N/A",
          jobTitle: resume.jobSection ?? "N/A",
          jobField:
            resume.fields && resume.fields.length
              ? resume.fields.join(", ")
              : "N/A",
          jobDescription:
            resume.jobDescription?.length > 30
              ? resume.jobDescription.slice(0, 30) + "..."
              : resume.jobDescription ?? "N/A",
          createdAt: new Date(resume.createdAt).toLocaleDateString(),
          updatedAt: new Date(resume.updatedAt).toLocaleDateString(),
          cvFile: resume.cvFileUrl
            ? `http://localhost:3000/${resume.cvFileUrl.replace(/\\/g, "/")}`
            : null,
        }));

        setFormattedResumes(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch resumes", err);
        setLoading(false);
      });
  }, []);

  const resumeColumns = [
    { label: "Username", key: "username" },
    { label: "Job Title", key: "jobTitle" },
    { label: "Field", key: "jobField" },
    { label: "Description", key: "jobDescription" },
    { label: "Score", key: "overallScore" },
    { label: "Submitted On", key: "createdAt" },
    { label: "Last Update", key: "updatedAt" },
    { label: "CV", key: "cvFile" },
  ];

  if (loading) return <div className="p-6">Loading resumes...</div>;

  return (
    <DataTable
      columns={resumeColumns}
      data={formattedResumes}
      onDelete={(resume) => console.log("Delete resume", resume)}
      onEdit={(resume) => console.log("Edit resume", resume)}
    />
  );
}
