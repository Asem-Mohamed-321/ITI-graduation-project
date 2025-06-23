import YellowButton from "./YellowButton"
import "animate.css"

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-white dark:bg-slate-900 py-16 md:py-24 animate__animated animate__fadeInDown">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-8 px-0 md:px-2">
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-start justify-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-[1.15] text-gray-900 dark:text-white">
              Free ATS Resume Checker
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-base md:text-lg max-w-lg leading-relaxed">
              Get instant feedback on your resume with 15 ATS-based checks. See your personalized score in under 1 minute and fix weaknesses before applying to any job.
            </p>
            <YellowButton className="mb-2 w-full sm:w-auto py-4 px-8 text-lg md:text-xl animate__animated animate__pulse animate__infinite">Check Your Resume Score</YellowButton>
          </div>
          {/* Right: Image/Card */}
          <div className="flex-1 flex justify-center items-center w-full">
            <div className="rounded-xl shadow-lg p-3 md:p-4 w-full max-w-md flex items-center justify-center min-h-[220px] bg-white dark:bg-slate-800">
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
        <hr className="w-1/3 border-t border-gray-300 dark:border-gray-700" />
      </div>

      {/* Features Section */}
      <section className="w-full bg-white dark:bg-slate-900 py-16 md:py-24 animate__animated animate__fadeInUp">
        <div className="max-w-screen-xl mx-auto px-0 md:px-2">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-14 text-gray-900 dark:text-white animate__animated animate__fadeInUp">
            Check Your Resume for Gaps & Weaknesses
          </h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-stretch">
            {/* Feature 1 */}
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow p-4 flex flex-col items-center text-center max-w-sm mx-auto animate__animated animate__fadeInUp animate__delay-1s">
              <img src="/images/resume-stru.png" alt="Resume Structure Feature" className="w-56 h-44 object-contain mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Grade Your Resume in Real Time</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Get a detailed breakdown of the existing issues with your resume, and how to fix them.<br/>
                The AI Checker will score your resume against industry standards to uncover opportunities for improvement.<br/>
                Receive instant feedback on content strength, comprehensiveness, formatting, and more.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow p-4 flex flex-col items-center text-center max-w-sm mx-auto animate__animated animate__fadeInUp animate__delay-2s">
              <img src="/images/Overall.png" alt="ATS Overall Score Feature" className="w-56 h-44 object-contain mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Validate If Your Resume is ATS-Friendly</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Verify if your resume is fully compatible with applicant tracking systems.<br/>
                Check your professional summary, bullets, and skills to ensure that your resume is aligned with best practices.<br/>
                Identify qualitative issues that you can improve to showcase your career in the strongest possible light.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow p-4 flex flex-col items-center text-center max-w-sm mx-auto animate__animated animate__fadeInUp animate__delay-3s">
              <img src="/images/Achiv.png" alt="Achievements Feature" className="w-56 h-44 object-contain mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Find Ways to Enhance Key Sections of Your Resume</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
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
        <hr className="w-1/3 border-t border-gray-300 dark:border-gray-700" />
      </div>

      {/* Is Your Resume in Good Standing? Section */}
      <section className="w-full bg-teal-800 dark:bg-slate-800 py-16 md:py-24 flex flex-col items-center animate__animated animate__fadeInUp">
        <div className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">Is Your Resume in Good Standing?</h2>
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Left: Image */}
              <div className="flex-1 flex justify-center">
                <img src="/images/bb.png" alt="Resume in good standing preview" className="rounded-lg shadow-lg max-w-full" />
              </div>
              {/* Right: Text */}
              <div className="flex-1 text-gray-800 dark:text-gray-100">
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Our AI Resume Checker does more than basic scoring, it analyzes your resume like a professional recruiter would and examines each individual section to identify pressing issues that we have seen be influential in the hiring process.
                </p>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  The resume check is designed to deliver personalized recommendations for how you can enhance your resume content and appearance in meaningful ways. We developed the resume score to give job seekers an easy, accurate mechanism to make sure their resume is in good shape, before they apply.
                </p>
                <p className="mb-3 font-semibold text-gray-900 dark:text-white">
                  Get immediate feedback on the current state of your resume, and see how it stacks up in different categories:
                </p>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-disc list-inside">
                  <li>Resume Structure</li>
                  <li>Information Completeness</li>
                  <li>Measurable Results</li>
                  <li>Language & Keyword Usage</li>
                  <li>Quality Signals</li>
                  <li>+5 More</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="w-full bg-white dark:bg-slate-900 py-16 md:py-24 animate__animated animate__fadeInUp">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-20 text-gray-900 dark:text-white animate__animated animate__fadeInUp">
            How to Use the Resume Checker
          </h2>
          <div className="space-y-16">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 animate__animated animate__fadeInUp">
              <div className="flex-1 text-left">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-20 mr-4">
                    <svg className="w-full h-full text-teal-600 dark:text-white" fill="currentColor" viewBox="0 0 48 56">
                      <path d="M48 56L24 42L0 56V0H48V56Z" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-white dark:text-slate-800 text-3xl font-bold">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Import Your Existing Resume into the Resume Builder</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Don't have an existing resume? Import your LinkedIn profile, or build a resume from scratch in minutes.
                </p>
              </div>
              <div className="flex-1 mt-6 md:mt-0">
                <img src="/images/1.png" alt="Import Resume" className="rounded-lg shadow-xl w-full h-auto" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 animate__animated animate__fadeInUp animate__delay-1s">
              <div className="flex-1 mt-6 md:mt-0 md:order-2">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-20 mr-4">
                    <svg className="w-full h-full text-teal-600 dark:text-white" fill="currentColor" viewBox="0 0 48 56">
                      <path d="M48 56L24 42L0 56V0H48V56Z" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-white dark:text-slate-800 text-3xl font-bold">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Go to the "Analysis" section to check your Resume Score</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  To check your resume score and review the findings, simply head to the "Analysis" section by clicking the following tab. Your resume analysis will run automatically, so there's no need to manually start or run anything.
                </p>
              </div>
              <div className="flex-1 md:order-1">
                <img src="/images/2.png" alt="Analyze Score" className="rounded-lg shadow-xl w-full h-auto" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 animate__animated animate__fadeInUp animate__delay-2s">
              <div className="flex-1 text-left">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-20 mr-4">
                    <svg className="w-full h-full text-teal-600 dark:text-white" fill="currentColor" viewBox="0 0 48 56">
                      <path d="M48 56L24 42L0 56V0H48V56Z" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-white dark:text-slate-800 text-3xl font-bold">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Review Your Results and Start Making Improvements</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Once you're in the "Analysis" section, you'll see a list of your existing issues. To view details about each issue, click the issue card to see the description, and click "Show Me" to see exactly where this issue exists on your resume.
                </p>
              </div>
              <div className="flex-1 mt-6 md:mt-0">
                <img src="/images/3.png" alt="Review Results" className="rounded-lg shadow-xl w-full h-auto" />
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 animate__animated animate__fadeInUp animate__delay-3s">
              <div className="flex-1 mt-6 md:mt-0 md:order-2">
                <div className="flex items-center mb-4">
                  <div className="relative w-16 h-20 mr-4">
                    <svg className="w-full h-full text-teal-600 dark:text-white" fill="currentColor" viewBox="0 0 48 56">
                      <path d="M48 56L24 42L0 56V0H48V56Z" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-white dark:text-slate-800 text-3xl font-bold">4</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Make Improvements to Increase Your Resume Score</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  From here, simply make the appropriate changes to resolve the issues, and you'll see your resume score updated in real-time. That's it! Check your resume score to start making enhancements within minutes.
                </p>
              </div>
              <div className="flex-1 md:order-1">
                <img src="/images/4.png" alt="Increase Score" className="rounded-lg shadow-xl w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home 