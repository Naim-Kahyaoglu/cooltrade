import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productDetailImage from '../images/productdetail.jpg';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simüle edilmiş ürün verisi
    const mockProduct = {
      id: parseInt(id),
      name: `Product ${id}`,
      description: `This is a detailed description for product ${id}. Here you can find all the information about this amazing product.`,
      price: 99.99 + parseInt(id) * 10,
      features: [
        'High quality materials',
        'Durable construction',
        'Modern design',
        'Easy to use'
      ]
    };
    setProduct(mockProduct);
  }, [id]);

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile View */}
      <div className="md:hidden">
        <div className="space-y-4">
          <div className="w-full aspect-square bg-gray-200 rounded-lg">
            <img src={productDetailImage} alt={product.name} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Features:</h2>
              <ul className="list-disc list-inside space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mt-4">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 rounded-lg">
            <img src={productDetailImage} alt={product.name} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold text-blue-600">${product.price.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-3">Features:</h2>
              <ul className="list-disc list-inside space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600">{feature}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2 pt-6">
              <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
