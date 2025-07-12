import React, { useRef, useState } from "react";

const ProfileHeader = ({ name, title, photoUrl, onPhotoChange }) => {
  const [hovered, setHovered] = useState(false);
  const fileInputRef = useRef();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-slate-900 rounded-t-2xl p-0 md:p-0 transition-colors duration-300">
      <div className="flex-1">
        <p className="text-green-900 dark:text-green-200 text-lg font-serif mb-2">Profile</p>
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-1 text-gray-900 dark:text-white">{name}</h1>
        <h2 className="text-lg md:text-xl text-gray-700 dark:text-gray-200 font-light border-b pb-2">{title}</h2>
      </div>
      <div className="flex flex-col items-center ml-0 md:ml-8 mt-4 md:mt-0">
        <div
          className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow cursor-pointer group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <img src={photoUrl} alt="Profile" className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105" />
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            ref={fileInputRef}
            onChange={onPhotoChange}
            title="Change photo"
            tabIndex={-1}
          />
          {/* Camera icon overlay on hover */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553.378A2 2 0 0122 12.368V17a2 2 0 01-2 2H4a2 2 0 01-2-2v-4.632a2 2 0 012.447-1.99L9 10m6 0V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v3m6 0H9" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 