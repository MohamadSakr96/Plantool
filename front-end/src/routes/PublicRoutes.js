import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const PublicRoutes = () => {
    const user = useSelector((state) => state.auth.value);
    return (
        !user? <Outlet />: <Navigate to={"/"} />
    )
}
