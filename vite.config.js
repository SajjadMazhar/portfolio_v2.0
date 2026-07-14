import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Rolldown (Vite 8) only supports the function form
        manualChunks(id) {
          if (/node_modules\/(three|@react-three)\//.test(id)) return 'three';
          if (/node_modules\/(react|react-dom|scheduler|motion|framer-motion|motion-dom|motion-utils)\//.test(id)) return 'react';
        },
      },
    },
  },
});
