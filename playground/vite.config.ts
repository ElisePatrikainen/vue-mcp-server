import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import VueMcpPlugin from "vue-mcp-server";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), VueMcpPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url)),
    },
  },
});
