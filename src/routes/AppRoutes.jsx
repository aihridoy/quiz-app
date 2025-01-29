import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import LeaderBoard from '../pages/LeaderBoard';
import Quiz from '../pages/Quiz';
import Result from '../pages/Result';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import QuizSetEntry from '../pages/QuizSetEntry';
import QuizSet from '../pages/QuizSet';

const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/registration' element={<Registration />} />
                <Route path='/leader-board/:quizId' element={<PrivateRoute element={<LeaderBoard />} />} />
                <Route path='/quiz/:quizSetId' element={<PrivateRoute element={<Quiz />} />} />
                <Route path='/result/:quizSetId' element={<PrivateRoute element={<Result />} />} />
                <Route
                    path="/dashboard"
                    element={<PrivateRoute element={<Dashboard />} requiredRole="admin" />}
                />
                <Route
                    path="/quiz-set-entry/:quizSetId"
                    element={<PrivateRoute element={<QuizSetEntry />} requiredRole="admin" />}
                />
                <Route
                    path="/quiz-set"
                    element={<PrivateRoute element={<QuizSet />} requiredRole="admin" />}
                />
            </Routes>
        </div>
    );
};

export default AppRoutes;