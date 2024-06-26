import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), reactRefresh()],
    // server: {
    //     proxy: {
    //         "/vapi": {
    //             target: "https://vapi.vnappmob.com",
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/vapi/, "/api"),
    //         },
    //     },
    // },
});
