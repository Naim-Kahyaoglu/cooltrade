// src/pages/ContactPage.jsx
import React from 'react';
import contactBackground from '../images/contactbackgorund.avif';

const ContactPage = () => {
  return (
    <div 
      className="container mx-auto min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${contactBackground})` }}
    >
      {/* Mobile View */}
      <div className="md:hidden p-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Contact Us</h1>
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2 text-white">VISIT OUR OFFICE</h2>
            <p className="text-white">75000 Paris</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2 text-white">CONTACT</h2>
            <p className="text-white">Phone : +451 215 215</p>
            <p className="text-white">Fax : +451 215 215</p>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
            CONTACT US
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 text-white">Contact Us</h1>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-white">VISIT OUR OFFICE</h2>
              <p className="text-white">75000 Paris</p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-white">CONTACT</h2>
              <p className="text-white">Phone : +451 215 215</p>
              <p className="text-white">Fax : +451 215 215</p>
            </div>
            <div className="text-center">
              <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;