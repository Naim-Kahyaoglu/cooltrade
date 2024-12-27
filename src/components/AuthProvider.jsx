import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, selectIsAuthenticated, setAuthToken } from '../store/userSlice';
import { loadCart } from '../store/reducers/shoppingCartReducer';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          await dispatch(verifyToken()).unwrap();
          dispatch(loadCart());
        } catch (error) {
          console.error('Token verification failed:', error);
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider; 
