import { useCart } from "../context/CartContext";
export default function Carrito(){
  const { items, subtotal } = useCart();
  return (
    <>
      <h1>Carrito</h1>
      <div id="carritoLista" className="cart-list">
        {items.map(it => (
          <div key={it.id} className="cart-row">
            <div className="cart-product">
              <img className="cart-thumb" src={it.img} alt={it.title}/>
              <p className="cart-name">{it.title}</p>
            </div>
            <div className="cart-price">${it.price?.toLocaleString?.() ?? it.price}</div>
            <div className="cart-qty">x{it.qty}</div>
            <div className="cart-line">${(it.qty * it.price).toLocaleString()}</div>
            <div className="cart-actions"><button className="rm">Quitar</button></div>
          </div>
        ))}
      </div>
      <section className="cart-summary">
        <div className="cart-totals">
          <div><span>Subtotal</span><span id="cartSubtotal">${subtotal.toLocaleString()}</span></div>
          <div><span>Envío</span><span id="cartEnvio">$0</span></div>
          <div className="sep"></div>
          <div className="total"><span>Total</span><strong id="carritoTotal">${subtotal.toLocaleString()}</strong></div>
        </div>
        <div className="cart-actions-bottom">
          <button className="btn btn-outline">Vaciar</button>
          <button className="btn">Pagar</button>
        </div>
      </section>
    </>
  );
}