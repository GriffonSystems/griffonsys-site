// src/components/VideoHero.jsx
// Put near the top of VideoHero.jsx (outside the component)
const FOCAL_BY_FILE = {
  'hero-01.jpg': 'center 12%',  // needs top
  'hero-03.jpg': 'center 12%',  // needs top
  'hero-04.jpg': 'center 12%',  // needs top
  'hero-05.png': 'center 12%',  // needs top
  // others default to center
}

import React from 'react'

export default function VideoHero(){
  const BASE = '/hero'
  const VER  = import.meta.env?.VITE_ASSET_VERSION ? `?v=${import.meta.env.VITE_ASSET_VERSION}` : ''
  const MANIFEST_URL = `${BASE}/index.json${VER}`

  const SLIDE_MS = 5000
  const FADE_MS  = 700

  const [images, setImages] = React.useState([])      // all candidate URLs (no pre-filter)
  const [bad, setBad]       = React.useState(() => new Set()) // failed URLs
  const [idx, setIdx]       = React.useState(0)

  // Load manifest (do NOT pre-filter with Image() — render and let onError handle)
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const res = await fetch(MANIFEST_URL, { cache: 'no-store' })
        if (!res.ok) throw new Error(`manifest HTTP ${res.status}`)
        const data = await res.json()
        const names = Array.isArray(data?.images) ? data.images : []
        const urls  = names.map(n => `${BASE}/${encodeURI(String(n))}${VER}`)
        if (alive) {
          setImages(urls)
          setBad(new Set())  // reset failures when list changes
          setIdx(0)
        }
      } catch (e) {
        console.warn('VideoHero: manifest failed', e)
        if (alive) {
          setImages([])      // renders gray fallback
          setBad(new Set())
        }
      }
    })()
    return () => { alive = false }
  }, [MANIFEST_URL])

  // Advance slides
  React.useEffect(() => {
    const live = images.filter(u => !bad.has(u))
    if (live.length <= 1) return
    const t = setInterval(() => {
      setIdx(i => (i + 1) % live.length)
    }, SLIDE_MS)
    return () => clearInterval(t)
  }, [images, bad])

  // Compute the currently viewable list (exclude broken ones)
  const liveImages = images.filter(u => !bad.has(u))
  const showIdx = liveImages.length ? (idx % liveImages.length) : 0

  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      <div className="absolute inset-0 bg-black">
        {liveImages.length ? (
          liveImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding={i === 0 ? 'sync' : 'async'}
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity"
              style={{ opacity: i === showIdx ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
              aria-hidden={i === showIdx ? 'false' : 'true'}
              onError={() => {
                // Mark this URL as bad so it’s skipped next render
                setBad(prev => {
                  const next = new Set(prev)
                  next.add(src)
                  console.warn('Hero failed to load:', src)
                  return next
                })
              }}
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
      {liveImages.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
          {liveImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full ${i === showIdx ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
