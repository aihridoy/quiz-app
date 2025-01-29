/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, requiredRole }) => {
    const { auth } = useAuth();

    if (!auth.user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && auth.user.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default PrivateRoute;
