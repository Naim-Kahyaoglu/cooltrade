// src/pages/HomePage.jsx
import React from 'react';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a description for product 1.",
    price: "20.00",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is a description for product 2.",
    price: "35.00",
  },
  {
    id: 3,
    name: "Product 3",
    description: "This is a description for product 3.",
    price: "50.00",
  }
];

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Welcome to CoolTrade</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
