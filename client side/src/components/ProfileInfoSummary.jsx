import React from "react";

const ProfileInfoSummary = ({ info, onEdit }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-lg p-8 flex flex-col gap-6 w-full md:w-[420px] border border-gray-100 dark:border-slate-700 transition-all duration-500">
      <div>
        <div className="text-gray-500 dark:text-gray-300 text-base mb-3 font-semibold">Information Summary</div>
        <div className="text-sm mb-2 text-gray-900 dark:text-gray-100"><b>Email</b>: {info.email}</div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 mt-2 self-center shadow-md transition-all duration-200"
        onClick={onEdit}
      >
        <span>Edit Your Informations</span>
        <span className="material-icons text-base">edit</span>
      </button>
    </div>
  );
};

export default ProfileInfoSummary; 