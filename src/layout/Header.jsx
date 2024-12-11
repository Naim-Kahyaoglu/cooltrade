import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#00A1C1] text-white p-4 w-full">
      <div className="container mx-auto flex flex-col items-center">
        <div className="logo mb-4">
          <h1 className="text-2xl font-bold">CoolTrade</h1>
        </div>
        <nav className="flex flex-col items-center space-y-2">
          <a href="#" className="text-white hover:text-gray-200">Home</a>
          <a href="#" className="text-white hover:text-gray-200">Shop</a>
          <a href="#" className="text-white hover:text-gray-200">Product</a>
          <a href="#" className="text-white hover:text-gray-200">Pricing</a>
          <a href="#" className="text-white hover:text-gray-200">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

