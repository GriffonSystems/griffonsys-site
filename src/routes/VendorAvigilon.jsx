// src/routes/VendorAvigilon.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

/* Small helper to cope with spaces & show a placeholder if an image is missing */
const imgSrc = (p) => encodeURI(p)

const TABS = [
  { key: 'video', label: 'Video' },
  // add more tabs later if you like (e.g., 'cloud')
]

export default function VendorAvigilon() {
  const [active, setActive] = React.useState('video')
  const location = useLocation()

  // open the right tab from #hash or ?tab=
  React.useEffect(() => {
    const fromHash  = (location.hash || '').replace('#', '')
    const fromQuery = new URLSearchParams(location.search).get('tab')
    const wanted = (fromHash || fromQuery || '').toLowerCase()
    if (wanted && ['video'].includes(wanted)) {
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
      {/* Header with Avigilon wordmark (drop a logo at /vendors/avigilon/logo.(svg|png|jpg) if you want) */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/vendors/avigilon/logo.svg"
            onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/vendors/avigilon/logo.png' }}
            alt="Avigilon"
            className="h-10 w-auto object-contain"
          />
          <h1 className="sr-only">Avigilon</h1>
        </div>
        <Link to="/contact" className="btn btn-primary">Request a Demo</Link>
      </div>

      {/* Tabs (currently only Video) */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map(t => (
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

      {/* ========== VIDEO ========== */}
      {active === 'video' && (
        <section className="space-y-10">
          {/* “Discover Avigilon IP camera products” style grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                key: 'bullet-h6a',
                title: 'H6A Bullet',
                desc: 'High-detail coverage and long-range performance.',
                img: '/vendors/avigilon/H6A_Bullet_Product_Detail_Image_1.avif',
              },
              {
                key: 'ptz-h6a',
                title: 'H6A PTZ',
                desc: 'Flexible, wide-area coverage with powerful zoom.',
                img: '/vendors/avigilon/H6A-PTZ-Product_Detail_Image_2_2024-07-02-210404_cxtc.avif',
              },
              {
                key: 'multisensor-h5a',
                title: 'H5A Multisensor',
                desc: 'Two or four sensors in one for holistic coverage.',
                img: '/vendors/avigilon/H5A_Multisensor_01_2024-09-02-173128_gmdn.avif',
              },
              {
                key: 'modular-h5a',
                title: 'H5A Modular',
                desc: 'Split head/encoder design for tight or covert installs.',
                img: '/vendors/avigilon/H5A_Modular_01.avif',
              },
              {
                key: 'dual-head-h5a',
                title: 'H5A Dual-Head',
                desc: 'Two imager heads to cover opposing directions.',
                img: '/vendors/avigilon/H5A_Dual_Head_02.avif',
              },
              {
                key: 'specialty-l6a',
                title: 'L6A (Specialty)',
                desc: 'Purpose-built imaging for license plates & more.',
                img: '/vendors/avigilon/L6A-Product_Detail_Image_1.avif',
              },
              // Optional: a lower-cost bullet line card if you want it shown as “Bullet (Value)”
              {
                key: 'bullet-h6sl',
                title: 'H6SL Bullet',
                desc: 'Cost-effective bullet for essential deployments.',
                img: '/vendors/avigilon/H6SL_Bullet_1.avif',
              },
            ].map(card => (
              <div key={card.key} className="card p-6 flex flex-col">
                <div className="w-full h-40 bg-gray-50 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={imgSrc(card.img)}
                    onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/placeholder.png' }}
                    alt={card.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Optional: “From the field” carousel for Avigilon too (create folder + JSON when ready) */}
          {/* 
          <div>
            <h3 className="text-xl font-semibold mb-4">From the field</h3>
            <AvigilonFieldCarousel base="/vendors/avigilon/video/field" />
          </div>
          */}
        </section>
      )}
    </main>
  )
}
