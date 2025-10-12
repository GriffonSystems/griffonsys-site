// src/components/FieldCarousel.jsx
import React from 'react'

export default function FieldCarousel({ base = '/vendors/verkada/video/field', intervalMs = 4500, fadeMs = 600 }) {
  const [images, setImages] = React.useState([])
  const [idx, setIdx] = React.useState(0)

  // Load the JSON manifest of filenames
  React.useEffect(() => {
    let isMounted = true
    fetch(`${base}/index.json`, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        const files = Array.isArray(data?.images) ? data.images : []
        if (isMounted) setImages(files.map(f => `${base}/${encodeURI(f)}`))
      })
      .catch(() => isMounted && setImages([]))
    return () => { isMounted = false }
  }, [base])

  // Auto-advance
  React.useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), intervalMs)
    return () => clearInterval(t)
  }, [images, intervalMs])

  // Preload next img
  React.useEffect(() => {
    if (!images.length) return
    const n = new Image()
    n.src = images[(idx + 1) % images.length]
  }, [idx, images])

  if (!images.length) {
    return <div className="w-full h-64 md:h-80 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">No photos yet</div>
  }

  return (
    <div className="relative w-full h-[70vh] md:h-screen overflow-hidden rounded-xl">
      {/* Slides */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain bg-white transition-opacity"
            style={{ opacity: i === idx ? 1 : 0, transitionDuration: `${fadeMs}ms` }}
            aria-hidden={i === idx ? 'false' : 'true'}
          />
        ))}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full ${i === idx ? 'bg-black' : 'bg-black/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
