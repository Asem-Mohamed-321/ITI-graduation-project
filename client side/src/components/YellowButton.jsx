import React from "react";

export default function YellowButton({ children, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 