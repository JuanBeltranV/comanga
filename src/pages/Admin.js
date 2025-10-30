import { useEffect, useMemo, useState } from "react";
import { useAdminProducts } from "../hooks/useAdminProducts";

const CLP = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

const emptyForm = {
  id: null,
  nombre: "",
  categoria: "Manga",
  precio: 0,
  imagen: "",     // URL pública o DataURL (si en algún momento decides reactivar subida)
  sinopsis: "",
  autor: "",
  editorial: ""
};

export default function Admin() {
  useEffect(() => {
    document.title = "Comanga – Admin";
    window.scrollTo(0, 0);
  }, []);

  const { items, add, update, remove, resetToSeed, nextId } = useAdminProducts();

  const [query, setQuery] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [msg, setMsg] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(p =>
      [p.nombre, p.autor, p.editorial, p.categoria]
        .filter(Boolean)
        .some(s => s.toLowerCase().includes(q))
    );
  }, [items, query]);

  function edit(row) {
    setForm({ ...row });
    setMsg("");
  }

  function clearForm() {
    setForm(emptyForm);
    setMsg("");
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      [name]: name === "precio" ? Number(value || 0) : value
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!form.nombre.trim()) return setMsg("Debes indicar un nombre.");
    if (!form.precio || form.precio < 0) return setMsg("Precio inválido.");
    if (!form.categoria) return setMsg("Selecciona una categoría.");
    if (!form.imagen) setMsg("Sugerencia: agrega una imagen (URL pública).");

    if (form.id == null) {
      add({ ...form, id: nextId });
      setMsg("Producto creado ✔");
    } else {
      update(form.id, form);
      setMsg("Producto actualizado ✔");
    }
  }

  function onDelete(id) {
    if (window.confirm("¿Eliminar este producto?")) {
      remove(id);
      if (form.id === id) clearForm();
      setMsg("Producto eliminado ✔");
    }
  }

  const imgSrc = (path) => {
    if (!path) return "";
    if (path.startsWith("data:")) return path;
    return path.startsWith("/") ? path : `/${path}`;
  };

  return (
    <main className="container" style={{ padding: "1rem 0 2rem" }}>
      <h1 className="center-text">Admin – Productos</h1>

      {/* Buscador + acciones */}
      <section className="form-card center-block" style={{ marginBottom: "1rem", maxWidth: 1100 }}>
        <div className="row" style={{ alignItems: "center", justifyContent: "space-between", gap: ".75rem", flexWrap: "wrap" }}>
          <input
            placeholder="Buscar por nombre, autor, editorial o categoría…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, background: "#111", color: "#f5f5f5", border: "1px solid #2a2a2a", borderRadius: 10, padding: ".6rem .75rem" }}
          />
          <div style={{ display: "flex", gap: ".5rem" }}>
            <button className="btn btn-outline" onClick={clearForm}>Nuevo</button>
            <button className="btn btn-outline" onClick={() => { if (window.confirm("¿Reiniciar al catálogo original?")) resetToSeed(); }}>
              Reiniciar catálogo
            </button>
          </div>
        </div>
      </section>

      {/* Tabla */}
      <div className="form-card center-block" style={{ overflowX: "auto", maxWidth: 1100 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th style={th}>Img</th>
              <th style={th}>Nombre</th>
              <th style={th}>Autor / Editorial</th>
              <th style={th}>Categoría</th>
              <th style={th}>Precio</th>
              <th style={th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} style={{ borderTop: "1px solid #262626" }}>
                <td style={td}>
                  {p.imagen ? (
                    <img
                      src={imgSrc(p.imagen)}
                      alt={p.nombre}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                      style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8, border: "1px solid #262626", background: "#111" }}
                    />
                  ) : <span className="muted">—</span>}
                </td>
                <td style={td}><strong>{p.nombre}</strong></td>
                <td style={td} className="muted">{[p.autor, p.editorial].filter(Boolean).join(" · ")}</td>
                <td style={td}>{p.categoria}</td>
                <td style={td}>{CLP.format(p.precio || 0)}</td>
                <td style={td}>
                  <div style={{ display: "flex", gap: ".4rem" }}>
                    <button className="btn btn-outline" onClick={() => edit(p)}>Editar</button>
                    <button className="btn" onClick={() => onDelete(p.id)} style={{ background: "#8a1c12" }}>Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr><td colSpan={6} style={{ padding: ".8rem 0" }} className="muted">No hay resultados.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Formulario */}
      <section className="form-card center-block" style={{ marginTop: "1rem", maxWidth: 860 }}>
        <h2 style={{ marginTop: 0 }} className="center-text">{form.id == null ? "Nuevo producto" : `Editar #${form.id}`}</h2>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="row2">
            <div className="field">
              <label>Nombre</label>
              <input name="nombre" value={form.nombre} onChange={onChange} placeholder="Ej. Dandadan #1" />
            </div>
            <div className="field">
              <label>Categoría</label>
              <select name="categoria" value={form.categoria} onChange={onChange}>
                <option value="Manga">Manga</option>
                <option value="Cómic">Cómic</option>
              </select>
            </div>
          </div>

          <div className="row2">
            <div className="field">
              <label>Precio (CLP)</label>
              <input name="precio" type="number" min="0" step="100" value={form.precio} onChange={onChange} />
            </div>
            <div className="field">
              <label>Editorial</label>
              <input name="editorial" value={form.editorial} onChange={onChange} placeholder="Shueisha / Marvel / DC…" />
            </div>
          </div>

          <div className="field">
            <label>Autor</label>
            <input name="autor" value={form.autor} onChange={onChange} placeholder="Autor / autores" />
          </div>

          <div className="field">
            <label>Sinopsis</label>
            <textarea name="sinopsis" value={form.sinopsis} onChange={onChange} placeholder="Breve descripción…" />
          </div>

          <div className="field">
            <label>Imagen (URL pública)</label>
            <input
              name="imagen"
              value={form.imagen}
              onChange={onChange}
              placeholder="/assets/productos/onepiece-1.jpg o https://…"
            />
            <small className="muted">Tip: si ya existe en <code>/public</code>, usa rutas como <code>/assets/...</code></small>
          </div>

          {form.imagen && (
            <div style={{ marginTop: ".5rem" }}>
              <label className="muted">Vista previa</label>
              <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
                <img
                  src={imgSrc(form.imagen)}
                  alt="preview"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                  style={{ width: 140, height: 180, objectFit: "cover", borderRadius: 10, border: "1px solid #262626", background: "#111" }}
                />
                <div className="muted" style={{ fontSize: ".9rem" }}>
                  {form.imagen.length > 60 ? form.imagen.slice(0, 58) + "…" : form.imagen}
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: ".5rem", justifyContent: "flex-end", marginTop: ".5rem" }}>
            <button type="button" className="btn btn-outline" onClick={clearForm}>Limpiar</button>
            <button type="submit" className="btn">{form.id == null ? "Crear" : "Guardar"}</button>
          </div>

          {msg && <div className="ok">{msg}</div>}
        </form>
      </section>
    </main>
  );
}

const th = { padding: ".5rem .4rem", borderBottom: "1px solid #262626" };
const td = { padding: ".55rem .4rem", verticalAlign: "middle" };
