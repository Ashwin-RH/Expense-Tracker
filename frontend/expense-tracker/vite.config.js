import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import os from 'os';

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name] || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

const localIP = getLocalIP();

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __API__: JSON.stringify(
        isDev
          ? `http://${localIP}:8000` // local dev backend
          : 'https://expense-tracker-backend-kcuq.onrender.com' // production backend
      ),
    },
    server: {
      host: '0.0.0.0',
      port: 5173,
      hmr: {
        protocol: 'ws',
        host: localIP,
        clientPort: 5173,
      },
    },
  };
});
