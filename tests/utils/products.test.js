import { describe, expect, it } from 'vitest';
import { filterProducts, formatPrice } from '../../src/utils/products';

const products = [
  { id: '1', brand: 'Acer', model: 'Liquid Z6' },
  { id: '2', brand: 'Alcatel', model: 'Idol 5' },
  { id: '3', brand: 'Acer', model: 'Iconia Talk S' },
];

describe('filterProducts', () => {
  it('sin búsqueda devuelve todos', () => {
    expect(filterProducts(products, '  ')).toHaveLength(3);
  });

  it('compara con marca y modelo sin distinguir mayúsculas', () => {
    expect(filterProducts(products, 'ACER').map((p) => p.id)).toEqual(['1', '3']);
    expect(filterProducts(products, 'idol').map((p) => p.id)).toEqual(['2']);
  });

  it('exige que todas las palabras aparezcan', () => {
    expect(filterProducts(products, 'acer liquid').map((p) => p.id)).toEqual(['1']);
  });
});

describe('formatPrice', () => {
  it('formatea en euros y devuelve null si no hay precio', () => {
    expect(formatPrice('170')).toMatch(/170\s€/);
    expect(formatPrice('')).toBeNull();
  });
});
