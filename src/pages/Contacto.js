import { useEffect, useState } from "react";

export default function Contacto() {
  useEffect(() => {
    document.title = "Comanga – Contacto";
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [ok, setOk] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: "" })); // limpia error del campo al tipear
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Ingresa tu nombre.";
    if (!form.email.trim()) e.email = "Ingresa tu email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email no válido.";
    if (!form.mensaje.trim()) e.mensaje = "Escribe un mensaje.";
    return e;
    };

  const onSubmit = (e) => {
    e.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length) return;
    setOk("Gracias por tu mensaje. Te responderemos pronto.");
  };

  return (
    <main className="container" style={{ padding: "1rem 0 2rem" }}>
      <h1 className="center-text">Contacto</h1>

      <section className="form-card center-block" style={{ maxWidth: 860 }}>
        <form className="form" noValidate onSubmit={onSubmit}>
          <div className="field">
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={onChange} />
            <div className="error">{errors.nombre || "\u00A0"}</div>
          </div>

          <div className="field">
            <label>Email</label>
            <input name="email" value={form.email} onChange={onChange} />
            <div className="error">{errors.email || "\u00A0"}</div>
          </div>

          <div className="field">
            <label>Mensaje</label>
            <textarea name="mensaje" value={form.mensaje} onChange={onChange} />
            <div className="error">{errors.mensaje || "\u00A0"}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn" type="submit">Enviar</button>
          </div>

          {ok && <div className="ok" role="status">{ok}</div>}
        </form>
      </section>
    </main>
  );
}
