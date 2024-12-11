import React from 'react';
import productImage from '../images/product.avif'; // Import the image

const ProductCard = ({ product }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4"
      style={{ backgroundImage: `url(${productImage})`, backgroundSize: 'cover' }} // Set the background image
    >
      <div className="relative h-0 pb-[56.25%]"> // Maintain aspect ratio (16:9)
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <h3 className="text-lg font-semibold text-white">{product.name}</h3>
          <p className="text-sm text-white mt-2">{product.description}</p>
          <div className="mt-4">
            <span className="text-xl font-bold text-white">{product.price} USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

