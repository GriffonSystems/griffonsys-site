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
  const [images, setImages] = React.useState([])
  const [idx, setIdx] = React.useState(0)
  const [error, setError] = React.useState(null)

  // ---- Load manifest and preload images ----
  React.useEffect(() => {
    let alive = true

    async function load() {
      try {
        const res = await fetch(MANIFEST_URL, { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        // Attempt JSON parse with clear error handling
        let data
        try {
          data = await res.json()
        } catch (e) {
          throw new Error(`Invalid JSON format in ${MANIFEST_URL}`)
        }

        const raw = Array.isArray(data?.images) ? data.images : []
        const urls = raw.map(name => `${BASE}/${encodeURI(String(name))}`)

        const loaded = await Promise.all(
          urls.map(src => new Promise(resolve => {
            const i = new Image()
            i.onload = () => resolve(src)
            i.onerror = () => resolve(null)
            i.src = src
          }))
        )

        const ok = loaded.filter(Boolean)
        if (alive) {
          if (ok.length === 0) {
            console.warn('VideoHero: no images loaded from', MANIFEST_URL)
            setError(`No valid images found in ${MANIFEST_URL}`)
          } else {
            setImages(ok)
            setIdx(0)
            setError(null)
          }
        }
      } catch (e) {
        console.warn('VideoHero: failed to load manifest', e)
        if (alive) {
          setImages([])
          setError(e.message)
        }
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

  // ---- Preload next image ----
  React.useEffect(() => {
    if (!images.length) return
    const next = new Image()
    next.src = images[(idx + 1) % images.length]
  }, [idx, images])

  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-black">
      {/* Slides */}
      <div className="absolute inset-0">
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
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <span className="text-gray-300 text-sm font-mono">
              {error ? `⚠️ ${error}` : 'Loading hero images...'}
            </span>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Headline */}
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
