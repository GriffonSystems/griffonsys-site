// src/routes/VendorAvigilon.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

/* ---------- Avigilon logo ---------- */
function AvigilonLogo({ className = 'h-10 w-auto object-contain' }) {
  const [src, setSrc] = React.useState(null)
  React.useEffect(() => {
    let alive = true
    const candidates = ['/vendors/avigilon/logo.jpg']
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
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [])

  return (
    <main className="container py-12">
      {/* ✅ SEO + Open Graph */}
      <Helmet>
        <title>Avigilon Security Cameras & Access Control | Griffon Systems</title>
        <meta
          name="description"
          content="Authorized Avigilon partner in Chicago & Illinois. Griffon Systems provides Avigilon video surveillance, access control, and intercom systems for enterprise security."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.griffonsys.com/vendors/avigilon" />
        <meta
          property="og:title"
          content="Avigilon Security Cameras & Access Control | Griffon Systems"
        />
        <meta
          property="og:description"
          content="Chicago-based Avigilon partner offering advanced video surveillance, AI analytics, and access control solutions for commercial security."
        />
        <meta
          property="og:image"
          content="https://www.griffonsys.com/images/vendors/avigilon-og.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Avigilon Security Systems in Chicago | Griffon Systems"
        />
        <meta
          name="twitter:description"
          content="Authorized Avigilon integrator serving Illinois businesses — advanced cameras, analytics, and access control systems."
        />
        <meta
          name="twitter:image"
          content="https://www.griffonsys.com/images/vendors/avigilon-og.jpg"
        />
        <link rel="canonical" href="https://www.griffonsys.com/vendors/avigilon" />
      </Helmet>

      {/* Schema for local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Avigilon Security System Installation",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Griffon Systems, Inc.",
              "image": "https://www.griffonsys.com/logo.png",
              "url": "https://www.griffonsys.com/vendors/avigilon",
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
            "brand": "Avigilon",
            "description": "Authorized Avigilon partner and installer offering AI-powered video surveillance, access control, and intercom systems across Illinois."
          }),
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <AvigilonLogo className="h-10 w-auto object-contain" />
          <h1 className="sr-only">Avigilon Security Systems Chicago</h1>
        </div>
        <Link to="/contact" className="btn btn-primary">Request a Demo</Link>
      </div>

      {/* Intro */}
      <section className="mb-10 text-gray-700">
        <h2 className="text-2xl font-semibold mb-3">Avigilon Partner in Chicago & Illinois</h2>
        <p className="mb-4">
          Griffon Systems, Inc. is an <strong>authorized Avigilon partner</strong> providing
          <strong> AI-powered video surveillance, access control, and intercom solutions</strong> to
          organizations across Illinois. We design, install, and maintain scalable systems built for
          high performance and security.
        </p>
      </section>

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

      {/* ========== VIDEO ========== */}
      {active === 'video' && (
        <section className="space-y-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key:'bullet', title:'H6A Bullet', desc:'Long-range detail and analytics for perimeters and lots.', img:'/vendors/avigilon/H6A_Bullet_Product_Detail_Image_1.avif' },
              { key:'dome', title:'H6 Dome', desc:'Versatile indoor/outdoor dome for general purpose deployments.', img:'/vendors/avigilon/dome.avif' },
              { key:'ptz', title:'H6X / H6A PTZ', desc:'Flexible wide-area coverage and long-zoom situational awareness.', img:'/vendors/avigilon/H6A-PTZ-Product_Detail_Image_2_2024-07-02-210404_cxtc.avif' },
              { key:'multisensor', title:'H6 Multisensor', desc:'2–4 sensors in one housing for complete scene coverage.', img:'/vendors/avigilon/H5A_Multisensor_01_2024-09-02-173128_gmdn.avif' },
              { key:'modular', title:'H5A Modular', desc:'Tiny head units for covert installs and tight spaces.', img:'/vendors/avigilon/H5A_Modular_01.avif' },
              { key:'fisheye', title:'H6SL Fisheye', desc:'180°/360° panoramic views for large open areas.', img:'/vendors/avigilon/fisheye.avif' },
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

      {/* ========== ACCESS ========== */}
      {active === 'access' && (
        <section className="space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Enhance Security with Avigilon Unity Access
            </h2>
            <p className="text-gray-700">
              Better security starts at the door. Manage users, credentials, and permissions
              seamlessly across sites with Avigilon Unity Access, a reliable, scalable, and
              easy-to-administer access control platform.
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

      {/* ========== INTERCOM ========== */}
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
              Sleek video intercom and reader in one unit — secure entry, clear video, and streamlined installation.
            </p>
          </div>
        </section>
      )}
    </main>
  )
}
