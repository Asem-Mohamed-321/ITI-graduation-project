import React from "react";

const CompanyProfileInfo = ({ description, editMode, onEdit, onChange, onSave, onCancel, value }) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-6 border border-gray-100 dark:border-slate-700 transition-all duration-500">
      <div className="text-gray-700 dark:text-gray-200 font-semibold mb-2">Paste your Company description:</div>
      {editMode ? (
        <form onSubmit={onSave} className="flex flex-col gap-4">
          <textarea
            className="w-full min-h-[180px] border rounded p-3 text-gray-900 dark:text-gray-100 dark:bg-slate-900"
            value={value}
            onChange={onChange}
            placeholder="Write or paste your Company description here..."
            autoFocus
          />
          <div className="flex gap-2 self-end">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all">Save</button>
            <button type="button" className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-2 px-6 rounded-lg shadow transition-all" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="w-full min-h-[180px] border rounded p-3 text-gray-900 dark:text-gray-100 dark:bg-slate-900 flex items-center">
            {description || <span className="text-gray-400 dark:text-gray-500">Write or paste your Company description here...</span>}
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow self-end transition-all" onClick={onEdit}>Edit Description</button>
        </>
      )}
    </div>
  );
};

export default CompanyProfileInfo; 