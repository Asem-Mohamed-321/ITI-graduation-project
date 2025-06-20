

export default function () {
  return (
    <div className="flex flex-col md:flex-row w-11/12 max-w-7xl mx-auto mt-5 bg-white">
      
      {/* Left side - form */}
      <div className="w-full md:w-1/2 py-10 px-6 md:px-24 lg:px-48">
        <p className="text-center font-extrabold text-xl md:text-2xl mb-10">SIGN IN TO THE CV CHECKER</p>
        
        <div className="flex flex-col space-y-4">
          <div>
            <label className="text-sm font-bold" htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Username"
              className="w-full border-2 border-gray-300 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500" />
          </div>
          
          <div>
            <label className="text-sm font-bold" htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password"
              className="w-full border-2 border-red-500 rounded-md p-2 mt-2 focus:outline-none focus:border-blue-500" />
            <p className="text-red-600 font-light italic">Please choose a password</p>
          </div>
          
          <div>
            <button className="w-fit bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Sign In</button>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-center font-normal">
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-500">Create a new account</a>
          </p>
        </div>
      </div>

      {/* Right side - image */}
      <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
        <img src="../src/assets/loginVectorImage.png" alt="Login vector" className="max-w-full h-auto" />
      </div>
    </div>
  );
}