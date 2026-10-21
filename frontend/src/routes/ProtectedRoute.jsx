import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  // 1. Get the token and user details from localStorage
  const token = localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  
  // Parse user object safely if it exists
  const user = userString ? JSON.parse(userString) : null;

  // 2. If the user is not logged in, redirect them to the login page
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If specific roles are required, check if the user's role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If they don't have the right role, redirect them home or show an unauthorized message
    return <Navigate to="/" replace />;
  }

  // 4. If everything matches, render the requested page/component
  return children;
};

export default ProtectedRoute;