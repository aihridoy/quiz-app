/* eslint-disable react/prop-types */
import { useState } from 'react';
import { shuffleArray } from '../utils/shuffleArray';
import { useEffect } from 'react';

const QuizQuestion = ({ question, onNext, isLastQuestion, onAnswerSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        onAnswerSelect(question.id, option);
    };

    const handleNextClick = () => {
        if (selectedOption !== null) {
            onNext();
            setSelectedOption(null);
        }
    };

    useEffect(() => {
        if (question?.options) {
            setShuffledOptions(shuffleArray(question.options));
        }
    }, [question]);

    return (
        <div className="lg:col-span-2 bg-white">
            <div className="bg-white p-6 !pb-2 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold">{question.question}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {shuffledOptions.map((option, index) => (
                        <label key={index} className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg">
                            <input
                                type="radio"
                                name={`question_${question.id}`}
                                className="form-radio text-buzzr-purple"
                                checked={selectedOption === option}
                                onChange={() => handleOptionChange(option)}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
                <button
                    onClick={handleNextClick}
                    className={`w-1/2 text-center ml-auto block py-2 px-4 rounded-md font-semibold my-8 ${selectedOption ? 'bg-primary text-white hover:bg-indigo-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    disabled={!selectedOption}
                >
                    {isLastQuestion ? 'Submit' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default QuizQuestion;
