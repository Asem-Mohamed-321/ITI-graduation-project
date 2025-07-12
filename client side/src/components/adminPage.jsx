
import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";


export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2,setIsOpen2] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const jobs = [
    "Full-Stack intern for a government portal",
    "Senior DevOps (Docker + AWS)",
    "Junior Backend Developer at XYZ Inc",
  ];

  return (
    <div className="relative h-screen">
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

        {/* Admin profile */}
        <div className="bg-zinc-300 rounded-full w-12 h-12 md:w-14 md:h-14 mx-auto mt-2 overflow-hidden flex items-center justify-center">
          <img
            src="/images/admin_profile.png"
            alt="Company Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Admin Name */}
        {isSidebarOpen && (
          <div className="my-4 text-center">
            <p className="font-extrabold text-sm md:text-lg">Admin user</p>
          </div>
        )}

        <hr className="bg-gray-300 h-px border-0 w-full my-2" />

        {/* Menu Items */}
        <nav className="flex flex-col mt-2 space-y-1">
          <SidebarItem
            icon="/images/black_home.svg"
            label="Dashboard"
            isSidebarOpen={isSidebarOpen}
            to="dashboard"
            active={location.pathname.endsWith("dashboard")}
            // onClick={() => setIsSidebarOpen(false)}
          />

          {/* Users Dropdown */}
          <div className="w-full">
            <div
              onClick={() => setIsOpen2(!isOpen2)}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 ${location.pathname.endsWith('users-list') ||location.pathname.endsWith('resumes') ?'bg-gray-100':'' }`}
            >
              <img src="/images/face_6_black.svg" className="mr-2 w-5 h-5" />
              {isSidebarOpen && (
                <p className="font-bold text-sm flex-grow">Users</p>
              )}
              {isSidebarOpen && (
                <img
                  src="/images/drop_down_arrow.svg"
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isOpen2 ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {isOpen2 && isSidebarOpen && (
              <div className="pl-10">
                  <Link to={'users-list'}>
                    <p className={`mt-1 text-sm cursor-pointer px-2 py-1 rounded hover:bg-gray-200 ${
                      location.pathname.endsWith("users-list") ? "bg-gray-300  font-bold" : ""
                    }`}>
                    Users list
                  </p>
                  </Link>
                  <Link to={'resumes'}>
                  <p
                    className={`mt-1 text-sm cursor-pointer px-2 py-1 rounded hover:bg-gray-200 ${
                              location.pathname.endsWith("resumes") ? "bg-gray-300  font-bold" : ""
                            }`}>
                    Resumes
                  </p>
                  </Link>
              </div>
            )}
          </div>

          {/* Companies Dropdown */}
          <div className="w-full">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 ${location.pathname.endsWith('companies-list') ||location.pathname.endsWith('job-desc-list') ?'bg-gray-100':'' }`}
            >
              <img src="/images/suitcase_black.svg" className="mr-2 w-5 h-5" />
              {isSidebarOpen && (
                <p className="font-bold text-sm flex-grow">Companies</p>
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
                <Link to={'companies-list'}>
                  <p
                    className={`mt-1 text-sm cursor-pointer px-2 py-1 rounded hover:bg-gray-200 ${
                              location.pathname.endsWith("companies-list") ? "bg-gray-300  font-bold" : ""
                            }`}>
                    Companies list
                  </p>
                  </Link>
                  <Link to={'job-desc-list'}>
                  <p
                    className={`mt-1 text-sm cursor-pointer px-2 py-1 rounded hover:bg-gray-200 ${
                              location.pathname.endsWith("job-desc-list") ? "bg-gray-300  font-bold" : ""
                            }`}>
                    job descriptions
                  </p>
                  </Link>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow h-screen p-6 z-0 w-10/12 sm:w-11/12 sm:ml-16 mx-15">
        <Outlet />
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
