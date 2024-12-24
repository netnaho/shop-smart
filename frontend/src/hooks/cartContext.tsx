import React, { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;

  availableQuantity: number;
  category: {
    _id: string;
    name: string;
    image: string;
  };
  value: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, value: cartItem.value + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  // Decrease quantity of an item in the cart
  const decreaseQuantity = (itemId: string) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item._id === itemId ? { ...item, value: item.value - 1 } : item
          )
          .filter((item) => item.value > 0) // Remove item if quantity becomes 0
    );
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
