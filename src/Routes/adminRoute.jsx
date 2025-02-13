import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';

const adminRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>


};

export default adminRoute;