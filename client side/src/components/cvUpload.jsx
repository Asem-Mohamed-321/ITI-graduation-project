import axios from "axios";
import { useState,useRef } from "react";
export default function CVUpload({passCvResults}) {
    const [step, setStep] = useState(1); // 1: Upload Resume, 2: Job Description, 3: Results
    const [role, setRole] = useState([
                                    'Big Data Engineer',
                                    'DevOps Engineer',
                                    'Full-Stack Engineer',
                                    'Big Data Engineer',
                                    'DevOps Engineer',
                                    'Full-Stack Engineer',
                                    'Big Data Engineer',
                                    'DevOps Engineer',
                                    'Full-Stack Engineer',
                                    'Big Data Engineer',
                                    'DevOps Engineer',
                                    'Full-Stack Engineer'
                                ]); // Selected role from the list

    const [resumeFile, setResumeFile] = useState(null);
                            
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
    fileInputRef.current.click(); // trigger hidden input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx'))) {
      setResumeFile(file);
      setStep(2); // Move to next step after file selection
    } else {
      alert('Please upload a .pdf or .docx file only.');
    }
  };

  const [jobDescription, setJobDescription] = useState("");

  const  handleSecondStep = async () => {
    setStep(3); // Move to results step
    await axios.post('http://localhost:3000/score-cv/analyze', {
      cvFile: resumeFile,
      jobDescription: jobDescription
    },{headers: {
    'Content-Type': 'multipart/form-data',
  }})
      .then(response => {
        passCvResults(response.data); // Pass the results to parent component
        console.log("Scan results:", response.data);
        // Handle the response data as needed
      })
      .catch(error => {
        console.error("Error during scan:", error);
        // Handle the error as needed
      });   
  }

  console.log(resumeFile)
  console.log(step)
  return (
    <>
        <div className="my-5 mx-10 bg-white ">
            <div className="flex pr-12 pl-18 py-48 md:flex-row flex-col">
                <div className="mr-12"> {/* Left side - form */ }
                    

                    <ol class="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 text-nowrap">                  
                        
                        <li class="mb-10 ms-6" >
                            <div onClick={()=> {if (step > 1) setStep(1)}} >
                                <span class={`absolute flex items-center justify-center w-12 h-12 ${step===1?'bg-gray-100':'bg-green-300'} rounded-full -start-6 ring-6 ring-white dark:ring-gray-900 dark:bg-gray-700`} onClick={()=> {if (step > 1) setStep(1)}}>
                                    {/* <svg class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                                    </svg> */}
                                    {step === 1 && <img src="images/file_open.svg" className="w-1/2" ></img>}
                                    {step > 1 && <img src="images/check_small.svg" className="w-full cursor-pointer" onClick={()=> {if (step > 1) setStep(1)}}></img>}
                                </span>
                                <h3 class="font-bold leading-tight ml-5 text-black cursor-pointer" >Upload Resume</h3>
                                <p class="font text-sm ml-5 text-black" >choose your CV / Resume</p>
                            </div>
                        </li>
                        <li class="mb-10 ms-6">
                            <span class={`absolute flex items-center justify-center w-12 h-12 ${step<=2?'bg-gray-100':'bg-green-300'} rounded-full -start-6 ring-6 ring-white dark:ring-gray-900 dark:bg-gray-700`}>
                                {/* <svg class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                                </svg> */}
                                {step <= 2 && <img src="images/add_notes.svg" className="w-1/2"></img>}
                                {step > 2 && <img src="images/check_small.svg " className="w-full cursor-pointer"></img>}

                            </span>
                            <h3 class="font-medium leading-tight ml-5 text-black cursor-pointer">Job Description</h3>
                            <p class="text-sm ml-5 text-black">add job description</p>
                        </li>
                        <li class="mb-10 ms-6">
                            <span class={`absolute flex items-center justify-center w-12 h-12 ${step<=3?'bg-gray-100':'bg-green-300'} rounded-full -start-6 ring-6 ring-white dark:ring-gray-900 dark:bg-gray-700`}>
                                {/* <svg class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
                                </svg> */}
                                <img src="images/bar_chart.svg" className="w-1/2"></img>
                            </span>
                            <h3 class="font-medium leading-tight ml-5 text-black">View Results</h3>
                            <p class="text-sm ml-5 text-black">see your cv score and advises</p>
                        </li>
                    </ol>

                </div>
                {step === 1 && <div className="border-dashed  border-gray-200 border-2 w-full rounded-sm"> {/* Right side - preview */ }
                    <div className="flex flex-col items-center justify-center h-full pt-5">
                        <div className="mb-10 sm:w-auto w-2/3 text-center">
                            <img src="images/cloud_upload.svg" className="w-1/3 m-auto"></img>
                            <p className="font-bold text-black w-full">Upload your resume to get started</p>
                        </div>
                        <div className="mb-5 flex flex-col items-center justify-center text-center">
                            <button onClick={handleButtonClick} className="w-fit text-sm sm:text-base cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-900 dark:hover:bg-blue-700">Upload your resume</button>
                            <input type="file" accept=".pdf,.docx" className="hidden" ref={fileInputRef} onChange={handleFileChange}/>
                            <p className="font-light text-xs sm:text-sm">as a .pdf or .docx <span className="block sm:inline"> (Max size: 5 MB)</span></p>
                        </div>
                        {resumeFile && <a onClick={()=>setStep(2)} className="font-light  text-blue-500 hover:underline cursor-pointer">Use {resumeFile.name}</a> /* appear when user selects a file */ } 

                    </div>
                </div>}
                {step === 2 && <div className="w-full"> {/* Right side - step 2 */}
                    <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="w-2/3 px-1 py-3 border-r border-gray-200 dark:border-gray-700 font-light">
                            Paste a Job Description below
                            </th>
                            <th className="px-1 py-3 font-light">
                            Or use a Sample Job Description
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {/* Job description input cell */}
                            <td className="align-top border-r border-gray-200 dark:border-gray-700 ">
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="w-full h-full resize-none focus:ring-1 focus:outline-0 p-1"
                                placeholder="Job description..."
                            ></textarea>
                            </td>

                            {/* Sample roles list */}
                            <td className="align-top">
                            <div className="h-full overflow-y-auto py-1">
                                <ul className="space-y-1 font-normal text-black">
                                {role.map((role, index) => (
                                    <li
                                    key={index}
                                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 p-1 "
                                    onClick={() => setJobDescription(role)}
                                    >
                                    {role}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="flex justify-center">
                    <button onClick={handleSecondStep} className="mt-2 w-fit text-sm  cursor-pointer bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-900 dark:hover:bg-blue-700">SCAN</button>
                    </div>
                </div>}
                {step === 3 &&<div className="w-full"> {/* Right side - step 3 */}
                    <table className="w-full h-full border border-gray-300 table-fixed text-center">
                        <tbody>
                        <tr>
                            <td className="align-middle text-center">
                            <p className="font-bold">PLEASE WAIT...</p>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    </>
  );
}