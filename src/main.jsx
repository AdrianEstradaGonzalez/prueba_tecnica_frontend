/**
 * Punto de entrada: monta la SPA.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <main className="container">
      <h1>Mobile Shop</h1>
    </main>
  </StrictMode>,
);
