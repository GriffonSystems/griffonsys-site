// src/components/VideoHero.jsx
import React from 'react'

export default function VideoHero(){
  const SLIDE_MS = 5000
  const FADE_MS  = 700

  const [images, setImages] = React.useState([])  // absolute paths like /hero/xxx.jpg
  const [idx, setIdx] = React.useState(0)

  // Load list from /public/hero/index.json
  React.useEffect(() => {
    let alive = true
    fetch('/hero/index.json', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        const files = Array.isArray(data?.images) ? data.images : []
        const list = files.map(name => `/hero/${encodeURI(name)}`)
        if (alive) setImages(list)
      })
      .catch(() => { if (alive) setImages([]) })
    return () => { alive = false }
  }, [])

  // Cycle
  React.useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), SLIDE_MS)
    return () => clearInterval(t)
  }, [images])

  // Preload next
  React.useEffect(() => {
    if (!images.length) return
    const next = new Image()
    next.src = images[(idx + 1) % images.length] + `?v=${Date.now()}`
  }, [idx, images])

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        {(images.length ? images : ['/hero/hero1.jpg']).map((src, i) => (
          <img
            key={src}
            src={src + `?v=${idx}`} // tiny cache-buster as you cycle
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity"
            style={{ opacity: i === idx ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
            aria-hidden={i === idx ? 'false' : 'true'}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding={i === 0 ? 'sync' : 'async'}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-optima text-white text-4xl md:text-6xl font-bold mb-4">
          Smarter Security Starts Here
        </h1>
        <p className="font-optima text-white/90 text-lg md:text-xl max-w-2xl">
          Video Surveillance &amp; Access Control — Avigilon, Verkada
        </p>
      </div>

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
