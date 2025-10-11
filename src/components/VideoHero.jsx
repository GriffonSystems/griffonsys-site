// src/components/VideoHero.jsx
import React from 'react'

export default function VideoHero(){
  // Image paths (exact filenames under public/hero)
  const images = [
    '/hero/IMG_3710 2.jpg',
    '/hero/IMG_5030.jpg',
    '/hero/hero1.jpg',
  ]

  const SLIDE_MS = 5000
  const FADE_MS  = 700
  const [idx, setIdx] = React.useState(0)

  React.useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [images.length])

  // Preload next image
  React.useEffect(() => {
    const next = new Image()
    next.src = encodeURI(images[(idx + 1) % images.length])
  }, [idx])

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={src}
            src={encodeURI(src)}        // <-- handles the space in "IMG_3710 2.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity"
            style={{ opacity: i === idx ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
            aria-hidden={i === idx ? 'false' : 'true'}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Smarter Security Starts Here</h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl">
          Video Surveillance &amp; Access Control — Avigilon, Verkada
        </p>
      </div>

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
