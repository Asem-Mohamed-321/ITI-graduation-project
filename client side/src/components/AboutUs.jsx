import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors duration-500 py-12 px-2">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-200 mb-4 drop-shadow">
            About Us
          </h1>
          <div className="w-24 h-1 bg-blue-400 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Empowering job seekers with intelligent CV analysis and career guidance
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Our Story */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Story</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Founded with a vision to bridge the gap between job seekers and their dream careers, 
              we've developed an innovative platform that combines AI-powered CV analysis with 
              personalized career guidance. Our journey began with a simple question: "How can we 
              make the job application process more effective and less stressful?"
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-blue-200 dark:border-blue-700">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To revolutionize the job application process by providing intelligent CV analysis, 
              personalized feedback, and comprehensive career guidance. We believe every individual 
              deserves the tools and insights needed to present their best professional self.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 mb-16 border border-blue-200 dark:border-blue-700">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">Continuously improving our technology to provide cutting-edge solutions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User-Centric</h3>
              <p className="text-gray-600 dark:text-gray-300">Putting our users' needs first in everything we do</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Trust</h3>
              <p className="text-gray-600 dark:text-gray-300">Building reliable and secure platforms that users can depend on</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-blue-200 dark:border-blue-700">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">O</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Omar Friga</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium">Front-End Developer</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Asem Mohamed</h3>
              <p className="text-green-600 dark:text-green-400 font-medium">Front-End Developer</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">A</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Ahmed Ezzat</h3>
              <p className="text-purple-600 dark:text-purple-400 font-medium">Back-End Developer</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">K</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Kero Ibrahim</h3>
              <p className="text-red-600 dark:text-red-400 font-medium">Back-End Developer</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">Y</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">Youssef Zaki</h3>
              <p className="text-orange-600 dark:text-orange-400 font-medium">Back-End Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 