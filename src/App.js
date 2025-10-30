// src/App.js
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Contextos
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

// Layout
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Páginas
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";
import Blog from "./pages/Blog";
import DetalleBlog from "./pages/DetalleBlog";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
import Admin from "./pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    try { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); }
    catch { window.scrollTo(0, 0); }
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ProductsProvider>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
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
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <Footer />
        </CartProvider>
      </AuthProvider>
    </ProductsProvider>
  );
}
