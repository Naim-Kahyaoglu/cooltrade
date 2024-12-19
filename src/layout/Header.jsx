import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../store/userSlice';

const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('You logged out successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <header className="bg-white shadow-md">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Brand Name */}
          <Link to="/" className="text-xl font-bold text-gray-800">
            BrandName
          </Link>

          {/* Welcome Message */}
          {user?.userData && (
            <div className="text-gray-600">
              Welcome, {user.userData.name}
            </div>
          )}

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Login/Logout Link */}
            {user?.userData ? (
              <button 
                onClick={handleLogout}
                className="text-black hover:text-gray-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="text-black hover:text-gray-600">
                Login
              </Link>
            )}

            {/* Search Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-full text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-full text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>

            {/* Hamburger Menu Button */}
            <button 
              className="p-2 hover:bg-gray-100 rounded-full text-black"
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu - Shows/Hides based on isMenuOpen state */}
      <nav className={`${isMenuOpen ? 'block' : 'hidden'} border-t`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 md:space-y-0 space-y-2">
            <Link to="/" className="text-gray-600 hover:text-gray-800 py-2">Home</Link>
            <Link to="/shop" className="text-gray-600 hover:text-gray-800 py-2">Product</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-800 py-2">Pricing</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-800 py-2">About Us</Link>
            <Link to="/team" className="text-gray-600 hover:text-gray-800 py-2">Team</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-800 py-2">Contact</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Header);
