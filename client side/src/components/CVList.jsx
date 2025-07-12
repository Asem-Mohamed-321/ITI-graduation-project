import React from "react";

const CVList = ({ cvs, onDetails }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {cvs.map((cv, idx) => (
        <div key={cv.id} className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow p-4 gap-4 md:gap-8">
          <div className="flex items-center gap-4 flex-1">
            <img src={cv.imageUrl} alt="CV preview" className="w-16 h-16 object-cover rounded-md border" />
            <div>
              <div className="font-semibold">{cv.name}</div>
              <div className="text-green-600 text-xs">Progression</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-xs text-gray-500">{cv.time}</div>
            <button
              className="bg-gray-100 hover:bg-gray-200 text-black text-xs font-semibold py-1 px-4 rounded border"
              onClick={() => onDetails(cv)}
            >Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CVList; 