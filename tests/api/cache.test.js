import { describe, expect, it } from 'vitest';
import { CACHE_TTL_MS, getCached, setCached } from '../../src/api/cache';

describe('cache', () => {
  it('devuelve el dato mientras no ha caducado', () => {
    setCached('/product', [{ id: 'a' }], CACHE_TTL_MS, 0);

    expect(getCached('/product', CACHE_TTL_MS - 1)).toEqual([{ id: 'a' }]);
  });

  it('invalida y borra la entrada pasada una hora', () => {
    setCached('/product', [{ id: 'a' }], CACHE_TTL_MS, 0);

    expect(getCached('/product', CACHE_TTL_MS)).toBeNull();
    expect(localStorage.length).toBe(0);
  });

  it('trata una entrada corrupta como fallo de caché', () => {
    localStorage.setItem('mobile-shop:cache:/product', '{no-json');

    expect(getCached('/product')).toBeNull();
  });
});
