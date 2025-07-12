
import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";


export default function CompanyPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const jobs = [
    "Full-Stack intern for a government portal",
    "Senior DevOps (Docker + AWS)",
    "Junior Backend Developer at XYZ Inc",
  ];

  const truncateText = (text) =>
    text.length > 19 ? text.slice(0, 19) + "..." : text;

  console.log(isSidebarOpen)
  console.log(isOpen)
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
                  <p
                    key={index}
                    className="mt-1 text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
                  >
                    {truncateText(job)}
                  </p>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 z-0 w-10/12 sm:w-11/12 sm:ml-16 mx-15">
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
