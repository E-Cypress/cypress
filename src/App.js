import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import products from './data/products';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // If item exists, update quantity
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // If item doesn't exist, add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return (
    <div className="app-container">
      <header>
        <h1>Simple E-Commerce Store</h1>
      </header>
      <div className="main-content">
        <ProductList products={products} addToCart={addToCart} />
        <Cart 
          cartItems={cartItems} 
          updateQuantity={updateQuantity} 
          removeFromCart={removeFromCart} 
        />
      </div>
    </div>
  );
}

export default App;