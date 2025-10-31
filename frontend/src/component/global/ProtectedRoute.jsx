import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('auth_token');
  const user = localStorage.getItem('auth_user');

  useEffect(() => {
    if (!token || !user) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      navigate('/');
    }
  }, [token, user, navigate]);

  if (!token || !user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;