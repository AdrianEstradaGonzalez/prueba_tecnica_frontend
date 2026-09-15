import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router';
import ProductListPage from '../../src/pages/ProductListPage';

const products = [
  { id: '1', brand: 'Acer', model: 'Liquid Z6', price: '120', imgUrl: '' },
  { id: '2', brand: 'Alcatel', model: 'Idol 5', price: '', imgUrl: '' },
];

function renderPage() {
  const router = createMemoryRouter([{ path: '/', element: <ProductListPage />, loader: () => products }]);
  render(<RouterProvider router={router} />);
}

describe('ProductListPage', () => {
  it('pinta todos los productos con enlace a su detalle', async () => {
    renderPage();

    const card = await screen.findByRole('link', { name: /Liquid Z6/ });
    expect(card).toHaveAttribute('href', '/product/1');
    expect(screen.getByText('Precio no disponible')).toBeInTheDocument();
  });

  it('filtra en tiempo real mientras se escribe', async () => {
    renderPage();
    await screen.findByText('Liquid Z6');

    await userEvent.type(screen.getByRole('searchbox'), 'alca');

    expect(screen.queryByText('Liquid Z6')).not.toBeInTheDocument();
    expect(screen.getByText('Idol 5')).toBeInTheDocument();
    expect(screen.getByText('1 de 2 productos')).toBeInTheDocument();
  });
});
