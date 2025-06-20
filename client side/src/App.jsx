import Navbar from "./components/navbar"
import { Routes, Route } from "react-router";
import Login from "./components/login";
import Register from "./components/register";

function App() {

  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    {/* <div className="w-full mt-4">
      <p className="font-bold bg-amber-500 px-10 w-fit m-auto">Welcome to our graduation project main page</p>
    </div> */}
    </>
  )
}

export default App
