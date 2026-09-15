# Mobile Shop

Miniaplicación SPA para comprar dispositivos móviles: listado con búsqueda y vista de detalle con alta en la cesta.

React 19 · React Router 8 (modo datos) · Vite 8 · Vitest + Testing Library · ESLint.

## Requisitos

Node.js 20.19 o superior.

## Uso

```bash
npm install
npm start        # desarrollo en http://localhost:3000
npm run build    # compilación de producción en dist/
npm test         # tests
npm run lint     # comprobación de código
```

## Notas

- Las respuestas del API se guardan en `localStorage` durante una hora; pasado ese tiempo se vuelven a pedir.
- El contador de la cesta también se persiste en `localStorage`. El API de prueba responde siempre `count: 1`, así que el valor se acumula en cliente.
- El API está alojado en Render y la primera petición puede tardar unos segundos si el servidor estaba dormido.
