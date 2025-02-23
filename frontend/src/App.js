// src/App.js
import React, { useState } from 'react';
import MCQBuilder from './MCQBuilder';


function App() {
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleOptionClick = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedOption = optionIndex;
    setQuestions(updatedQuestions);
  };

  return (
    <div className="App p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">MCQ Question Builder</h1>
      <MCQBuilder onAddQuestion={handleAddQuestion} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Created Questions</h2>
      <ul className="space-y-4">
        {questions.map((q, questionIndex) => (
          <li key={questionIndex} className="p-4 bg-white rounded shadow">
            <strong className="block text-gray-700">Question:</strong> {q.question}
            <strong className="block text-gray-700 mt-2">Options:</strong>
            <div className="ml-5">
              {q.options.map((option, optionIndex) => (
                <div key={optionIndex} className="mb-2 flex items-center">
                  <input
                    type="radio"
                    id={`option-${questionIndex}-${optionIndex}`}
                    name={`option-${questionIndex}`}
                    className="mr-2"
                    checked={q.selectedOption === optionIndex}
                    onChange={() => handleOptionClick(questionIndex, optionIndex)}
                  />
                  <label
                    htmlFor={`option-${questionIndex}-${optionIndex}`}
                    className={`py-2 px-4 rounded ${
                      q.selectedOption === optionIndex ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
