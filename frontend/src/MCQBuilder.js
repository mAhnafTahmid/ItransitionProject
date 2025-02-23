// src/MCQBuilder.js
import React, { useState } from 'react';

const MCQBuilder = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState('');
  const [numOptions, setNumOptions] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState('');

  const handleNumOptionsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumOptions(value);
    setOptions(Array(value).fill(''));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      question,
      options,
      correctOption: parseInt(correctOption, 10),
    };
    onAddQuestion(newQuestion);
    // Reset form
    setQuestion('');
    setNumOptions(0);
    setOptions([]);
    setCorrectOption('');
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h3 className="text-xl font-bold mb-4">Create MCQ Question</h3>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Question:</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Number of Options:</label>
          <input
            type="number"
            value={numOptions}
            onChange={handleNumOptionsChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 mb-2">Option {index + 1}:</label>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        ))}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Correct Option (Index):</label>
          <input
            type="number"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default MCQBuilder;
