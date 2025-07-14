import React from 'react';

const CVSummary = ({ cvs }) => {
  if (!cvs || cvs.length === 0) return null;

  // Calculate statistics
  const totalCVs = cvs.length;
  const averageScore = Math.round(
    cvs.reduce((sum, cv) => sum + (cv.scoreResult?.overall_score || 0), 0) / totalCVs
  );
  const highestScore = Math.max(...cvs.map(cv => cv.scoreResult?.overall_score || 0));
  const lowestScore = Math.min(...cvs.map(cv => cv.scoreResult?.overall_score || 0));
  
  // Count CVs by score range
  const excellent = cvs.filter(cv => (cv.scoreResult?.overall_score || 0) >= 80).length;
  const good = cvs.filter(cv => {
    const score = cv.scoreResult?.overall_score || 0;
    return score >= 60 && score < 80;
  }).length;
  const needsImprovement = cvs.filter(cv => (cv.scoreResult?.overall_score || 0) < 60).length;

  // Get recent CVs (last 3)
  const recentCVs = cvs
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700 mb-6">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">CV Analysis Summary</h3>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="text-2xl font-bold text-blue-600">{totalCVs}</div>
          <div className="text-sm text-blue-700 dark:text-blue-300">Total CVs</div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="text-2xl font-bold text-green-600">{averageScore}%</div>
          <div className="text-sm text-green-700 dark:text-green-300">Average Score</div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="text-2xl font-bold text-purple-600">{highestScore}%</div>
          <div className="text-sm text-purple-700 dark:text-purple-300">Best Score</div>
        </div>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="text-2xl font-bold text-orange-600">{lowestScore}%</div>
          <div className="text-sm text-orange-700 dark:text-orange-300">Lowest Score</div>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Score Distribution</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Excellent (80%+)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(excellent / totalCVs) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{excellent}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Good (60-79%)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${(good / totalCVs) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{good}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Needs Improvement (&lt;60%)</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${(needsImprovement / totalCVs) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{needsImprovement}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent CVs */}
      {recentCVs.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Recent CVs</h4>
          <div className="space-y-2">
            {recentCVs.map((cv, index) => (
              <div key={cv._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    (cv.scoreResult?.overall_score || 0) >= 80 ? 'bg-green-500' :
                    (cv.scoreResult?.overall_score || 0) >= 60 ? 'bg-blue-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      CV #{totalCVs - index}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {new Date(cv.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  {cv.scoreResult?.overall_score || 'N/A'}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CVSummary; 