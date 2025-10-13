// src/routes/VendorVerkada.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery' // kept for other tabs

// ---------- Small, stable logo helper ----------
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
          {/* Category tiles */}
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
                  src={safeSrc(cat.img)}
                  onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/placeholder.png' }}
                  alt={cat.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{cat.title}</h3>
                <p className="text-gray-700 mb-4">{cat.desc}</p>
                <div className="mt-auto">
                  <Link to="/contact" className="btn btn-primary">Learn more</Link>
                </div>
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
{/* ========== ACCESS TAB ========== */}
{active === 'access' && (
  <section className="space-y-10">
    {/* Hero copy */}
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold">
        Experience the power of hybrid cloud access control
      </h2>
    </div>

    {/* Four pillars */}
    <div className="grid md:grid-cols-2 gap-6">
      {[
        {
          n: '01',
          title: 'Zero servers',
          desc:
            'Simply connect devices to power and internet, and they’re online and fully operational in minutes',
        },
        {
          n: '02',
          title: 'Manage from anywhere',
          desc:
            'Manage devices and users from an intuitive web- and mobile-based platform – even if you’re thousands of miles away',
        },
        {
          n: '03',
          title: 'Always available',
          desc:
            'Maintain door operations even in the event of network outages with edge processing, storage, and cross-device communication',
        },
        {
          n: '04',
          title: 'Easy to scale',
          desc:
            'A system without limits, whether you have 10 doors or 10,000',
        },
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

    {/* CTAs */}
    <div className="flex flex-wrap gap-3">
      <Link to="/contact" className="btn btn-primary">Request a Demo</Link>
      <a
        href="https://www.verkada.com/access-control/"
        target="_blank"
        rel="noreferrer"
        className="btn"
      >
        Learn more at Verkada
      </a>
    </div>

    {/* Gallery — reads public/vendors/verkada/access/index.json */}
    <div>
      <h3 className="text-xl font-semibold mb-4">From the field</h3>
      <Gallery base="/vendors/verkada/access" />
      {/* If your images aren't showing, temporarily replace the line above with <AccessGalleryDebug /> (below). */}
    </div>
  </section>
)}

    {/* Four pillars */}
    <div className="grid md:grid-cols-2 gap-6">
      {[
        {
          n: '01',
          title: 'Zero servers',
          desc:
            'Simply connect devices to power and internet, and they’re online and fully operational in minutes',
        },
        {
          n: '02',
          title: 'Manage from anywhere',
          desc:
            'Manage devices and users from an intuitive web- and mobile-based platform – even if you’re thousands of miles away',
        },
        {
          n: '03',
          title: 'Always available',
          desc:
            'Maintain door operations even in the event of network outages with edge processing, storage, and cross-device communication',
        },
        {
          n: '04',
          title: 'Easy to scale',
          desc:
            'A system without limits, whether you have 10 doors or 10,000',
        },
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

    {/* Optional: CTA + (optional) gallery if you keep one for Access */}
    <div className="flex flex-wrap gap-3">
      <Link to="/contact" className="btn btn-primary">Request a Demo</Link>
      <a
        href="https://www.verkada.com/access-control/"
        target="_blank"
        rel="noreferrer"
        className="btn"
      >
        Learn more at Verkada
      </a>
    </div>
 
      {/* Access gallery */}
          <div>
            <h3 className="text-xl font-semibold mb-4">From the field</h3>
            <Gallery base="/vendors/verkada/access" />
          </div>
        </section>
      )}
      

      {/* ========== INTERCOM TAB ========== */}
      {active === 'intercom' && (
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Intercom Models</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  key: 'TD33', img: '/vendors/verkada/intercom/td33.jpg',
                  blurb: 'Slim form factor for mullions and tight spaces.',
                  io: ['2 × dry inputs', '1 × dry relay', '1 × RS-485'],
                  creds: ['LF/HF cards & fobs', 'Mobile NFC/BLE', 'QR code'],
                },
                {
                  key: 'TD53', img: '/vendors/verkada/intercom/td53.jpg',
                  blurb: 'Full-size intercom with exceptional audio and scan.',
                  io: ['3 × dry inputs', '2 × dry relays', '1 × RS-485'],
                  creds: ['LF/HF cards & fobs', 'Mobile NFC/BLE', 'QR code'],
                },
                {
                  key: 'TD63', img: '/vendors/verkada/intercom/td63.jpg',
                  blurb: 'Full-size intercom with integrated keypad.',
                  io: ['3 × dry inputs', '2 × dry relays', '1 × RS-485'],
                  creds: ['LF/HF cards & fobs', 'Mobile NFC/BLE', 'QR code', 'PIN code'],
                },
              ].map(m => (
                <div key={m.key} className="card p-6 flex flex-col">
                  <img
                    src={safeSrc(m.img)}
                    onError={(e)=>{ e.currentTarget.onerror=null; e.currentTarget.src='/placeholder.png' }}
                    alt={m.key}
                    className="w-full h-40 object-contain mb-4 bg-gray-50 rounded-lg"
                  />
                  <h3 className="text-xl font-semibold">{m.key}</h3>
                  <p className="text-gray-700 mb-4">{m.blurb}</p>
                  <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                    <div><span className="font-medium">I/O:</span> {m.io.join(' · ')}</div>
                    <div><span className="font-medium">Credentials:</span> {m.creds.join(' · ')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features (keep if you like) */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Video Intercom', desc: '5MP video, crisp audio, AI analytics on every call.' },
              { title: 'Access Controller', desc: 'Grant/deny entry directly from the call UI.' },
              { title: 'Door Reader', desc: 'HF/LF cards, mobile NFC/BLE, and QR credentials.' },
              { title: 'Keypad', desc: 'PIN entry, MFA, or multi-tenant directory (TD63).' },
              { title: 'Clear Imaging', desc: '130° FoV, WDR, and night mode for any lighting.' },
              { title: 'Hear & Be Heard', desc: '4 mics with noise cancellation and echo reduction.' },
            ].map(card => (
              <div key={card.title} className="card p-6">
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Intercom gallery (optional) */}
          <Gallery base="/vendors/verkada/intercom" />
        </section>
      )}
    </main>
  )
}
