/**
 * Cabecera: marca (enlace al listado), breadcrumbs de la ruta actual y contador de la cesta.
 */
import { Link, useMatches } from 'react-router';
import { useCart } from '../context/CartContext';

function useBreadcrumbs() {
  const matches = useMatches();
  const crumbs = [{ label: 'Dispositivos', to: '/' }];

  for (const match of matches) {
    if (match.handle?.crumb) {
      crumbs.push({ label: match.handle.crumb(match.loaderData), to: match.pathname });
    }
  }
  return crumbs;
}

export default function Header() {
  const { count } = useCart();
  const crumbs = useBreadcrumbs();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="brand">
          Mobile<span>Shop</span>
        </Link>

        <nav aria-label="Ruta de navegación" className="breadcrumbs">
          <ol>
            {crumbs.map((crumb, index) => (
              <li key={crumb.to}>
                {index === crumbs.length - 1 ? (
                  <span aria-current="page">{crumb.label}</span>
                ) : (
                  <Link to={crumb.to}>{crumb.label}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="cart" aria-label={`Cesta: ${count} ${count === 1 ? 'artículo' : 'artículos'}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6 7h12l-1 13H7L6 7Zm3 0V6a3 3 0 0 1 6 0v1"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          <span className="cart__count">{count}</span>
        </div>
      </div>
    </header>
  );
}
