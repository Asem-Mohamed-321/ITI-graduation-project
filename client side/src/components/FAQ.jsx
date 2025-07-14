import React, { useState } from "react";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What is an ATS system and why is it important?",
      answer: "ATS (Applicant Tracking System) is software used by companies to collect, sort, scan, and rank job applications. It's crucial to optimize your resume for ATS because it's the first thing that reviews your application. Our platform helps you create ATS-friendly resumes that pass through these systems successfully."
    },
    {
      id: 2,
      question: "How can I improve my resume score?",
      answer: "To improve your resume score: 1) Use relevant keywords from the job description, 2) Include measurable achievements, 3) Use clear, professional formatting, 4) Ensure all sections are complete, 5) Proofread for errors, 6) Keep it concise (1-2 pages). Our AI analysis will provide specific recommendations for your resume."
    },
    {
      id: 3,
      question: "What should I include in my resume summary?",
      answer: "Your resume summary should include: your professional title, years of experience, key skills, and a brief statement about your career goals. Make it specific to the job you're applying for and include relevant keywords. Keep it to 2-3 sentences maximum."
    },
    {
      id: 4,
      question: "How long should my resume be?",
      answer: "For most professionals, 1-2 pages is ideal. Entry-level candidates can use 1 page, while experienced professionals may need 2 pages. Focus on relevance over length - include only information that's directly related to the job you're applying for."
    },
    {
      id: 5,
      question: "What are the most important sections of a resume?",
      answer: "The most important sections are: Contact Information, Professional Summary, Work Experience, Education, and Skills. Optional but valuable sections include: Certifications, Projects, and Volunteer Work. Each section should be tailored to the specific job."
    },
    {
      id: 6,
      question: "How do I choose the right keywords for my resume?",
      answer: "To find the right keywords: 1) Study the job description carefully, 2) Look for repeated terms and phrases, 3) Include industry-specific terminology, 4) Use both general and specific skill terms, 5) Include software and tools mentioned in the job posting."
    },
    {
      id: 7,
      question: "Should I include a photo on my resume?",
      answer: "In most cases, no. In the US and many other countries, it's not recommended to include a photo unless specifically requested. Focus on your qualifications and experience instead. However, this may vary by country and industry."
    },
    {
      id: 8,
      question: "How often should I update my resume?",
      answer: "Update your resume every 6-12 months or whenever you have significant achievements, new skills, or job changes. Always customize it for each job application to highlight relevant experience and skills."
    },
    {
      id: 9,
      question: "What's the difference between a resume and a CV?",
      answer: "A resume is typically 1-2 pages and focuses on relevant work experience and skills. A CV (Curriculum Vitae) is more comprehensive, often 2+ pages, and includes detailed academic background, publications, research, and extensive work history. Use a resume for most job applications and a CV for academic or research positions."
    },
    {
      id: 10,
      question: "How can I make my resume stand out?",
      answer: "To make your resume stand out: 1) Use strong action verbs, 2) Include quantifiable achievements, 3) Tailor it to each job, 4) Use professional formatting, 5) Include relevant keywords, 6) Show progression in your career, 7) Highlight unique skills or experiences that match the job requirements."
    }
  ];

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 transition-colors duration-500 py-12 px-2">
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 dark:text-blue-200 mb-4 drop-shadow">
            Frequently Asked Questions
          </h1>
          <div className="w-24 h-1 bg-blue-400 rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about resume writing, ATS optimization, 
            and job application strategies
          </p>
        </div>

        {/* FAQ Section */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700 overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors duration-200"
                onClick={() => toggleQuestion(item.id)}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-blue-500 transition-transform duration-200 ${
                      openQuestion === item.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              
              {openQuestion === item.id && (
                <div className="px-6 pb-4 animate__animated animate__fadeIn">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default FAQ; 