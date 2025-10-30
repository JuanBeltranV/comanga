// src/pages/Productos.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";

const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export default function Productos() {
  const { addItem } = useCart();
  const { products } = useProducts(); // ✅ ahora viene del contexto

  const [categoriaVis, setCategoriaVis] = useState(""); // "", "Manga", "Cómic"
  const [q, setQ] = useState("");

  useEffect(() => {
    document.title = "Productos – Comanga";
    window.scrollTo(0, 0);
  }, []);

  // Mapea la categoría visible (select) a la que guarda el contexto (minúsculas)
  const categoriaCtx = useMemo(() => {
    if (!categoriaVis) return "";
    if (categoriaVis === "Manga") return "manga";
    if (categoriaVis === "Cómic") return "comic";
    return categoriaVis.toLowerCase();
  }, [categoriaVis]);

  const lista = useMemo(() => {
    const base = products || [];
    const term = q.trim().toLowerCase();

    return base.filter((p) => {
      const okCat = categoriaCtx ? (p.categoria || "") === categoriaCtx : true;
      const okQ = term
        ? (p.nombre || "").toLowerCase().includes(term) ||
          (p.autor || "").toLowerCase().includes(term) ||
          (p.editorial || "").toLowerCase().includes(term)
        : true;
      return okCat && okQ;
    });
  }, [products, categoriaCtx, q]);

  const imgSrc = (path) => (path?.startsWith("/") ? path : `/${path}`);

  return (
    <>
      <h1>Productos</h1>

      {/* Filtros */}
      <div
        className="filters"
        style={{
          display: "flex",
          gap: ".75rem",
          alignItems: "center",
          flexWrap: "wrap",
          margin: ".5rem 0 1rem",
        }}
      >
        <label htmlFor="fCategoria">Categoría</label>
        <select
          id="fCategoria"
          value={categoriaVis}
          onChange={(e) => setCategoriaVis(e.target.value)}
        >
          <option value="">Todas</option>
          <option value="Manga">Manga</option>
          <option value="Cómic">Cómic</option>
        </select>

        <input
          type="search"
          placeholder="Buscar por nombre, autor, editorial…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{
            flex: "1 1 260px",
            minWidth: 200,
            background: "#111",
            color: "#f5f5f5",
            border: "1px solid #2a2a2a",
            borderRadius: 10,
            padding: ".55rem .75rem",
          }}
          aria-label="Buscar productos"
        />
      </div>

      {/* Grilla */}
      <div id="gridProductos" className="grid">
        {lista.map((p) => (
          <article key={p.id} className="card">
            <Link to={`/producto/${p.id}`}>
              {p.imagen ? (
                <img src={imgSrc(p.imagen)} alt={p.nombre} loading="lazy" />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 420,
                    background: "#111",
                    borderBottom: "1px solid #262626",
                  }}
                />
              )}
            </Link>

            <div className="p">
              <h3>
                <Link to={`/producto/${p.id}`}>{p.nombre}</Link>
              </h3>
              <p className="muted" style={{ margin: 0 }}>
                {[p.autor, p.editorial].filter(Boolean).join(" · ")}
              </p>
              <div className="price">{CLP.format(p.precio || 0)}</div>

              <div className="row">
                <button
                  className="btn"
                  onClick={() =>
                    addItem(
                      {
                        id: p.id,
                        name: p.nombre,
                        image: imgSrc(p.imagen),
                      },
                      1
                    )
                  }
                  aria-label={`Agregar ${p.nombre} al carrito`}
                >
                  Agregar al carrito
                </button>
                <Link className="btn btn-outline" to={`/producto/${p.id}`}>
                  Ver detalle
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!lista.length && (
        <p className="muted" style={{ marginTop: ".75rem" }}>
          No encontramos productos con esos filtros.
        </p>
      )}
    </>
  );
}
