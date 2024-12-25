import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './layout/Header';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
        <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId" element={<ProductDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
