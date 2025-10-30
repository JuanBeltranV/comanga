// src/data/posts.js
export const POSTS = [
  {
    slug: "comic-con-chile-2025",
    titulo: "Comic-Con Chile 2025: ¡lo que no te puedes perder!",
    fecha: "2025-09-25",
    imagen: "assets/blog/comiccon2025.jpg",
    extracto:
      "Este año la Comic-Con Chile 2025 promete ser la más grande hasta ahora, con invitados internacionales, lanzamientos exclusivos y actividades para toda la familia...",
    contenido: [
      "La Comic-Con Chile 2025 llega con más metros cuadrados, más artistas invitados y una parrilla de actividades pensada para todos los públicos. Durante tres días se mezclarán charlas, firmas de autógrafos, lanzamientos de editoriales y concursos de cosplay con una producción de primer nivel.",
      "Entre los invitados confirmados habrá dibujantes y guionistas de renombre, además de celebridades del cine y la TV. Los stands oficiales ofrecerán mercancía exclusiva, y varias editoriales prometen adelantos y ediciones limitadas.",
      "Tips para asistir:",
      "• Llega temprano para evitar filas y aprovecha los paneles de la mañana.",
      "• Si vas a cosplay, considera telas livianas y calzado cómodo.",
      "• Lleva efectivo y tarjeta: algunos stands tienen promociones especiales.",
      "¡Nos vemos allá! Y recuerda que en Chetanga (ahora Comanga) tendremos promos especiales durante el evento."
    ]
  },
  {
    slug: "lanzamientos-mangas-2025",
    titulo: "Próximos lanzamientos de mangas 2025",
    fecha: "2025-09-10",
    imagen: "assets/blog/mangas2025.jpg",
    extracto:
      "El 2025 viene cargado de sorpresas para los fanáticos del manga: nuevos tomos de One Piece, Jujutsu Kaisen y la llegada de Chainsaw Man Part 2 a Chile…",
    contenido: [
      "El 2025 viene potente para los lectores: se confirman nuevos tomos de One Piece y Jujutsu Kaisen, mientras que Popeye Evolutions aterriza oficialmente en Chile. Varias editoriales también preparan reediciones de clásicos, con mejor papel y sobrecubiertas especiales.",
      "Lo que más hype genera:",
      "• One Piece: The two piece: continuidad del arco con ediciones rápidas tras Japón.",
      "• Jujutsu Kaisen Shippuden: tomos clave en el desarrollo de varios personajes.",
      "• Popeye Evolutions: lanzamiento escalonado, primeras tiradas limitadas.",
      "En Comanga estamos preparando bundles y preventas. Si no te quieres quedar sin tu copia, mantente atento a nuestras redes. 👀"
    ]
  }
];

export const formatFecha = (iso) =>
  new Date(iso).toLocaleDateString("es-CL", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
