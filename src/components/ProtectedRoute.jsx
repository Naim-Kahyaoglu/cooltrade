import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { token, isAuthenticated } = useSelector(state => state.user);

  // Eğer kullanıcı giriş yapmışsa direkt içeriği göster
  if (token || isAuthenticated) {
    return children;
  }

  // Giriş yapmamışsa login sayfasına yönlendir
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute; 
