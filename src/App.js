// src/App.js
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Contextos
import { ProductsProvider } from "./context/ProductsContext.js";
import { CartProvider } from "./context/CartContext.js";
import { AuthProvider } from "./context/AuthContext.js";

// Layout
import NavBar from "./components/NavBar.js";
import Footer from "./components/Footer.js";

// Páginas
import Home from "./pages/Home.js";
import Productos from "./pages/Productos.js";
import DetalleProducto from "./pages/DetalleProducto.js";
import Blog from "./pages/Blog.js";
import DetalleBlog from "./pages/DetalleBlog.js";
import Nosotros from "./pages/Nosotros.js";
import Contacto from "./pages/Contacto.js";
import Login from "./pages/Login.js";
import Registro from "./pages/Registro.js";
import Carrito from "./pages/Carrito.js";
import Admin from "./pages/Admin.js";

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

          
          <main style={{ padding: "1rem 0 2rem" }}>
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
