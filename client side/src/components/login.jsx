import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUpType, setSignUpType] = useState("user");
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPass, setEmptPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    setEmptPass(false);
    setEmptyUsername(false);
    setToast({ show: false, type: "", message: "" });

    if (username === "") {
      setEmptyUsername(true);
      return;
    }
    if (password === "") {
      setEmptPass(true);
      return;
    }

    try {
      const endpoint =
        signUpType === "company"
          ? "http://localhost:3000/company/sign-in"
          : "http://localhost:3000/auth/sign-in";

      const payload =
        signUpType === "company"
          ? { companyName: username, password }
          : { username, password };

      const response = await axios.post(endpoint, payload);

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        const decoded = jwtDecode(response.data.token);
        localStorage.setItem("id", decoded.id);
        localStorage.setItem("username", decoded.username || username);
        localStorage.setItem("email", decoded.email || "");
        localStorage.setItem("avatar", decoded.avatar || decoded.logoFile || "");
        localStorage.setItem("type", signUpType);
        setIsLoggedIn(true);

        setToast({
          show: true,
          type: "success",
          message: "Login successful!",
        });

        const targetPage = !decoded.role
          ? "/company"
          : decoded.role === "user"
          ? "/home"
          : decoded.role === "admin"
          ? "/admin/dashboard"
          : "/admin";
        setTimeout(() => navigate(targetPage), 1000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      setToast({
        show: true,
        type: "error",
        message: errorMessage,
      });
      console.log(errorMessage);
    }
  }

  function changeType() {
    setSignUpType(signUpType === "user" ? "company" : "user");
    setUsername("");
    setPassword("");
  }

  const renderToast = () => {
    if (!toast.show) return null;

    const isError = toast.type === "error";
    const icon = isError ? (
      <svg
        className="shrink-0 size-4 text-red-500 mt-0.5"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
      </svg>
    ) : (
      <svg
        className="shrink-0 size-4 text-green-500 mt-0.5"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.173 8.727L4.823 7.377a.5.5 0 0 0-.707.707l1.75 1.75a.5.5 0 0 0 .707 0l4.75-4.75a.5.5 0 0 0-.707-.707L6.173 8.727z"></path>
      </svg>
    );

    return (
      <div className="fixed top-4 right-4 z-50">
        <div
          className={`max-w-xs bg-white border rounded-xl shadow-lg dark:bg-neutral-800 ${
            isError
              ? "border-red-200 dark:border-neutral-700"
              : "border-green-200 dark:border-green-700"
          }`}
          role="alert"
          tabIndex="-1"
        >
          <div className="flex p-4">
            <div className="shrink-0">{icon}</div>
            <div className="ms-3">
              <p className="text-sm text-gray-700 dark:text-neutral-400">
                {toast.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderToast()}

      <div className="flex w-11/12 m-auto mt-5 bg-white rounded-lg">
        <div className="md:w-1/2 w-full pb-50 dark:bg-gray-700">
                      <div className="text-center mb-6">
              <button
                onClick={changeType}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-lg font-semibold transition-colors duration-200 hover:scale-105 transform"
              >
                {signUpType === "user" ? "🔗 or sign in as a company" : "🔗 or sign in as a user"}
              </button>
            </div>
          <p className="text-center font-extrabold mb-12 dark:text-white">
            {signUpType === "user"
              ? "SIGN IN TO THE CV CHECKER"
              : "SIGN IN TO FIND TOP CANDIDATES"}
          </p>
          <form className="flex flex-col space-y-4 mx-auto  w-fit  md:w-96 px-8 dark:bg-gray-700">
            <div>
              <label
                className="text-sm font-bold dark:text-white"
                htmlFor="username"
              >
                {signUpType === "user" ? "Username" : "Company Name"}
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                placeholder={
                  signUpType === "user" ? "Username" : "Company Name"
                }
                className={`w-full block border-2 ${
                  emptyUsername ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white`}
              />
              {emptyUsername && (
                <p className="text-red-600 text-sm sm:text-base font-light italic">
                  Please choose a name
                </p>
              )}
            </div>
            <div>
              <label
                className="text-sm font-bold dark:text-white"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`block w-full border-2 ${
                    emptyPass ? "border-red-500" : "border-gray-300"
                  } rounded-md p-2 mt-2 pr-10 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center mt-2"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {emptyPass && (
                <p className="text-red-600 text-sm sm:text-base font-light italic">
                  Please choose a password
                </p>
              )}
            </div>
            <div>
              <button
                onClick={login}
                className="w-fit cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-900 dark:hover:bg-blue-700"
              >
                Sign In
              </button>
            </div>
            <div className="mx-auto mt-2 text-xs">
              <p className="inline font-normal dark:text-slate-400">
                you don't have an account ?{" "}
                <NavLink
                  to="/register"
                  className="inline text-blue-500 dark:text-blue-300"
                >
                  Create a new account{" "}
                </NavLink>
              </p>
            </div>
          </form>
        </div>

        <div className="hidden md:flex md:w-1/2 py-4 px-5 items-center justify-center bg-gray-200 dark:bg-slate-800 rounded-r-lg">
          <div className="aspect-[4/3] w-full ">
            <img
              className="w-full h-full object-contain"
              src="../src/assets/loginVectorImage.png"
              alt="Login vector photo"
            />
          </div>
        </div>
      </div>
    </>
  );
}
