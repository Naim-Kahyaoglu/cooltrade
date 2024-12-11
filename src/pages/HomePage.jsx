import React from 'react';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';


const HomePage = () => {
  const images = [
    'https://images.unsplash.com/photo-1732762990635-a713a09e9025?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1732464508438-aab5691d1dae?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4..3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1733173523386-3006dec1a835?q=80&w=2105&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const product = {
    name: 'Example Product',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: 19.99,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Slider images={images} />
      <div className="flex-grow">
        <ProductCard product={product} />
      </div>
      
    </div>
  );
};

export default HomePage;

