/* eslint-disable react/prop-types */
const CreatedQuiz = ({ questionsList, handleDeleteQuestion, handleEditQuestion }) => {
    return (
        <div>
            {questionsList.map((question) => {
                return <div key={question.id} className="rounded-lg overflow-hidden shadow-sm mb-4">
                    <div className="bg-white p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">
                                {question.id}. {question.questionTitle}
                            </h3>
                        </div>
                        <div className="space-y-2">
                            {question.options.map((option, index) => (
                                <label
                                    key={index}
                                    className="flex items-center space-x-3"
                                >
                                    <input
                                        type="radio"
                                        name={`answer${question.id}`}
                                        className="form-radio text-purple-600"
                                        checked={option === question.correctAnswer}
                                        readOnly
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex space-x-4 bg-gray-100 px-6 py-2">
                        <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="text-red-600 font-medium"
                        >
                            Delete
                        </button>
                        <button onClick={() => handleEditQuestion(question.id)} className="text-blue-600 font-medium">Edit Question</button>
                    </div>
                </div>
            })}
        </div>
    );
};

export default CreatedQuiz;