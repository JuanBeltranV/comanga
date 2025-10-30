import { useEffect } from "react";

export default function Nosotros() {
  useEffect(() => {
    document.title = "Comanga – Nosotros";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="container" style={{ padding: "1rem 0 2rem" }}>
      <h1 className="center-text">Nosotros</h1>

      <section
        className="form-card center-block center-text"
        style={{ maxWidth: 860 }}
      >
        <p style={{ marginTop: 0 }}>
          En <strong>Comanga</strong> amamos los cómics y mangas. Nuestro
          objetivo es acercar las mejores ediciones a todo Chile, con envíos
          rápidos y atención de primera.
        </p>

        {/* Tarjetas Misión, Visión, Valores */}
        <div
          id="nosotrosCards"
          className="grid grid-center"
          style={{
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,260px))",
          }}
        >
          <div className="card">
            <div className="p">
              <h3>Misión</h3>
              <p>
                Promover la lectura y coleccionismo con un catálogo curado y
                precios justos.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="p">
              <h3>Visión</h3>
              <p>
                Ser la tienda referente en cómics y mangas en Chile, con una
                comunidad activa.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="p">
              <h3>Valores</h3>
              <p>
                Pasión, cercanía, calidad y transparencia en todo lo que
                hacemos.
              </p>
            </div>
          </div>
        </div>

        <h2 style={{ marginTop: "1.2rem" }}>Dónde estamos</h2>
        <p className="muted" style={{ marginTop: ".25rem" }}>
          Envíos a todo Chile. Retiro coordinado en Santiago (previa
          confirmación).
        </p>

        <img
          src="/assets/static/tienda.jpg"
          alt="Tienda Comanga"
          style={{
            width: "100%",
            borderRadius: 12,
            border: "1px solid #262626",
            marginTop: ".6rem",
            objectFit: "cover",
            maxHeight: 360,
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </section>
    </main>
  );
}
