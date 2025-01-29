import QuizSetContent from '../components/QuizSetContent';
import SideBar from '../components/SideBar';

const QuizSet = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex">
            <SideBar />
            <QuizSetContent />
        </div>
    );
};

export default QuizSet;