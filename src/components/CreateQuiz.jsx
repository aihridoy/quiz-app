/* eslint-disable react/prop-types */
const CreateQuiz = ({ quizData, questionTitle, setQuestionTitle, options, correctAnswerIndex, setCorrectAnswerIndex, handleOptionChange, handleSaveQuiz, loading, successMessage, errorMessage }) => {
    return (
        <div className="">
            <h2 className="text-3xl font-bold mb-4">{quizData.title}</h2>
            <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
                Total number of questions : 1
            </div>
            <p className="text-gray-600 mb-4">
                {quizData.description}
            </p>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Question Title</label>
                    <input type="text" id="quizTitle"
                        name="quizTitle"
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                        className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
                        placeholder="Enter quiz title" />
                </div>

                <p className="text-sm text-gray-600 mt-4">Add Options</p>

                <div id="optionsContainer" className="space-y-2 mt-4">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
                        >
                            <input
                                type="radio"
                                name="correctAnswer"
                                value={index}
                                checked={correctAnswerIndex === index}
                                onChange={() => setCorrectAnswerIndex(index)}
                                className="text-primary focus:ring-0 w-4 h-4"
                            />
                            <label htmlFor={`option${index}`} className="sr-only">
                                Option {index + 1}
                            </label>
                            <input
                                type="text"
                                id={`optionText${index}`}
                                name={`optionText${index}`}
                                value={option}
                                onChange={(e) =>
                                    handleOptionChange(index, e.target.value)
                                }
                                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                                placeholder={`Option ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleSaveQuiz}
                    className={`w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors ${loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Quiz"}
                </button>

                {successMessage && (
                    <p className="text-green-600 mt-2">{successMessage}</p>
                )}
                {errorMessage && (
                    <p className="text-red-600 mt-2">{errorMessage}</p>
                )}
            </div>


        </div>
    );
};

export default CreateQuiz;