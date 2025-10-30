// src/components/ProductCard.jsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.js";

export default function ProductCard({ item }) {
  const { addToCart } = useCart?.() || { addToCart: () => {} };

  return (
    <div className="card">
      <img
        src={item.imagen}
        alt={item.nombre}
        className="product-cover"
        loading="lazy"
      />
      <div className="p">
        <h3>{item.nombre}</h3>
        <div className="price">${item.precio.toLocaleString("es-CL")}</div>
        <div className="row">
          <Link className="btn btn-outline" to={`/producto/${item.id}`}>
            Ver detalle
          </Link>
          <button className="btn" onClick={() => addToCart(item)}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
