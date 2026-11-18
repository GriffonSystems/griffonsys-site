// Server entry used only at build time to pre-render each route to static HTML,
// so search engines get the title, meta description and page text without running JS.
import React from "react"
import { renderToString } from "react-dom/server"
import { StaticRouter } from "react-router-dom/server"
import { Helmet } from "react-helmet"
import App from "./routes/App"

export function render(url) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
  const helmet = Helmet.renderStatic()
  const head = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join("\n")
  return { html, head }
}
