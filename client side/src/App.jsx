import Navbar from "./components/navbar"
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/Home"
import YellowButton from "./components/YellowButton"
import Footer from "./components/Footer"
import "animate.css"

function App() {
  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
    <Footer />
    {/* <div className="w-full mt-4">
      <p className="font-bold bg-amber-500 px-10 w-fit m-auto">Welcome to our graduation project main page</p>
    </div> */}
    </>
  )
}

export default App
