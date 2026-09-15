/**
 * Elemento del listado: imagen, marca, modelo y precio. Todo el bloque enlaza al detalle.
 */
import { Link } from 'react-router';
import ProductImage from './ProductImage';
import { formatPrice } from '../utils/products';

export default function ProductCard({ product }) {
  const price = formatPrice(product.price);

  return (
    <Link to={`/product/${product.id}`} className="card">
      <ProductImage src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
      <div className="card__body">
        <span className="card__brand">{product.brand}</span>
        <span className="card__model">{product.model}</span>
        <span className={`card__price${price ? '' : ' muted'}`}>{price ?? 'Precio no disponible'}</span>
      </div>
    </Link>
  );
}
