import React from 'react';

const CVScoreCard = ({ cv }) => {
  const { scoreResult, jobDescription, createdAt, cvFileUrl } = cv;
  
  if (!scoreResult) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
        <div className="text-gray-500">No scoring data available</div>
      </div>
    );
  }

  const { overall_score, breakdown, sections, final_suggestions } = scoreResult;

  // Function to get color based on score
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Function to get section color
  const getSectionColor = (score) => {
    if (score >= 8) return 'border-green-200 bg-green-50';
    if (score >= 6) return 'border-blue-200 bg-blue-50';
    if (score >= 4) return 'border-yellow-200 bg-yellow-50';
    return 'border-red-200 bg-red-50';
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700 mb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <div className={`text-4xl font-bold px-4 py-2 rounded-lg ${getScoreColor(overall_score)}`}>
            {overall_score}%
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Overall Score</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {cvFileUrl && (
          <a
            href={cvFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            View CV
          </a>
        )}
      </div>

      {/* Job Description */}
      {jobDescription && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Job Description</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-truncate-3">
            {jobDescription}
          </p>
        </div>
      )}

      {/* Score Breakdown */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Score Breakdown</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(breakdown).map(([key, score]) => (
            <div key={key} className={`p-3 rounded-lg border ${getSectionColor(score)}`}>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 capitalize">
                {key.replace(/_/g, ' ')}
              </div>
              <div className="text-lg font-bold text-gray-800 dark:text-gray-200">
                {score}/15
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Sections */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Detailed Analysis</h4>
        <div className="space-y-4">
          {Object.entries(sections).map(([sectionName, sectionData]) => (
            <div key={sectionName} className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-medium text-gray-800 dark:text-gray-200 capitalize">
                  {sectionName.replace(/_/g, ' ')}
                </h5>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getScoreColor(sectionData.score)}`}>
                  {sectionData.score}/15
                </span>
              </div>
              
              {sectionData.feedback && (
                <div className="space-y-2">
                  {sectionData.feedback.strengths && sectionData.feedback.strengths.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-green-600">Strengths:</span>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 ml-4 mt-1">
                        {sectionData.feedback.strengths.map((strength, index) => (
                          <li key={index} className="list-disc">{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {sectionData.feedback.weaknesses && sectionData.feedback.weaknesses.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-red-600">Areas for Improvement:</span>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 ml-4 mt-1">
                        {sectionData.feedback.weaknesses.map((weakness, index) => (
                          <li key={index} className="list-disc">{weakness}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {sectionData.feedback.suggestions && sectionData.feedback.suggestions.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-blue-600">Suggestions:</span>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 ml-4 mt-1">
                        {sectionData.feedback.suggestions.map((suggestion, index) => (
                          <li key={index} className="list-disc">{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Final Suggestions */}
      {final_suggestions && final_suggestions.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Key Recommendations</h4>
          <ul className="space-y-2">
            {final_suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CVScoreCard; 