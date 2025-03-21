import React from 'react';

const ProductItem = ({ product, addToCart }) => {
  return (
    <div className="product-card" data-cy="product-item">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
        data-cy="product-image"
      />
      <h3 className="product-title" data-cy="product-name">{product.name}</h3>
      <p className="product-price" data-cy="product-price">R${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      <button 
        className="add-to-cart-btn" 
        onClick={() => addToCart(product)}
        data-cy="add-to-cart-button"
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default ProductItem;