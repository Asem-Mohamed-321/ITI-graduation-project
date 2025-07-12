import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

function transformTests(testsArray) {
  const result = {};
  testsArray.forEach((categoryObj) => {
    const [category, questions] = Object.entries(categoryObj)[0];
    result[category.toLowerCase()] = questions.map((q, idx) => ({
      id: `${category.toLowerCase()}${idx + 1}`,
      question: q.content,
      choices: q.choices,
      correctAnswer: q.choices.find(c => c.startsWith(q["correct answer"] + "."))
    }));
  });
  return result;
}


export default function Questions() {
  const location = useLocation();
  let { tests } = location.state || {};
  tests = tests.slice(0, 5);
  const questionsData = transformTests(tests);

  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    console.log("Loaded tests:", tests);
  }, []);

  const [completionStatus, setCompletionStatus] = useState(() => {
    const status = {};
    Object.keys(questionsData).forEach((topic) => {
      status[topic] = {
        completed: 0,
        total: questionsData[topic].length,
      };
    });
    return status;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setShowResults(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCompletionStatus((prev) => {
      const newStatus = { ...prev };
      Object.keys(questionsData).forEach((topic) => {
        const answered = questionsData[topic].filter(
          (q) => answers[q.id] !== undefined
        ).length;
        newStatus[topic] = {
          ...newStatus[topic],
          completed: answered,
          total: questionsData[topic].length,
        };
      });
      return newStatus;
    });
  }, [answers]);

  const handleSelect = (questionId, choice) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choice }));
  };

  const calculateResults = () => {
    const results = {};
    Object.keys(questionsData).forEach((topic) => {
      const topicQuestions = questionsData[topic];
      let correct = 0;
      topicQuestions.forEach((q) => {
        if (answers[q.id] === q.correctAnswer) correct++;
      });
      results[topic] = {
        correct,
        total: topicQuestions.length,
        percentage:
          topicQuestions.length > 0
            ? Math.round((correct / topicQuestions.length) * 100)
            : 0,
      };
    });
    return results;
  };

  const handleSubmit = () => {
    if (timeLeft > 0) setShowResults(true);
  };

  const closeModal = () => {
    setShowResults(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white p-4">
      {/* Sidebar */}
      <div className="md:w-1/4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow mr-4 h-fit">
        <h1 className="text-xl font-bold mb-4">Questions</h1>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded mb-6">
          <div className="font-semibold">Timer</div>
          <div className="text-2xl">
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
            {String(timeLeft % 60).padStart(2, "0")}
          </div>
        </div>
        <div className="space-y-2">
          {Object.entries(completionStatus).map(([topic, status]) => (
            <div
              key={topic}
              className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded"
            >
              <span className="capitalize">{topic}</span>
              <span className="text-sm text-gray-500 dark:text-gray-300">
                {status.completed}/{status.total}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Questions */}
      <div className="flex-1 space-y-4">
        {Object.entries(questionsData).map(([topic, questions]) => (
          <div
            key={topic}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
          >
            <h2 className="text-lg font-semibold mb-4">
              {topic.charAt(0).toUpperCase() + topic.slice(1)}
            </h2>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded"
                >
                  <p className="font-medium mb-3">
                    {index + 1}. {q.question}
                  </p>
                  <div className="space-y-2 ml-2">
                    {q.choices.map((choice) => (
                      <label key={choice} className="flex items-center">
                        <input
                          type="radio"
                          name={q.id}
                          checked={answers[q.id] === choice}
                          onChange={() => handleSelect(q.id, choice)}
                          className="mr-2"
                        />
                        {choice}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={timeLeft <= 0}
            className={`px-6 py-2 rounded-lg text-white ${
              timeLeft <= 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Submit Answers
          </button>
        </div>
      </div>

      {/* Results Modal */}
      {showResults && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-1/2 text-black dark:text-white">
            <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
            {Object.entries(calculateResults())
              .filter(([_, result]) => result.total > 0)
              .map(([topic, result]) => (
                <div key={topic} className="mb-4">
                  <div className="flex justify-between items-center">
                    <span className="capitalize font-medium">{topic}</span>
                    <span>
                      {result.correct}/{result.total} ({result.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 h-2 mt-1">
                    <div
                      className="bg-green-500 h-2"
                      style={{ width: `${result.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
