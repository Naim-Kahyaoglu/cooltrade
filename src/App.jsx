import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage'; 
import LoginPage from './pages/LoginPage';
import ShopPage from './pages/ShopPage'; 
import ProductDetailPage from './pages/ProductDetailPage';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ContactPage from './pages/ContactPage';

const App = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
