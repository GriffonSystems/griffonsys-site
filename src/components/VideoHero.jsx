// src/components/VideoHero.jsx
import React from 'react'

export default function VideoHero(){
  // Images (use exact paths in /public/hero)
  const rawImages = [
    '/hero/IMG_3710 2.jpg',
    '/hero/IMG_5030.jpg',
    '/hero/hero1.jpg',
  ]

  // === TUNING KNOBS ===
  // Make hero taller
  const HERO_H = 'h-[75vh] md:h-[90vh]'        // try 'h-[85vh] md:h-screen' for maximum
  // Control crop vs. fit:
  const FIT_MODE = 'cover'    // 'cover' (fills, crops) or 'contain' (no crop, may letterbox)
  // Focus area (works with cover/contain)
  const FOCAL = 'object-[center_30%]' // 'object-center', 'object-[center_top]', etc.
  // Timing
  const SLIDE_MS = 5000
  const FADE_MS  = 700

  const [images, setImages] = React.useState([])
  const [idx, setIdx] = React.useState(0)

  React.useEffect(() => {
    let alive = true
    const loaders = rawImages.map(src =>
      new Promise((resolve) => {
        const i = new Image()
        const url = encodeURI(src)
        i.onload  = () => resolve(url)
        i.onerror = () => resolve(null)
        i.src = url
      })
    )
    Promise.all(loaders).then(list => {
      if (!alive) return
      const ok = list.filter(Boolean)
      setImages(ok)
      setIdx(0)
    })
    return () => { alive = false }
  }, [])

  React.useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [images])

  React.useEffect(() => {
    if (!images.length) return
    const next = new Image()
    next.src = images[(idx + 1) % images.length]
  }, [idx, images])

  return (
    <section className={`relative ${HERO_H} overflow-hidden`}>
      {/* Slides */}
      <div className="absolute inset-0">
        {images.length ? images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full transition-opacity object-${FIT_MODE} ${FOCAL}`}
            style={{ opacity: i === idx ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
            loading="eager"
            decoding="async"
            aria-hidden={i === idx ? 'false' : 'true'}
          />
        )) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}
      </div>

      {/* Dark overlay for readability — reduce opacity if you want more image pop */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Text */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
          Video Surveillance Experts for 20+ Years
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl">
          Video Surveillance &amp; Access Control — Avigilon, Verkada
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
