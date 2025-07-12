import { useState, useEffect } from "react";
import DataTable from "./dataTable";
import axios from "axios";

export default function JobDescriptions() {
  // const rawData = [ /* your backend array of jobs */ ];
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);

  const formattedData = rawData.map((job, index) => ({
    id: job._id, // use this as the row key
    title: job.title,
    description:
      job.description.length > 30
        ? job.description.slice(0, 30) + "..."
        : job.description,
    companyName: job.company?.companyName ?? "N/A",
    companyEmail: job.company?.email ?? "N/A",
    fields: job.fields,
  }));

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRawData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <DataTable
        columns={[
          { label: "Title", key: "title" },
          { label: "Description", key: "description" },
          { label: "Company", key: "companyName" },
          { label: "Company Email", key: "companyEmail" },
          { label: "Fields", key: "fields" }, // this will be joined in the table logic
        ]}
        data={formattedData}
        onDelete={(job) => console.log("Delete", job)}
        onEdit={(job) => console.log("Edit", job)}
      />
    </>
  );
}
