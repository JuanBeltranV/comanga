// src/components/NavBar.jsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";

const logo = process.env.PUBLIC_URL + "/assets/logo.svg";

export default function NavBar() {
  const { count } = useCart();
  const btn = useRef(null);
  const menu = useRef(null);
  const { pathname } = useLocation();

  // Cierra menú al cambiar de ruta (móvil)
  useEffect(() => {
    if (menu.current) menu.current.classList.remove("open");
    if (btn.current) btn.current.setAttribute("aria-expanded", "false");
  }, [pathname]);

  const toggleMenu = () => {
    const isOpen = menu.current?.classList.toggle("open");
    btn.current?.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  return (
    <header className="shadow">
      <div className="container topbar">
        {/* Logo */}
        <Link className="logo" to="/">
          <img src={logo} alt="Comanga" className="logo-img" />
        </Link>

        {/* Menú */}
        <nav id="navMenu" aria-label="Principal" ref={menu}>
          <ul className="nav">
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/productos" className={({ isActive }) => (isActive ? "active" : "")}>
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={({ isActive }) => (isActive ? "active" : "")}>
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/nosotros" className={({ isActive }) => (isActive ? "active" : "")}>
                Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={({ isActive }) => (isActive ? "active" : "")}>
                Contacto
              </NavLink>
            </li>
            <li>
              <NavLink to="/registro" className={({ isActive }) => (isActive ? "active" : "")}>
                Registrarse
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                Login
              </NavLink>
            </li>
            <li><NavLink to="/admin">Admin</NavLink></li> 
          </ul>
        </nav>

        {/* Carrito */}
        <Link className="btn-cart" to="/carrito" aria-label="Ver carrito">
          <span role="img" aria-label="carrito">🛒</span>
          <span id="cartCount">{count}</span>
        </Link>

        {/* Hamburguesa */}
        <button
          ref={btn}
          className="menu-toggle"
          aria-expanded="false"
          aria-controls="navMenu"
          aria-label="Abrir menú"
          onClick={toggleMenu}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
