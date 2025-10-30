import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext.js";
import { useCart } from "../context/CartContext.js";

const CLP = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export default function DetalleProducto() {
  const { id } = useParams(); // /producto/:id
  const { productsById, products } = useProducts();
  const { addItem } = useCart();

  // Producto “vivo” desde el contexto (refleja cambios hechos en Admin)
  const producto = productsById.get(Number(id)) || null;

  useEffect(() => {
    document.title = producto ? `Comanga – ${producto.nombre}` : "Comanga – Producto";
    window.scrollTo(0, 0);
  }, [producto]);

  const [qty, setQty] = useState(1);

  // ✅ Soporta http/https, data:, y rutas locales
  const imgSrc = (path) => {
    if (!path) return "";
    if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
    return path.startsWith("/") ? path : `/${path}`;
  };

  // Hooks calculados
  const totalLinea = useMemo(() => {
    const price = producto?.precio ?? 0;
    return price * (qty || 1);
  }, [producto, qty]);

  const relacionados = useMemo(() => {
    if (!producto) return [];
    const sameCat = (products || []).filter(
      (p) => p.id !== producto.id && p.categoria === producto.categoria
    );
    return sameCat.slice(0, 4);
  }, [products, producto]);

  if (!producto) {
    return (
      <main className="container" style={{ padding: "1rem 0 2rem" }}>
        <h1>Producto no encontrado</h1>
        <p className="muted">El artículo solicitado no existe o fue eliminado.</p>
        <Link className="btn" to="/productos">Volver a productos</Link>
      </main>
    );
  }

  const { nombre, sinopsis, autor, editorial, precio, categoria, imagen } = producto;

  const handleAdd = () => {
    addItem(
      { id: producto.id, name: producto.nombre, image: imgSrc(producto.imagen) },
      Math.max(1, qty)
    );
  };

  return (
    <main className="container" style={{ padding: "1rem 0 2rem" }}>
      <nav className="back-row">
        <Link className="btn btn-outline" to="/productos">← Volver</Link>
      </nav>

      <section className="detail-grid">
        {/* Media */}
        <div className="detail-media">
          {imagen ? (
            <img
              src={imgSrc(imagen)}
              alt={nombre}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: 360,
                borderRadius: 12,
                border: "1px solid #262626",
                background: "#0f0f10",
                display: "grid",
                placeItems: "center",
                color: "#828b94",
              }}
            >
              Sin imagen
            </div>
          )}
        </div>

        {/* Info */}
        <div className="detail-info">
          <h1 style={{ marginTop: 0 }}>{nombre}</h1>
          <p className="muted" style={{ marginTop: 0 }}>
            {[autor, editorial, categoria].filter(Boolean).join(" · ")}
          </p>

          <div className="price" style={{ fontSize: "1.25rem" }}>
            {CLP.format(precio || 0)}
          </div>

          {sinopsis && <p style={{ marginTop: ".75rem" }}>{sinopsis}</p>}

          {/* Compra */}
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginTop: ".9rem" }}>
            <label htmlFor="qty" className="muted">Cantidad</label>
            <input
              id="qty"
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
              style={{
                width: 80,
                background: "#111",
                color: "#f5f5f5",
                border: "1px solid #2a2a2a",
                borderRadius: 8,
                padding: ".45rem .6rem",
                textAlign: "center",
              }}
            />
            <button className="btn" onClick={handleAdd}>
              Agregar al carrito
            </button>
          </div>

          <div className="muted" style={{ marginTop: ".5rem" }}>
            Total línea: <strong>{CLP.format(totalLinea)}</strong>
          </div>
        </div>
      </section>

      {!!relacionados.length && (
        <section style={{ marginTop: "1.2rem" }}>
          <h2>Relacionados</h2>
          <div id="relacionadosGrid" className="grid">
            {relacionados.map((r) => (
              <article className="card" key={r.id}>
                <Link to={`/producto/${r.id}`}>
                  {r.imagen ? (
                    <img src={imgSrc(r.imagen)} alt={r.nombre} loading="lazy" />
                  ) : (
                    <div style={{ width: "100%", height: 180, borderBottom: "1px solid #262626", background: "#111" }} />
                  )}
                </Link>
                <div className="p">
                  <h3><Link to={`/producto/${r.id}`}>{r.nombre}</Link></h3>
                  <p className="muted" style={{ margin: 0 }}>
                    {[r.autor, r.editorial].filter(Boolean).join(" · ")}
                  </p>
                  <div className="price">{CLP.format(r.precio || 0)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
