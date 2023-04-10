import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ isAdmin, admin: AdministratorPage, notAdmin: Main }) {
    return (
        isAdmin ? AdministratorPage : Main
    )
}

export default AdminRoute;