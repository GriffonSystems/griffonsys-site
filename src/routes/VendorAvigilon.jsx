// src/routes/VendorAvigilon.jsx
import React from 'react'
import { Link } from 'react-router-dom'

/* ---------- Avigilon logo with fallback ---------- */
function AvigilonLogo({ className = "h-10 w-auto object-contain" }) {
  const [src, setSrc] = React.useState(null)
  React.useEffect(() => {
    let alive = true
    const candidates = [
      '/vendors/avigilon/logo.svg',
      '/vendors/avigilon/logo.png',
      '/vendors/avigilon/logo.jpg',
    ]
    ;(async () => {
      for (const url of candidates) {
        try {
          const res = await fetch(url, { cache: 'force-cache' })
          if (res.ok) { if (alive) setSrc(url); break }
        } catch {}
      }
    })()
    return () => { alive = false }
  }, [])
  if (!src) return <div className={className} aria-label="Avigilon" />
  return (
    <img
      src={src}
      alt="Avigilon"
      className={className}
      loading="eager"
      decoding="sync"
      width={160}
      height={40}
    />
  )
}

/* ---------- From the field carousel (copied style/logic) ---------- */
function FieldCarousel({
  base = '/vendors/verkada/video/field', // reuse Verkada images by default
  title = 'From the field',
  intervalMs = 4500,
  fadeMs = 600,
}) {
  const [images, setImages] = React.useState([])
  const [idx, setIdx] = React.useState(0)
  const keyRef = React.useRef('')

  React.useEffect(() => {
    let alive = true
    const url = `${base}/index.json?v=${Date.now()}`
    fetch(url, { cache: 'no-store' })
      .then(async r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        const data = await r.json()
        const files = Array.isArray(data?.images) ? data.images : []
        const list = files.map(f => `${base}/${encodeURI(f)}`)
        const key = list.join('|')
        if (alive && list.length && key !== keyRef.current) {
          keyRef.current = key
          setImages(list)
          setIdx(0)
        } else if (alive && !list.length) {
          setImages([])
        }
      })
      .catch(() => { if (alive) setImages([]) })
    return () => { alive = false }
  }, [base])

  React.useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), intervalMs)
    return () => clearInterval(t)
  }, [images, intervalMs])

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>

      {!images.length ? (
        <div className="w-full h-[60vh] md:h-[75vh] rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
          From the field: No photos yet
        </div>
      ) : (
        <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden rounded-xl">
          <div className="absolute inset-0">
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding={i === 0 ? 'sync' : 'async'}
                className="absolute inset-0 w-full h-full object-contain bg-white transition-opacity"
                style={{ opacity: i === idx ? 1 : 0, transitionDuration: `${fadeMs}ms` }}
                aria-hidden={i === idx ? 'false' : 'true'}
              />
            ))}
          </div>
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
      )}
    </div>
  )
}

/* ---------- Tabs ---------- */
const TABS = [
  { key: 'video',    label: 'Video' },
  { key: 'access',   label: 'Access' },
  { key: 'intercom', label: 'Intercom' },
]

export default function VendorAvigilon() {
  const [active, setActive] = React.useState('video')

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <main className="container py-12">
      {/* Header with Avigilon logo + CTA */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <AvigilonLogo className="h-10 w-auto object-contain" />
          <h1 className="sr-only">Avigilon</h1>
        </div>
        <Link to="/contact" className="btn btn-primary">Request a Demo</Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-2 rounded-xl border transition ${
              active === t.key
                ? 'bg-black text-white border-black'
                : 'bg-white hover:bg-gray-100 border-gray-200'
            }`}
            aria-pressed={active === t.key}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ========== VIDEO TAB ========== */}
      {active === 'video' && (
        <section className="space-y-10">
          {/* Product families grid (simple, clean) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key:'bullet',      title:'H6A Bullet',        desc:'Long-range detail and analytics for perimeters and lots.',               img:'/vendors/avigilon/video/H6A_Bullet_Product_Detail_Image_1.avif' },
              { key:'dome',        title:'H6 Dome',           desc:'Versatile indoor/outdoor dome for general purpose deployments.',         img:'/vendors/avigilon/video/H6A_Dual_Head_02.avif' },
              { key:'ptz',         title:'H6X / H6A PTZ',     desc:'Flexible wide-area coverage and long-zoom situational awareness.',       img:'/vendors/avigilon/video/H6A-PTZ-Product_Detail_Image_2_2024-07-02-210404_cxtc.avif' },
              { key:'multisensor', title:'H6 Multisensor',    desc:'2–4 sensors in one housing for complete scene coverage.',               img:'/vendors/avigilon/video/H5A_Multisensor_01_2024-09-02-173128_gmdn.avif' },
              { key:'modular',     title:'H5A Modular',       desc:'Tiny head units for covert installs and tight spaces.',                 img:'/vendors/avigilon/video/H5A_Modular_01.avif' },
              { key:'fisheye',     title:'H6SL Fisheye',      desc:'180°/360° panoramic views for large open areas.',                       img:'/vendors/avigilon/video/H6SL_Bullet_1.avif' },
            ].map(card => (
              <div key={card.key} className="card p-6 flex flex-col">
                <img
                  src={encodeURI(card.img)}
                  onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/placeholder.png' }}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* From the field (reusing Verkada images for now) */}
          <FieldCarousel
            base="/vendors/verkada/video/field"
            title="From the field"
          />
        </section>
      )}

      {/* ========== ACCESS TAB (placeholder) ========== */}
      {active === 'access' && (
        <section className="space-y-6">
          <p className="text-gray-700">
            Avigilon On-Prem & Cloud Access solutions — add your copy and images here.
          </p>
        </section>
      )}

      {/* ========== INTERCOM TAB (placeholder) ========== */}
      {active === 'intercom' && (
        <section className="space-y-6">
          <p className="text-gray-700">
            Avigilon intercoms & readers — add models and a field gallery here if needed.
          </p>
        </section>
      )}
    </main>
  )
}
