import React from 'react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-item" data-cy="cart-item">
      <img 
        src={item.image} 
        alt={item.name} 
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h4 className="cart-item-title" data-cy="cart-item-name">{item.name}</h4>
        <p className="cart-item-price" data-cy="cart-item-price">R${item.price.toFixed(2)}</p>
        <div className="cart-item-actions">
          <button 
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            data-cy="decrease-quantity"
          >
            -
          </button>
          <span className="cart-quantity" data-cy="item-quantity">{item.quantity}</span>
          <button 
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            data-cy="increase-quantity"
          >
            +
          </button>
          <button 
            className="remove-btn"
            onClick={() => removeFromCart(item.id)}
            data-cy="remove-item"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;