// src/App.js
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Páginas
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Blog from "./pages/Blog";
import DetalleBlog from "./pages/DetalleBlog";
import DetalleProducto from "./pages/DetalleProducto";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";

export default function App() {
  return (
    <CartProvider>
      <NavBar />
      <main className="container" style={{ padding: "1rem 0 2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<DetalleBlog />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          {/* Fallback simple */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
}
