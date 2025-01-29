/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const QuizProgress = ({ quizId, quizTitle, totalMarks, userScore, questions, correctCount, wrongCount, percentage }) => {
    return (
        <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
            <div>
                <div className="text-white">
                    <div>
                        <h2 className="text-4xl font-bold mb-2">{quizTitle}
                        </h2>
                        <p>A quiz on React hooks like useState, useEffect, and useContext. </p>
                    </div>

                    <div className="my-6 flex items-center  ">
                        <div className="w-1/2">
                            <div className="flex gap-6 my-6">
                                <div>
                                    <p className="font-semibold text-2xl my-0">{questions}</p>
                                    <p className="text-gray-300">Questions</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-2xl my-0">{correctCount}</p>
                                    <p className="text-gray-300">Correct</p>
                                </div>

                                <div>
                                    <p className="font-semibold text-2xl my-0">{wrongCount}</p>
                                    <p className="text-gray-300">Wrong</p>
                                </div>
                            </div>

                            <Link to={`/leader-board/${quizId}`}
                                className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white">
                                View Leaderboard
                            </Link>
                            <Link to={`/`}
                                className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white ml-4">
                                Back to Home
                            </Link>
                        </div>

                        <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                            <div className="flex-1">
                                <p className="text-2xl font-bold">{userScore}/{totalMarks}</p>
                                <p>Your Mark</p>
                            </div>
                            <div className="h-20 w-20">
                                <CircularProgressbar
                                    value={percentage}
                                    text={`${Math.round(percentage)}%`}
                                    styles={buildStyles({
                                        textColor: "#fff",
                                        pathColor: "#10b981",
                                        trailColor: "#d1d5db",
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizProgress;