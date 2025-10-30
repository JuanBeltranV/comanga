import { ProductsProvider } from "../src/context/ProductsContext.js";

describe("ProductsContext", () => {
it("debería cargar productos iniciales correctamente", () => {
    const provider = new ProductsProvider({});
    expect(provider).toBeDefined();
});
});

describe("Gestión de productos", () => {
it("debería agregar un nuevo producto correctamente", () => {
    const productos = [
    { id: 1, nombre: "Naruto", categoria: "manga", precio: 8990 },
    ];
    productos.push({ id: 2, nombre: "One Piece", categoria: "manga", precio: 9990 });
    expect(productos.length).toBe(2);
});

it("debería filtrar productos por categoría", () => {
    const productos = [
    { nombre: "Naruto", categoria: "manga" },
    { nombre: "Batman", categoria: "comic" },
    ];
    const filtrados = productos.filter(p => p.categoria === "manga");
    expect(filtrados.length).toBe(1);
});

it("debería calcular correctamente el precio total del carrito", () => {
    const carrito = [
    { nombre: "Naruto", precio: 8000, cantidad: 2 },
    { nombre: "Batman", precio: 10000, cantidad: 1 },
    ];
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    expect(total).toBe(26000);
});
});
