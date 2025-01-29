/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import avatar from '../assets/avater.webp'
import { useQuizResult } from '../context/QuizResultContext';

const LeaderBoardProfile = ({ userProfile }) => {
    const { quizResult } = useQuizResult();
    const {
        userScore,
        correctCount,
        wrongCount,
    } = quizResult;
    return (
        <div className="bg-primary rounded-lg p-6 text-white relative">
            <div className="flex flex-col items-center mb-6">
                <img src={avatar} alt="Profile Pic"
                    className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover" />
                <h2 className="text-2xl font-bold">{userProfile?.name}</h2>
                <p className="text-xl">{userProfile?.position} Position</p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                    <p className="text-sm opacity-75">Mark</p>
                    <p className="text-2xl font-bold">{userScore}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm opacity-75">Correct</p>
                    <p className="text-2xl font-bold">{correctCount}</p>
                </div>
                <div className="text-center">
                    <p className="text-sm opacity-75">Wrong</p>
                    <p className="text-2xl font-bold">{wrongCount}</p>
                </div>

                <Link to='/' className='absolute bottom-0 mb-4 underline'>Back to Home</Link>
            </div>
        </div>
    );
};

export default LeaderBoardProfile;