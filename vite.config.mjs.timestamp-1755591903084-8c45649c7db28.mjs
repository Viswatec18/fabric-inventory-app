// vite.config.mjs
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tsconfigPaths from "file:///home/project/node_modules/vite-tsconfig-paths/dist/index.mjs";
import tagger from "file:///home/project/node_modules/@dhiwise/component-tagger/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
var __vite_injected_original_import_meta_url = "file:///home/project/vite.config.mjs";
var vite_config_default = defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2e3
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: [".amazonaws.com", ".builtwithrocket.new"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy5tanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdC92aXRlLmNvbmZpZy5tanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcbmltcG9ydCB0YWdnZXIgZnJvbSBcIkBkaGl3aXNlL2NvbXBvbmVudC10YWdnZXJcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIC8vIFRoaXMgY2hhbmdlcyB0aGUgb3V0IHB1dCBkaXIgZnJvbSBkaXN0IHRvIGJ1aWxkXG4gIC8vIGNvbW1lbnQgdGhpcyBvdXQgaWYgdGhhdCBpc24ndCByZWxldmFudCBmb3IgeW91ciBwcm9qZWN0XG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcImJ1aWxkXCIsXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBwbHVnaW5zOiBbdHNjb25maWdQYXRocygpLCByZWFjdCgpLCB0YWdnZXIoKV0sXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IFwiNDAyOFwiLFxuICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxuICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgYWxsb3dlZEhvc3RzOiBbJy5hbWF6b25hd3MuY29tJywgJy5idWlsdHdpdGhyb2NrZXQubmV3J11cbiAgfVxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUEyTixTQUFTLG9CQUFvQjtBQUN4UCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxZQUFZO0FBQ25CLFNBQVMsZUFBZSxXQUFXO0FBSmdHLElBQU0sMkNBQTJDO0FBT3BMLElBQU8sc0JBQVEsYUFBYTtBQUFBO0FBQUE7QUFBQSxFQUcxQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUix1QkFBdUI7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxjQUFjLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUFBLEVBQzVDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxJQUNaLGNBQWMsQ0FBQyxrQkFBa0Isc0JBQXNCO0FBQUEsRUFDekQ7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
