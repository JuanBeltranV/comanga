import { useAdminProducts } from "../src/hooks/useAdminProducts.js";

// Simulación ligera de un entorno React (no renderiza nada visual)
describe("Hook useAdminProducts", () => {
  let admin;

  beforeEach(() => {
    // Simula inicializar el hook
    admin = useAdminProducts();
    // Reinicia el catálogo al SEED inicial antes de cada test
    admin.resetToSeed();
  });

  it("debe cargar productos iniciales", () => {
    const items = admin.items;
    expect(items.length).toBeGreaterThan(0);
  });

  it("debe agregar un nuevo producto correctamente", () => {
    const initialCount = admin.items.length;

    const nuevo = {
      id: admin.nextId,
      nombre: "Bleach #2",
      categoria: "Manga",
      precio: 9990,
      imagen: "/assets/productos/bleach-2.jpg",
      autor: "Tite Kubo",
      editorial: "Shueisha",
    };

    admin.add(nuevo);

    const finalCount = admin.items.length;
    expect(finalCount).toBe(initialCount + 1);
    expect(admin.items.some(p => p.nombre === "Bleach #2")).toBeTrue();
  });

  it("debe actualizar un producto existente", () => {
    const p = admin.items[0];
    const nuevoPrecio = p.precio + 1000;

    admin.update(p.id, { ...p, precio: nuevoPrecio });
    const actualizado = admin.items.find(x => x.id === p.id);

    expect(actualizado.precio).toBe(nuevoPrecio);
  });

  it("debe eliminar un producto correctamente", () => {
    const id = admin.items[0].id;
    admin.remove(id);
    expect(admin.items.find(p => p.id === id)).toBeUndefined();
  });

  it("debe reiniciar el catálogo al SEED original", () => {
    admin.add({
      id: admin.nextId,
      nombre: "Prueba",
      categoria: "Manga",
      precio: 5000,
    });

    const countAntes = admin.items.length;
    admin.resetToSeed();
    const countDespues = admin.items.length;

    expect(countDespues).toBeLessThan(countAntes);
  });
});
