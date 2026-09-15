/**
 * Cabecera del producto (marca, modelo, precio) y su ficha técnica.
 */
import { formatPrice, getSpecs } from '../utils/products';

export default function ProductDescription({ product }) {
  const price = formatPrice(product.price);

  return (
    <section className="description">
      <p className="description__brand">{product.brand}</p>
      <h1 className="description__model">{product.model}</h1>
      <p className="description__price">{price ?? 'Precio no disponible'}</p>

      <h2 className="section-title">Especificaciones</h2>
      <dl className="specs">
        {getSpecs(product).map(({ label, value }) => (
          <div key={label} className="specs__row">
            <dt>{label}</dt>
            <dd>{value ?? '—'}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
