import { useState,useEffect } from "react";
import { NavLink } from "react-router"; 

export default function Navbar(){
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // hamburger menu in mobile view
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // settings dropdown in mobile view

    const [isDarkMode, setIsDarkMode] = useState(false); //dark mode switch

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    return(
        <>
        <nav className="bg-cyan-500 dark:bg-slate-800">
            <div className=" max-w-full px-6 sm:px-6 lg:px-6">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* <!-- Mobile menu button--> */}
                        <button  onClick={() => setIsMobileMenuOpen(prev => !prev)} type="button" className="cursor-pointer relative inline-flex items-center justify-center rounded-md p-2 text-white hover:cyan-700 dark:hover:bg-gray-700 hover:bg-cyan-600 hover:text-white  focus:outline-hidden focus:ring-inset" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open main menu</span>

                            {isMobileMenuOpen?
                            //if opened
                            (
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>):
                            
                            //if closed
                            (<svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" aria-hidden="true" data-slot="icon">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>)
                            }
                        </button>
                    </div>

                    {/* desktop view buttons in the navbar */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <NavLink to={'/home'} className="flex shrink-0 items-center">
                        <img className="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white" alt="Your Company" />
                            <p className="text-white font-bold ml-2 ">Tailwind CSS</p>
                        </NavLink>
                        <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-2">
                            <a href="#" className="cursor-pointer rounded-md px-2  py-2 text-sm font-thin text-cyan-200 dark:text-slate-500 hover:bg-cyan-600/50 dark:hover:bg-slate-700 hover:text-white dark:hover:text-slate-300" aria-current="page">About us</a>
                            <a href="#" className="cursor-pointer rounded-md px-2 py-2 text-sm font-thin text-cyan-200 dark:text-slate-500 hover:bg-cyan-600/50 dark:hover:bg-slate-700 hover:text-white dark:hover:text-slate-300">Courses</a>
                            </div>
                        </div>
                    </div>

                    <div >
                        <div className="hidden sm:flex h-max-10 absolute inset-y-0 right-0  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" onChange={() => {setIsDarkMode(prev => !prev);console.log(isDarkMode)}}></input>
                                <div className="relative w-11 h-6 bg-[#787880]/[0.16]   rounded-full peer dark:bg-[#787880]/[0.16] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            </label>
                            <NavLink to={'/register'} className=" cursor-pointer ml-5 h-10 bg-transparent  text-white font-medium hover:bg-cyan-600 hover:border-cyan-500 dark:hover:bg-slate-600 dark:hover:border-slate-800  py-2 px-4 border border-white rounded">Sign up</NavLink>
                            <NavLink to={'/login'} className=" cursor-pointer ml-10 bg-transparent  text-white font-medium hover:bg-cyan-600 hover:border-cyan-500 dark:hover:bg-slate-600 dark:hover:border-slate-800 py-2 px-4 border border-white rounded">Login</NavLink>
                        </div>
                        {/* <!-- Profile dropdown --> */}
                        <div className="relative ">
                            <div className=" sm:hidden block">
                                {/* gear icon in the mobile view */}
                                <button onClick={() => {setIsMobileDropdownOpen(prev => !prev); console.log(isMobileDropdownOpen)}} className="cursor-pointer dark:hover:bg-slate-700 hover:bg-cyan-600 rounded p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                </button>
                            </div>

                        
                            {isMobileDropdownOpen && ( //if dropdown is clicked
                            <div className="sm:hidden block absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden dark:bg-slate-900 dark:ring-black/5 " role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                <NavLink to='/register' className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600  " role="menuitem" tabIndex="-1" id="user-menu-item-0">Sign up</NavLink>
                                <NavLink to='/login' className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600" role="menuitem" tabIndex="-1" id="user-menu-item-1">Login</NavLink>
                                <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 dark:hover:bg-slate-600 dark:text-white" role="menuitem" tabIndex="-1" id="user-menu-item-2">
                                    <label className="inline-flex items-center justify-between w-full cursor-pointer">
                                    <span>Dark mode</span>
                                    <input type="checkbox" className="sr-only peer" id="darkModeToggle"   onChange={() => setIsDarkMode(prev => !prev)}></input>
                                    <div className="relative w-11 h-6 bg-[#787880]/[0.16] rounded-full peer dark:bg-[#787880]/[0.16] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && ( // if the nav menu was opened in the mobile view
            <div className="sm:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3 ">
                    <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-white dark:hover:bg-gray-700 hover:bg-cyan-600 hover:text-white" aria-current="page">About us</a>
                    <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-white dark:hover:bg-gray-700 hover:bg-cyan-600 hover:text-white">Courses</a>
                </div>
            </div>)}
        </nav>
        </>
    )
}