
import React, { useState ,useEffect} from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import axios from "axios";


export default function CompanyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const fetchJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // hard coded until you fix the login by company
        const response = await axios.get("http://localhost:3000/jobs/company",{
          headers: {
          Authorization: `Bearer ${token}`,
        },
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {

    fetchJobs();
  }, []);


  const truncateText = (text) =>
    text.length > 19 ? text.slice(0, 19) + "..." : text;

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Render jobs dashboard when on main company page
  const renderJobsDashboard = () => {
    if (location.pathname !== '/company') return null;

    return (
      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Job Postings
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage and track all your published job opportunities
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.815-8.964-2.222m8.964 2.222A23.931 23.931 0 0012 15c3.183 0 6.22-.815 8.964-2.222m8.964 2.222L12 15m0 0l-8.964-2.222M12 15l8.964-2.222M12 15l-8.964 2.222" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No jobs posted yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Start by creating your first job posting to find the perfect candidates
            </p>
            <Link
              to="add-job"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Your First Job
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {job.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status || 'active')}`}>
                      {job.status || 'Active'}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {job.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {job.fields && job.fields.slice(0, 3).map((field, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                        >
                          {field}
                        </span>
                      ))}
                      {job.fields && job.fields.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-full">
                          +{job.fields.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>Posted: {formatDate(job.createdAt)}</span>
                    <span>{job.candidates ? job.candidates.length : 0} candidates</span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`job/${job._id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                    >
                      View Candidates
                    </Link>
                    <button
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this job?')) {
                          try {
                            const token = localStorage.getItem("token");
                            await axios.delete(`http://localhost:3000/jobs/${job._id}`, {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            });
                            // Refresh jobs list
                            fetchJobs();
                          } catch (err) {
                            console.error("Failed to delete job:", err);
                            alert("Failed to delete job. Please try again.");
                          }
                        }
                      }}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                      title="Delete Job"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {jobs.length > 0 && (
          <div className="mt-8 text-center">
            <Link
              to="add-job"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Job
            </Link>
          </div>
        )}
      </div>
    );
  };

  
  return (
    <div className="relative ">
      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-10"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`absolute  left-0 z-20 h-full bg-white shadow-md transition-all duration-300  ${
          isSidebarOpen ? "w-60 cursor-auto" : "w-16 cursor-pointer"
        }`}
        onClick={() => {if (!isSidebarOpen) setIsSidebarOpen(true)}}
      >

        {/* Company Logo */}
        <div className="bg-zinc-300 rounded-full w-12 h-12 md:w-14 md:h-14 mx-auto mt-2 overflow-hidden flex items-center justify-center">
          <img
            src="/images/companyLogo.png"
            alt="Company Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Company Name */}
        {isSidebarOpen && (
          <div className="my-4 text-center">
            <p className="font-extrabold text-sm md:text-lg">Company Name</p>
          </div>
        )}

        <hr className="bg-gray-300 h-px border-0 w-full my-2" />

        {/* Menu Items */}
        <nav className="flex flex-col mt-2 space-y-1">
          <SidebarItem
            icon="/images/black_home.svg"
            label="Company profile"
            isSidebarOpen={isSidebarOpen}
            to="profile"
            active={location.pathname.endsWith("profile")}
            // onClick={() => setIsSidebarOpen(false)}
          />
          
          <SidebarItem
            icon="/images/add.svg"
            label="Add job"
            isSidebarOpen={isSidebarOpen}
            to="add-job"
            active={location.pathname.endsWith("add-job")}
            // onClick={() => setIsSidebarOpen(false)}
          />

          {/* Previous Jobs Dropdown */}
          <div className="w-full">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              <img src="/images/lists.svg" className="mr-2 w-5 h-5" />
              {isSidebarOpen && (
                <p className="font-bold text-sm flex-grow">Previous jobs</p>
              )}
              {isSidebarOpen && (
                <img
                  src="/images/drop_down_arrow.svg"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {isOpen && isSidebarOpen && (
            <div className="pl-10">
              {jobs.map((job, index) => (
                <Link
                  to={`job/${job._id}`}
                  key={index}
                  className="mt-1 text-sm text-gray-700 block hover:bg-gray-200 px-2 py-1 rounded"
                >
                  {truncateText(job.title)}
                </Link>
              ))}
            </div>
          )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow h-screen p-6 z-0 w-10/12 sm:w-11/12 sm:ml-16 mx-15">
        <div className="">
          {renderJobsDashboard()}
          <Outlet context={{ refreshJobs: fetchJobs }}/>
        </div>
      </main>
    </div>
  );
}

// Sidebar Item Component
function SidebarItem({ icon, label, to, isSidebarOpen, active ,onClick  }) {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 hover:bg-gray-200 ${
        active ? "bg-gray-100" : ""
      }`}
      onClick={onClick}
    >
      <img src={icon} className="mr-2 w-5 h-5" />
      {isSidebarOpen && <p className="font-bold text-sm">{label}</p>}
    </Link>
  );
}
