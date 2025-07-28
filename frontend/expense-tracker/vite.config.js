import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import os from 'os';

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost'; // fallback
};

const localIP = getLocalIP();

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __API__: JSON.stringify(`http://${localIP}:8000`), // 🔥 Inject IP into frontend
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      protocol: 'ws',
      host: localIP, // no need for ngrok if using LAN
      clientPort: 5173,
    },
  },
});
