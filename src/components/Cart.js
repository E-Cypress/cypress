import React from 'react';
import CartItem from './CartItem';

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <div className="cart-section" data-cy="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p data-cy="empty-cart-message">Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              updateQuantity={updateQuantity} 
              removeFromCart={removeFromCart} 
            />
          ))}
          <div className="cart-total" data-cy="cart-total">
            Total: ${calculateTotal().toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;