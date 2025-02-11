import React from 'react';
import { Helmet } from 'react-helmet-async';

const ProductPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Product Page</title>
      </Helmet>
      <h2>Product Page</h2>
    </div>
  );
};

export default ProductPage;
