// src/context/ProductsContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTOS as SEED } from "../data/productos";

const KEY = "admin_products_v1";
const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : SEED;
    } catch {
      return SEED;
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(products));
  }, [products]);

  const productsById = useMemo(() => {
    const m = new Map();
    for (const p of products) m.set(p.id, p);
    return m;
  }, [products]);

  const nextId = useMemo(
    () => (products.length ? Math.max(...products.map(x => x.id)) + 1 : 1),
    [products]
  );

  const addProduct = (p) => setProducts(prev => [...prev, { ...p }]);
  const updateProduct = (id, patch) =>
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...patch } : p)));
  const removeProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));
  const resetProducts = () => setProducts(SEED);

  const value = {
    products,
    productsById,
    nextId,
    addProduct,
    updateProduct,
    removeProduct,
    resetProducts,
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export const useProducts = () => useContext(ProductsContext);
