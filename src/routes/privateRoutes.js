import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/authServices';

const PrivateRoute = ({Element}) => {
    const currentUser = AuthService.getCurrentUser();

    return currentUser ? <Element/>: <Navigate to="/" />

};

export default PrivateRoute;
