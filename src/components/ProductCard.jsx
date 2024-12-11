import React from 'react';
import productImage from '../images/product.avif'; // Import the image

const ProductCard = ({ product }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 relative"
      style={{ backgroundImage: `url(${productImage})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', paddingTop: '56.25%', overflow: 'hidden' }} // Set the background image and maintain the aspect ratio constraint
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

