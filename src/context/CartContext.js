// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === product.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);
  const updateQty = (id, qty) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p));

  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((a, b) => a + b.qty * (b.price || 0), 0), [items]);

  const value = { items, addItem, removeItem, clear, updateQty, count, subtotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
