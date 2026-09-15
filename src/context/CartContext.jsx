/**
 * Estado global de la cesta: número de artículos y acción para añadir uno.
 *
 * El contador se persiste en localStorage para que la cabecera lo muestre en
 * cualquier vista y tras recargar la página.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { addToCart } from '../api/products';

const STORAGE_KEY = 'mobile-shop:cart-count';
const CartContext = createContext(null);

function readStoredCount() {
  try {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
}

export function CartProvider({ children }) {
  const [count, setCount] = useState(readStoredCount);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(count));
    } catch {
      // Sin almacenamiento disponible el contador vive solo en memoria.
    }
  }, [count]);

  const addItem = useCallback(async (item) => {
    // El API de prueba no guarda la cesta: responde `count: 1` en cada alta.
    // Se suma a lo acumulado para que el contador refleje lo añadido en la sesión.
    const { count: added } = await addToCart(item);
    setCount((current) => current + added);
  }, []);

  const value = useMemo(() => ({ count, addItem }), [count, addItem]);

  return <CartContext value={value}>{children}</CartContext>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return context;
}
