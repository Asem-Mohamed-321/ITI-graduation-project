import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
export default function({setIsLoggedIn}){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function login(e){
        e.preventDefault();
        console.log(username);
        console.log(password);

        try {
            const response = await axios.post("http://localhost:3000/auth/sign-in", {
                username,
                password
            });
            if (response.data) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", username);
                setIsLoggedIn(true);

                console.log("Login successful!");
                alert("Login successful!");
            }
        } catch (error) {
            alert("There was an error logging in! check the console");
            console.log(error.response.data.message);
        }

    }
    return (
        <>
            <div className="flex w-11/12 m-auto mt-5 bg-white rounded-lg">
                <div className="md:w-1/2 w-full pt-40 pb-30 dark:bg-gray-700">
                    <p className="text-center font-extrabold mb-12 dark:text-white">SIGN IN TO THE CV CHECKER</p>
                    <form className="flex flex-col space-y-4 mx-auto  w-fit  md:w-96 px-8 dark:bg-gray-700">
                        {/* mx-48 */}
                        <div>
                            <label className="text-sm font-bold dark:text-white" htmlFor="username">Username</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} id="username" type="text" placeholder="Username" className="w-full block border-2 border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-gray-700 dark:bg-slate-800 dark:text-white" />
                        </div>
                        <div>
                            <label className="text-sm font-bold dark:text-white" htmlFor="password">Password</label>
                            {/* <input id="password" type="password" placeholder="Password" className="w-full border-2 border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500" /> */}
                            <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" type="password" placeholder="Password" className=" block w-full border-1 border-red-500 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500 dark:placeholder:text-gray-500 dark:border-red-500-700 dark:bg-slate-800 dark:text-white" />
                            <p className="text-red-600 text-sm sm:text-base font-light italic">Please choose a password</p>
                        </div>
                        <div>
                            <button onClick={login} className="w-fit cursor-pointer bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300 dark:bg-blue-900 dark:hover:bg-blue-700">Sign In</button>
                        </div>
                        <div className="mx-auto  mt-2 text-xs ">
                        <p className="inline font-normal dark:text-slate-400">you don’t have an account ? <NavLink to="/register" className="inline text-blue-500 dark:text-blue-300">Create a new account </NavLink></p>
                    </div>
                    </form>
                    
                </div >
                
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
    )
}

