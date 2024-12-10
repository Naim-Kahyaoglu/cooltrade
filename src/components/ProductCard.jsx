// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-2">{product.description}</p>
      <div className="mt-4">
        <span className="text-xl font-bold text-gray-800">{product.price} USD</span>
      </div>
    </div>
  );
};

export default ProductCard;
