import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import reactRefresh from '@vitejs/plugin-react-refresh';
import { ViteFaviconsPlugin } from 'vite-plugin-favicon';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    reactRefresh(),
    ViteFaviconsPlugin({
      logo: 'public/logo.svg',
      favicons: {
        path: '/',
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3003,
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
