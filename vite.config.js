import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
    port: 5173,
    open: true, // opens the browser automatically
    strictPort: true, // throws error if port 5173 is in use
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
});
