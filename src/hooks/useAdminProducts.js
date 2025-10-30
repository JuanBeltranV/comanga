// hooks/useAdminProducts.js
import { useMemo } from "react";
import { useProducts } from "../context/ProductsContext";

export function useAdminProducts() {
  const {
    products,
    addProduct,
    updateProduct,
    removeProduct,
    resetToSeed,
    getNextId,
  } = useProducts();

  const items = products;

  // Normaliza lo que viene del formulario del Admin
  const normalize = (p) => ({
    ...p,
    precio: Number(p.precio) || 0,
    categoria: (p.categoria || "").toLowerCase().replace("cómic", "comic"),
  });

  const add = (p) => addProduct(normalize(p));
  const update = (id, patch) => updateProduct(id, normalize({ ...patch, id }));
  const remove = (id) => removeProduct(id);

  const nextId = useMemo(() => getNextId(), [products, getNextId]);

  return { items, add, update, remove, resetToSeed, nextId };
}
