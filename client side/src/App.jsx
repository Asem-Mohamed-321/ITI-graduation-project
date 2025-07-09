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

function App() {
  const location = useLocation();
  const showFooter = location.pathname === "/home";
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
    </Routes>
    {showFooter && <Footer />}
    {/* <div className="w-full mt-4">
      <p className="font-bold bg-amber-500 px-10 w-fit m-auto">Welcome to our graduation project main page</p>
    </div> */}
    </>
  )
}

export default App
