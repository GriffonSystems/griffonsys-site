// src/components/VideoHero.jsx
import React from 'react'

// Updated focal points for ALL new hero images
const FOCAL_BY_FILE = {
    'hero-07a.jpg': 'center 5%',  // FIRST IMAGE — show more top
    'hero-02.jpg':  'center 20%',
    'hero-03a.jpg': 'center 15%',
    'hero-04a.jpg': 'center 25%',
    'hero-05a.jpg': 'center 15%',
    'hero-01.jpg':  'center 10%',
    'hero-06a.jpg': 'center 50%',
}

// Alt text for each hero image (SEO + accessibility)
const ALT_BY_FILE = {
    'hero-07a.jpg': 'Indoor security camera installed in Illinois facility by Griffon Systems',
    'hero-02.jpg':  'Wide-angle surveillance camera view of residential alley installed by Griffon Systems',
    'hero-03a.jpg': 'Avigilon dome and bullet security cameras installed on commercial building in Chicago',
    'hero-04a.jpg': 'Outdoor bullet security camera installed under building eave by Griffon Systems',
    'hero-05a.jpg': 'Security camera installation at Illinois utility substation by Griffon Systems',
    'hero-01.jpg':  'Overhead security camera footage of commercial parking area in Illinois',
    'hero-06a.jpg': 'Verkada access control intercom and keypad installed at gated facility entrance',
}

export default function VideoHero() {
    const BASE = '/hero'
    const VER = import.meta.env?.VITE_ASSET_VERSION
      ? `?v=${import.meta.env.VITE_ASSET_VERSION}`
          : ''
    const MANIFEST_URL = `${BASE}/index.json${VER}`
    const SLIDE_MS = 5000
    const FADE_MS  = 700

  const [images, setImages] = React.useState([])
    const [idx, setIdx]       = React.useState(0)
    const [bad, setBad]       = React.useState(new Set())

  // Load manifest
  React.useEffect(() => {
        let alive = true
        ;(async () => {
                try {
                          const res  = await fetch(MANIFEST_URL, { cache: 'no-store' })
                          if (!res.ok) throw new Error(`HTTP ${res.status}`)
                          const data = await res.json()
                          const list = (Array.isArray(data?.images) ? data.images : []).map(
                                      (f) => `${BASE}/${encodeURI(f)}${VER}`
                                    )
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

  // Filter for only working images
  const live = images.filter((u) => !bad.has(u))

  // Auto-advance slider
  React.useEffect(() => {
        if (live.length <= 1) return
        const t = setInterval(
                () => setIdx((i) => (i + 1) % live.length),
                SLIDE_MS
              )
        return () => clearInterval(t)
  }, [live.length])

  const current = live.length ? idx % live.length : 0

  return (
        <section className="relative h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden">
          {/* Ken Burns */}
              <style>{`
                      @keyframes kbZoomIn  { from { transform: scale(1.00); } to { transform: scale(1.06); } }
                              @keyframes kbZoomOut { from { transform: scale(1.06); } to { transform: scale(1.00); } }
                                      @media (prefers-reduced-motion: reduce) { .kb-anim { animation: none !important; } }
                                            `}</style>style>
        
          {/* Slides */}
              <div className="absolute inset-0 bg-black">
                {live.length ? (
                    live.map((src, i) => {
                                  const fname   = src.split('/').pop()?.split('?')[0] || ''
                                                const pos     = FOCAL_BY_FILE[fname] || 'center 50%'
                                                              const alt     = ALT_BY_FILE[fname]   || 'Security camera installation by Griffon Systems'
                                                                            const kbName  = i % 2 === 0 ? 'kbZoomIn' : 'kbZoomOut'
                                                                                          const webpSrc = src.replace(/\.jpg(\?|$)/, '.webp$1')
                                                                                            
                                                                                                        return (
                                                                                                                        <picture key={src}>
                                                                                                                                        <source
                                                                                                                                                            type="image/webp"
                                                                                                                                                            srcSet={webpSrc}
                                                                                                                                                          />
                                                                                                                                        <img
                                                                                                                                                            src={src}
                                                                                                                                                            alt={alt}
                                                                                                                                                            loading={i === 0 ? 'eager' : 'lazy'}
                                                                                                                                                            decoding={i === 0 ? 'sync' : 'async'}
                                                                                                                                                            className="absolute inset-0 w-full h-full object-cover transition-opacity kb-anim will-change-transform"
                                                                                                                                                            style={{
                                                                                                                                                                                  objectPosition: pos,
                                                                                                                                                                                  opacity: i === current ? 1 : 0,
                                                                                                                                                                                  transitionDuration: `${FADE_MS}ms`,
                                                                                                                                                                                  animation: `${kbName} ${SLIDE_MS + FADE_MS}ms ease-in-out infinite alternate`,
                                                                                                                                                              }}
                                                                                                                                                            aria-hidden={i !== current}
                                                                                                                                                            onError={() => setBad((prev) => new Set(prev).add(src))}
                                                                                                                                                          />
                                                                                                                          </picture>picture>
                                                                                                                      )
                                                                                                          })
                  ) : (
                    <div className="absolute inset-0 bg-gray-300" />
                  )}
              </div>div>
        
          {/* Dim overlay */}
              <div className="absolute inset-0 bg-black/35" />
        
          {/* Headline + Subheadline */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                {/* MAIN HEADLINE */}
                      <h1
                                  className="text-white text-4xl md:text-6xl font-semibold mb-3"
                                  style={{
                                                fontFamily:
                                                                'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                                  }}
                                >
                                Security Camera & Access Control Experts in Chicagoland for 20+ Years
                      </h1>h1>
              
                {/* SUBHEADLINE */}
                      <p
                                  className="text-white/95 text-lg md:text-xl max-w-3xl font-medium drop-shadow-lg"
                                  style={{
                                                fontFamily:
                                                                'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                                  }}
                                >
                                Modern cloud and on-prem security — Avigilon, Verkada, Alta.
                      </p>p>
              </div>div>
        
          {/* Slide dots */}
          {live.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
                    {live.map((_, i) => (
                                <button
                                                key={i}
                                                onClick={() => setIdx(i)}
                                                className={`h-2 w-2 rounded-full ${
                                                                  i === current ? 'bg-white' : 'bg-white/40'
                                                }`}
                                                aria-label={`Go to slide ${i + 1}`}
                                              />
                              ))}
                  </div>div>
              )}
        </section>section>
      )
}</section>
