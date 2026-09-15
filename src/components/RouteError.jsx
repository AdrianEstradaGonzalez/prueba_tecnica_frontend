/**
 * Estado de error de una vista: ruta inexistente o fallo al pedir datos al API.
 */
import { isRouteErrorResponse, Link, useRevalidator, useRouteError } from 'react-router';

export default function RouteError() {
  const error = useRouteError();
  const revalidator = useRevalidator();
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="error-state">
      <h1>{notFound ? 'No encontramos esta página' : 'No se ha podido cargar la información'}</h1>
      <p className="muted">
        {notFound
          ? 'El enlace no existe o el producto ya no está disponible.'
          : 'El servidor no responde. Comprueba la conexión y vuelve a intentarlo.'}
      </p>
      <div className="error-state__actions">
        {!notFound && (
          <button
            type="button"
            className="button"
            onClick={() => revalidator.revalidate()}
            disabled={revalidator.state === 'loading'}
          >
            Reintentar
          </button>
        )}
        <Link to="/" className="button button--ghost">
          Volver al listado
        </Link>
      </div>
    </div>
  );
}
