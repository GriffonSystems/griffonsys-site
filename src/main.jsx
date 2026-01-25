// Buffer shim for browser (fixes Node-ish deps that expect Buffer)
import { Buffer } from "buffer"
window.Buffer = Buffer

// ✅ Force-include static vendor images in the Vite build
import "./keep-vendors-assets.js"

import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./routes/App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
