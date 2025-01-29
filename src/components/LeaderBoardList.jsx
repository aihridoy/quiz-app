/* eslint-disable react/prop-types */
import avatar from '../assets/avater.webp';

const LeaderBoardList = ({ topFive, quizTitle, currentUser }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Leaderboard</h1>
            <p className="mb-6">{quizTitle}</p>
            <ul className="space-y-4">
                {
                    topFive.map((participant, index) => {
                        return <li key={index}
                            className={`py-3 px-6 flex justify-between items-center ${participant.id === currentUser ? 'bg-yellow-200' : ''}`}
                        >
                            <div className="flex items-center">
                                <img src={avatar} alt="SPD Smith" className="object-cover w-10 h-10 rounded-full mr-4" />
                                <div>
                                    <h3 className="font-semibold">{participant.name}</h3>
                                    <p className="text-sm text-gray-500">Position: {participant.position}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2">{participant.totalScore} Points</span>
                            </div>
                        </li>
                    })
                }
            </ul>
        </div>
    );
};

export default LeaderBoardList;