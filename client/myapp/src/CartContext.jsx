// CartContext.jsx - Global cart state management
import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch cart items from server
  const fetchCartItems = async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      setCartCount(0);
      setSubtotal(0);
      return;
    }

    try {
      setIsLoading(true);
      const result = await axios.get(`${import.meta.env.VITE_API_APP_HOST}/user/cart`, {
        withCredentials: true
      });

      if (result.status >= 200 && result.status < 400) {
        setCartItems(result.data.items || []);
        setCartCount(result.data.totalItems || 0);
        setSubtotal(result.data.subtotal || 0);
      }
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      setCartItems([]);
      setCartCount(0);
      setSubtotal(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_APP_HOST}/user/addtocart`, {
        productId,
        quantity
      }, {
        withCredentials: true
      });

      if (result.status >= 200 && result.status < 400) {
        await fetchCartItems(); // Refresh cart data
        return { success: true, message: result.data.message };
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to add item to cart' 
      };
    }
  };

  // Update cart item quantity
  const updateCartQuantity = async (productId, quantity) => {
    try {
      const result = await axios.put(`${import.meta.env.VITE_API_APP_HOST}/user/updatecart`, {
        productId,
        quantity
      }, {
        withCredentials: true
      });

      if (result.status >= 200 && result.status < 400) {
        await fetchCartItems(); // Refresh cart data
        return { success: true };
      }
    } catch (error) {
      console.error('Failed to update cart:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to update cart' };
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      const result = await axios.delete(`${import.meta.env.VITE_API_APP_HOST}/user/removefromcart`, {
        data: { productId },
        withCredentials: true
      });

      if (result.status >= 200 && result.status < 400) {
        await fetchCartItems(); // Refresh cart data
        return { success: true };
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to remove item' };
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    setSubtotal(0);
  };

  // Fetch cart when authentication state changes
  useEffect(() => {
    if (isAuthenticated === true) {
      fetchCartItems();
    } else if (isAuthenticated === false) {
      clearCart();
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      subtotal,
      isLoading,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      fetchCartItems,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}