import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFileAlt, FaChartBar, FaCalendarAlt, FaEye, FaCheckCircle, FaExclamationCircle, FaLightbulb, FaEdit, FaSave, FaTimes, FaCheck, FaExclamationTriangle } from "react-icons/fa";

// Progress Circle component
const ProgressCircle = ({ percent, color }) => (
  <div className="relative w-16 h-16 flex items-center justify-center">
    <svg className="absolute" width="64" height="64">
      <circle
        cx="32" cy="32" r="28"
        stroke="#e0e0e0" strokeWidth="6" fill="none"
      />
      <circle
        cx="32" cy="32" r="28"
        stroke={color}
        strokeWidth="6"
        fill="none"
        strokeDasharray={2 * Math.PI * 28}
        strokeDashoffset={2 * Math.PI * 28 * (1 - percent / 100)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s" }}
      />
    </svg>
    <span className="font-bold text-xl" style={{ color }}>{percent}%</span>
  </div>
);

// Summary Card
const CVSummaryCard = ({ cvs }) => {
  if (!cvs || cvs.length === 0) return null;
  const total = cvs.length;
  const avg = Math.round(cvs.reduce((a, c) => a + (c.scoreResult?.overall_score || 0), 0) / total) || 0;
  const best = Math.max(...cvs.map(c => c.scoreResult?.overall_score || 0), 0);
  const latest = cvs.length ? new Date(cvs[0].createdAt).toLocaleDateString() : "-";
  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-green-50 rounded-3xl shadow-lg p-6 mb-8 flex flex-wrap justify-between items-center gap-4 border border-gray-100">
      <div className="flex items-center gap-2 font-bold text-[#1976D2] text-lg">
        <FaFileAlt className="text-blue-400" />
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-base font-bold">{total}</span>
        <span className="text-gray-600 text-base font-normal">Total CVs Analyzed</span>
      </div>
      <div className="flex items-center gap-2 font-bold text-[#388e3c] text-lg">
        <FaChartBar className="text-green-400" />
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-base font-bold">{avg}%</span>
        <span className="text-gray-600 text-base font-normal">Average Score</span>
      </div>
      <div className="flex items-center gap-2 font-bold text-[#fbc02d] text-lg">
        <FaCheckCircle className="text-yellow-400" />
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-base font-bold">{best}%</span>
        <span className="text-gray-600 text-base font-normal">Best Score</span>
      </div>
      <div className="flex items-center gap-2 font-bold text-[#8e24aa] text-lg">
        <FaCalendarAlt className="text-purple-400" />
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-base font-bold">{latest}</span>
        <span className="text-gray-600 text-base font-normal">Latest Analysis</span>
      </div>
    </div>
  );
};

const getBreakdownColor = (score) => {
  if (score >= 12) return "bg-green-100 text-green-700 border-green-200";
  if (score >= 8) return "bg-blue-100 text-blue-700 border-blue-200";
  if (score >= 5) return "bg-yellow-100 text-yellow-700 border-yellow-200";
  return "bg-red-100 text-red-700 border-red-200";
};

