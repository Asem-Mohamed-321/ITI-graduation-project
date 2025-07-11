import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CVUploadWithNoDesc() {
  const [step, setStep] = useState(1); // 1: Upload, 2: Loading, 3: Results
  const [resumeFile, setResumeFile] = useState(null);
  const [cvResults, setCvResults] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "application/pdf" || file.name.endsWith(".docx"))) {
      setResumeFile(file);
      setStep(2);
      handleUpload(file);
    } else {
      alert("Please upload a .pdf or .docx file only.");
    }
  };

  const handleUpload = async (file) => {
    setStep(2);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:3000/cv/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log(response);

      console.log("Analysis results:", response.data);
      setCvResults(response.data);
      setStep(3);
    } catch (error) {
      console.error("Error during analysis:", error);
      alert("Failed to analyze the resume.");
      setStep(1);
    }
  };

  return (
    <div className="my-5 mx-10 bg-white">
      <div className="flex pr-12 pl-18 py-48 md:flex-row flex-col">
        <div className="mr-12">
          <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400 text-nowrap">
            <li className="mb-10 ms-6">
              <span
                className={`absolute flex items-center justify-center w-12 h-12 ${
                  step === 1 ? "bg-gray-100" : "bg-green-300"
                } rounded-full -start-6 ring-6 ring-white`}
              >
                {step === 1 && <img src="images/file_open.svg" className="w-1/2" />}
                {step > 1 && (
                  <img
                    src="images/check_small.svg"
                    className="w-full cursor-pointer"
                    onClick={() => setStep(1)}
                  />
                )}
              </span>
              <h3 className="font-bold leading-tight ml-5 text-black">Upload Resume</h3>
              <p className="text-sm ml-5 text-black">Choose your CV/Resume</p>
            </li>
            <li className="mb-10 ms-6">
              <span
                className={`absolute flex items-center justify-center w-12 h-12 ${
                  step <= 2 ? "bg-gray-100" : "bg-green-300"
                } rounded-full -start-6 ring-6 ring-white`}
              >
                {step <= 2 && <img src="images/bar_chart.svg" className="w-1/2" />}
                {step > 2 && (
                  <img src="images/check_small.svg" className="w-full cursor-pointer" />
                )}
              </span>
              <h3 className="font-medium leading-tight ml-5 text-black">Analyzing</h3>
              <p className="text-sm ml-5 text-black">We are analyzing your CV</p>
            </li>
            <li className="mb-10 ms-6">
              <span
                className={`absolute flex items-center justify-center w-12 h-12 ${
                  step === 3 ? "bg-gray-100" : "bg-gray-200"
                } rounded-full -start-6 ring-6 ring-white`}
              >
                <img src="images/bar_chart.svg" className="w-1/2" />
              </span>
              <h3 className="font-medium leading-tight ml-5 text-black">Results</h3>
              <p className="text-sm ml-5 text-black">Review your CV analysis</p>
            </li>
          </ol>
        </div>

        {step === 1 && (
          <div className="border-dashed border-gray-200 border-2 w-full rounded-sm">
            <div className="flex flex-col items-center justify-center h-full pt-5">
              <div className="mb-10 sm:w-auto w-2/3 text-center">
                <img src="images/cloud_upload.svg" className="w-1/3 m-auto" />
                <p className="font-bold text-black w-full">
                  Upload your resume to get started
                </p>
              </div>
              <div className="mb-5 flex flex-col items-center justify-center text-center">
                <button
                  onClick={handleButtonClick}
                  className="w-fit text-sm sm:text-base cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Upload your resume
                </button>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <p className="font-light text-xs sm:text-sm">
                  as a .pdf or .docx <span className="block sm:inline">(Max size: 5 MB)</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full flex items-center justify-center">
            <p className="font-bold">Analyzing your resume, please wait...</p>
          </div>
        )}

        {step === 3 && (
          <div className="w-full p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold mb-2">CV Analysis Results</h2>
            {cvResults && (
              <>
                <div className="mb-4">
                  <h3 className="font-semibold">Missing Parts</h3>
                  <p>{cvResults["missing parts"] || "None"}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold">Syntax Problems</h3>
                  <ul className="list-disc list-inside">
                    {cvResults["syntax problems"]?.map((problem, i) => (
                      <li key={i}>{problem}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="font-semibold">Tests</h3>
                  {cvResults.tests?.length > 0 && (
                    <button
                      onClick={() =>
                        navigate("/questions", { state: { tests: cvResults.tests } })
                      }
                      className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
                    >
                      Start Test
                    </button>
                  )}
                  {cvResults.tests?.map((testObj, i) => (
                    <div key={i} className="mb-2 p-2 border rounded">
                      {Object.entries(testObj).map(([topic, questions]) => (
                        <div key={topic}>
                          <h4 className="font-semibold">{topic}</h4>
                          {questions.map((q, j) => (
                            <div key={j} className="mb-2">
                              <p>
                                <strong>Q:</strong> {q.content}
                              </p>
                              <ul className="list-disc list-inside">
                                {q.choices.map((choice, k) => (
                                  <li key={k}>{choice}</li>
                                ))}
                              </ul>
                              <p>
                                <strong>Answer:</strong> {q["correct answer"]}
                              </p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
