import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Configuración única para desarrollo, build y tests (Vitest reutiliza la de Vite).
export default defineConfig({
  plugins: [react()],
  server: { port: 3000 },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.{js,jsx}'],
    setupFiles: './tests/setup.js',
  },
});
