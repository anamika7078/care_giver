import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// src/utils/roles.js
export const ROLES = {
    ADMIN: 'admin',
    FAMILY: 'family',
    CAREGIVER: 'caregiver'
};



const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;