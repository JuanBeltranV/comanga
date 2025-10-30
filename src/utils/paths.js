// Normaliza rutas de imagen para tu app
export function resolveImageSrc(path = "") {
  if (!path) return "";
  if (path.startsWith("data:")) return path;
  if (/^https?:\/\//i.test(path)) return path;   // URL absoluta
  return path.startsWith("/") ? path : `/${path}`; // relativo a /public
}
