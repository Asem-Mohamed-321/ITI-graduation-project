import { useState } from "react";
import Select from 'react-select'
export default function AddJob() {

  const[jobTitle,setJobTitle] = useState("")

  const workFields = [
      "Accounting", "Administrative", "Advertising", "Architecture", "Arts & Design",
      "Automotive", "Business Development", "Construction", "Consulting", "Customer Service",
      "Data Analysis", "Design", "Education", "Engineering", "Entertainment", "Finance",
      "Healthcare", "Hospitality", "Human Resources", "Information Technology", "Legal",
      "Logistics", "Manufacturing", "Marketing", "Media & Communications", "Project Management",
      "Public Relations", "Real Estate", "Research", "Retail", "Sales", "Science",
      "Social Services", "Software Development", "Supply Chain", "Telecommunications",
      "Training", "Translation", "Transportation", "Writing & Editing"
      ];

  
      const options = workFields.map(field => ({ value: field, label: field }));
  
      const [selectedFields, setSelectedFields] = useState([]);

      function handleFieldSelect(selectedOptions) {
        setSelectedFields(selectedOptions);
        setFormData({...formData,workFields: selectedOptions.map(option => option.value)});
    }

  return (
    <div className="flex flex-col gap-3 items-start justify-center bg-white p-10">
      <div className="flex flex-col sm:flex-row justify-start items-center w-full">
        <label className=" text-sm font-bold dark:text-white text-nowrap " htmlFor="jobTitle">Job title :</label>
        <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} id="jobTitle"  type="text" placeholder="Title of the job" className="ml-0 sm:ml-12 w-40 sm:w-64 block border-1 border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white" />
      </div>
      <div className="flex flex-col sm:flex-row justify-start items-center w-full">
        <label className="text-nowrap text-xs xl:text-sm font-bold dark:text-white " htmlFor="jobTitle">Select job fields :</label>
        <div >
            <Select
                isMulti
                options={options}
                value={selectedFields}
                onChange={handleFieldSelect}
                placeholder="Select job fields"
                className=" mt-2 ml-2 w-min-64 "
                isOptionDisabled={() => selectedFields.length >= 5}
            />
        </div>
        
      </div>
      <textarea placeholder="Write or paste your job description here..." className="w-full h-100 border-2 border-gray-300 p-2 mt-2 focus:outline-none focus:border-blue-500 rounded-md"></textarea>
      <button className="m-auto w-fit cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-900 dark:hover:bg-blue-700">Start scanning</button>


    </div>
  );
}
