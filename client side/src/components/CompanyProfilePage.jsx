import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const initialCompany = {
  companyName: "",
  logo: "/public/images/Overall.png",
  email: "",
};

const CompanyProfilePage = () => {
  const [company, setCompany] = useState(initialCompany);
  const [editNameMode, setEditNameMode] = useState(false);
  const [nameInputValue, setNameInputValue] = useState(company.companyName);
  const [editEmailMode, setEditEmailMode] = useState(false);
  const [emailInputValue, setEmailInputValue] = useState(company.email);
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Fetch company data on mount
  useEffect(() => {
    const fetchCompany = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Not authenticated. Please log in again.");
          setLoading(false);
          return;
        }
        const res = await axios.get("http://localhost:3000/company/getCompany", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompany({
          companyName: res.data.companyName || "",
          logo: res.data.logo || "/public/images/Overall.png",
          email: res.data.email || "",
        });
        setNameInputValue(res.data.companyName || "");
        setEmailInputValue(res.data.email || "");
      } catch (err) {
        setError("Failed to fetch company profile: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  // Handlers
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCompany((prev) => ({ ...prev, logo: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEditName = () => setEditNameMode(true);
  const handleNameChange = (e) => setNameInputValue(e.target.value);
  const handleSaveName = (e) => {
    e.preventDefault();
    setCompany((prev) => ({ ...prev, companyName: nameInputValue }));
    setEditNameMode(false);
  };
  const handleCancelEditName = () => {
    setNameInputValue(company.companyName);
    setEditNameMode(false);
  };
  const handleEditEmail = () => setEditEmailMode(true);
  const handleEmailChange = (e) => setEmailInputValue(e.target.value);
  const handleSaveEmail = (e) => {
    e.preventDefault();
    setCompany((prev) => ({ ...prev, email: emailInputValue }));
    setEditEmailMode(false);
  };
  const handleCancelEditEmail = () => {
    setEmailInputValue(company.email);
    setEditEmailMode(false);
  };

  // Save all changes to backend
  const handleSaveAll = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authenticated. Please log in again.");
        setLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("companyName", company.companyName);
      formData.append("email", company.email);
      if (logoFile) {
        formData.append("logoFile", logoFile);
      }
      // Only send the fields that are editable
      await axios.put("http://localhost:3000/company", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Profile updated successfully!");
      setLogoFile(null);
      // Refetch the updated company data to reflect changes
      try {
        const res = await axios.get("http://localhost:3000/company/getCompany", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompany({
          companyName: res.data.companyName || "",
          logo: res.data.logo || "/public/images/Overall.png",
          email: res.data.email || "",
        });
        setNameInputValue(res.data.companyName || "");
        setEmailInputValue(res.data.email || "");
      } catch (fetchErr) {
        setError("Profile updated, but failed to refetch: " + (fetchErr.response?.data?.message || fetchErr.message));
      }
    } catch (err) {
      setError("Failed to update company profile: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading company profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors duration-500 py-12 px-2">
      <div className="w-full max-w-3xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 border border-blue-200 dark:border-blue-700 rounded-3xl shadow-2xl p-8 sm:p-16 flex flex-col items-center gap-10">
        {/* Error/Success */}
        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded w-full text-center">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded w-full text-center">{success}</div>}
        {/* Company Logo */}
        <div className="w-full flex flex-col items-center mb-4">
          <div className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2">Company Logo</div>
          <div
            className="relative w-44 h-44 rounded-full overflow-hidden ring-4 ring-blue-300 dark:ring-blue-700 shadow-xl cursor-pointer group transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <img src={company.logo} alt="Company Logo" className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-110" />
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              ref={fileInputRef}
              onChange={handleLogoChange}
              title="Change logo"
              tabIndex={-1}
            />
            {/* Camera icon overlay on hover */}
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553.378A2 2 0 0122 12.368V17a2 2 0 01-2 2H4a2 2 0 01-2-2v-4.632a2 2 0 012.447-1.99L9 10m6 0V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v3m6 0H9" />
              </svg>
            </div>
          </div>
        </div>
        {/* Company Name */}
        <div className="w-full flex flex-col items-center mb-4">
          <div className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2">Company Name</div>
          {editNameMode ? (
            <form onSubmit={handleSaveName} className="flex items-center gap-2 w-full justify-center">
              <input
                className="border-2 border-blue-300 rounded px-4 py-2 text-3xl font-extrabold text-center dark:bg-slate-700 dark:text-white w-2/3 shadow"
                value={nameInputValue}
                onChange={handleNameChange}
                autoFocus
              />
              <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-bold shadow">Save</button>
              <button type="button" className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded font-bold shadow" onClick={handleCancelEditName}>Cancel</button>
            </form>
          ) : (
            <>
              <span className="text-3xl font-extrabold text-blue-800 dark:text-blue-200 drop-shadow mb-2 text-center">{company.companyName}</span>
              <div className="w-16 h-1 bg-blue-400 rounded-full mb-4 mt-2" />
              <button
                className="text-xs bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-full border border-yellow-300 ml-2 transition-all font-semibold shadow"
                onClick={handleEditName}
              >
                edit
              </button>
            </>
          )}
        </div>
        {/* Company Email */}
        <div className="w-full flex flex-col items-center mb-4">
          <div className="text-lg font-bold text-blue-700 dark:text-blue-200 mb-2">Company Email</div>
          {editEmailMode ? (
            <form onSubmit={handleSaveEmail} className="flex items-center gap-2 w-full justify-center">
              <input
                className="border-2 border-blue-300 rounded px-4 py-2 text-lg text-center dark:bg-slate-700 dark:text-white w-2/3 shadow"
                value={emailInputValue}
                onChange={handleEmailChange}
                autoFocus
              />
              <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded font-bold shadow">Save</button>
              <button type="button" className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded font-bold shadow" onClick={handleCancelEditEmail}>Cancel</button>
            </form>
          ) : (
            <>
              <span className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2 text-center">{company.email}</span>
              <button
                className="text-xs bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-full border border-yellow-300 ml-2 transition-all font-semibold shadow"
                onClick={handleEditEmail}
              >
                edit
              </button>
            </>
          )}
        </div>
        {/* Save All Button */}
        <button
          className={`mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-2xl shadow-lg text-lg transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSaveAll}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
};

export default CompanyProfilePage; 