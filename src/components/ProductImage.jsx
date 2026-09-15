/**
 * Imagen de producto sobre un marco neutro, con un sustituto si la imagen no carga.
 */
import { useState } from 'react';

export default function ProductImage({ src, alt, large = false }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`product-image${large ? ' product-image--large' : ''}`}>
      {failed ? (
        <span className="product-image__placeholder">Imagen no disponible</span>
      ) : (
        <img src={src} alt={alt} loading={large ? 'eager' : 'lazy'} onError={() => setFailed(true)} />
      )}
    </figure>
  );
}
