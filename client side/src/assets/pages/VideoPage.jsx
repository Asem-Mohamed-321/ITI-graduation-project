import React, { useState, useRef, useEffect } from 'react';

function ATSBridge() {
  const videos = [
    {
      title: "How to Write a CV | CV Writing | Job Hunting",
      duration: "14:01",
      url: "https://www.youtube.com/embed/0jQwXfsOds4?autoplay=1",
      description: "Learn how to create a professional CV and improve your job application chances.",
      type: "iframe"
    },
    {
      title: "CV Writing Tips and Examples",
      duration: "12:03",
      url: "https://www.youtube.com/embed/fvtM-SHkc98?autoplay=1",
      description: "Tips and examples to help you write a better CV.",
      type: "iframe"
    },
    {
      title: "CV Writing Tips and Examples",
      duration: "12:03",
      url: "https://www.youtube.com/embed/fvtM-SHkc98?autoplay=1",
      description: "Tips and examples to help you write a better CV.",
      type: "iframe"
    },
    {
      title: "How to Write a CV | CV Writing | Job Hunting",
      duration: "14:01",
      url: "https://www.youtube.com/embed/0jQwXfsOds4?autoplay=1",
      description: "Learn how to create a professional CV and improve your job application chances.",
      type: "iframe"
    },
    {
      title: "CV Writing Tips and Examples",
      duration: "12:03",
      url: "https://www.youtube.com/embed/fvtM-SHkc98?autoplay=1",
      description: "Tips and examples to help you write a better CV.",
      type: "iframe"
    },
    {
      title: "How to Write a CV | CV Writing | Job Hunting",
      duration: "14:01",
      url: "https://www.youtube.com/embed/0jQwXfsOds4?autoplay=1",
      description: "Learn how to create a professional CV and improve your job application chances.",
      type: "iframe"
    }
  ];

  const [index, setIndex] = useState(0);
  const playerRef = useRef(null);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrevious = () => {
    setIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const selectVideo = (newIndex) => {
    setIndex(newIndex);
  };

  useEffect(() => {
    if (playerRef.current && videos[index].type === 'iframe') {
      playerRef.current.src = videos[index].url;
    }
  }, [index]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-white mb-2">ATS_BRIDGE</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-black rounded-lg overflow-hidden aspect-video">
            <iframe
              ref={playerRef}
              src={videos[index].url}
              width="100%"
              height="100%"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={videos[index].title}
            ></iframe>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handlePrevious}
              className="px-4 py-2 bg-inherit hover:opacity-50 hover:cursor-pointer text-white border border-white rounded flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0L6.586 10l4.707-4.707a1 1 0 111.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Previous
            </button>
            <button
              onClick={handleNext}
              className="hover:opacity-50 hover:cursor-pointer px-4 py-2 bg-inherit text-white border border-white rounded flex items-center gap-1 transition-colors"
            >
              Next
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 001.414 0L13.414 10l-4.707-4.707a1 1 0 10-1.414 1.414L10.586 10l-3.293 3.293a1 1 0 000 1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-800 rounded">
            <h2 className="text-lg font-semibold text-white mb-1">Description</h2>
            <p className="text-gray-300">{videos[index].description}</p>
          </div>
        </div>
        
        <div className="w-full md:w-64 bg-white text-black scrollable">
          <h2 className="text-xl font-semibold mb-3 text-black">Video List</h2>
          
          <div className="mb-4 text-sm text-black">
            <p>{index + 1} / {videos.length} • Career Essentials</p>
          </div>
          
          <ul className="space-y-2 pr-2 scrollable">
            {videos.map((video, i) => (
              <li
                key={i}
                onClick={() => selectVideo(i)}
                className={`p-3 rounded cursor-pointer transition-colors ${
                  i === index
                    ? 'bg-blue-500 text-white font-semibold'
                    : 'hover:bg-gray-700'
                }`}
              >
                <div className="font-medium">{video.title}</div>
                <div className="text-sm text-gray-400">{video.duration}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ATSBridge;