import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Needed for Docker container port mapping
    port: 80,
    watch: {
      usePolling: true, // Needed for some Docker environments to pick up changes
    },
  },
})
