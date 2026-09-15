/**
 * Tabla de rutas de la aplicación.
 *
 * Cada vista declara su `loader`, de modo que los datos se piden (o se leen de
 * caché) antes de pintar la página y la vista nunca tiene que gestionar el
 * estado de carga por su cuenta.
 */
import Layout from './components/Layout';
import ProductListPage from './pages/ProductListPage';
import { getProducts } from './api/products';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
        loader: () => getProducts(),
        // Escribir en el buscador cambia `?q=`; eso no debe volver a lanzar el loader.
        shouldRevalidate: ({ currentUrl, nextUrl }) => currentUrl.pathname !== nextUrl.pathname,
      },
    ],
  },
];
