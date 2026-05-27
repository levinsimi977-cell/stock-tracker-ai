import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
    // מביאים את הנתונים מ-Redux, ואם הוא ריק (למשל אחרי Refresh) לוקחים מ-LocalStorage
    const auth = useSelector((state) => state.auth);
    const token = auth?.token || localStorage.getItem('token');
    const userRole = auth?.role || localStorage.getItem('role');

    // אם אין טוקן בכלל -> שלח אותו להתחבר
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // אם הוא מחובר אבל מנסה להיכנס לדף שלא ברמת ההרשאה שלו (למשל משתמש רגיל לדף מנהל)
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/stocks" replace />; 
    }

    // הכל טוב? תציג את הדף הפנימי
    return <Outlet />;
};

export default ProtectedRoute;