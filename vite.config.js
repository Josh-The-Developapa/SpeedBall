import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    open: true, // opens the browser automatically
    strictPort: true, // throws error if port 5173 is in use
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
});
