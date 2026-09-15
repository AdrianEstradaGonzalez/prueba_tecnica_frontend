/**
 * Esqueleto común a las dos vistas: cabecera, barra de progreso y contenido.
 */
import { Outlet, ScrollRestoration, useNavigation } from 'react-router';
import Header from './Header';

export default function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <>
      <Header />
      <div className={`progress${isLoading ? ' progress--active' : ''}`} aria-hidden="true" />
      <main className="container" aria-busy={isLoading}>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}

/** Lo que se ve mientras llega la primera respuesta del API (el servidor puede tardar en despertar). */
export function LayoutFallback() {
  return (
    <>
      <Header />
      <main className="container" aria-busy="true">
        <p className="muted loading-note">Cargando dispositivos…</p>
        <div className="product-grid">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="skeleton" />
          ))}
        </div>
      </main>
    </>
  );
}
