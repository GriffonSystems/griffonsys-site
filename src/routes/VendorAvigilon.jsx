// src/routes/VendorAvigilon.jsx
import React from 'react'
import { Link } from 'react-router-dom'

/* ---------- Avigilon logo with fallback ---------- */
function AvigilonLogo({ className = 'h-10 w-auto object-contain' }) {
  const [src, setSrc] = React.useState(null)
  React.useEffect(() => {
    let alive = true
    const candidates = [
      '/vendors/avigilon/avigilonlogo.jpg',
    ]
    ;(async () => {
      for (const url of candidates) {
        try {
          const r = await fetch(url, { cache: 'force-cache' })
          if (r.ok) { if (alive) setSrc(url); break }
        } catch {}
      }
    })()
    return () => { alive = false }
  }, [])
  if (!src) return <div className={className} aria-label="Avigilon" />
  return <img src={src} alt="Avigilon" className={className} loading="eager" decoding="sync" />
}

/* ---------- Tabs ---------- */
const TABS = [
  { key: 'video', label: 'Video' },
  { key: 'access', label: 'Access' },
  { key: 'intercom', label: 'Intercom' },
]

export default function VendorAvigilon() {
  const [active, setActive] = React.useState('video')

  React.useEffect(() => {
    // open at top when navigating here
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [])

  return (
    <main className="container py-12">
      {/* Header */}
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

      {/* ========== VIDEO (placeholder for now) ========== */}
      {active === 'video' && (
        <section className="space-y-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key:'bullet',      title:'H6A Bullet',        desc:'Long-range detail and analytics for perimeters and lots.',               img:'/vendors/avigilon/H6A_Bullet_Product_Detail_Image_1.avif' },
              { key:'dome',        title:'H6 Dome',           desc:'Versatile indoor/outdoor dome for general purpose deployments.',         img:'/vendors/avigilon/dome.avif' },
              { key:'ptz',         title:'H6X / H6A PTZ',     desc:'Flexible wide-area coverage and long-zoom situational awareness.',       img:'/vendors/avigilon/H6A-PTZ-Product_Detail_Image_2_2024-07-02-210404_cxtc.avif' },
              { key:'multisensor', title:'H6 Multisensor',    desc:'2–4 sensors in one housing for complete scene coverage.',               img:'/vendors/avigilon/H5A_Multisensor_01_2024-09-02-173128_gmdn.avif' },
              { key:'modular',     title:'H5A Modular',       desc:'Tiny head units for covert installs and tight spaces.',                 img:'/vendors/avigilon/H5A_Modular_01.avif' },
              { key:'fisheye',     title:'H6SL Fisheye',      desc:'180°/360° panoramic views for large open areas.',                       img:'/vendors/avigilon/fisheye.avif' },
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
        </section>
      )}

      {/* ========== ACCESS (rewritten copy + video) ========== */}
      {active === 'access' && (
        <section className="space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Enhance Security with Avigilon Unity Access
            </h2>
            <p className="text-gray-700">
              Better security starts at the door. Tackle multiple use cases and address physical
              security challenges from anywhere with this reliable, turnkey solution.
            </p>
          </div>

          <div className="relative w-full rounded-xl overflow-hidden bg-gray-100 shadow-md">
            <video
              className="w-full h-auto rounded-xl"
              controls
              preload="metadata"
              poster="/vendors/avigilon/VideoIntercomReaderPro_01.avif"
            >
              <source src="/vendors/avigilon/ACM.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      )}

      {/* ========== INTERCOM (single image) ========== */}
      {active === 'intercom' && (
        <section className="space-y-8">
          <div className="card p-6">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Avigilon — Video Intercom / Reader Pro
            </h2>
            <div className="w-full flex justify-center">
              <img
                src={encodeURI('/vendors/avigilon/VideoIntercomReaderPro_01.avif')}
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.png' }}
                alt="Avigilon Video Intercom Reader Pro"
                loading="eager"
                decoding="sync"
                className="w-full max-w-4xl h-auto object-contain bg-gray-50 rounded-xl"
              />
            </div>
            <p className="text-gray-700 mt-4">
              Sleek video intercom and reader in one unit—secure entry, clear video, and streamlined installation.
            </p>
          </div>
        </section>
      )}
    </main>
  )
}
