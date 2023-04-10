import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ isLogin, component: Component }) {
    return (
        isLogin ? Component : <Navigate to='/NotFound' />
    )
}

export default PrivateRoute;