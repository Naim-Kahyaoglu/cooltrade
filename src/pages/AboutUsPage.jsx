import React from 'react';
import aboutUsImage from '../images/aboutus.avif';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-16 flex flex-col-reverse md:flex-row items-center">
          {/* Text Content */}
          <div className="md:w-1/2 mt-8 md:mt-0 md:pr-8">
            <h2 className="text-sm font-bold text-blue-600 mb-4">ABOUT COMPANY</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">ABOUT US</h1>
            <p className="text-lg text-gray-600 mb-8">
              We are dedicated to providing exceptional shopping experiences. Our platform combines 
              cutting-edge technology with user-friendly design to make your online shopping journey 
              seamless and enjoyable. With a focus on quality, convenience, and customer satisfaction, 
              we strive to be your preferred destination for all your shopping needs.
            </p>
            <button className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors">
              Get Quote Now
            </button>
          </div>

          {/* Image */}
          <div className="md:w-1/2">
            <img 
              src={aboutUsImage} 
              alt="Shopping Experience" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gray-50 py-16 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-blue-600 mb-2">15K</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-blue-600 mb-2">150K</h3>
                <p className="text-gray-600">Monthly Visitors</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-blue-600 mb-2">15</h3>
                <p className="text-gray-600">Countries Worldwide</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-blue-600 mb-2">100+</h3>
                <p className="text-gray-600">Top Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
