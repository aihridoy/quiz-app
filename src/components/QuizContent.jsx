/* eslint-disable react/prop-types */
const QuizContent = ({ submittedAnswers, correctAnswers, quizData }) => {
    const getOptionStyle = (questionId, option) => {
        const userAnswer = submittedAnswers.find(
            (ans) => ans.question_id === questionId
        );
        const correctAnswer = correctAnswers.find(
            (ans) => ans.question_id === questionId
        );

        if (correctAnswer?.answer === option) {
            return "bg-green-100 text-green-700 border-green-500";
        }

        if (userAnswer?.answer === option && correctAnswer?.answer !== option) {
            return "bg-red-100 text-red-700 border-red-500";
        }

        return "bg-gray-100 text-gray-700";
    };

    return (
        <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
            <div className="h-[calc(100vh-50px)] overflow-y-scroll">
                {quizData?.questions.map((question, index) => {
                    return <div key={question.id} className="rounded-lg overflow-hidden shadow-sm mb-4">
                        <div className="bg-white p-6 !pb-2">
                            <h3 className="text-lg font-semibold">
                                {index + 1}. {question.question}
                            </h3>
                            <div className="space-y-2 mt-4">
                                {question.options.map((option, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center space-x-3 p-2 border rounded ${getOptionStyle(
                                            question.id,
                                            option
                                        )}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`answer-${question.id}`}
                                            className="form-radio"
                                            disabled
                                            checked={
                                                submittedAnswers.find(
                                                    (ans) => ans.question_id === question.id
                                                )?.answer === option
                                            }
                                        />
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
};

export default QuizContent;
