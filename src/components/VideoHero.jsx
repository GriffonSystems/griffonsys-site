// src/components/VideoHero.jsx
import React from 'react'

export default function VideoHero(){
  // Add/remove image paths here
  const images = [
    '/hero/hero-1.jpg',
    '/hero/hero-2.jpg',
    '/hero/hero-3.jpg',
  ]

  const SLIDE_MS = 5000   // time each image shows (5s)
  const FADE_MS  = 700    // fade duration (0.7s)

  const [idx, setIdx] = React.useState(0)

  React.useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % images.length)
    }, SLIDE_MS)
    return () => clearInterval(t)
  }, [images.length])

  // Preload next image (reduces flicker)
  React.useEffect(() => {
    const next = new Image()
    next.src = images[(idx + 1) % images.length]
  }, [idx])

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Slides (stacked, cross-fading) */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity`}
            style={{
              opacity: i === idx ? 1 : 0,
              transitionDuration: `${FADE_MS}ms`,
            }}
            aria-hidden={i === idx ? 'false' : 'true'}
          />
        ))}
      </div>

      {/* Optional dark overlay for readable text */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Headline & subhead */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
          Smarter Security Starts Here
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl">
          Video Surveillance &amp; Access Control — Avigilon, Verkada
        </p>
      </div>

      {/* Dots (optional) */}
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
    </section>
  )
}
