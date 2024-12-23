import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyToken, setAuthToken } from './store/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage'; 
import LoginPage from './pages/LoginPage';
import ShopPage from './pages/ShopPage'; 
import ProductDetailPage from './pages/ProductDetailPage';
import TeamPage from './pages/TeamPage';
import AboutUsPage from './pages/AboutUsPage';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ContactPage from './pages/ContactPage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Set token in axios headers
      setAuthToken(token);
      // Verify token
      dispatch(verifyToken());
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
