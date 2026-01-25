import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import rollupNodePolyfills from "rollup-plugin-polyfill-node"
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill"
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill"

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // Node core (with node: prefix support)
      stream: "stream-browserify",
      "node:stream": "stream-browserify",
      "stream/web": "stream-browserify",
      "node:stream/web": "stream-browserify",

      buffer: "buffer",
      "node:buffer": "buffer",

      process: "process/browser",
      "node:process": "process/browser",

      util: "util",
      "node:util": "util",

      events: "events",
      "node:events": "events",

      // Common deps that sometimes appear in bundles
      "readable-stream": "stream-browserify",
      _stream_duplex: "readable-stream/lib/_stream_duplex",
      _stream_passthrough: "readable-stream/lib/_stream_passthrough",
      _stream_readable: "readable-stream/lib/_stream_readable",
      _stream_transform: "readable-stream/lib/_stream_transform",
      _stream_writable: "readable-stream/lib/_stream_writable"
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
