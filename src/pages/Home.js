// src/pages/Home.jsx
export default function Home(){
  return (
    <>
      <section className="hero-full" aria-label="Banner principal">
        <div className="hero-bg">
          {/* reemplaza por tu banner */}
          <img src="/assets/banners/hero.jpg" alt="Colección de cómics y mangas" />
          <div className="hero-overlay">
            <h1><span className="jp-font">Descubre nuestro catálogo de cómics y mangas</span></h1>
            <p>Envíos a todo Chile</p>
          </div>
        </div>
      </section>

      <section className="hero-cta container">
        <a className="btn" href="/productos">Ver productos</a>
      </section>

      <section className="container">
        <h2>Destacados</h2>
        <div id="gridDestacados" className="grid">{/* luego map de productos */}</div>
      </section>
    </>
  );
}
