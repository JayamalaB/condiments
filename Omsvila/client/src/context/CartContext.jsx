import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

const makeKey = (name, weight) => `${name}__${weight}`;

const migrateItem = (item) => ({
  ...item,
  weight: item.weight || "500g",
  _key: item._key || makeKey(item.name, item.weight || "500g"),
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return (JSON.parse(localStorage.getItem("cart")) || []).map(migrateItem);
    } catch {
      return [];
    }
  });

  const save = (updated) => {
    localStorage.setItem("cart", JSON.stringify(updated));
    return updated;
  };

  const addToCart = (product) => {
    const key = makeKey(product.name, product.weight || "500g");
    setCartItems((prev) => {
      const existing = prev.find((item) => item._key === key);
      return save(
        existing
          ? prev.map((item) => item._key === key ? { ...item, qty: item.qty + 1 } : item)
          : [...prev, { ...product, weight: product.weight || "500g", _key: key, qty: 1 }]
      );
    });
  };

  const incrementQty = (key) => {
    setCartItems((prev) =>
      save(prev.map((item) => item._key === key ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decrementQty = (key) => {
    setCartItems((prev) =>
      save(
        prev
          .map((item) => item._key === key ? { ...item, qty: item.qty - 1 } : item)
          .filter((item) => item.qty > 0)
      )
    );
  };

  const removeFromCart = (key) => {
    setCartItems((prev) => save(prev.filter((item) => item._key !== key)));
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, incrementQty, decrementQty, removeFromCart, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
