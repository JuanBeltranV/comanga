import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.js";
import { useProducts } from "../context/ProductsContext.js";

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
  const { products } = useProducts(); // ✅ ahora viene del contexto

  const destacados = useMemo(() => getRandomThree(products || []), [products]);

  // ✅ Soporta http/https, data:, y rutas locales
  const imgSrc = (path) => {
    if (!path) return "";
    if (/^(https?:)?\/\//i.test(path) || path.startsWith("data:")) return path;
    return path.startsWith("/") ? path : `/${path}`;
  };

  return (
    <>
      {/* HERO FULL-WIDTH */}
      <section className="hero-full full-bleed" aria-label="Banner principal">
        <div className="hero-bg">
          <img src="/assets/banners/hero.jpg" alt="Colección de cómics y mangas" />
          <div className="hero-overlay">
            <h1><span className="jp-font">Descubre nuestro catálogo de cómics y mangas</span></h1>
            <p>Envíos a todo Chile</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-cta container">
        <Link className="btn btn-xl btn-wide" to="/productos">Ver productos</Link>
      </section>

      {/* DESTACADOS */}
      <section className="container">
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
                  <div className="muted">{[p.autor, p.editorial].filter(Boolean).join(" · ")}</div>
                  <div className="price">
                    {p.precio?.toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                      maximumFractionDigits: 0
                    })}
                  </div>
                  <div className="row">
                    <Link className="btn btn-outline btn-lg" to={`/producto/${p.id}`}>Ver detalle</Link>
                    <button
                      className="btn btn-lg"
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
