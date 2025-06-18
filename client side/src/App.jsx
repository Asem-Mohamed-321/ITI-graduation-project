import Navbar from "./components/navbar"
import YellowButton from "./components/YellowButton"
import "animate.css"

function App() {
  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-8 px-0 md:px-2 animate__animated animate__fadeInDown">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-start justify-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-[1.15] text-gray-900">
              Free ATS Resume Checker
            </h1>
            <p className="text-gray-700 mb-6 text-base md:text-lg max-w-lg leading-relaxed">
              Get instant feedback on your resume with 15 ATS-based checks. See your personalized score in under 1 minute and fix weaknesses before applying to any job.
            </p>
            <YellowButton className="mb-2 w-full sm:w-auto py-4 px-8 text-lg md:text-xl animate__animated animate__pulse animate__infinite">Check Your Resume Score</YellowButton>
          </div>
          {/* Right: Image/Card */}
          <div className="flex-1 flex justify-center items-center w-full">
            <div className="rounded-xl shadow-lg p-3 md:p-4 w-full max-w-md flex items-center justify-center min-h-[220px]">
              <img
                src="/images/Overall.png"
                alt="ATS Resume Checker Preview"
                className="w-full h-auto object-contain rounded-lg animate__animated animate__fadeInRight"
                style={{maxHeight: 260}}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center my-0">
        <hr className="w-1/3 border-t border-gray-300" />
      </div>

      {/* Features Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-0 md:px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-14 text-gray-900 animate__animated animate__fadeInUp">
            Check Your Resume for Gaps & Weaknesses
          </h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-stretch">
            {/* Feature 1 */}
            <div className="flex-1 bg-white rounded-xl shadow p-4 flex flex-col items-center text-center max-w-sm mx-auto animate__animated animate__fadeInUp animate__delay-1s">
              <img src="/images/resume-stru.png" alt="Resume Structure Feature" className="w-56 h-44 object-contain mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Grade Your Resume in Real Time</h3>
              <p className="text-gray-600 text-sm">
                Get a detailed breakdown of the existing issues with your resume, and how to fix them.<br/>
                The AI Checker will score your resume against industry standards to uncover opportunities for improvement.<br/>
                Receive instant feedback on content strength, comprehensiveness, formatting, and more.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex-1 bg-white rounded-xl shadow p-4 flex flex-col items-center text-center max-w-sm mx-auto animate__animated animate__fadeInUp animate__delay-2s">
              <img src="/images/Overall.png" alt="ATS Overall Score Feature" className="w-56 h-44 object-contain mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Validate If Your Resume is ATS-Friendly</h3>
              <p className="text-gray-600 text-sm">
                Verify if your resume is fully compatible with applicant tracking systems.<br/>
                Check your professional summary, bullets, and skills to ensure that your resume is aligned with best practices.<br/>
                Identify qualitative issues that you can improve to showcase your career in the strongest possible light.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex-1 bg-white rounded-xl shadow p-4 flex flex-col items-center text-center max-w-sm mx-auto animate__animated animate__fadeInUp animate__delay-3s">
              <img src="/images/Achiv.png" alt="Achievements Feature" className="w-56 h-44 object-contain mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900">Find Ways to Enhance Key Sections of Your Resume</h3>
              <p className="text-gray-600 text-sm">
                Receive personalized recommendations to strengthen the crucial parts of your resume.<br/>
                Find opportunities to enhance your resume content with more strengths or use of keywords in each of the main sections.<br/>
                Leverage the Resume Checker to tailor your resume so you can make a meaningful impression on potential employers.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-10 md:mt-14 animate__animated animate__fadeIn animate__delay-2s">
            <YellowButton className="w-full max-w-xs py-4 px-8 text-lg md:text-xl whitespace-nowrap animate__animated animate__pulse animate__infinite">Scan Your Resume for Free</YellowButton>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center my-0">
        <hr className="w-1/3 border-t border-gray-300" />
      </div>

      {/* Bottom Section */}
      <section className="w-full bg-teal-800 py-16 md:py-24 flex justify-center items-center min-h-[220px] animate__animated animate__fadeInUp animate__delay-2s">
        <div className="w-full max-w-screen-xl bg-white rounded-lg shadow-lg p-6 md:p-10 min-h-[120px] flex items-center justify-center">
          {/* You can add a relevant image here later if needed */}
        </div>
      </section>
    </>
  )
}

export default App
