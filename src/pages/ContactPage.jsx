// src/pages/ContactPage.jsx
import React from 'react';
import contactBackground from '../images/contactbackgorund.avif';

const ContactPage = () => {
  return (
    <div 
      className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${contactBackground})` }}
    >
      <div className="w-full max-w-md space-y-8 text-center">
        <button className="bg-[#29b6f6] text-white py-3 px-12 rounded-md text-lg font-medium hover:bg-[#0086c3] transition duration-300">
          CONTACT US
        </button>
        
        <div className="space-y-12 mt-12">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="space-y-2 border-t border-gray-200/20 pt-8 first:border-t-0 first:pt-0">
              <p className="text-white">75000 Paris</p>
              <p className="text-white">Phone : +451 215 215</p>
              <p className="text-white">Fax : +451 215 215</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;