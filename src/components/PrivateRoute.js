import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    if (!user) {
        // Redirect to login page, but save the current location they were trying to go to
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user has any of the allowed roles (case-insensitive comparison)
    if (allowedRoles.length > 0) {
        const userRole = user.role ? user.role.toLowerCase() : '';
        const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase());
        
        if (!normalizedAllowedRoles.includes(userRole)) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return children;
};

export default PrivateRoute;