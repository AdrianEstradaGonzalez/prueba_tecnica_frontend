/**
 * PDP: imagen en la primera columna; descripción y acciones en la segunda.
 */
import { Link, useLoaderData } from 'react-router';
import ProductImage from '../components/ProductImage';
import ProductDescription from '../components/ProductDescription';
import ProductActions from '../components/ProductActions';

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
          {/* La key reinicia la selección al pasar de un producto a otro. */}
          <ProductActions key={product.id} product={product} />
        </div>
      </div>
    </article>
  );
}
