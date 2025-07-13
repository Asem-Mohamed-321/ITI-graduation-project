import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./dataTable";

export default function CompanyJobDesc() {
  const { jobId } = useParams(); // from route /company/job/:jobId
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:3000/Jobs/company", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const jobList = res.data;
        const selected = jobList.find((j) => j._id === jobId);
        setJob(selected);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, [jobId]);

  const columns = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "geminiScore", label: "Score" },
    { key: "cvFile", label: "Resume" },
  ];
  // Compute the data inside render logic
  const data =
    job?.candidates?.map((candidate) => ({
      username: candidate.username,
      email: candidate.email,
      geminiScore: candidate.geminiScore,
      cvFile: candidate.cvFileUrl,
    })) || [];

  return (
    <div>
      {job ? (
        <>
          <p className="font-bold mb-2">
            Top candidates for{" "}
            <span className="text-blue-700">{job.title}</span>
          </p>
          <DataTable columns={columns} data={data} />
        </>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
}
