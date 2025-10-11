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

  // Change this to 'cover' if you want full-bleed again
  const FIT = 'contain' // 'contain' (no crop) | 'cover' (fills, may crop)
  // If using cover, you can bias the focus (e.g., 'center 20%')
  const FOCUS = 'center center'

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
      setImages(ok.length ? ok : [])
      setIdx(0)
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
    <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
      <div className="absolute inset-0">
        {images.length > 0 ? (
          images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={
                `absolute inset-0 w-full h-full transition-opacity ` +
                (FIT === 'contain' ? 'object-contain bg-black' : 'object-cover')
              }
              style={{
                opacity: i === idx ? 1 : 0,
                transitionDuration: `${FADE_MS}ms`,
                ...(FIT === 'cover' ? { objectPosition: FOCUS } : {})
              }}
              aria-hidden={i === idx ? 'false' : 'true'}
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}
      </div>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Text */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Your Midwest Video Surveillance Experts for 20+ years</h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl">
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
