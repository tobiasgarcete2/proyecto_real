import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',  // Carpeta raíz del frontend
  publicDir: 'public',  // Archivos estáticos se servirán desde aquí
  server: {
    open: true,  // Abre el navegador automáticamente
    port: 5173,  // Puerto donde corre Vite
    proxy: {
      '/api': {
        target: 'http://localhost:4000',  // Proxy al backend en Node.js
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
}); 