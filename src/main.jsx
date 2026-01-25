// Buffer + process shims for browser (fixes Node-ish deps that expect them)
import { Buffer } from "buffer"
import process from "process"

window.Buffer = Buffer
window.process = process

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
