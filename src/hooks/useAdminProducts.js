// src/hooks/useAdminProducts.js
import { useEffect, useMemo, useState } from "react";
import { PRODUCTOS } from "../data/productos";

const STORAGE_KEY = "admin_products";

function migrate(items) {
  // borra campos obsoletos
  return items.map(({ codigo, stock, ...rest }) => rest);
}

export function useAdminProducts() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return PRODUCTOS;
      const parsed = JSON.parse(raw);
      return migrate(Array.isArray(parsed) ? parsed : PRODUCTOS);
    } catch {
      return PRODUCTOS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const productsById = useMemo(() => {
    const m = new Map();
    items.forEach(p => m.set(p.id, p));
    return m;
  }, [items]);

  const nextId = useMemo(() => (items.length ? Math.max(...items.map(p => p.id)) + 1 : 1), [items]);

  const add = (prod) => setItems(prev => [...prev, prod]);
  const update = (id, patch) => setItems(prev => prev.map(p => (p.id === id ? { ...p, ...patch } : p)));
  const remove = (id) => setItems(prev => prev.filter(p => p.id !== id));
  const resetToSeed = () => setItems(PRODUCTOS);

  return { items, productsById, add, update, remove, resetToSeed, nextId };
}
