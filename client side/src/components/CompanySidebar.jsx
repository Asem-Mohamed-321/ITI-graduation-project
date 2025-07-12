import React from "react";

const CompanySidebar = ({ name, logoUrl, jobs, selected, onSelect }) => {
  return (
    <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col items-center py-6 px-2 md:px-4 min-h-screen transition-colors duration-300">
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800 shadow mb-2">
          <img src={logoUrl} alt="Company Logo" className="object-cover w-full h-full" />
        </div>
        <div className="text-lg font-bold text-gray-900 dark:text-white text-center">{name}</div>
      </div>
      <nav className="w-full flex flex-col gap-2">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left font-medium transition-all ${selected === 'profile' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
          onClick={() => onSelect('profile')}
        >
          <span className="material-icons">home</span> Company profile
        </button>
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left font-medium transition-all ${selected === 'add' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
          onClick={() => onSelect('add')}
        >
          <span className="material-icons">add_circle</span> Add job
        </button>
        <div className="mt-4">
          <div className="flex items-center gap-2 px-4 py-2 text-gray-500 dark:text-gray-400 font-semibold text-sm">
            <span className="material-icons">work</span> previous jobs
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {jobs.map((job, idx) => (
              <div key={job.id} className="flex items-center gap-2 px-6 py-1 text-xs text-gray-700 dark:text-gray-300 truncate cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-all">
                {job.title}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default CompanySidebar; 