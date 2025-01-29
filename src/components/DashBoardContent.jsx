import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuiz } from "../context/QuizProvider";
import { useAuth } from "../context/AuthContext";
import { axiosInstance } from "../utils/axiosInstance";

const DashBoardContent = () => {
    const { auth } = useAuth();
    const { resetQuizData } = useQuiz();
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("date");
    const itemsPerPage = 11;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 800);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axiosInstance.get('/admin/quizzes', {
                    headers: {
                        Authorization: `Bearer ${auth.tokens.accessToken}`,
                    },
                });
                setQuizzes(response.data);
                toast.success("Quizzes loaded successfully!");
            } catch (error) {
                console.error('Error fetching quizzes:', error);
                toast.error("Failed to load quizzes.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [auth.tokens.accessToken]);

    const handleUpdateQuiz = async () => {
        if (!selectedQuiz) return;
        try {
            const response = await axiosInstance.patch(
                `/admin/quizzes/${selectedQuiz.id}`,
                {
                    title: updatedTitle,
                    description: updatedDescription,
                    status: selectedQuiz.status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.tokens.accessToken}`,
                    },
                }
            );

            if (response.data.status === "success") {
                toast.success("Quiz updated successfully!");
                setQuizzes((prevQuizzes) =>
                    prevQuizzes.map((quiz) =>
                        quiz.id === selectedQuiz.id
                            ? { ...quiz, ...response.data.data }
                            : quiz
                    )
                );
                closeModal();
            } else {
                toast.error("Failed to update quiz!");
            }
        } catch (error) {
            console.error("Error updating quiz:", error);
            toast.error("An error occurred while updating the quiz.");
        }
    };

    const openModal = (quiz) => {
        setSelectedQuiz(quiz);
        setUpdatedTitle(quiz.title);
        setUpdatedDescription(quiz.description);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedQuiz(null);
        setUpdatedTitle("");
        setUpdatedDescription("");
        setIsModalOpen(false);
    };

    const handleDeleteQuiz = async (quizId) => {
        if (window.confirm("Are you sure you want to delete this quiz?")) {
            try {
                const response = await axiosInstance.delete(
                    `/admin/quizzes/${quizId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${auth.tokens.accessToken}`,
                        },
                    }
                );

                if (response.data.status === "success") {
                    setQuizzes((prevQuizzes) =>
                        prevQuizzes.filter((quiz) => quiz.id !== quizId)
                    );
                    toast.success("Quiz deleted successfully!");
                } else {
                    toast.error("Failed to delete quiz!");
                }
            } catch (error) {
                console.error("Error deleting quiz:", error);
                toast.error("An error occurred while deleting the quiz.");
            }
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredQuizzes = quizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        quiz.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

    const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
        if (sortOption === "title") {
            return a.title.localeCompare(b.title);
        }
        if (sortOption === "date") {
            return new Date(b.created_at) - new Date(a.created_at);
        }
        return 0;
    });

    const paginatedQuizzes = sortedQuizzes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return <div className='flex justify-center items-center'>Loading quizzes...</div>;
    }

    return (
        <div className="flex-grow p-10 overflow-y-auto" style={{ maxHeight: "100vh" }}>
            <header className="mb-8">
                <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
                <h1 className="text-4xl font-bold">Welcome Back To Your Quiz Hub!</h1>
            </header>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border rounded w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="px-4 py-2 bg-white border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="date">Sort by Date</option>
                    <option value="title">Sort by Title</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to='/quiz-set' onClick={resetQuizData} className="group">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">Create a new quiz</h3>
                        <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">Build from the ground up</p>
                    </div>
                </Link>

                {paginatedQuizzes.map((quiz, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group cursor-pointer">
                        <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
                                <path d="M12 12l4 -2.25l4 -2.25" />
                                <path d="M12 12l0 9" />
                                <path d="M12 12l-4 -2.25l-4 -2.25" />
                                <path d="M20 12l-4 2v4.75" />
                                <path d="M4 12l4 2l0 4.75" />
                                <path d="M8 5.25l4 2.25l4 -2.25" />
                            </svg>
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">{quiz.title}</h3>
                        <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">{quiz.description}</p>
                        <div className="flex justify-between">
                            <button
                                className="text-blue-500 mt-4 hover:underline"
                                onClick={() => openModal(quiz)}
                            >
                                Edit Quiz
                            </button>

                            <button
                                className="text-red-500 mt-4 hover:underline"
                                onClick={() => handleDeleteQuiz(quiz.id)}
                            >
                                Delete Quiz
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                {Array.from({ length: Math.ceil(quizzes.length / itemsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1
                            ? "bg-purple-900 text-white font-semibold shadow-lg"
                            : "bg-gray-200 text-gray-700 hover:bg-purple-200 hover:text-black"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">Update Quiz</h2>
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Title</label>
                            <input
                                type="text"
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Description</label>
                            <textarea
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                                className="w-full p-2 border rounded"
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateQuiz}
                                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashBoardContent;
