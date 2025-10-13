// src/routes/VendorVerkada.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'

// ---------- Stable Verkada logo ----------
function VerkadaLogo({ className = "h-10 w-auto object-contain" }) {
  const [src, setSrc] = React.useState(null)
  React.useEffect(() => {
    let alive = true
    const candidates = [
      '/vendors/verkada/logo.svg',
      '/vendors/verkada/logo.png',
      '/vendors/verkada/logo.jpg',
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

// ---------- From the field carousel ----------
function FieldCarousel({ base = '/vendors/verkada/video/field', intervalMs = 4500, fadeMs = 600 }) {
  const [images, setImages] = React.useState([])
  const [idx, setIdx] = React.useState(0)
  const keyRef = React.useRef('')

  React.useEffect(() => {
    let alive = true
    const url = `${base}/index.json`
    fetch(url)
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

  if (!images.length) {
    return <div className="w-full h-[60vh] md:h-[75vh] rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">From the field: No photos yet</div>
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

const TABS = [
  { key: 'video',    label: 'Video' },
  { key: 'access',   label: 'Access' },
  { key: 'intercom', label: 'Intercom' },
]

const safeSrc = (p) => encodeURI(p)

export default function VendorVerkada() {
  const [active, setActive] = React.useState('video')

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <main className="container py-12">
      {/* Header with Verkada logo + CTA */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <VerkadaLogo className="h-10 w-auto object-contain" />
          <h1 className="sr-only">Verkada</h1>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key:'dome',        title:'Dome',        desc:'Reliable and versatile performance in almost any location.',            img:'/vendors/verkada/video/dome.png' },
              { key:'mini',        title:'Mini',        desc:'Compact form factor for discreet monitoring in tight spaces.',         img:'/vendors/verkada/video/mini.png' },
              { key:'bullet',      title:'Bullet',      desc:'Optimized for license plate recognition and highly-detailed monitoring.', img:'/vendors/verkada/video/bullet.png' },
              { key:'fisheye',     title:'Fisheye',     desc:'180-degree monitoring for expansive areas.',                           img:'/vendors/verkada/video/fisheye.png' },
              { key:'multisensor', title:'Multisensor', desc:'Two or four sensors in one unit for holistic coverage.',               img:'/vendors/verkada/video/multisensor.png' },
              { key:'ptz',         title:'PTZ',         desc:'Flexible, wide-area coverage at a distance.',                          img:'/vendors/verkada/video/ptz.png' },
              { key:'remote',      title:'Remote',      desc:'Built-in battery and LTE modem for remote deployments.',               img:'/vendors/verkada/video/remote.png' },
            ].map(cat => (
              <div key={cat.key} className="card p-6 flex flex-col">
                <img
                  src={encodeURI(cat.img)}
                  onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/placeholder.png' }}
                  alt={cat.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{cat.title}</h3>
                <p className="text-gray-700">{cat.desc}</p>
              </div>
            ))}
          </div>

          {/* From the field carousel */}
          <div>
            <h3 className="text-xl font-semibold mb-4">From the field</h3>
            <FieldCarousel base="/vendors/verkada/video/field" />
          </div>
        </section>
      )}

      {/* ========== ACCESS TAB (cards + four pillars) ========== */}
      {active === 'access' && (
        <section className="space-y-10">
          {/* Product cards (no CTAs) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                key: 'single-door',
                title: 'Single Door Controller',
                desc: 'Simple, reliable control for a single opening with cloud management.',
                img: '/vendors/verkada/access/singledoor.png'
              },
              {
                key: 'four-door',
                title: '4-Door Controller',
                desc: 'Scale up with a compact panel that handles four doors per unit.',
                img: '/vendors/verkada/access/4doorcontroller.png'
              },
              {
                key: 'mullion-reader',
                title: 'Mullion Reader',
                desc: 'Slim reader for tight jambs; supports NFC/BLE/mobile credentials.',
                img: '/vendors/verkada/access/singledoorreader.png'
              },
              {
                key: 'keypad-reader',
                title: 'Keypad Reader',
                desc: 'Keypad + reader for PIN and card/mobile access with audit trails.',
                img: '/vendors/verkada/access/keypad.png'
              }
            ].map(card => (
              <div key={card.key} className="card p-6 flex flex-col">
                <img
                  src={encodeURI(card.img)}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/placeholder.png' }}
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

          {/* Four pillars */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Experience the power of hybrid cloud access control
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { n: '01', title: 'Zero servers',
                  desc: 'Simply connect devices to power and internet, and they’re online and fully operational in minutes' },
                { n: '02', title: 'Manage from anywhere',
                  desc: 'Manage devices and users from an intuitive web- and mobile-based platform – even if you’re thousands of miles away' },
                { n: '03', title: 'Always available',
                  desc: 'Maintain door operations even in the event of network outages with edge processing, storage, and cross-device communication' },
                { n: '04', title: 'Easy to scale',
                  desc: 'A system without limits, whether you have 10 doors or 10,000' },
              ].map(item => (
                <div key={item.n} className="card p-6 flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                    {item.n}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== INTERCOM TAB (cards + pillars) ========== */}
      {active === 'intercom' && (
        <section className="space-y-10">
          {/* Product cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                key: 'TD33',
                title: 'TD33 — Slim Intercom',
                desc: 'Mullion-friendly form factor for tight jambs and retrofits.',
                img: '/vendors/verkada/intercom/td33.jpg',
              },
              {
                key: 'TD53',
                title: 'TD53 — Intercom',
                desc: 'Full-size unit with excellent video, audio, and scanning.',
                img: '/vendors/verkada/intercom/td53.jpg',
              },
              {
                key: 'TD63',
                title: 'TD63 — Intercom + Keypad',
                desc: 'Integrated keypad for PIN, MFA, and multi-tenant directories.',
                img: '/vendors/verkada/intercom/td63.jpg',
              },
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

          {/* Pillars */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Why it stands out</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { n: '01', title: 'Clear imaging', desc: '130° FoV, WDR, and night mode for readable faces in any light.' },
                { n: '02', title: 'Hear & be heard', desc: '4-mic array with noise cancellation and echo reduction.' },
                { n: '03', title: 'Access built-in', desc: 'Grant/deny entry, trigger relays, and log events from the call UI.' },
                { n: '04', title: 'Cloud management', desc: 'Manage devices and users from web or mobile from anywhere.' },
              ].map(item => (
                <div key={item.n} className="card p-6 flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
                    {item.n}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
