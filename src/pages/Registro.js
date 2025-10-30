import { useEffect, useState } from "react";

export default function Registro() {
  useEffect(() => {
    document.title = "Comanga – Registro";
    window.scrollTo(0, 0);
  }, []);

  const [form, setForm] = useState({ nombre: "", email: "", pass: "" });
  const [errors, setErrors] = useState({});
  const [ok, setOk] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setErrors(err => ({ ...err, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Ingresa tu nombre.";
    if (!form.email.trim()) e.email = "Ingresa tu email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email no válido.";
    if (!form.pass.trim()) e.pass = "Crea una contraseña.";
    else if (form.pass.length < 6) e.pass = "Mínimo 6 caracteres.";
    return e;
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    const eobj = validate();
    setErrors(eobj);
    if (Object.keys(eobj).length) return;
    setOk("Cuenta creada (demo).");
  };

  return (
    <main className="container" style={{ padding: "1rem 0 2rem" }}>
      <h1 className="center-text">Registrarse</h1>

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
            <label>Contraseña</label>
            <input name="pass" value={form.pass} onChange={onChange} />
            <div className="error">{errors.pass || "\u00A0"}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn" type="submit">Crear cuenta</button>
          </div>

          {ok && <div className="ok">{ok}</div>}
        </form>
      </section>
    </main>
  );
}
