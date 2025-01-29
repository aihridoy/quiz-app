/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";
import { useQuiz } from "../context/QuizProvider";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import CreateQuiz from "./CreateQuiz";
import CreatedQuiz from "./CreatedQuiz";
import { useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";

/* eslint-disable react/no-unknown-property */
const QuizSetEntryContent = ({ quizSetId }) => {
    const { quizData } = useQuiz();
    const { auth } = useAuth();
    const [apiUrl, setApiUrl] = useState("");
    const [quizId, setQuizId] = useState(null)
    const [questionId, setQuestionId] = useState(null)
    const [quizStatus, setQuizStatus] = useState("draft");
    const [questionsList, setQuestionsList] = useState([]);
    const [questionTitle, setQuestionTitle] = useState("");
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const url = editingQuestionId
            ? `/admin/questions/${questionId}`
            : `/admin/quizzes/${quizSetId}/questions`;
        setApiUrl(url);
    }, [editingQuestionId, questionId, quizSetId, apiUrl]);

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleSaveQuiz = async () => {
        setSuccessMessage("");
        setErrorMessage("");

        if (!questionTitle.trim()) {
            setErrorMessage("Question title is required.");
            return;
        }
        if (options.some((option) => !option.trim())) {
            setErrorMessage("All options must be filled out.");
            return;
        }
        if (correctAnswerIndex === null) {
            setErrorMessage("Please select a correct answer.");
            return;
        }

        const payload = {
            question: questionTitle,
            options,
            correctAnswer: options[correctAnswerIndex],
        };

        const token = auth.tokens.accessToken;

        const method = editingQuestionId ? "patch" : "post";

        const newQuestion = {
            id: questionsList.length + 1,
            questionTitle,
            options,
            correctAnswer: options[correctAnswerIndex],
        };

        try {
            setLoading(true);
            const response = await axiosInstance[method](apiUrl, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.data.status === "success") {
                setSuccessMessage(editingQuestionId ? "Quiz question updated successfully!" : "Quiz question saved successfully!");
                setQuestionId(response.data.data.id)
                setQuizId(response.data.data.quizId)
                const updatedQuestion = {
                    id: editingQuestionId,
                    questionTitle: payload.question,
                    options: payload.options,
                    correctAnswer: payload.correctAnswer,
                };

                setQuestionsList((prev) =>
                    editingQuestionId
                        ? prev.map((q) => (q.id === editingQuestionId ? updatedQuestion : q))
                        : [...prev, newQuestion]
                );
                setQuestionTitle("");
                setOptions(["", "", "", ""]);
                setCorrectAnswerIndex(null);
                setEditingQuestionId(null)
            }
        } catch (error) {
            console.error("Error saving quiz question:", error);
            setErrorMessage("Failed to save quiz question. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditQuestion = (id) => {
        const question = questionsList.find((q) => q.id === id);
        if (question) {
            setEditingQuestionId(id);
            setQuestionTitle(question.questionTitle);
            setOptions(question.options);
            setCorrectAnswerIndex(
                question.options.findIndex(
                    (option) => option === question.correctAnswer
                )
            );
        }
    };


    const handleToggleQuizStatus = async () => {
        if (!quizId) {
            setErrorMessage("Quiz set must be created first.");
            return;
        }
        const newStatus = quizStatus === "published" ? "draft" : "published";
        try {
            setLoading(true);
            const response = await axiosInstance.patch(
                `/admin/quizzes/${quizId}`,
                {
                    title: quizData.title,
                    description: quizData.description,
                    status: newStatus,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.tokens.accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.status === "success") {
                setQuizStatus(newStatus);
                setSuccessMessage(`Quiz ${newStatus === "published" ? "published" : "unpublished"} successfully!`);
            } else {
                setErrorMessage("Failed to update quiz status.");
            }
        } catch (error) {
            console.error("Error toggling quiz status:", error);
            setErrorMessage("An error occurred while updating the quiz status.");
        } finally {
            setLoading(false);
        }
    };


    const handleDeleteQuestion = async (id) => {
        setErrorMessage("");
        setSuccessMessage("");

        const apiUrl = `/admin/questions/${id}`;
        const token = auth.tokens.accessToken;

        try {
            setLoading(true);
            const response = await axiosInstance.delete(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.status === "success") {
                setSuccessMessage("Question deleted successfully!");
                setQuestionsList((prev) =>
                    prev.filter((question) => question.id !== id)
                );
            }
        } catch (error) {
            console.error("Error deleting question:", error);
            setErrorMessage("Failed to delete question. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto" style={{ maxHeight: "100vh" }}>
            <div>
                <div className="flex justify-between items-center">
                    <nav className="text-sm mb-4" aria-label="Breadcrumb">
                        <ol className="list-none p-0 inline-flex">
                            <li className="flex items-center">
                                <Link to="/" className="text-gray-600 hover:text-buzzr-purple">
                                    Home
                                </Link>
                                <svg
                                    className="fill-current w-3 h-3 mx-3"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                >
                                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                                </svg>
                            </li>
                            <li>
                                <p
                                    className="text-gray-600 hover:text-buzzr-purple"
                                    aria-current="page"
                                >
                                    Set Quiz Entry
                                </p>
                            </li>
                        </ol>
                    </nav>

                    <div className="flex mb-4">
                        <button
                            onClick={handleToggleQuizStatus}
                            className={`px-4 py-2 rounded ${quizStatus === "published"
                                ? "bg-red-600 text-white hover:bg-red-700"
                                : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                            disabled={loading}
                        >
                            {loading
                                ? "Updating..."
                                : quizStatus === "published"
                                    ? "Unpublish Quiz"
                                    : "Publish Quiz"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
                    <CreateQuiz
                        quizData={quizData}
                        errorMessage={errorMessage}
                        successMessage={successMessage}
                        loading={loading}
                        handleSaveQuiz={handleSaveQuiz}
                        handleOptionChange={handleOptionChange}
                        setCorrectAnswerIndex={setCorrectAnswerIndex}
                        correctAnswerIndex={correctAnswerIndex}
                        options={options}
                        setQuestionTitle={setQuestionTitle}
                        questionTitle={questionTitle}
                    />
                    <CreatedQuiz
                        questionsList={questionsList}
                        handleEditQuestion={handleEditQuestion}
                        handleDeleteQuestion={handleDeleteQuestion}
                    />
                </div>
            </div>
        </main>
    );
};

export default QuizSetEntryContent;
