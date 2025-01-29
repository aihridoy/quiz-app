/* eslint-disable react/prop-types */
import Avatar from '../assets/avater.webp';
import { useAuth } from '../context/AuthContext';

const QuizInfo = ({ quiz, answeredQuestions }) => {
    const { auth } = useAuth();
    const { title, description, stats } = quiz || {};
    const totalQuestions = stats?.total_questions || 0;
    const remainingQuestions = totalQuestions - answeredQuestions;

    return (
        <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
            <div>
                <h2 className="text-4xl font-bold mb-4">{title || 'Quiz Title'}</h2>
                <p className="text-gray-600 mb-4">{description || 'No description available.'}</p>

                <div className="flex flex-col">
                    <div
                        className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                        Total number of questions: {totalQuestions}
                    </div>

                    <div
                        className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                        Participation (Answered): {answeredQuestions}
                    </div>

                    <div
                        className="w-fit bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                        Remaining: {remainingQuestions >= 0 ? remainingQuestions : totalQuestions}
                    </div>
                </div>
            </div>

            <div className="mt-auto flex items-center">
                <img src={Avatar} alt="Mr Hasan" className="w-10 h-10 rounded-full mr-3 object-cover" />
                <span className="text-black font-semibold">{auth?.user?.full_name}</span>
            </div>
        </div>
    );
};

export default QuizInfo;
