// src/pages/DetalleBlog.jsx
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { POSTS, formatFecha } from "../data/posts.js";

export default function DetalleBlog() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `Comanga – ${post.titulo}`;
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) {
    return (
      <main className="container" style={{ padding: "1rem 0 2rem" }}>
        <h1>Artículo no encontrado</h1>
        <p className="muted">El artículo que buscas no existe o fue movido.</p>
        <Link className="btn" to="/blog">Volver al blog</Link>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: "1rem 0 2rem" }}>
      <div className="back-row">
        <Link className="btn btn-outline" to="/blog">← Volver al blog</Link>
      </div>

      <article className="blog-article">
        <h1>{post.titulo}</h1>
        <p className="muted">Publicado el {formatFecha(post.fecha)}</p>
        <img
          src={`/${post.imagen}`}
          alt={post.titulo}
          style={{
            width: "100%",
            borderRadius: 10,
            margin: ".5rem 0 1rem",
            border: "1px solid #262626",
            objectFit: "cover",
            maxHeight: 520
          }}
        />

        {post.contenido.map((parrafo, i) => {
          // Si el contenido empieza con viñeta "• " lo mostramos como <li>, si no <p>
          if (parrafo.startsWith("• ")) {
            return (
              <ul key={`ul-${i}`} style={{ marginTop: 0 }}>
                <li>{parrafo.slice(2)}</li>
              </ul>
            );
          }
          // Encabezados simples (opcional)
          if (/^Tips para asistir:|Lo que más hype genera:$/i.test(parrafo)) {
            return <h3 key={`h3-${i}`}>{parrafo.replace(":", "")}</h3>;
          }
          return <p key={i}>{parrafo}</p>;
        })}
      </article>
    </main>
  );
}
