// src/layout/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <h1 className="text-xl font-bold">CoolTrade</h1>
        </div>
        <nav className="space-x-4">
          <a href="#" className="text-white hover:text-gray-400">Home</a>
          <a href="#" className="text-white hover:text-gray-400">Shop</a>
          <a href="#" className="text-white hover:text-gray-400">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
