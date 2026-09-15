/**
 * PDP: imagen en la primera columna; descripción en la segunda.
 */
import { Link, useLoaderData } from 'react-router';
import ProductImage from '../components/ProductImage';
import ProductDescription from '../components/ProductDescription';

export default function ProductDetailPage() {
  const product = useLoaderData();

  return (
    <article>
      <Link to="/" className="back-link">
        ← Volver al listado
      </Link>

      <div className="detail">
        <ProductImage src={product.imgUrl} alt={`${product.brand} ${product.model}`} large />
        <div className="detail__info">
          <ProductDescription product={product} />
        </div>
      </div>
    </article>
  );
}
