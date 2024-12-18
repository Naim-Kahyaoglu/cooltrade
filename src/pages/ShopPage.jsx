import React from 'react';
import ProductCard from '../components/ProductCard';
import shopPageImage from '../images/shoppage.png';

const ShopPage = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description for product 1',
      price: 29.99,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description for product 2',
      price: 39.99,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description for product 3',
      price: 49.99,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex md:flex-wrap md:justify-center">
        <div className="md:w-1/2 md:pr-4 md:h-screen">
          <img src={shopPageImage} alt="Shop Page Image" className="md:w-full md:h-screen object-cover" />
        </div>
        <div className="md:w-1/2 md:pl-4 md:pt-4">
          <h4 className="text-lg font-semibold mb-2">Featured Products</h4>
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <p className="mb-8">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics.
          </p>
          <div className="flex flex-col md:flex-row md:justify-start md:space-x-4">
            {products.map((product) => (
              <div key={product.id} className="w-full md:w-1/2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
