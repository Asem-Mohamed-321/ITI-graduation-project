import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Footer = ({ minimal }) => {
  if (minimal) {
    return (
      <footer className="bg-teal-800 dark:bg-slate-800 text-white animate__animated animate__fadeInUp">
        <div className="max-w-screen-xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <hr className="w-full border-t border-teal-700 dark:border-slate-700 mb-2" />
          <p className="text-xs text-center text-white opacity-80">&copy; {new Date().getFullYear()} Resume Checker. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  return (
    <footer className="bg-teal-800 dark:bg-slate-800 text-white animate__animated animate__fadeInUp">
      <div className="max-w-screen-xl mx-auto py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold">Resume Checker</h3>
            <p className="mt-4 text-lg text-white">
              Get instant feedback on your resume and improve your score.
            </p>
            <div className="mt-6 flex space-x-6 text-2xl">
              <a href="#" className="text-white hover:text-blue-300" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="#" className="text-white hover:text-red-400" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="#" className="text-white hover:text-blue-400" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-white hover:text-green-400" aria-label="Website">
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-lg text-white hover:text-blue-300">Features</a></li>
              <li><a href="#" className="text-lg text-white hover:text-blue-300">How it Works</a></li>
              <li><a href="#" className="text-lg text-white hover:text-blue-300">Pricing</a></li>
              <li><a href="#" className="text-lg text-white hover:text-blue-300">Log in</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-lg text-white hover:text-blue-300">Blog</a></li>
              <li><a href="#" className="text-lg text-white hover:text-blue-300">Help Center</a></li>
              <li><a href="#" className="text-lg text-white hover:text-blue-300">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-lg text-white hover:text-blue-300">About Us</a></li>
              <li><a href="#" className="text-lg text-white hover:text-blue-300">Careers</a></li>
              <li><a href="#" className="text-lg text-white hover:text-blue-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 