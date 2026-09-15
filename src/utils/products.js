/**
 * Funciones puras sobre productos: búsqueda y formato de precio.
 *
 * Viven fuera de los componentes para poder probarlas sin renderizar nada.
 */

const priceFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function normalize(text = '') {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/** Filtra por marca y modelo. Cada palabra buscada debe aparecer en alguno de los dos. */
export function filterProducts(products, query) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return products;

  return products.filter((product) => {
    const text = normalize(`${product.brand} ${product.model}`);
    return terms.every((term) => text.includes(term));
  });
}

/** Devuelve el precio formateado o null si el API no lo trae. */
export function formatPrice(price) {
  const value = Number.parseFloat(price);
  return Number.isFinite(value) ? priceFormatter.format(value) : null;
}
