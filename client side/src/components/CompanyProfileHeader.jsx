import React, { useRef, useState } from "react";

const CompanyProfileHeader = ({
  name,
  logoUrl,
  onLogoChange,
  editNameMode,
  onEditName,
  onNameChange,
  onSaveName,
  onCancelEditName,
  nameInputValue
}) => {
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef();

  return (
    <div className="flex flex-col items-center bg-white dark:bg-slate-900 rounded-2xl shadow p-6 md:p-8 mb-6 transition-colors duration-300">
      <div
        className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800 shadow cursor-pointer group mb-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <img src={logoUrl} alt="Company Logo" className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105" />
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer"
          ref={fileInputRef}
          onChange={onLogoChange}
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
      <div className="flex flex-col items-center">
        {editNameMode ? (
          <form onSubmit={onSaveName} className="flex items-center gap-2">
            <input
              className="border rounded px-2 py-1 text-lg font-bold text-center dark:bg-slate-800 dark:text-white"
              value={nameInputValue}
              onChange={onNameChange}
              autoFocus
            />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Save</button>
            <button type="button" className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded" onClick={onCancelEditName}>Cancel</button>
          </form>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{name}</h1>
            <button
              className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full border border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all"
              onClick={onEditName}
            >
              edit name
            </button>
          </div>
        )}
        <span className="mt-2 px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-semibold text-sm border border-blue-200 dark:border-blue-800">Company</span>
      </div>
    </div>
  );
};

export default CompanyProfileHeader; 