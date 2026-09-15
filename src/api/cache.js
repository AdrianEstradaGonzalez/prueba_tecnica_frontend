/**
 * Caché en cliente con expiración, sobre localStorage.
 *
 * Cada entrada guarda el dato y el instante en que caduca. Si la entrada no
 * existe o ya ha caducado, `get` devuelve null y quien llama vuelve a pedirla
 * al API. Se eligió localStorage frente a memoria para que la caché sobreviva
 * a recargas de página, que es cuando más peticiones se ahorran.
 */

export const CACHE_TTL_MS = 60 * 60 * 1000;
const PREFIX = 'mobile-shop:cache:';

export function getCached(key, now = Date.now()) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;

    const entry = JSON.parse(raw);
    if (entry.expiresAt <= now) {
      localStorage.removeItem(PREFIX + key);
      return null;
    }
    return entry.data;
  } catch {
    // Almacenamiento bloqueado (modo privado) o JSON corrupto: se trata como fallo de caché.
    return null;
  }
}

export function setCached(key, data, ttl = CACHE_TTL_MS, now = Date.now()) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify({ data, expiresAt: now + ttl }));
  } catch {
    // Sin espacio o sin permiso: la app sigue funcionando, solo que sin caché.
  }
}
