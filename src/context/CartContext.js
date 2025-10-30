// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useProducts } from "./ProductsContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { productsById } = useProducts();

  // Guardamos solo {id, qty, name?, image?}
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
      return [...prev, { id: product.id, qty, name: product.name, image: product.image }];
    });
  };

  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);

  const updateQty = (id, qty) =>
    setItems(prev => prev.map(p => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)));

  const increment = (id) =>
    setItems(prev => prev.map(p => (p.id === id ? { ...p, qty: (p.qty || 1) + 1 } : p)));

  const decrement = (id) =>
    setItems(prev => prev.map(p => (p.id === id ? { ...p, qty: Math.max(1, (p.qty || 1) - 1) } : p)));

  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);

  // Total con precios “vivos”
  const subtotal = useMemo(() => {
    return items.reduce((total, it) => {
      const p = productsById.get(it.id);
      const price = p?.precio || 0;
      return total + price * it.qty;
    }, 0);
  }, [items, productsById]);

  const getProductSnapshot = (id) => productsById.get(id) || null;

  const value = {
    items, addItem, removeItem, clear, updateQty, increment, decrement,
    count, subtotal, getProductSnapshot
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
