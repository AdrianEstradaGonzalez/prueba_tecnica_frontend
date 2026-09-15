import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductActions from '../../src/components/ProductActions';
import { CartProvider, useCart } from '../../src/context/CartContext';
import { addToCart } from '../../src/api/products';

vi.mock('../../src/api/products', () => ({ addToCart: vi.fn() }));

function CartCount() {
  return <output data-testid="count">{useCart().count}</output>;
}

function renderActions(options) {
  render(
    <CartProvider>
      <ProductActions product={{ id: 'p1', options }} />
      <CartCount />
    </CartProvider>,
  );
}

describe('ProductActions', () => {
  it('preselecciona las opciones únicas y permite añadir directamente', async () => {
    addToCart.mockResolvedValue({ count: 1 });
    renderActions({ storages: [{ code: 2000, name: '16 GB' }], colors: [{ code: 1000, name: 'Black' }] });

    expect(screen.getByRole('radio', { name: '16 GB' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Black' })).toBeChecked();

    await userEvent.click(screen.getByRole('button', { name: 'Añadir a la cesta' }));

    expect(addToCart).toHaveBeenCalledWith({ id: 'p1', colorCode: 1000, storageCode: 2000 });
    expect(await screen.findByText('Producto añadido a la cesta.')).toBeInTheDocument();
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(localStorage.getItem('mobile-shop:cart-count')).toBe('1');
  });

  it('con varias opciones no deja añadir hasta elegir', async () => {
    renderActions({
      storages: [
        { code: 2000, name: '16 GB' },
        { code: 2001, name: '32 GB' },
      ],
      colors: [{ code: 1000, name: 'Black' }],
    });
    const button = screen.getByRole('button', { name: 'Añadir a la cesta' });

    expect(button).toBeDisabled();
    await userEvent.click(screen.getByRole('radio', { name: '32 GB' }));
    expect(button).toBeEnabled();
  });
});
