import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import rollupNodePolyfills from "rollup-plugin-polyfill-node"
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill"
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill"

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // handle both "stream" and "node:stream" style imports
      stream: "stream-browserify",
      "node:stream": "stream-browserify",

      buffer: "buffer",
      "node:buffer": "buffer",

      process: "process/browser",
      "node:process": "process/browser",

      util: "util",
      "node:util": "util",

      events: "events"
    }
  },

  define: {
    global: "globalThis"
  },

  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis"
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },

  build: {
    rollupOptions: {
      plugins: [rollupNodePolyfills()]
    }
  }
})
