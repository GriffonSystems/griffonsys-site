// src/components/VideoHero.jsx
import React from 'react'

export default function VideoHero(){
  // Update these to match your real filenames in public/hero/
  const rawImages = [
    '/hero/IMG_3710 2.jpg',
    '/hero/IMG_5030.jpg',
    '/hero/hero1.jpg',
  ]

  const SLIDE_MS = 5000
  const FADE_MS  = 700

  const [images, setImages] = React.useState([])   // only loaded images
  const [idx, setIdx] = React.useState(0)

  // Preload and keep only images that actually load
  React.useEffect(() => {
    let alive = true
    const loaders = rawImages.map(src =>
      new Promise((resolve) => {
        const i = new Image()
        const url = encodeURI(src) // handles spaces
        i.onload  = () => resolve(url)
        i.onerror = () => resolve(null)
        i.src = url
      })
    )
    Promise.all(loaders).then(list => {
      if (!alive) return
      const ok = list.filter(Boolean)
      setImages(ok.length ? ok : [])  // if none load, stays empty
      setIdx(0)
      if (ok.length < rawImages.length && typeof window !== 'undefined') {
        // Helpful console hint in dev
        console.warn('Some hero images failed to load:', rawImages.filter((_,i)=>!list[i]))
      }
    })
    return () => { alive = false }
  }, [])

  // Advance slides
  React.useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [images])

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        {images.length > 0 ? (
          images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity"
              style={{ opacity: i === idx ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
              aria-hidden={i === idx ? 'false' : 'true'}
            />
          ))
        ) : (
          // Fallback if nothing loaded yet or all failed
          <div className="absolute inset-0 bg-gray-200" />
        )}
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Smarter Security Starts Here</h1>
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
