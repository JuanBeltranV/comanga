import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.js";

const CLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

export default function Carrito() {
  const { items, increment, decrement, updateQty, removeItem, clear, subtotal, getProductSnapshot } = useCart();

  const envio = useMemo(() => 0, []);
  const total = useMemo(() => subtotal + envio, [subtotal, envio]);

  useEffect(() => { document.title = "Carrito – Comanga"; }, []);

  // ✅ Soporta http/https, data:, y rutas locales
  const imgSrc = (path) => {
    if (!path) return "";
    if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
    return path.startsWith("/") ? path : `/${path}`;
  };

  if (!items.length) {
    return (
      <main className="container" style={{ padding: "1rem 0 2rem" }}>
        <h1>Carrito</h1>
        <p className="muted">Tu carrito está vacío.</p>
        <Link className="btn" to="/productos">Ver productos</Link>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: "1rem 0 2rem" }}>
      <h1>Carrito</h1>

      <div className="cart-list">
        {items.map((it) => {
          const live = getProductSnapshot(it.id);
          const name = live?.nombre ?? it.name ?? "Producto";
          const price = live?.precio ?? 0;
          const image = live?.imagen ? imgSrc(live.imagen) : imgSrc(it.image);

          return (
            <article key={it.id} className="cart-row">
              <div className="cart-product">
                <img className="cart-thumb" src={image} alt={name} loading="lazy" />
                <h3 className="cart-name"><Link to={`/producto/${it.id}`}>{name}</Link></h3>
              </div>

              <div className="cart-price">{CLP.format(price)}</div>

              <div className="cart-qty">
                <button aria-label={`Quitar uno de ${name}`} onClick={() => decrement(it.id)}>−</button>
                <input
                  type="number"
                  min={1}
                  value={it.qty || 1}
                  onChange={(e) => updateQty(it.id, parseInt(e.target.value || "1", 10))}
                  style={{ width: 56, textAlign: "center", background: "#111", color: "#f5f5f5", border: "1px solid #2a2a2a", borderRadius: 8, padding: "0.3rem 0.4rem" }}
                  aria-label={`Cantidad de ${name}`}
                />
                <button aria-label={`Agregar uno de ${name}`} onClick={() => increment(it.id)}>+</button>
              </div>

              <div className="cart-line">{CLP.format((it.qty || 0) * price)}</div>

              <div className="cart-actions">
                <button className="rm" onClick={() => removeItem(it.id)} aria-label={`Quitar ${name} del carrito`}>Quitar</button>
              </div>
            </article>
          );
        })}
      </div>

      <section className="cart-summary">
        <div className="cart-totals">
          <div><span>Subtotal</span><span id="cartSubtotal">{CLP.format(subtotal)}</span></div>
          <div><span>Envío</span><span id="cartEnvio">{CLP.format(envio)}</span></div>
          <div className="sep" />
          <div className="total"><span>Total</span><strong id="carritoTotal">{CLP.format(total)}</strong></div>
        </div>

        <div className="cart-actions-bottom">
          <button className="btn btn-outline" onClick={clear}>Vaciar</button>
          <button className="btn" onClick={() => alert("Flujo de pago pendiente de implementar")}>Pagar</button>
        </div>
      </section>
    </main>
  );
}
