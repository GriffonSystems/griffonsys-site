// src/components/VideoHero.jsx
import React from 'react'

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
  const FADE_MS = 700

  const [images, setImages] = React.useState([])
  const [idx, setIdx] = React.useState(0)
  const [bad, setBad] = React.useState(new Set())

  // Load image manifest
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

  // Slideshow
  const valid = images.filter(i => !bad.has(i))
  React.useEffect(() => {
    if (valid.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % valid.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [valid.length])

  const current = valid.length ? idx % valid.length : 0

  return (
    <section className="relative h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0 bg-black">
        {valid.length ? (
          valid.map((src, i) => {
            const fname = src.split('/').pop()?.split('?')[0] || ''
            const pos = FOCAL_BY_FILE[fname] || 'center center'
            return (
              <img
                key={src}
                src={src}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding={i === 0 ? 'sync' : 'async'}
                className="absolute inset-0 w-full h-full object-cover transition-opacity"
                style={{
                  objectPosition: pos,
                  opacity: i === current ? 1 : 0,
                  transitionDuration: `${FADE_MS}ms`,
                }}
                onError={() => setBad(p => new Set(p).add(src))}
              />
            )
          })
        ) : (
          <div className="absolute inset-0 bg-gray-300" />
        )}
      </div>

      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Text */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <h1
          className="text-white text-4xl md:text-6xl font-semibold mb-3"
          style={{
            fontFamily: 'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
          }}
        >
          Security Experts for 20+ Years
        </h1>
        <p
          className="text-white/90 text-lg md:text-xl max-w-3xl"
          style={{
            fontFamily: 'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
          }}
        >
          Video Surveillance, Access Control, Intercom — Avigilon, Verkada
        </p>
      </div>

      {/* Dots */}
      {valid.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
          {valid.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full ${i === current ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
