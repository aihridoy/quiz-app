import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizProvider";

/* eslint-disable react/no-unknown-property */
const QuizSetContent = () => {
    const { auth } = useAuth()
    const { quizData, updateQuizData } = useQuiz();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateQuizData(name, value);
    };

    const handleCreateQuiz = async () => {
        setSuccessMessage("");
        setErrorMessage("");
        if (!quizData.title.trim() || !quizData.description.trim()) {
            setErrorMessage("Both title and description are required.");
            return;
        }
        const apiUrl = "http://localhost:5000/api/admin/quizzes";
        const token = auth.tokens.accessToken
        const payload = {
            title: quizData.title,
            description: quizData.description,
        };
        try {
            setLoading(true);
            const response = await axios.post(apiUrl, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (response.data.status === "success") {
                const createdQuizId = response.data.data.id;
                setSuccessMessage("Quiz set created successfully!");
                navigate(`/quiz-set-entry/${createdQuizId}`)

            }
        } catch (error) {
            console.error("Error creating quiz set:", error);
            setErrorMessage("Failed to create quiz set. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
            <div>
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
                            <p className="text-gray-600 hover:text-buzzr-purple" aria-current="page">
                                Set Quiz
                            </p>
                        </li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
                    {/* Left Column */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Create New Quiz Set</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Quiz Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={quizData.title}
                                    onChange={handleChange}
                                    className="w-full mt-2 p-2 border border-input rounded-md bg-background"
                                    placeholder="Enter quiz title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Quiz Description
                                </label>
                                <textarea
                                    name="description"
                                    rows="4"
                                    value={quizData.description}
                                    onChange={handleChange}
                                    className="w-full mt-2 p-2 border border-input rounded-md bg-background"
                                    placeholder="Enter quiz description"
                                />
                            </div>

                            <button
                                onClick={handleCreateQuiz}
                                className={`w-full bg-primary text-white p-2 rounded-md transition-colors ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
                                    }`}
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Quiz Set"}
                            </button>

                            {/* Success/Error Messages */}
                            {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}
                            {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default QuizSetContent;