import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000, // Force Vite to use port 3000
        strictPort: true // Vite will fail to start if port 3000 is already in use
    },
    envDir: './', // This points to the project root
});
