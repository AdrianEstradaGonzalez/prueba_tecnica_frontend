/**
 * Tabla de rutas de la aplicación.
 *
 * Cada vista declara su `loader`, de modo que los datos se piden (o se leen de
 * caché) antes de pintar la página y la vista nunca tiene que gestionar el
 * estado de carga por su cuenta.
 */
import Layout, { LayoutFallback } from './components/Layout';
import RouteError from './components/RouteError';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import { getProduct, getProducts } from './api/products';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    hydrateFallbackElement: <LayoutFallback />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
        loader: () => getProducts(),
        // Escribir en el buscador cambia `?q=`; eso no debe volver a lanzar el loader.
        shouldRevalidate: ({ currentUrl, nextUrl }) => currentUrl.pathname !== nextUrl.pathname,
        errorElement: <RouteError />,
      },
      {
        path: 'product/:id',
        element: <ProductDetailPage />,
        loader: ({ params }) => getProduct(params.id),
        handle: {
          crumb: (product) => (product ? `${product.brand} ${product.model}` : 'Detalle'),
        },
        errorElement: <RouteError />,
      },
      {
        path: '*',
        loader: () => {
          throw new Response('Not found', { status: 404 });
        },
        errorElement: <RouteError />,
      },
    ],
  },
];
