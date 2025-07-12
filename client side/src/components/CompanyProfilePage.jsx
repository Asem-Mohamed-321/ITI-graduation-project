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
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors duration-500 py-12 px-2">
      <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border border-blue-200 dark:border-blue-700 rounded-3xl shadow-2xl p-8 sm:p-16 flex flex-col items-center gap-10">
        {/* Company Logo */}
        <div
          className="relative w-44 h-44 rounded-full overflow-hidden ring-4 ring-blue-300 dark:ring-blue-700 shadow-xl mb-4 cursor-pointer group transition-transform duration-300 hover:scale-105"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <img src={company.logoUrl} alt="Company Logo" className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-110" />
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553.378A2 2 0 0122 12.368V17a2 2 0 01-2 2H4a2 2 0 01-2-2v-4.632a2 2 0 012.447-1.99L9 10m6 0V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v3m6 0H9" />
            </svg>
          </div>
        </div>
        {/* Company Name */}
        <div className="w-full flex flex-col items-center">
          {editNameMode ? (
            <form onSubmit={handleSaveName} className="flex items-center gap-2 w-full justify-center">
              <input
                className="border-2 border-blue-300 rounded px-4 py-2 text-3xl font-extrabold text-center dark:bg-slate-700 dark:text-white w-2/3 shadow"
                value={nameInputValue}
                onChange={handleNameChange}
                autoFocus
              />
              <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-bold shadow">Save</button>
              <button type="button" className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded font-bold shadow" onClick={handleCancelEditName}>Cancel</button>
            </form>
          ) : (
            <>
              <span className="text-3xl font-extrabold text-blue-800 dark:text-blue-200 drop-shadow mb-2 text-center">{company.name}</span>
              <div className="w-16 h-1 bg-blue-400 rounded-full mb-4 mt-2" />
              <button
                className="text-xs bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-full border border-yellow-300 ml-2 transition-all font-semibold shadow"
                onClick={handleEditName}
              >
                edit
              </button>
            </>
          )}
        </div>
        {/* Company Description */}
        <div className="w-full">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold mb-6 text-xl rounded-full px-8 py-3 text-center w-fit mx-auto shadow-lg border-2 border-blue-200 tracking-wide uppercase drop-shadow">Company Description</div>
          {editDescMode ? (
            <form onSubmit={handleSaveDesc} className="flex flex-col gap-4 items-center">
              <textarea
                className="w-full min-h-[120px] border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-6 text-lg font-medium text-gray-900 dark:text-gray-800 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
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
              <div className="w-full min-h-[120px] bg-blue-50 dark:bg-slate-900 text-blue-900 dark:text-blue-100 rounded-2xl p-10 text-lg font-medium shadow-inner flex items-center transition-all duration-300 relative">
                <span className="absolute left-6 top-4 text-blue-300 text-4xl select-none">“</span>
                {company.description || <span className="text-gray-400">Write or paste your Company description here...</span>}
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
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage; 