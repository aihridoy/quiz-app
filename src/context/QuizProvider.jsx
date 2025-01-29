/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [quizData, setQuizData] = useState({
        title: "",
        description: "",
    });

    const updateQuizData = (key, value) => {
        setQuizData((prev) => ({ ...prev, [key]: value }));
    };

    const resetQuizData = () => {
        setQuizData({
            title: "",
            description: "",
        });
    };

    return (
        <QuizContext.Provider value={{ quizData, updateQuizData, resetQuizData }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuiz = () => useContext(QuizContext);
