import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileInfoSummary from "./ProfileInfoSummary";
import ProfileEditForm from "./ProfileEditForm";
import CVList from "./CVList";
import CVScoreDetails from "./CVScoreDetails";

// Mock data for demonstration
const initialProfile = {
  name: "Omar Mohamed Friga",
  title: "Front-End Developer",
  photoUrl: "/public/images/1.png",
  email: "omarrfriga20@gmail.com",
  phone: "+20 0111047751",
  address: "Alexandria",
  dob: "1998-01-01",
  gender: "Male",
  about: "Powerful user profile plugin for creating front-end user registration forms, login and user profile forms. Includes user role editor and content rest.",
};

const initialCVs = [
  {
    id: 1,
    name: "Cv1",
    imageUrl: "/public/images/Overall.png",
    time: "1 Week",
    score: 65,
    breakdown: {
      contentCompleteness: 25,
      technicalQuality: 28,
      structureReadability: 18,
      competitiveness: 14,
    },
  },
  {
    id: 2,
    name: "Cv2",
    imageUrl: "/public/images/Achiv.png",
    time: "3 Seconds",
    score: 80,
    breakdown: {
      contentCompleteness: 30,
      technicalQuality: 30,
      structureReadability: 10,
      competitiveness: 10,
    },
  },
];

const Profile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [cvs, setCVs] = useState(initialCVs);
  const [selectedCV, setSelectedCV] = useState(null);
  const [editValues, setEditValues] = useState(profile);

  // Handlers
  const handleEdit = () => {
    setEditValues(profile);
    setEditMode(true);
  };
  const handleCancel = () => setEditMode(false);
  const handleSave = () => {
    setProfile(editValues);
    setEditMode(false);
  };
  const handleEditChange = (e) => {
    const { name, value, type } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value,
    }));
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (editMode) {
          setEditValues((prev) => ({ ...prev, photoUrl: ev.target.result }));
        } else {
          setProfile((prev) => ({ ...prev, photoUrl: ev.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Main layout
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-2 md:px-0 bg-gradient-to-br from-slate-100 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-500">
      <div className="w-full max-w-6xl animate__animated animate__zoomIn">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 md:p-16 mb-12 border border-gray-100 dark:border-slate-800 transition-all duration-500">
          <ProfileHeader
            name={profile.name}
            title={profile.title}
            photoUrl={editMode && editValues ? editValues.photoUrl : profile.photoUrl}
            onPhotoChange={handlePhotoChange}
          />
          <div className="flex flex-col md:flex-row gap-12 mt-10">
            <div className="flex-1 flex flex-col gap-8">
              {selectedCV ? (
                <CVScoreDetails
                  score={selectedCV.score}
                  breakdown={selectedCV.breakdown}
                  onBack={() => setSelectedCV(null)}
                />
              ) : (
                <CVList cvs={cvs} onDetails={setSelectedCV} />
              )}
            </div>
            <div className="w-full md:w-[420px] flex flex-col gap-8">
              {editMode ? (
                <ProfileEditForm
                  values={editValues}
                  onChange={handleEditChange}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onPhotoChange={handlePhotoChange}
                />
              ) : (
                <ProfileInfoSummary
                  info={profile}
                  onEdit={handleEdit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 