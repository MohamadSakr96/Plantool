import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AdminRoutes = () => {
    const user = useSelector((state) => state.auth.value);
    return (
        user && user.role === 'admin'? <Outlet />: <Navigate to={"/"} />
    )
}
