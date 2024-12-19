import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import productImage from '../images/productcard.avif'; // Import the image

// ProductCard.jsx
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 relative w-full md:h-80 h-72 mb-4 cursor-pointer transition-transform hover:scale-105"
      style={{ backgroundImage: `url(${productImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      onClick={handleClick}
    >
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-sm text-white mt-2">{product.description}</p>
        <div className="mt-4">
          <span className="text-xl font-bold text-white">{product.price} USD</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
