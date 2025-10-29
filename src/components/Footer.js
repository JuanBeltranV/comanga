// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <h4>Comanga™</h4>
          <p>Cómics y Mangas.</p>
        </div>
        <div>
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4>Redes</h4>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">X/Twitter</a></li>
            <li><a href="#">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="copy">© {new Date().getFullYear()} Comanga™ Comics & Mangas</div>
    </footer>
  );
}
