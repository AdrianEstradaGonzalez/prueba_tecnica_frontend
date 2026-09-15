/**
 * PLP: listado completo de productos con filtrado en tiempo real por marca y modelo.
 *
 * El texto buscado se refleja en la URL (`?q=`) para que al volver desde el
 * detalle o compartir el enlace se conserve el filtro.
 */
import { useMemo, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { filterProducts } from '../utils/products';

export default function ProductListPage() {
  const products = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');

  const visibleProducts = useMemo(() => filterProducts(products, query), [products, query]);

  function handleSearch(value) {
    setQuery(value);
    setSearchParams(value ? { q: value } : {}, { replace: true });
  }

  return (
    <section>
      <div className="toolbar">
        <div>
          <h1 className="page-title">Dispositivos</h1>
          <p className="muted" aria-live="polite">
            {visibleProducts.length} de {products.length} productos
          </p>
        </div>
        <SearchBar value={query} onChange={handleSearch} />
      </div>

      {visibleProducts.length > 0 ? (
        <ul className="product-grid">
          {visibleProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">Ningún dispositivo coincide con «{query}».</p>
      )}
    </section>
  );
}
