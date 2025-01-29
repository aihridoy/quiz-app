import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { axiosInstance } from '../utils/axiosInstance';

const Cards = () => {
    const { auth } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('created_at');
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const quizzesPerPage = 12;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 800);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axiosInstance.get('/quizzes', {
                    headers: {
                        Authorization: `Bearer ${auth?.tokens?.accessToken}`,
                    },
                });
                setQuizzes(response.data.data);
                setLoading(false);
            } catch (error) {
                toast.error(error.message || 'Failed to fetch quizzes');
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, [auth?.tokens?.accessToken]);

    const filteredQuizzes = quizzes.filter(
        (quiz) =>
            quiz.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            quiz.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );

    const sortQuizzes = (a, b) => {
        if (sortOption === 'title') {
            return a.title.localeCompare(b.title);
        }
        if (sortOption === 'created_at') {
            return new Date(b.created_at) - new Date(a.created_at);
        }
        return 0;
    };

    const sortedQuizzes = [...filteredQuizzes].sort(sortQuizzes);

    const totalPages = Math.ceil(sortedQuizzes.length / quizzesPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const displayedQuizzes = sortedQuizzes.slice(
        (currentPage - 1) * quizzesPerPage,
        currentPage * quizzesPerPage
    );

    if (loading) {
        return <div className="flex justify-center items-center">Loading quizzes...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border rounded w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="relative">
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="px-4 py-2 bg-white border rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="created_at">Sort by Date Created</option>
                        <option value="title">Sort by Title</option>
                    </select>
                </div>
            </div>
            {displayedQuizzes.length === 0 ? (
                <div className="text-center text-gray-600">
                    <h2 className="text-xl font-semibold">No quizzes found</h2>
                    <p className="mt-2">Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayedQuizzes.map((quiz) => (
                        <Link
                            to={quiz.is_attempted ? `/result/${quiz.id}` : `/quiz/${quiz.id}`}
                            key={quiz.id}
                            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer"
                        >
                            <div className="group-hover:scale-105 absolute transition-all text-white text-center top-1/2 -translate-y-1/2 px-4">
                                <h1 className="text-5xl" style={{ fontFamily: 'Jaro' }}>{quiz.title}</h1>
                                <p className="mt-2 text-lg">{quiz.description}</p>
                            </div>
                            {quiz.is_attempted && (
                                <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
                                    <div>
                                        <h1 className="text-3xl font-bold">Already Participated</h1>
                                        <p className="text-center">Click to view your leaderboard</p>
                                    </div>
                                </div>
                            )}
                            <img
                                src={quiz.thumbnail}
                                alt={quiz.title}
                                className="w-full h-full object-cover rounded mb-4"
                            />
                        </Link>
                    ))}
                </div>
            )}
            {displayedQuizzes.length > 0 && (
                <div className="flex justify-center space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 rounded ${currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cards;
