import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Ensure proper routing and asset resolution for SPA on Vercel
export default defineConfig({
  plugins: [react()],
  base: '/', // <— this line fixes refresh/404 issues on nested routes
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    historyApiFallback: true, // ensures React Router works locally too
  },
})
