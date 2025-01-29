import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/Header";
import LeaderBoardList from "../components/LeaderBoardList";
import LeaderBoardProfile from "../components/LeaderBoardProfile";
import { useAuth } from '../context/AuthContext';
import { calculateTotalScore } from '../utils/calculateTotalScore';
import { axiosInstance } from '../utils/axiosInstance';

const LeaderBoard = () => {
    const { auth } = useAuth();
    const { quizId } = useParams();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [quizTitle, setQuizTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/quizzes/${quizId}/attempts`, {
                    headers: {
                        Authorization: `Bearer ${auth.tokens.accessToken}`,
                    },
                });

                const { attempts, quiz } = response.data.data;

                const leaderboard = attempts.map((attempt) => {
                    const totalScore = calculateTotalScore(attempt);

                    return {
                        id: attempt.user.id,
                        name: attempt.user.full_name,
                        totalScore,
                    };
                });

                leaderboard.sort((a, b) => b.totalScore - a.totalScore);

                leaderboard.forEach((user, index) => {
                    user.position = index + 1;
                });

                setQuizTitle(quiz.title);
                setLeaderboardData(leaderboard);
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, [quizId, auth.tokens.accessToken, auth.user.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading leaderboard...</p>
            </div>
        );
    }

    const userProfile = leaderboardData.find(user => user.id === auth.user.id);
    const topFive = leaderboardData.slice(0, 5);

    return (
        <div className="bg-[#F5F3FF] p-4">
            <Header />
            <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <LeaderBoardProfile userProfile={userProfile} />
                        <LeaderBoardList topFive={topFive} quizTitle={quizTitle} currentUser={auth.user.id} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LeaderBoard;
