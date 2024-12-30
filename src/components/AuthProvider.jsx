import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, selectIsAuthenticated, selectCurrentUser } from '../store/userSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(verifyToken());
    }
  }, [dispatch]);

  return (
    <>
      {children}
    </>
  );
};

export default AuthProvider;
