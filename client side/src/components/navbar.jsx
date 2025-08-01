import { useState,useEffect } from "react";
import { NavLink , useNavigate } from "react-router-dom"; 
import { jwtDecode } from "jwt-decode";

export default function Navbar({ isLoggedIn, setIsLoggedIn, avatar }){
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // hamburger menu in mobile view
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false); // settings dropdown in mobile view

    const [isDarkMode, setIsDarkMode] = useState(false); //dark mode switch

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const userType = localStorage.token ? jwtDecode(localStorage.token).role? jwtDecode(localStorage.token).role:"company" : null

    const pp = () => {
    const decoded = jwtDecode(localStorage.token);

  // If no role => company
  if (!decoded.role) {
    return decoded.logoFile || "/images/companyLogo.png";
  }

  // If user
  if (decoded.role === 'user') {
    return avatar || decoded.avatar || "/images/profile_unset.svg";
  }

  // Else: assume admin
  return avatar || decoded.avatar || "/images/profile_unset.svg";
};

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    console.log(userType)
    return(
        <>
        <nav className="bg-cyan-500 dark:bg-slate-800">
            <div className="max-w-full px-6 sm:px-6 lg:px-6">
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
                    <div className="flex flex-1 items-center justify-between">
                        <NavLink to={isLoggedIn && userType === 'admin' ? '/admin/dashboard' : isLoggedIn && userType === 'company' ? '/company' : '/home'} className="flex items-center gap-3 group select-none leading-none">
                            {/* Clean, modern, perfectly aligned bridge logo */}
                            <svg className="h-8 w-8 md:h-10 md:w-10 text-white align-middle" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 24C4 13 8 8 16 8C24 8 28 13 28 24" stroke="white" strokeWidth="2.8" strokeLinecap="round" fill="none"/>
                                <path d="M4 24L28 24" stroke="white" strokeWidth="3.2" strokeLinecap="round"/>
                                <rect x="6" y="24" width="2.2" height="5" rx="1.1" fill="white"/>
                                <rect x="24" y="24" width="2.2" height="5" rx="1.1" fill="white"/>
                                <rect x="15" y="24" width="2.2" height="5" rx="1.1" fill="white"/>
                                <path d="M8 14C8 18 8 21 8 22.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M24 14C24 18 24 21 24 22.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M16 10C16 18 16 21 16 22.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                            <span className="text-white font-bold text-2xl md:text-3xl align-middle leading-none" style={{fontFamily: 'Inter, Arial, sans-serif', letterSpacing: '0.01em'}}>AtsBridge</span>
                        </NavLink>
                        
                        {/* Centered navigation links */}
                        <div className="hidden sm:flex items-center justify-center flex-1">
                            <div className="flex space-x-6">
                                {/* Show Home link only for users */}
                                {isLoggedIn && userType === 'user' && (
                                    <NavLink 
                                        to="/home"
                                        className={({ isActive }) => 
                                            `cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 relative ${
                                                isActive 
                                                    ? 'text-white bg-cyan-600/50 shadow-lg' 
                                                    : 'text-white hover:bg-cyan-600/50 dark:hover:bg-slate-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        Home
                                        {({ isActive }) => isActive && (
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                        )}
                                    </NavLink>
                                )}
                                {/* Show Dashboard link only for admin users */}
                                {isLoggedIn && userType === 'admin' && (
                                    <NavLink 
                                        to="/admin/dashboard" 
                                        className={({ isActive }) => 
                                            `cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 relative ${
                                                isActive 
                                                    ? 'text-white bg-cyan-600/50 shadow-lg' 
                                                    : 'text-white hover:bg-cyan-600/50 dark:hover:bg-slate-700 hover:text-white'
                                            }`
                                        }
                                    >
                                        Dashboard
                                        {({ isActive }) => isActive && (
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                        )}
                                    </NavLink>
                                )}
                                <NavLink 
                                    to="/about" 
                                    className={({ isActive }) => 
                                        `cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 relative ${
                                            isActive 
                                                ? 'text-white bg-cyan-600/50 shadow-lg' 
                                                : 'text-white hover:bg-cyan-600/50 dark:hover:bg-slate-700 hover:text-white'
                                        }`
                                    }
                                >
                                    About us
                                    {({ isActive }) => isActive && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    )}
                                </NavLink>
                                <NavLink 
                                    to="/tips" 
                                    className={({ isActive }) => 
                                        `cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 relative ${
                                            isActive 
                                                ? 'text-white bg-cyan-600/50 shadow-lg' 
                                                : 'text-white hover:bg-cyan-600/50 dark:hover:bg-slate-700 hover:text-white'
                                        }`
                                    }
                                >
                                    Courses
                                    {({ isActive }) => isActive && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    )}
                                </NavLink>
                                <NavLink 
                                    to="/faq" 
                                    className={({ isActive }) => 
                                        `cursor-pointer rounded-md px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 relative ${
                                            isActive 
                                                ? 'text-white bg-cyan-600/50 shadow-lg' 
                                                : 'text-white hover:bg-cyan-600/50 dark:hover:bg-slate-700 hover:text-white'
                                        }`
                                    }
                                >
                                    FAQ
                                    {({ isActive }) => isActive && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    )}
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div >
                        <div className="hidden sm:flex h-max-10 absolute inset-y-0 right-0  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <label className="inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" onChange={() => {setIsDarkMode(prev => !prev);console.log(isDarkMode)}}></input>
                                <div className="relative w-11 h-6 bg-[#787880]/[0.16]   rounded-full peer dark:bg-[#787880]/[0.16] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            </label>
                            {!isLoggedIn && (
                                <>
                                    <NavLink to={'/register'} className=" cursor-pointer ml-5 h-10 bg-transparent  text-white font-medium hover:bg-cyan-600 hover:border-cyan-500 dark:hover:bg-slate-600 dark:hover:border-slate-800  py-2 px-4 border border-white rounded">Sign up</NavLink>
                                    <NavLink to={'/login'} className=" cursor-pointer ml-10 bg-transparent  text-white font-medium hover:bg-cyan-600 hover:border-cyan-500 dark:hover:bg-slate-600 dark:hover:border-slate-800 py-2 px-4 border border-white rounded">Login</NavLink>
                                                            
                                </>
                            )}
                            {/* Profile image if logged in - hide for admin users */}
                            {isLoggedIn && userType !== 'admin' && (
                            <div className="relative ml-4">
                                <button
                                type="button"
                                className="cursor-pointer relative flex rounded-full bg-gray-800 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
                                id="user-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                                    onClick={() => setIsProfileDropdownOpen(prev => !prev)}
                                >
                                <span className="absolute -inset-1.5"></span>
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="size-8 rounded-full "
                                    // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    src={pp()}
                                    alt="User profile"
                                />
                                </button>

                                {/* Dropdown */}
                                {isProfileDropdownOpen && (
  <div
    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden dark:bg-slate-800"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="user-menu-button"
  >
    <NavLink to={userType === 'user' ? '/user/profile':'/company' } className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700" role="menuitem">Your Profile</NavLink>
    <button
      onClick={() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsProfileDropdownOpen(false);
        navigate("/login");
      }}
      className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-700"
      role="menuitem"
    >
      Sign out
    </button>
  </div>
)}

                            </div>
                            )}
                            
                            {/* Sign out button for admin users */}
                            {isLoggedIn && userType === 'admin' && (
                                <button
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        setIsLoggedIn(false);
                                        navigate("/login");
                                    }}
                                    className="ml-4 bg-transparent text-white font-medium hover:bg-cyan-600 hover:border-cyan-500 dark:hover:bg-slate-600 dark:hover:border-slate-800 py-2 px-4 border border-white rounded"
                                >
                                    Sign out
                                </button>
                            )}

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
                                
                                {(!isLoggedIn && 
                                <>
                                <NavLink to='/register' className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600  " role="menuitem" tabIndex="-1" id="user-menu-item-0">Sign up</NavLink>
                                <NavLink to='/login' className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600" role="menuitem" tabIndex="-1" id="user-menu-item-1">Login</NavLink>
                                </>
                                )}
                                {(isLoggedIn && userType !== 'admin' && 
                                <>
                                <NavLink to={userType === 'user' ? '/user/profile':'/company' }  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600  " role="menuitem" tabIndex="-1" id="user-menu-item-0">Your profile</NavLink>
                                <NavLink to='/login'  onClick={() => {
                                    localStorage.removeItem("token");
                                    setIsLoggedIn(false);
                                    setIsProfileDropdownOpen(false);
                                    navigate("/login");
                                }}  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600" role="menuitem" tabIndex="-1" id="user-menu-item-1">Sign out</NavLink>
                                </>
                                )}
                                {(isLoggedIn && userType === 'admin' && 
                                <>
                                <NavLink to='/login'  onClick={() => {
                                    localStorage.removeItem("token");
                                    setIsLoggedIn(false);
                                    setIsProfileDropdownOpen(false);
                                    navigate("/login");
                                }}  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600" role="menuitem" tabIndex="-1" id="user-menu-item-1">Sign out</NavLink>
                                </>
                                )}

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
                    {/* Show Home link only for company users and non-logged in users in mobile */}
                    {(isLoggedIn && userType === 'company') || !isLoggedIn ? (
                        <NavLink 
                            to={isLoggedIn && userType === 'company' ? '/company' : '/home'} 
                            className={({ isActive }) => 
                                `block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 relative ${
                                    isActive 
                                        ? 'text-white bg-cyan-600 shadow-lg' 
                                        : 'text-white dark:hover:bg-gray-700 hover:bg-cyan-600 hover:text-white'
                                }`
                            }
                        >
                            Home
                            {({ isActive }) => isActive && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            )}
                        </NavLink>
                    ) : null}
                    {/* Show Dashboard link only for admin users in mobile */}
                    {isLoggedIn && userType === 'admin' && (
                        <NavLink 
                            to="/admin/dashboard" 
                            className={({ isActive }) => 
                                `block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 relative ${
                                    isActive 
                                        ? 'text-white bg-cyan-600 shadow-lg' 
                                        : 'text-white dark:hover:bg-gray-700 hover:bg-cyan-600 hover:text-white'
                                }`
                            }
                        >
                            Dashboard
                            {({ isActive }) => isActive && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                            )}
                        </NavLink>
                    )}
                    <NavLink 
                        to="about" 
                        className={({ isActive }) => 
                            `block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 relative ${
                                isActive 
                                    ? 'text-white bg-cyan-600 shadow-lg' 
                                    : 'text-white dark:hover:bg-gray-700 hover:bg-cyan-600 hover:text-white'
                            }`
                        }
                    >
                        About us
                        {({ isActive }) => isActive && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        )}
                    </NavLink>
                    <NavLink 
                        to="tips" 
                        className={({ isActive }) => 
                            `block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 relative ${
                                isActive 
                                    ? 'text-white bg-cyan-600 shadow-lg' 
                                    : 'text-white dark:hover:bg-gray-700 hover:bg-cyan-600 hover:text-white'
                            }`
                        }
                    >
                        Courses
                        {({ isActive }) => isActive && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        )}
                    </NavLink>
                    <NavLink 
                        to="faq" 
                        className={({ isActive }) => 
                            `block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200 relative ${
                                isActive 
                                    ? 'text-white bg-cyan-600 shadow-lg' 
                                    : 'text-white dark:hover:bg-gray-700 hover:bg-cyan-600 hover:text-white'
                            }`
                        }
                    >
                        FAQ
                        {({ isActive }) => isActive && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        )}
                    </NavLink>
                </div>
            </div>)}
        </nav>
        </>
    )
}