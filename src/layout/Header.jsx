import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = ({ user }) => {
  return (
    <header className="bg-[#00A1C1] text-white p-4 w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="logo mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">CoolTrade</h1>
        </div>
        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/shop" className="text-white hover:text-gray-200">Shop</Link>
          <Link to="/product" className="text-white hover:text-gray-200">Product</Link>
          <Link to="/pricing" className="text-white hover:text-gray-200">Pricing</Link>
          <Link to="/signup" className="text-white hover:text-gray-200">Signup</Link>
          <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
          <Link to="/contact" className="text-white hover:text-gray-200">Contact</Link>
        </nav>
        {user && (
          <div className="user-info mt-4 md:mt-0">
            <p>Welcome, {user.username}</p>
          </div>
        )}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(Header);
