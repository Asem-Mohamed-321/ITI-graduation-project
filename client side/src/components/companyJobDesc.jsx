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

  const handleDeleteCandidate = async (candidate) => {
    try {
      const token = localStorage.getItem("token");
      console.log('Deleting candidate:', candidate);
      console.log('Job ID:', jobId);
      
      const response = await axios.delete(`http://localhost:3000/jobs/${jobId}/candidates/${candidate.username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log('Delete response:', response.data);
      
      // Update the job state to remove the candidate
      setJob(prevJob => ({
        ...prevJob,
        candidates: prevJob.candidates.filter(c => c.username !== candidate.username)
      }));
      
      console.log('Candidate removed from UI and backend');
    } catch (err) {
      console.error("Failed to delete candidate:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      // If DELETE fails, try using PUT to update the job
      try {
        console.log('Trying PUT method as fallback...');
        const updatedCandidates = job.candidates.filter(c => c.username !== candidate.username);
        
        const putResponse = await axios.put(`http://localhost:3000/jobs/${jobId}`, {
          candidates: updatedCandidates
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log('PUT response:', putResponse.data);
        
        setJob(prevJob => ({
          ...prevJob,
          candidates: updatedCandidates
        }));
        
        console.log('Candidate removed using PUT method');
      } catch (putErr) {
        console.error("PUT method also failed:", putErr);
        alert("Failed to delete candidate. Please try again.");
      }
    }
  };



  const columns = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "geminiScore", label: "Score" },
    { key: "cvFile", label: "Resume" },
  ];
  
  // Compute the data inside render logic
  const data =
    job?.candidates?.map((candidate) => ({
      id: candidate.username, // Use username as id for DataTable
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
          <DataTable 
            columns={columns} 
            data={data}
            onDelete={handleDeleteCandidate}
          />
        </>
      ) : (
        <p>Loading job details...</p>
      )}
    </div>
  );
}
