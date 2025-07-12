import React, { useState, useRef } from "react";

const mockCompany = {
  name: "Company Name",
  logoUrl: "/public/images/Overall.png",
  description: "Write or paste your Company description here...",
};

const CompanyProfilePage = () => {
  const [company, setCompany] = useState(mockCompany);
  const [editNameMode, setEditNameMode] = useState(false);
  const [nameInputValue, setNameInputValue] = useState(company.name);
  const [editDescMode, setEditDescMode] = useState(false);
  const [descInputValue, setDescInputValue] = useState(company.description);
  const fileInputRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Handlers
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCompany((prev) => ({ ...prev, logoUrl: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEditName = () => setEditNameMode(true);
  const handleNameChange = (e) => setNameInputValue(e.target.value);
  const handleSaveName = (e) => {
    e.preventDefault();
    setCompany((prev) => ({ ...prev, name: nameInputValue }));
    setEditNameMode(false);
  };
  const handleCancelEditName = () => {
    setNameInputValue(company.name);
    setEditNameMode(false);
  };
  const handleEditDesc = () => setEditDescMode(true);
  const handleDescChange = (e) => setDescInputValue(e.target.value);
  const handleSaveDesc = (e) => {
    e.preventDefault();
    setCompany((prev) => ({ ...prev, description: descInputValue }));
    setEditDescMode(false);
  };
  const handleCancelEditDesc = () => {
    setDescInputValue(company.description);
    setEditDescMode(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors duration-500 py-8 px-2">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-0 md:gap-8 items-start">
        {/* Sidebar */}
        <aside className="w-full md:w-72 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col items-center py-8 px-2 md:px-4 min-h-[500px] rounded-none md:rounded-l-2xl shadow-md md:shadow-lg">
          {/* Company photo and name */}
          <div className="flex flex-col items-center mb-8 w-full">
            <div
              className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800 shadow mb-2 cursor-pointer group"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <img src={company.logoUrl} alt="Company Logo" className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105" />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                ref={fileInputRef}
                onChange={handleLogoChange}
                title="Change logo"
                tabIndex={-1}
              />
              {/* Camera icon overlay on hover */}
              <div
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553.378A2 2 0 0122 12.368V17a2 2 0 01-2 2H4a2 2 0 01-2-2v-4.632a2 2 0 012.447-1.99L9 10m6 0V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v3m6 0H9" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center w-full mt-2">
              {editNameMode ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2 w-full justify-center">
                  <input
                    className="border rounded px-2 py-1 text-base font-bold text-center dark:bg-slate-800 dark:text-white w-2/3"
                    value={nameInputValue}
                    onChange={handleNameChange}
                    autoFocus
                  />
                  <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded">Save</button>
                  <button type="button" className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded" onClick={handleCancelEditName}>Cancel</button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-900 dark:text-white">{company.name}</span>
                  <button
                    className="text-xs bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 rounded-full border border-yellow-300 ml-2 transition-all"
                    onClick={handleEditName}
                  >
                    edit name
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Only visually distinct Company profile label */}
          <div className="w-full flex items-center justify-center mt-4">
            <span className="px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold text-base border border-blue-200 dark:border-blue-800 shadow">Company profile</span>
          </div>
        </aside>
        {/* Main area */}
        <main className="flex-1 w-full bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-6 md:p-10 border border-gray-100 dark:border-slate-800 flex flex-col gap-8 min-h-[500px]">
          <div className="text-gray-700 dark:text-gray-200 font-semibold mb-2 text-lg">Company Description</div>
          {editDescMode ? (
            <form onSubmit={handleSaveDesc} className="flex flex-col gap-4">
              <textarea
                className="w-full min-h-[120px] border-2 border-blue-200 dark:border-blue-800 rounded-xl p-5 text-lg font-medium text-gray-900 dark:text-gray-100 dark:bg-slate-900 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                value={descInputValue}
                onChange={handleDescChange}
                placeholder="Write or paste your Company description here..."
                autoFocus
              />
              <div className="flex gap-2 self-end">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all" title="Save">
                  <span className="material-icons align-middle">check</span>
                </button>
                <button type="button" className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 px-6 rounded-lg shadow transition-all" onClick={handleCancelEditDesc} title="Cancel">
                  <span className="material-icons align-middle">close</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="relative w-full">
              <div className="w-full min-h-[120px] border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 text-lg font-medium text-gray-900 dark:text-gray-100 dark:bg-slate-900 shadow flex items-center transition-all duration-300">
                {company.description || <span className="text-gray-400 dark:text-gray-500">Write or paste your Company description here...</span>}
              </div>
              <button
                className="absolute top-3 right-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow transition-all"
                onClick={handleEditDesc}
                title="Edit Description"
              >
                <span className="material-icons">edit</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CompanyProfilePage; 