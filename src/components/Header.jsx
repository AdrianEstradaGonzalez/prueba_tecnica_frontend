/**
 * Cabecera: marca (enlace al listado) y breadcrumbs de la ruta actual.
 */
import { Link, useMatches } from 'react-router';

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
      </div>
    </header>
  );
}
