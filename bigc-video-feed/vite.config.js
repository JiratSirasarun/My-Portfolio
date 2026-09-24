import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' lets the built prototype open from any sub-path (e.g. GitHub Pages).
export default defineConfig({
  plugins: [react()],
  base: './',
});
