import Navbar from "./components/navbar";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/Home";
import YellowButton from "./components/YellowButton";
import Footer from "./components/Footer";
import "animate.css";
import VideoPage from "./assets/pages/VideoPage";
import Questions from "./assets/pages/Questions";
import CVUpload from "./components/cvUpload";
import ScorePage from "./components/scorePage";
import CompanyPage from "./components/companyPage";
import CompanyProfile from "./components/CompanyProfile";
import AddJob from "./components/AddJob";
import AdminPage from "./components/adminPage";
import Dashboard from "./components/dashboard";
import CompanyList from "./components/companiesList";
import UserList from "./components/userList";
import Resumes from "./components/resumes";
import JobDescriptions from "./components/jobDescriptions";
import { useState } from "react";
import Profile from "./components/Profile";
import CompanyProfilePage from "./components/CompanyProfilePage";
import NotFound from "./components/NotFound";
import CVUploadWithNoDesc from "./assets/pages/UploadCvWithoutJopDescription";
import AboutUs from "./components/AboutUs";
import FAQ from "./components/FAQ";
import CompanyJobDesc from "./components/companyJobDesc";
import { jwtDecode } from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const location = useLocation();
  const showFooter = location.pathname === "/home";

  const [cvScore, setCvScore] = useState({});

  const token = localStorage.getItem("token");

  
  function RequireAdmin({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin" || !decoded.role) {
        return <Navigate to="/not-found" replace />;
      }
    } catch (error) {
      return <Navigate to="/login" replace />;
    }

    return children;
  }

  function RequireCompany({ children }) {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="/login" replace />;

    try {
      const decoded = jwtDecode(token);

      // Allow if role is company OR no role at all
      if (!decoded.role || decoded.role === "company") {
        return children;
      } else {
        return <Navigate to="/not-authorized" replace />;
      }
    } catch (error) {
      return <Navigate to="/login" replace />;
    }
  }

  // () => {
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     console.log(decodedToken);
  //   }
  // };
  // console.log(jwtDecode(token))
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/tips" element={<VideoPage />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/basic-scan" element={<CVUploadWithNoDesc />} />
        <Route
          path="/upload-cv"
          element={<CVUpload cvScore={cvScore} passCvResults={setCvScore} />}
        />
        <Route path="/score" element={<ScorePage cvScore={cvScore} />} />
        <Route
          path="/company"
          element={
            <RequireCompany>
              <CompanyPage />
            </RequireCompany>
          }
        >
          {/* Nested routes */}
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="job/:jobId" element={<CompanyJobDesc />} />
        </Route>
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminPage />
            </RequireAdmin>
          }
        >
          {/*nested admin routes */}
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="users-list" element={<UserList />}></Route>
          <Route path="resumes" element={<Resumes />}></Route>
          <Route path="companies-list" element={<CompanyList />}></Route>
          <Route path="job-desc-list" element={<JobDescriptions />}></Route>
        </Route>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showFooter && <Footer />}
      {/* <div className="w-full mt-4">
      <p className="font-bold bg-amber-500 px-10 w-fit m-auto">Welcome to our graduation project main page</p>
    </div> */}
    </>
  );
}

export default App;
