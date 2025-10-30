// context/ProductsContext.js
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTOS as SEED } from "../data/productos";

const Ctx = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem("comanga_products");
      return raw ? JSON.parse(raw) : SEED;
    } catch {
      return SEED;
    }
  });

  const productsById = useMemo(
    () => new Map(products.map((p) => [p.id, p])),
    [products]
  );

  useEffect(() => {
    localStorage.setItem("comanga_products", JSON.stringify(products));
  }, [products]);

  // Helper para IDs
  const getNextId = () =>
    products.length ? Math.max(...products.map((x) => x.id || 0)) + 1 : 1;

  // Normalizador
  const normalize = (p) => ({
    ...p,
    precio: Number(p.precio) || 0,
    categoria: (p.categoria || "").toLowerCase().replace("cómic", "comic"),
  });

  const addProduct = (p) => {
    const withId = { ...p, id: p.id ?? getNextId() };
    const norm = normalize(withId);
    setProducts((prev) => [norm, ...prev]);
  };

  const updateProduct = (id, patch) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? normalize({ ...p, ...patch, id }) : p))
    );
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToSeed = () => {
    setProducts(SEED);
  };

  return (
    <Ctx.Provider
      value={{
        products,
        productsById,
        addProduct,
        updateProduct,
        removeProduct,
        resetToSeed,
        getNextId,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useProducts = () => useContext(Ctx);
