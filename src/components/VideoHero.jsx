// src/components/VideoHero.jsx
import React from 'react'

export default function VideoHero() {
  // ---- Config ----
  const BASE = '/hero'
  const VERSION = import.meta.env?.VITE_ASSET_VERSION
    ? `?v=${import.meta.env.VITE_ASSET_VERSION}`
    : ''
  const MANIFEST_URL = `${BASE}/index.json${VERSION}`

  const SLIDE_MS = 5000     // time per slide
  const FADE_MS  = 700      // cross-fade duration (ms)

  // ---- State ----
  const [images, setImages] = React.useState([]) // array of resolved image URLs
  const [idx, setIdx] = React.useState(0)

  // ---- Load manifest and preload images ----
  React.useEffect(() => {
    let alive = true

    async function load() {
      try {
        const res = await fetch(MANIFEST_URL, { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()

        const raw = Array.isArray(data?.images) ? data.images : []
        // Build absolute paths and encode spaces etc.
        const urls = raw.map(name => `${BASE}/${encodeURI(String(name))}`)

        // (Optional) quick HEAD check to spot 404s during dev
        // urls.forEach(u => fetch(u, { method: 'HEAD', cache: 'no-store' })
        //   .then(r => { if (!r.ok) console.warn('Hero 404:', u) })
        //   .catch(() => console.warn('Hero fetch failed:', u)))

        // Preload; keep only successes
        const loaded = await Promise.all(
          urls.map(
            (src) =>
              new Promise((resolve) => {
                const i = new Image()
                i.onload = () => resolve(src)
                i.onerror = () => resolve(null)
                i.src = src
              })
          )
        )
        const ok = loaded.filter(Boolean)
        if (alive) {
          setImages(ok)
          setIdx(0)
          if (!ok.length) console.warn('VideoHero: no images loaded from', MANIFEST_URL)
        }
      } catch (e) {
        console.warn('VideoHero: failed to load manifest', e)
        if (alive) setImages([])
      }
    }

    load()
    return () => { alive = false }
  }, [MANIFEST_URL])

  // ---- Auto-advance ----
  React.useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [images])

  // ---- Preload next image proactively ----
  React.useEffect(() => {
    if (!images.length) return
    const next = new Image()
    next.src = images[(idx + 1) % images.length]
  }, [idx, images])

  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Slides (stacked, cross-fading). object-cover = fills / zooms */}
      <div className="absolute inset-0 bg-black">
        {images.length ? (
          images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding={i === 0 ? 'sync' : 'async'}
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity"
              style={{ opacity: i === idx ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
              aria-hidden={i === idx ? 'false' : 'true'}
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Headline & subhead (Optima) */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1
          className="text-white text-4xl md:text-6xl font-semibold mb-3"
          style={{ fontFamily: 'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' }}
        >
          Security Experts for 20+ Years
        </h1>
        <p
          className="text-white/90 text-lg md:text-xl max-w-3xl"
          style={{ fontFamily: 'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif' }}
        >
          Video Surveillance, Access Control, Intercom — Avigilon, Verkada
        </p>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full ${i === idx ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
