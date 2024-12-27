// src/layout/PageContent.jsx
import React from 'react';

const PageContent = ({ children }) => {
  return (
    <main className="container mx-auto p-4">
      {children}
    </main>
  );
};

export default PageContent;

