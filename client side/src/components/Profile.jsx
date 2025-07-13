import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileInfoSummary from "./ProfileInfoSummary";
import ProfileEditForm from "./ProfileEditForm";
import CVList from "./CVList";
import CVScoreDetails from "./CVScoreDetails";
import axios from "axios";
import { useEffect } from "react";

// Remove mock data and initialProfile/initialCVs

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", photoUrl: "" });
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState(profile);
  const [cvs, setCVs] = useState([]);
  const [selectedCV, setSelectedCV] = useState(null);
  const [error, setError] = useState("");
  const [cvError, setCvError] = useState("");
  const [loading, setLoading] = useState(true);

  // Utility: logout and redirect
  const logoutAndRedirect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.href = "/login";
  };

  // Fetch user profile and CVs on mount
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("[DEBUG] fetchProfile - token:", token);
    try {
      const res = await axios.get("http://localhost:3000/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("[DEBUG] fetchProfile - response:", res.data);
      setProfile({
        name: res.data.username || res.data.name || "",
        email: res.data.email || "",
        photoUrl: res.data.avatar || "/public/images/1.png",
      });
      setError("");
    } catch (err) {
      console.error("[DEBUG] fetchProfile - error:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError("Session expired. Please log in again.");
        setTimeout(() => logoutAndRedirect(), 1500);
      } else {
        setError("Failed to fetch profile: " + (err.response?.data?.message || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    console.log("[DEBUG] useEffect - token:", token);
    console.log("[DEBUG] useEffect - userId:", userId);
    if (!token || !userId) {
      setError("You are not logged in. Please log in again.");
      setTimeout(() => logoutAndRedirect(), 1500);
      setLoading(false);
      return;
    }
    fetchProfile();
    const fetchCVs = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/score-cv/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("[DEBUG] fetchCVs - response:", res.data);
        setCVs(res.data);
        setCvError("");
      } catch (err) {
        console.error("[DEBUG] fetchCVs - error:", err);
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setCvError("Session expired. Please log in again.");
          setTimeout(() => logoutAndRedirect(), 1500);
        } else {
          setCvError("Failed to fetch CVs: " + (err.response?.data?.message || err.message));
        }
      }
    };
    fetchCVs();
  }, []);

  // Handlers
  const handleEdit = () => {
    setEditValues(profile); // always use latest profile data
    setEditMode(true);
  };
  const handleCancel = () => setEditMode(false);
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      console.log("[DEBUG] handleSave - token:", token);
      console.log("[DEBUG] handleSave - userId:", userId);
      console.log("[DEBUG] handleSave - payload:", editValues);
      if (!token || !userId) {
        setError("You are not logged in. Please log in again.");
        setTimeout(() => logoutAndRedirect(), 1500);
        return;
      }
      const payload = {
        username: editValues.name,
        email: editValues.email,
        avatar: editValues.photoUrl !== profile.photoUrl ? editValues.photoUrl : undefined,
      };
      // Remove undefined fields
      Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);
      console.log("[DEBUG] handleSave - final payload:", payload);
      const res = await axios.put("http://localhost:3000/users/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("[DEBUG] handleSave - response:", res.data);
      // Use backend response to update UI
      setProfile({
        name: res.data.username || res.data.name || "",
        email: res.data.email || "",
        photoUrl: res.data.avatar || "/public/images/1.png",
      });
      setEditMode(false);
      setError("");
    } catch (err) {
      console.error("[DEBUG] handleSave - error:", err);
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError("Session expired. Please log in again.");
        setTimeout(() => logoutAndRedirect(), 1500);
      } else if (err.response && err.response.status === 409) {
        setError(err.response.data.message || "Username or email already exists.");
      } else {
        setError("Failed to update profile: " + (err.response?.data?.message || err.message));
      }
    }
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({
      ...prev,
      [name]: value,
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
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-12 px-2 md:px-0 bg-gradient-to-br from-slate-100 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-500">
      <div className="w-full max-w-6xl animate__animated animate__zoomIn">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 md:p-16 mb-12 border border-gray-100 dark:border-slate-800 transition-all duration-500">
          {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
          <ProfileHeader
            name={profile.name}
            photoUrl={editMode && editValues ? editValues.photoUrl : profile.photoUrl}
            onPhotoChange={handlePhotoChange}
          />
          <div className="flex flex-col md:flex-row gap-12 mt-10">
            <div className="flex-1 flex flex-col gap-8">
              {/* User CVs List */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-lg p-6 mb-6">
                <div className="text-lg font-bold mb-4">Your CVs</div>
                {cvError && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{cvError}</div>}
                {cvs.length === 0 && !cvError ? (
                  <div>No CVs found.</div>
                ) : (
                  <ul className="space-y-4">
                    {cvs.map((cv) => (
                      <li key={cv._id} className="border-b pb-2">
                        <div className="font-semibold">Score: {cv.scoreResult?.overall_score ?? "N/A"}</div>
                        <div className="text-sm text-gray-600">Job Description: {cv.jobDescription || "N/A"}</div>
                        <div className="text-xs text-gray-400">Uploaded: {cv.createdAt ? new Date(cv.createdAt).toLocaleString() : "N/A"}</div>
                        {cv.cvFileUrl && (
                          <a href={cv.cvFileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View CV</a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="w-full md:w-[420px] flex flex-col gap-8">
              {editMode ? (
                <form className="bg-white rounded-xl shadow-md p-4 md:p-8 flex flex-col gap-6 w-full" onSubmit={e => { e.preventDefault(); handleSave(); }}>
                  <label className="text-xs font-semibold">Full Name
                    <input
                      className="mt-1 w-full border rounded px-2 py-1"
                      type="text"
                      name="name"
                      value={editValues.name}
                      onChange={handleEditChange}
                      required
                    />
                  </label>
                  <label className="text-xs font-semibold">Email Address
                    <input
                      className="mt-1 w-full border rounded px-2 py-1"
                      type="email"
                      name="email"
                      value={editValues.email}
                      onChange={handleEditChange}
                      required
                    />
                  </label>
                  <div className="flex gap-4 mt-4">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">Save</button>
                    <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md" onClick={handleCancel}>Cancel</button>
                  </div>
                </form>
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