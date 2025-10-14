// src/components/ReviewsMarqueeStatic.jsx
import React from 'react'

export default function ReviewsMarqueeStatic({
  src = '/reviews.json',               // where we load reviews from
  title = 'From Our Google Reviews',   // section title
  speedSec = 35,                       // lower = faster
}) {
  const [reviews, setReviews] = React.useState([])
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    let alive = true
    fetch(`${src}?v=${Date.now()}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (!alive) return
        const list = Array.isArray(data?.reviews) ? data.reviews : []
        setReviews(list.filter(r => r?.text))
      })
      .catch(() => alive && setReviews([]))
    return () => { alive = false }
  }, [src])

  if (!reviews.length) return null

  // Duplicate the list so it can loop seamlessly
  const loop = [...reviews, ...reviews]

  return (
    <section className="border-t bg-white">
      <div className="container py-10">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">{title}</h3>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Local keyframes */}
          <style>{`
            @keyframes review-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>

          <div
            className="flex gap-4 will-change-transform"
            style={{
              width: '200%',
              animation: `review-scroll ${speedSec}s linear infinite`,
              animationPlayState: paused ? 'paused' : 'running',
            }}
            aria-label="Customer reviews carousel"
          >
            {loop.map((r, i) => (
              <article
                key={`${r.author || 'user'}-${i}`}
                className="w-80 flex-shrink-0 border rounded-xl p-4 bg-white/90"
              >
                <header className="flex items-center gap-3 mb-2">
                  {r.profilePhoto ? (
                    <img
                      src={r.profilePhoto}
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-gray-200" />
                  )}
                  <div>
                    <div className="font-medium text-sm">{r.author || 'Google user'}</div>
                    <div className="text-xs text-gray-500">{r.relativeTime || ''}</div>
                  </div>
                </header>

                <div className="flex items-center gap-1 mb-2" aria-label={`${r.rating || 5} star rating`}>
                  {'★★★★★'.slice(0, Math.round(r.rating || 5))}
                  {r.rating ? (
                    <span className="text-gray-500 text-xs ml-2">{Number(r.rating).toFixed(1)}</span>
                  ) : null}
                </div>

                <p className="text-sm text-gray-700 line-clamp-5">{r.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Optional: link out */}
        {reviews[0]?.placeId && (
          <div className="mt-4">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${encodeURIComponent(reviews[0].placeId)}`}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              See all reviews on Google
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
