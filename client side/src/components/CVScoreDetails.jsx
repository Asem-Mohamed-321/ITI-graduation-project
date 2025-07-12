import React from "react";

const CVScoreDetails = ({ score, breakdown, onBack }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-8 flex flex-col gap-6 w-full">
      <button
        className="self-start mb-2 text-blue-600 hover:underline text-sm"
        onClick={onBack}
      >
        &larr; Back
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col items-center justify-center border rounded-xl p-4">
          <div className="text-lg font-semibold mb-2">Your Score</div>
          <div className="text-3xl font-bold text-blue-600 mb-2">{score}%</div>
          <div className="text-xs text-gray-500">content completeness : {breakdown.contentCompleteness}%</div>
          <div className="text-xs text-gray-500">technical quality : {breakdown.technicalQuality}%</div>
          <div className="text-xs text-gray-500">structure readability : {breakdown.structureReadability}%</div>
          <div className="text-xs text-gray-500">competitiveness : {breakdown.competitiveness}%</div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="border rounded-xl p-4">
            <div className="font-semibold mb-1">Content completeness :</div>
            <ul className="list-disc ml-5 text-xs text-gray-700">
              <li>Essential sections: Contact info, Summary, Experience, Skills, Projects.</li>
              <li>Score deduction from missing sections</li>
            </ul>
          </div>
          <div className="border rounded-xl p-4">
            <div className="font-semibold mb-1">Technical Quality :</div>
            <ul className="list-disc ml-5 text-xs text-gray-700">
              <li>Skills specification (e.g. "React (3 years)" better than just "React")</li>
              <li>Quantifiable achievements (e.g. "Increased performance by 20%")</li>
              <li>Relevant Keywords density</li>
            </ul>
          </div>
          <div className="border rounded-xl p-4">
            <div className="font-semibold mb-1">Structure & Readability :</div>
            <ul className="list-disc ml-5 text-xs text-gray-700">
              <li>Clear section hierarchy</li>
              <li>Consistent formatting</li>
              <li>Proper grammar/spelling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVScoreDetails; 