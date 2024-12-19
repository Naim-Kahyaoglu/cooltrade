import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../store/thunks/productThunks';
import shopPageImage from '../images/shoppage.png';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/slider.css';

const ShopPage = () => {
  const dispatch = useDispatch();
  const { productList, fetchState } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex md:flex-wrap md:justify-center">
        <div className="md:w-1/2 md:pr-4 md:h-screen">
          <img src={shopPageImage} alt="Shop Page Image" className="md:w-full md:h-screen object-cover" />
        </div>
        <div className="md:w-1/2 md:pl-4 md:pt-4">
          <h4 className="text-lg font-semibold mb-2">Featured Products</h4>
          <h2 className="text-2xl font-bold mb-4">Our Products</h2>
          <p className="mb-8">
            Discover our amazing collection of products.
          </p>
          <div className="product-slider px-8">
            <Slider {...settings}>
              {productList.map((product) => (
                <div key={product.id} className="px-2">
                  <ProductCard product={product} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
