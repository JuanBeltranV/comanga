import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PRODUCTOS } from "../data/productos";
import { useCart } from "../context/CartContext";

function getRandomThree(arr) {
  if (!arr?.length) return [];
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, 3);
}

export default function Home() {
  const { addItem } = useCart();
  const destacados = useMemo(() => getRandomThree(PRODUCTOS), []);

  const imgSrc = (path) => (path?.startsWith("/") ? path : `/${path}`);

  return (
    <>
      {/* HERO FULL-WIDTH */}
      <section className="hero-full" aria-label="Banner principal">
        <div className="hero-bg">
          <img src="/assets/banners/hero.jpg" alt="Colección de cómics y mangas" />
          <div className="hero-overlay">
            <h1><span className="jp-font">Descubre nuestro catálogo de cómics y mangas</span></h1>
            <p>Envíos a todo Chile</p>
          </div>
        </div>
      </section>

      {/* CTA (más ancha) */}
      <section className="hero-cta container container--xl">
        <Link className="btn" to="/productos">Ver productos</Link>
      </section>

      {/* DESTACADOS CENTRADOS (más ancho y grid centrada) */}
      <section className="container container--xl">
        <div className="center-block center-text">
          <h2>Destacados</h2>
          <div id="gridDestacados" className="grid grid-center">
            {destacados.map(p => (
              <article className="card" key={p.id}>
                <Link to={`/producto/${p.id}`} aria-label={`Ver ${p.nombre}`}>
                  <img
                    src={imgSrc(p.imagen)}
                    alt={p.nombre}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </Link>
                <div className="p">
                  <h3>{p.nombre}</h3>
                  <div className="muted">{p.autor} · {p.editorial}</div>
                  <div className="price">
                    {p.precio?.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                      maximumFractionDigits: 0
                    })}
                  </div>
                  <div className="row">
                    <Link className="btn btn-outline" to={`/producto/${p.id}`}>Ver detalle</Link>
                    <button
                      className="btn"
                      onClick={() =>
                        addItem({ id: p.id, name: p.nombre, image: imgSrc(p.imagen) }, 1)
                      }
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
