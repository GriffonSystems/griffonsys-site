// src/components/VideoHero.jsx
// … keep your existing imports/state/fetch logic …

export default function VideoHero() {
  // keep your current code…
  const SLIDE_MS = 5000
  const FADE_MS  = 700

  // …existing effects…

  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0 bg-black">
        {images.length ? (
          images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding={i === 0 ? 'sync' : 'async'}
              /* CHANGE: object-cover = fills / zooms, center crop */
              className="absolute inset-0 w-full h-full object-cover object-center transition-opacity"
              style={{ opacity: i === idx ? 1 : 0, transitionDuration: `${FADE_MS}ms` }}
              aria-hidden={i === idx ? 'false' : 'true'}
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-gray-200" />
        )}
      </div>

      {/* Overlay + your headline/subtitle … keep as-is */}
      <div className="absolute inset-0 bg-black/35" />
      {/* … your title/subtitle block … */}
      {/* … your dots … */}
    </section>
  )
}
