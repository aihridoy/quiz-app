import QuizSetEntryContent from '../components/QuizSetEntryContent';
import SideBar from '../components/SideBar';
import { useParams } from 'react-router-dom';

const QuizSetEntry = () => {
    const { quizSetId } = useParams();

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <SideBar />
            <QuizSetEntryContent quizSetId={quizSetId} />
        </div>
    );
};

export default QuizSetEntry;