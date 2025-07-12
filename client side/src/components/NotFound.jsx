import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors duration-500 px-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 md:p-16 flex flex-col items-center gap-6 border border-gray-100 dark:border-slate-800 max-w-lg w-full">
        <div className="flex flex-col items-center gap-2">
          <span className="text-7xl md:text-8xl font-extrabold text-blue-500 dark:text-blue-400">404</span>
          <span className="text-5xl md:text-6xl">😢</span>
        </div>
        <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center">Page Not Found</div>
        <div className="text-gray-600 dark:text-gray-300 text-center text-lg max-w-md">
          Sorry, the page you are looking for does not exist.<br />
          <span className="text-blue-500 dark:text-blue-300">If you believe this is a mistake, check your internet connection or try again later.</span>
        </div>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-8 rounded-lg shadow transition-all text-lg"
          onClick={() => navigate("/home")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound; 