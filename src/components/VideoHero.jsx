// src/components/VideoHero.jsx
import React from 'react'

// filename → focal point (top bias for 1,3,4,5)
const FOCAL_BY_FILE = {
  'hero-01.jpg': 'center 15%',
  'hero-03.jpg': 'center 15%',
  'hero-04.jpg': 'center 15%',
  'hero-05.png': 'center 15%',
}

export default function VideoHero() {
  const BASE = '/hero'
  const VER = import.meta.env?.VITE_ASSET_VERSION ? `?v=${import.meta.env.VITE_ASSET_VERSION}` : ''
  const MANIFEST_URL = `${BASE}/index.json${VER}`

  const SLIDE_MS = 5000
  const FADE_MS  = 700

  const [images, setImages] = React.useState([])
  const [idx, setIdx] = React.useState(0)
  const [bad, setBad] = React.useState(new Set())

  // Load manifest
  React.useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const res = await fetch(MANIFEST_URL, { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        const list = (Array.isArray(data?.images) ? data.images : []).map(f => `${BASE}/${encodeURI(f)}${VER}`)
        if (alive) {
          setImages(list)
          setBad(new Set())
          setIdx(0)
        }
      } catch (err) {
        console.warn('VideoHero manifest load failed', err)
        if (alive) setImages([])
      }
    })()
    return () => { alive = false }
  }, [MANIFEST_URL])

  // Only keep images that loaded
  const live = images.filter(u => !bad.has(u))

  // Auto-advance
  React.useEffect(() => {
    if (live.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % live.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [live.length])

  const current = live.length ? (idx % live.length) : 0

  return (
    <section className="relative h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden">
      {/* Inject keyframes for Ken Burns */}
      <style>{`
        @keyframes kbZoomIn {
          from { transform: scale(1.03); }
          to   { transform: scale(1.12); }
        }
        @keyframes kbZoomOut {
          from { transform: scale(1.12); }
          to   { transform: scale(1.03); }
        }
        @media (prefers-reduced-motion: reduce) {
          .kb-anim { animation: none !important; }
        }
      `}</style>

      {/* Slides */}
      <div className="absolute inset-0 bg-black">
        {live.length ? (
          live.map((src, i) => {
            const fname = src.split('/').pop()?.split('?')[0] || ''
            const pos   = FOCAL_BY_FILE[fname] || 'center 50%'
            const kbName = i % 2 === 0 ? 'kbZoomIn' : 'kbZoomOut' // alternate direction per slide

            return (
              <img
                key={src}
                src={src}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding={i === 0 ? 'sync' : 'async'}
                className="absolute inset-0 w-full h-full object-cover transition-opacity kb-anim will-change-transform"
                style={{
                  objectPosition: pos,
                  opacity: i === current ? 1 : 0,
                  transitionDuration: `${FADE_MS}ms`,
                  animation: `${kbName} ${SLIDE_MS + FADE_MS}ms ease-in-out infinite alternate`,
                }}
                aria-hidden={i === current ? 'false' : 'true'}
                onError={() => setBad(prev => new Set(prev).add(src))}
              />
            )
          })
        ) : (
          <div className="absolute inset-0 bg-gray-300" />
        )}
      </div>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Headline / Subhead (Optima stack) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
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
      {live.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
          {live.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full ${i === current ? 'bg-white' : 'bg-white/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
