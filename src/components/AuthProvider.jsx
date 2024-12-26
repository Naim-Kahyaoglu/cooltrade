import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyToken, setAuthToken } from '../store/userSlice';
import { loadCart } from '../store/reducers/shoppingCartReducer';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load cart from localStorage
    dispatch(loadCart());

    // Check for authentication token
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      dispatch(verifyToken());
    }
  }, [dispatch]);

  return children;
};

export default AuthProvider; 