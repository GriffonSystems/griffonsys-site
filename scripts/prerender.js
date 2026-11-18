// Post-build step: render every public route to dist/<route>/index.html.
// Routes come from the sitemaps in public/sitemaps plus a few extras.
import fs from "fs"
import path from "path"
import { fileURLToPath, pathToFileURL } from "url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const dist = path.join(root, "dist")
const { render } = await import(pathToFileURL(path.join(root, "dist-ssr/entry-server.js")).href)

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8")
// Untouched SPA shell for routes we don't pre-render (admin pages, 404s).
fs.writeFileSync(path.join(dist, "app-shell.html"), template)

const routes = new Set(["/"])
const sitemapDir = path.join(root, "public/sitemaps")
for (const f of fs.readdirSync(sitemapDir).filter((f) => f.endsWith(".xml"))) {
  const xml = fs.readFileSync(path.join(sitemapDir, f), "utf8")
  for (const m of xml.matchAll(/<loc>\s*https?:\/\/[^/<]+(\/[^<]*?)\s*<\/loc>/g)) {
    routes.add(m[1].replace(/\/+$/, "") || "/")
  }
}

let ok = 0
const failed = []
for (const route of routes) {
  if (route.startsWith("/admin") || route.includes("/admin")) continue
  try {
    const { html, head } = render(route)
    const page = template
      .replace("</head>", `${head}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    const outDir = route === "/" ? dist : path.join(dist, route)
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(path.join(outDir, "index.html"), page)
    ok++
  } catch (err) {
    failed.push(`${route}: ${err.message}`)
  }
}

console.log(`Pre-rendered ${ok} of ${routes.size} routes`)
if (failed.length) {
  console.warn(`Failed (served as SPA shell instead):\n  ${failed.join("\n  ")}`)
}
