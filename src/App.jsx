import React, { useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logout } from './store/userSlice';
import Header from './layout/Header';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import TeamPage from './pages/TeamPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrdersPage from './pages/OrdersPage';
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './components/AuthProvider';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Removed automatic logout mechanism
    // Users can only log out via logout button
    return () => {};
  }, []);

  return (
    <AuthProvider>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
          <Route 
            path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" 
            element={<ProductDetailPage />} 
          />
          <Route 
            path="/product/:productId/:productNameSlug" 
            element={<ProductDetailPage />} 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-success" 
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/orders" 
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Toaster position="bottom-right" />
      </div>
    </AuthProvider>
  );
}

export default App;
