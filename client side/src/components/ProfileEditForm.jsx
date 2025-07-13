import React, { useRef } from "react";

const ProfileEditForm = ({ values, onChange, onSave, onCancel, onPhotoChange }) => {
  const fileInputRef = useRef();
  return (
    <form
      className="bg-white rounded-xl shadow-md p-4 md:p-8 flex flex-col gap-6 w-full"
      onSubmit={e => {
        e.preventDefault();
        onSave();
      }}
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <label className="text-xs font-semibold">Full Name
            <input
              className="mt-1 w-full border rounded px-2 py-1"
              type="text"
              name="name"
              value={values.name}
              onChange={onChange}
              required
            />
          </label>
          <label className="text-xs font-semibold">Email Address
            <input
              className="mt-1 w-full border rounded px-2 py-1"
              type="email"
              name="email"
              value={values.email}
              onChange={onChange}
              required
            />
          </label>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <label className="text-xs font-semibold">Profile Photo
            <input
              className="mt-1 w-full border rounded px-2 py-1"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onPhotoChange}
            />
          </label>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-8 rounded"
        >Save</button>
        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-8 rounded"
          onClick={onCancel}
        >Cancel</button>
      </div>
    </form>
  );
};

export default ProfileEditForm; 