const Toast = ({ type, message, onClose }) => {
  if (!message) return null;
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 text-white text-base animate-fade-in-up
      ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
      style={{ minWidth: 220 }}
    >
      {type === 'success' ? <FaCheck className="text-2xl" /> : <FaExclamationTriangle className="text-2xl" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-white text-lg font-bold">×</button>
    </div>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "", photoUrl: "" });
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState(profile);
  const [cvs, setCVs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openCV, setOpenCV] = useState(null); // For toggling details
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });

  const logoutAndRedirect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    if (!token || !userId) {
      setError("You are not logged in. Please log in again.");
      setTimeout(() => logoutAndRedirect(), 1500);
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile({
          name: res.data.username || res.data.name || "",
          email: res.data.email || "",
          photoUrl: res.data.avatar || "/public/images/1.png",
        });
        setEditValues({
          name: res.data.username || res.data.name || "",
          email: res.data.email || "",
          photoUrl: res.data.avatar || "/public/images/1.png",
        });
        setError("");
      } catch (err) {
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
    const fetchCVs = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/score-cv/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCVs(res.data);
      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          setError("Session expired. Please log in again.");
          setTimeout(() => logoutAndRedirect(), 1500);
        } else {
          setError("Failed to fetch CVs: " + (err.response?.data?.message || err.message));
        }
      }
    };
    fetchProfile();
    fetchCVs();
  }, []);

  // Helper for progress color
  const getCircleColor = (percent) => {
    if (percent >= 75) return "#43a047"; // green
    if (percent >= 60) return "#1976d2"; // blue
    if (percent >= 40) return "#fbc02d"; // yellow
    return "#e53935"; // red
  };

  // Edit Handlers
  const handleEdit = () => {
    setEditValues(profile);
    setEditMode(true);
  };
  const handleCancel = () => setEditMode(false);
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditValues((prev) => ({ ...prev, photoUrl: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const payload = {
        username: editValues.name,
        email: editValues.email,
        avatar: editValues.photoUrl,
      };
      await axios.put("http://localhost:3000/users/profile", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile({ ...editValues });
      setEditMode(false);
      setError("");
      setToast({ type: 'success', message: 'Profile updated successfully ✅' });
    } catch (err) {
      setError("Failed to update profile: " + (err.response?.data?.message || err.message));
      setToast({ type: 'error', message: 'An error occurred while updating the profile ❌' });
    } finally {
      setSaving(false);
    }
  };

  // Toast auto-hide
  useEffect(() => {
    if (toast.message) {
      const timer = setTimeout(() => setToast({ type: '', message: '' }), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-500">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-8 px-2 md:px-0 bg-gradient-to-br from-slate-100 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 transition-colors duration-500">
      {/* Toast */}
      <Toast type={toast.type} message={toast.message} onClose={() => setToast({ type: '', message: '' })} />
      <div className="w-full max-w-5xl mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-gray-100 dark:border-slate-800 relative">
          <img
            src={editMode ? editValues.photoUrl : profile.photoUrl}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-[#1976D2] object-cover shadow"
          />
          <div className="flex-1 flex flex-col gap-2">
            {editMode ? (
              <>
                <input
                  className="text-2xl font-bold text-[#222] dark:text-white bg-gray-100 dark:bg-slate-800 rounded px-2 py-1 mb-2"
                  name="name"
                  value={editValues.name}
                  onChange={handleEditChange}
                />
                <input
                  className="text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded px-2 py-1 mb-2"
                  name="email"
                  value={editValues.email}
                  onChange={handleEditChange}
                />
                <label className="text-xs text-gray-500 dark:text-gray-300 mt-2 cursor-pointer inline-block">
                  Change Photo
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
                <div className="flex gap-3 mt-3">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold shadow"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    <FaSave /> {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2 font-semibold shadow"
                    onClick={handleCancel}
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-[#222] dark:text-white flex items-center gap-2">
                  {profile.name || "User"}
                  <button
                    className="ml-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold shadow"
                    onClick={handleEdit}
                  >
                    <FaEdit /> Edit
                  </button>
                </div>
                <div className="text-gray-500 dark:text-gray-300">Full Stack Developer | CV Analysis Expert</div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[#1976D2] font-medium">{profile.email}</span>
                  <span className="text-green-600 flex items-center gap-1 font-medium">
                    <svg width="18" height="18" fill="currentColor" className="inline"><circle cx="9" cy="9" r="8" stroke="#4caf50" strokeWidth="2" fill="#4caf50" /></svg>
                    {cvs.length} CV Analyzed
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl">
        <CVSummaryCard cvs={cvs} />
        <div className="font-bold text-2xl mb-6 text-gray-800 dark:text-white text-center">Your CV Analysis Results</div>
        {cvs.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            <div className="text-4xl mb-2">📄</div>
            <div>No CVs found. Upload your first CV to get started!</div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {cvs.map((cv, idx) => {
              const percent = cv.scoreResult?.overall_score ?? 0;
              const color = getCircleColor(percent);
              const isOpen = openCV === cv._id;
              return (
                <div
                  key={cv._id}
                  className={`bg-gradient-to-br from-white via-blue-50 to-green-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-3xl shadow-lg p-8 border border-[#e3eafc] dark:border-slate-700 transition-all flex flex-col md:flex-row gap-6 items-center hover:scale-[1.015] hover:shadow-2xl duration-200 cursor-pointer ${isOpen ? 'ring-2 ring-blue-300' : ''}`}
                  onClick={() => setOpenCV(isOpen ? null : cv._id)}
                >
                  {/* Progress + Info */}
                  <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-1/4">
                    <ProgressCircle percent={percent} color={color} />
                    <div className="font-bold text-gray-800 dark:text-white mt-2 text-lg flex items-center gap-2">
                      <FaChartBar className="text-blue-400" /> CV Analysis #{idx + 1}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><FaCalendarAlt />{cv.createdAt ? new Date(cv.createdAt).toLocaleDateString() : "N/A"}</div>
                  </div>
                  {/* Main Content */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <div className="mb-1 text-blue-700 dark:text-blue-300 font-semibold flex items-center gap-2"><FaFileAlt /> Job Description</div>
                      {cv.cvFileUrl && (
                        <a
                          href={cv.cvFileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors shadow flex items-center gap-2"
                          onClick={e => e.stopPropagation()}
                        >
                          <FaEye /> View CV
                        </a>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{cv.jobDescription?.slice(0, 120)}...</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {cv.scoreResult && cv.scoreResult.breakdown &&
                        Object.entries(cv.scoreResult.breakdown).map(([key, value]) => (
                          <div key={key} className={`p-2 rounded-xl border text-center font-semibold ${getBreakdownColor(value)}`}>
                            <div className="text-xs capitalize font-medium mb-1">{key.replace(/_/g, ' ')}</div>
                            <div className="text-lg">{value}</div>
                          </div>
                        ))}
                    </div>
                    {/* تفاصيل كاملة عند الضغط */}
                    {isOpen && cv.scoreResult && (
                      <div className="mt-8 border-t pt-6 border-blue-100 dark:border-blue-800">
                        {/* Feedback & Suggestions */}
                        {cv.scoreResult.sections && Object.entries(cv.scoreResult.sections).map(([section, data]) => (
                          <div key={section} className="mb-6">
                            <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2"><FaChartBar />{section.replace(/_/g, ' ')}</div>
                            {data.feedback && (
                              <div className="flex flex-wrap gap-2">
                                {data.feedback.strengths && data.feedback.strengths.length > 0 && (
                                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FaCheckCircle /> {data.feedback.strengths.join(', ')}</span>
                                )}
                                {data.feedback.weaknesses && data.feedback.weaknesses.length > 0 && (
                                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FaExclamationCircle /> {data.feedback.weaknesses.join(', ')}</span>
                                )}
                                {data.feedback.suggestions && data.feedback.suggestions.length > 0 && (
                                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs flex items-center gap-1"><FaLightbulb /> {data.feedback.suggestions.join(', ')}</span>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                        {/* Final Suggestions */}
                        {cv.scoreResult.final_suggestions && cv.scoreResult.final_suggestions.length > 0 && (
                          <div className="mt-2">
                            <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2"><FaLightbulb /> Key Recommendations</div>
                            <ul className="list-disc ml-6 text-sm text-blue-800 dark:text-blue-200">
                              {cv.scoreResult.final_suggestions.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

/* tailwind animation */
/* أضف هذا في index.css أو global css:
@keyframes fade-in-up {
  0% { opacity: 0; transform: translateY(30px) scale(0.98); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.4s cubic-bezier(.39,.575,.565,1.000) both;
}
*/ 