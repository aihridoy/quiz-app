import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import QuizInfo from '../components/QuizInfo';
import QuizQuestion from '../components/QuizQuestion';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQuizResult } from '../context/QuizResultContext';
import { axiosInstance } from '../utils/axiosInstance';

const Quiz = () => {
    const { quizSetId } = useParams();
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});

    const { auth } = useAuth()
    const { setQuizResult } = useQuizResult();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axiosInstance.get(`/quizzes/${quizSetId}`, {
                    headers: {
                        Authorization: `Bearer ${auth.tokens.accessToken}`
                    }
                });
                setQuizData(response.data.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchQuiz();
    }, [auth.tokens.accessToken, quizSetId]);

    const handleAnswerSelect = (questionId, answer) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const handleSubmitQuiz = async () => {
        try {
            const response = await axiosInstance.post(
                `/quizzes/${quizSetId}/attempt`,
                { answers: userAnswers },
                {
                    headers: {
                        Authorization: `Bearer ${auth.tokens.accessToken}`,
                    },
                }
            );
            const { submitted_answers, correct_answers, quiz, percentage } = response.data.data;
            let correctCount = 0;
            let wrongCount = 0;

            let score = 0;
            correct_answers.forEach((correctAnswer) => {
                const submittedAnswer = submitted_answers.find(
                    (answer) => answer.question_id === correctAnswer.question_id
                );
                if (submittedAnswer?.answer === correctAnswer.answer) {
                    score += correctAnswer.marks;
                    correctCount += 1
                } else {
                    wrongCount += 1;
                }
            });

            setQuizResult({
                quizId: quizSetId,
                quizData: quizData,
                submittedAnswers: submitted_answers,
                correctAnswers: correct_answers,
                quizTitle: quiz.title,
                totalMarks: quiz.total_marks,
                userScore: score,
                questions: submitted_answers.length,
                correctCount: correctCount,
                wrongCount: wrongCount,
                percentage: percentage,
            });

            navigate(`/result/${quizSetId}`);

        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    const handleNextQuestion = () => {
        setAnsweredQuestions((prev) => prev + 1);
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleSubmitQuiz();
        }
    };

    const isLastQuestion = currentQuestionIndex === quizData?.questions.length - 1;

    return (
        <div className='bg-[#F5F3FF] min-h-screen'>
            <div className='container mx-auto py-3'>
                <Header />
                <main className='max-w-8xl mx-auto h-[calc(100vh-10rem)]'>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 h-ful'>
                        {quizData && <QuizInfo quiz={quizData} answeredQuestions={answeredQuestions} />}
                        {quizData && (
                            <QuizQuestion
                                question={quizData.questions[currentQuestionIndex]}
                                onAnswerSelect={handleAnswerSelect}
                                onNext={handleNextQuestion}
                                isLastQuestion={isLastQuestion}
                            />
                        )}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Quiz;
