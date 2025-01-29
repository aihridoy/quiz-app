/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const QuizResultContext = createContext();

export const useQuizResult = () => useContext(QuizResultContext);

export const QuizResultProvider = ({ children }) => {
    const [quizResult, setQuizResult] = useState({
        quizTitle: '',
        totalMarks: 0,
        userScore: 0,
        questions: 0,
        correctCount: 0,
        wrongCount: 0,
        percentage: 0,
    });

    return (
        <QuizResultContext.Provider value={{ quizResult, setQuizResult }}>
            {children}
        </QuizResultContext.Provider>
    );
};
