// src/pages/Blog.jsx
import { Link } from "react-router-dom";
import { POSTS, formatFecha } from "../data/posts.js";

export default function Blog() {
  return (
    <main className="container" style={{ padding: "1rem 0 2rem" }}>
      <h1>Blog</h1>

      <hr />

      {POSTS.map((post, idx) => (
        <article key={post.slug} className="blog-article">
          <h2>{post.titulo}</h2>
          <p className="muted">Publicado el {formatFecha(post.fecha)}</p>
          <img
            src={`/${post.imagen}`}
            alt={post.titulo}
            className="blog-img"
            style={{
              width: "100%",
              borderRadius: 10,
              margin: ".5rem 0 1rem",
              border: "1px solid #262626",
              objectFit: "cover",
              maxHeight: 420
            }}
          />
          <p>{post.extracto}</p>
          <Link className="btn" to={`/blog/${post.slug}`}>
            Leer más
          </Link>

          {idx < POSTS.length - 1 && <hr style={{ marginTop: "1.25rem" }} />}
        </article>
      ))}
    </main>
  );
}
