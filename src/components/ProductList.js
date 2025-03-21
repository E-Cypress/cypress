import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-section">
      <h2>Products</h2>
      <div className="product-grid" data-cy="product-grid">
        {products.map(product => (
          <ProductItem 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;