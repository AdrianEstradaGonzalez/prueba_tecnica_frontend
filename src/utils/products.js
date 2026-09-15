/**
 * Funciones puras sobre productos: búsqueda, formato de precio y ficha técnica.
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

function toText(value) {
  const text = Array.isArray(value) ? value.filter(Boolean).join(', ') : value;
  return text || null;
}

// El API tiene intercambiados `displaySize` y `displayResolution` en algunos
// productos, así que se toma el campo que realmente tiene forma "720 x 1280".
function screenResolution(product) {
  const candidates = [product.displayResolution, product.displaySize];
  return candidates.find((value) => /\d+\s*x\s*\d+/i.test(value ?? '')) ?? toText(product.displayResolution);
}

function cameras(product) {
  const primary = toText(product.primaryCamera);
  // `secondaryCmera` y `dimentions` están mal escritos en el propio API.
  const secondary = toText(product.secondaryCmera);
  return [primary && `Principal: ${primary}`, secondary && `Frontal: ${secondary}`]
    .filter(Boolean)
    .join(' · ') || null;
}

/** Ficha técnica lista para pintar, con las claves raras del API ya resueltas. */
export function getSpecs(product) {
  return [
    { label: 'CPU', value: toText(product.cpu) },
    { label: 'RAM', value: toText(product.ram) },
    { label: 'Sistema operativo', value: toText(product.os) },
    { label: 'Resolución de pantalla', value: screenResolution(product) },
    { label: 'Batería', value: toText(product.battery) },
    { label: 'Cámaras', value: cameras(product) },
    { label: 'Dimensiones', value: toText(product.dimentions) },
    { label: 'Peso', value: product.weight ? `${product.weight} g` : null },
  ];
}
