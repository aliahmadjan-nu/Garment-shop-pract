/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

// ... the rest of your file stays exactly the same


// 1. Initialize the Context
const CartContext = createContext();

// 2. Define the Provider Component
export const CartProvider = ({ children }) => {
  // Load initial cart from local storage
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('garment_cart');
    return localData ? JSON.parse(localData) : [];
  });

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('garment_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize, quantity = 1) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find(
        (item) => item._id === product._id && item.size === selectedSize
      );

      if (exists) {
        return prevItems.map((item) =>
          item._id === product._id && item.size === selectedSize
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, size: selectedSize, qty: quantity }];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item._id === id && item.size === size))
    );
  };

  const updateCartQty = (id, size, qty) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item._id === id && item.size === size ? { ...item, qty } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.qty, 0);
  };

  // Provide the state and functions to the rest of the app
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; // <-- Notice how the Provider is fully closed off right here!

// 3. Custom Hook (Safely OUTSIDE the Provider block)
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};