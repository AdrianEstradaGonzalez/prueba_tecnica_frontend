/**
 * Cliente del API de productos y cesta.
 *
 * Las lecturas (listado y detalle) pasan por la caché de una hora; el alta en
 * la cesta nunca se cachea porque es una escritura.
 */
import { getCached, setCached } from './cache';
import { API_BASE_URL } from './config';

async function request(path, options) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });

  if (!response.ok) {
    throw new Response('Error al comunicar con el servidor', { status: response.status });
  }
  return response.json();
}

async function cachedGet(path) {
  const cached = getCached(path);
  if (cached) return cached;

  const data = await request(path);
  setCached(path, data);
  return data;
}

export function getProducts() {
  return cachedGet('/product');
}

export function getProduct(id) {
  return cachedGet(`/product/${encodeURIComponent(id)}`);
}

export function addToCart({ id, colorCode, storageCode }) {
  return request('/cart', {
    method: 'POST',
    body: JSON.stringify({ id, colorCode, storageCode }),
  });
}
