import logo from "../assets/logo.svg";
import QuizContent from "../components/QuizContent";
import QuizProgress from "../components/QuizProgress";
import { useQuizResult } from "../context/QuizResultContext";

const Result = () => {
    const { quizResult } = useQuizResult();
    const {
        quizId,
        quizTitle,
        totalMarks,
        userScore,
        questions,
        correctCount,
        wrongCount,
        percentage,
        quizData,
        submittedAnswers,
        correctAnswers
    } = quizResult;
    return (
        <div className="bg-background text-foreground min-h-screen">
            <div className="flex min-h-screen overflow-hidden">
                <img src={logo} className="max-h-11 fixed left-6 top-6 z-50" />
                <QuizProgress
                    quizId={quizId}
                    quizTitle={quizTitle}
                    totalMarks={totalMarks}
                    userScore={userScore}
                    questions={questions}
                    correctCount={correctCount}
                    wrongCount={wrongCount}
                    percentage={percentage}
                />
                <QuizContent
                    quizData={quizData}
                    submittedAnswers={submittedAnswers}
                    correctAnswers={correctAnswers}
                />
            </div>
        </div>
    );
};

export default Result;
