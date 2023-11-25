import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Recuperar el estado del carrito desde el localStorage al iniciar la aplicación
  const initialCartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Actualizar el localStorage cada vez que cambie el estado del carrito
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    const cartItemId = Date.now(); // Unique identifier (you can use a more robust approach)
    setCartItems((prevCartItems) => [...prevCartItems, { ...item, cartItemId }]);
    console.log('ITEM del cart Context: ', item);
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item && item.cartItemId !== cartItemId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  

  const getCartItemCount = () => cartItems.length;

  return (
    <CartContext.Provider value={{ clearCart, cartItems, addToCart, removeFromCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
