import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/db": {
        target: "http://localhost:5000",
        rewrite: (path) => path.replace(/^\/db/, ""),
      },
    },
  },
});
