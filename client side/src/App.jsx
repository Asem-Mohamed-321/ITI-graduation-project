import Navbar from "./components/navbar"
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/Home"
import YellowButton from "./components/YellowButton"
import Footer from "./components/Footer"
import "animate.css"
import VideoPage from "./assets/pages/VideoPage";
import Questions from "./assets/pages/Questions";
import CVUpload from "./components/cvUpload";
import ScorePage from "./components/scorePage";
import { useState } from "react";
import Profile from "./components/Profile";
import CompanyProfilePage from "./components/CompanyProfilePage";
import NotFound from "./components/NotFound";

function App() {
  const location = useLocation();
  const showFooter = location.pathname === "/home";

  const[cvScore, setCvScore] = useState({});
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path='/tips' element={<VideoPage />} />
        <Route path='/questions' element={<Questions/>} />
        <Route path="upload-cv" element={<CVUpload />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="upload-cv" element={<CVUpload passCvResults={setCvScore} />} />
        <Route path="/score" element={<ScorePage cvScore={cvScore} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/company-profile" element={<CompanyProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  )
}

export default App
