import React from 'react';

const Footer = () => {
  return (
    <footer
      className="text-white p-4"
      style={{
        backgroundColor: '#FCA311',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="container mx-auto flex justify-between items-center max-w-screen-xl">
        <div className="logo flex-shrink-0">
          <h1 className="text-xl font-bold">CoolTrade</h1>
        </div>
        <div className="flex-grow flex justify-end">
          <p>&copy; 2024 CoolTrade. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

