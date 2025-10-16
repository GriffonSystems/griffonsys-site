import React from 'react'
import { Link, useLocation } from 'react-router-dom'

/* ---------- Verkada logo with graceful fallback ---------- */
function VerkadaLogo({ className = "h-10 w-auto object-contain" }) {
  const [src, setSrc] = React.useState(null)
  React.useEffect(() => {
    let alive = true
    const candidates = ['/vendors/verkada/logo.jpg']
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
  if (!src) return <div className={className} aria-label="Verkada" />
  return (
    <img
      src={src}
      alt="Verkada"
      className={className}
      loading="eager"
      decoding="sync"
      width={160}
      height={40}
    />
  )
}

/* ---------- “From the field” carousel ---------- */
function FieldCarousel({ base = '/vendors/verkada/video/field', intervalMs = 4500, fadeMs = 600 }) {
  const [images, setImages] = React.useState([])
  const [idx, setIdx] = React.useState(0)
  const keyRef = React.useRef('')

  React.useEffect(() => {
    let alive = true
    fetch(`${base}/index.json`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        const data = await r.json()
        const files = Array.isArray(data?.images) ? data.images : []
        const list = files.map((f) => `${base}/${encodeURI(f)}`)
        const key = list.join('|')
        if (alive && list.length && key !== keyRef.current) {
          keyRef.current = key
          setImages(list)
          setIdx(0)
        }
      })
      .catch(() => { if (alive) setImages([]) })
    return () => { alive = false }
  }, [base])

  React.useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), intervalMs)
    return () => clearInterval(t)
  }, [images, intervalMs])

  if (!images.length) {
    return (
      <div className="w-full h-[60vh] md:h-[75vh] rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
        From the field: No photos yet
      </div>
    )
  }

  return (
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
  )
}

/* ---------- Tabs ---------- */
const TABS = [
  { key: 'video', label: 'Video' },
  { key: 'access', label: 'Access' },
  { key: 'intercom', label: 'Intercom' },
]

export default function VendorVerkada() {
  const [active, setActive] = React.useState('video')
  const location = useLocation()

  React.useEffect(() => {
    const fromHash = (location.hash || '').replace('#', '')
    const fromQuery = new URLSearchParams(location.search).get('tab')
    const wanted = (fromHash || fromQuery || '').toLowerCase()
    if (wanted && ['video', 'access', 'intercom'].includes(wanted)) {
      setActive(wanted)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location.hash, location.search])

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  const onTabClick = (key) => {
    setActive(key)
    window.history.replaceState(null, '', `#${key}`)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <main className="container py-12">
      {/* --- SEO Meta + Open Graph --- */}
      <head>
        <title>Verkada Security Systems in Chicago | Griffon Systems</title>
        <meta name="description" content="Authorized Verkada partner and installer serving Chicago, Elmhurst, and businesses across Illinois. Cloud-based video surveillance and access control systems." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.griffonsys.com/vendors/verkada" />
        <meta property="og:title" content="Verkada Security Systems in Chicago | Griffon Systems" />
        <meta property="og:description" content="Authorized Verkada dealer and installer serving Chicago, Elmhurst, and businesses across Illinois. Cloud-based surveillance and access control." />
        <meta property="og:image" content="https://www.griffonsys.com/images/vendors/verkada-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Verkada Security Systems in Chicago | Griffon Systems" />
        <meta name="twitter:description" content="Authorized Verkada installer in Illinois – Griffon Systems delivers secure, cloud-managed camera and access control systems." />
        <meta name="twitter:image" content="https://www.griffonsys.com/images/vendors/verkada-og.jpg" />
        <link rel="canonical" href="https://www.griffonsys.com/vendors/verkada" />
      </head>

      {/* --- LocalBusiness Schema --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Verkada Security System Installation",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Griffon Systems, Inc.",
              "image": "https://www.griffonsys.com/logo.png",
              "url": "https://www.griffonsys.com/vendors/verkada",
              "telephone": "+16306070346",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "650 West Grand Ave #206",
                "addressLocality": "Elmhurst",
                "addressRegion": "IL",
                "postalCode": "60126",
                "addressCountry": "US"
              },
              "areaServed": ["Chicago", "Elmhurst", "Naperville", "Illinois"],
              "sameAs": ["https://www.linkedin.com/company/griffon-systems-inc/"]
            },
            "brand": "Verkada",
            "description": "Authorized Verkada partner and installer providing cloud-managed video surveillance and access control systems across Illinois."
          }),
        }}
      />

      {/* --- Header --- */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <VerkadaLogo className="h-10 w-auto object-contain" />
          <h1 className="sr-only">Verkada Security Systems Chicago</h1>
        </div>
        <Link to="/contact" className="btn btn-primary">Request a Demo</Link>
      </div>

      {/* --- SEO Introduction --- */}
      <section className="mb-10 text-gray-700">
        <h2 className="text-2xl font-semibold mb-3">Verkada Partner in Chicago & Illinois</h2>
        <p className="mb-4">
          Griffon Systems, Inc. is an <strong>authorized Verkada partner</strong> serving Chicago, Elmhurst, Naperville,
          and businesses across Illinois. Our team designs, installs, and supports <strong>Verkada cloud-based video
          surveillance and access control systems</strong> built for security directors, IT professionals, and facility
          managers who need reliability and remote visibility.
        </p>
      </section>

      {/* --- Tabs --- */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => onTabClick(t.key)}
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

      {/* --- Existing Tabs Content (Video / Access / Intercom) --- */}
      {/* your existing tab content remains unchanged below */}
      {/* ... existing VIDEO, ACCESS, INTERCOM sections from your original file ... */}
    </main>
  )
}
