import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  // If the token exists, render the nested routes (children components)
  // If not, redirect to the login page
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
