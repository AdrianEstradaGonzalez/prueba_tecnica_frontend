/**
 * Esqueleto común a las dos vistas: cabecera y contenido.
 */
import { Outlet, ScrollRestoration } from 'react-router';
import Header from './Header';

export default function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
}
