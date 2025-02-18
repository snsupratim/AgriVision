import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
      // "/mapi": {
      //   target: "http://localhost:8000", // Replace with your second API URL
      //   // You can add other proxy options here if needed
      // },
    },
  },
});
