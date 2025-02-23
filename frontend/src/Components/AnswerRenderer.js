import React from "react";

const AnswerRenderer = ({ template, setAnswers }) => {
  const handleInputChange = (state, field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [state]: true,
      [field]: value,
    }));
  };

  return (
    <div className="w-full max-w-2xl p-4">
      {/* Render String Questions */}
      {[1, 2, 3, 4].map((num) => {
        const stateKey = `string${num}State`;
        const questionKey = `string${num}Question`;
        const answerKey = `string${num}Answer`;
        return (
          template[stateKey] && (
            <div key={num} className="mb-4">
              <label className="block">{template[questionKey]}</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-white text-black"
                onChange={(e) =>
                  handleInputChange(stateKey, answerKey, e.target.value)
                }
              />
            </div>
          )
        );
      })}

      {/* Render Text Questions */}
      {[1, 2, 3, 4].map((num) => {
        const stateKey = `text${num}State`;
        const questionKey = `text${num}Question`;
        const answerKey = `text${num}Answer`;
        return (
          template[stateKey] && (
            <div key={num} className="mb-4">
              <label className="block">{template[questionKey]}</label>
              <textarea
                className="w-full p-2 border rounded bg-white text-black"
                onChange={(e) =>
                  handleInputChange(stateKey, answerKey, e.target.value)
                }
              />
            </div>
          )
        );
      })}

      {/* Render Integer Questions */}
      {[1, 2, 3, 4].map((num) => {
        const stateKey = `int${num}State`;
        const questionKey = `int${num}Question`;
        const answerKey = `int${num}Answer`;
        return (
          template[stateKey] && (
            <div key={num} className="mb-4">
              <label className="block">{template[questionKey]}</label>
              <input
                type="number"
                className="w-full p-2 border rounded bg-white text-black"
                onChange={(e) =>
                  handleInputChange(
                    stateKey,
                    answerKey,
                    e.target.value ? parseInt(e.target.value, 10) : null
                  )
                }
              />
            </div>
          )
        );
      })}

      {/* Render Checkbox Questions */}
      {[1, 2, 3, 4].map((num) => {
        const stateKey = `checkbox${num}State`;
        const questionKey = `checkbox${num}Question`;
        const answerKey = `checkbox${num}Answer`;

        return (
          template[stateKey] && (
            <div key={num} className="mb-4">
              <label className="block text-lg font-medium  mb-2">
                {template[questionKey]}
              </label>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((optNum) => {
                  const optionKey = `checkbox${num}Option${optNum}`;
                  return (
                    template[optionKey] && (
                      <div
                        key={optNum}
                        className="flex items-center space-x-3 p-2 rounded-md bg-white shadow-sm"
                      >
                        <input
                          type="radio"
                          name={`checkbox${num}`}
                          id={optionKey}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          onChange={(e) =>
                            handleInputChange(
                              stateKey,
                              answerKey,
                              parseInt(optNum, 10)
                            )
                          }
                        />
                        <label
                          htmlFor={optionKey}
                          className="text-gray-700 text-base cursor-pointer"
                        >
                          {template[optionKey]}
                        </label>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default AnswerRenderer;
