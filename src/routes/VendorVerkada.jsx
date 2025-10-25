import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'

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

  const onTabClick = (key) => {
    setActive(key)
    window.history.replaceState(null, '', `#${key}`)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <main className="container py-12">
      <Helmet>
        <title>Verkada Security Systems in Illinois | Griffon Systems</title>
        <meta
          name="description"
          content="Authorized Verkada partner providing design, installation, and support for cloud-based video surveillance and access control systems across Illinois."
        />
        <meta property="og:url" content="https://www.griffonsys.com/vendors/verkada" />
        <meta property="og:title" content="Verkada Security Systems in Illinois | Griffon Systems" />
        <meta
          property="og:description"
          content="Authorized Verkada partner providing design, installation, and support for cloud-based video surveillance and access control systems across Illinois."
        />
        <meta
          property="og:image"
          content="https://www.griffonsys.com/images/vendors/verkada-og.jpg"
        />
        <link rel="canonical" href="https://www.griffonsys.com/vendors/verkada" />
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <VerkadaLogo className="h-10 w-auto object-contain" />
          <h1 className="sr-only">Verkada Security Systems Illinois</h1>
        </div>
        <Link to="/contact" className="btn btn-primary">
          Request a Demo
        </Link>
      </div>

      {/* Intro */}
      <section className="mb-10 text-gray-700">
        <h2 className="text-2xl font-semibold mb-3">
          Authorized Verkada Partner in Illinois
        </h2>
        <p className="mb-4">
          <strong>Griffon Systems, Inc.</strong> is an authorized Verkada partner providing
          expert design, installation, and support for
          <strong> cloud-based video surveillance and access control systems</strong>{' '}
          across Illinois. Our solutions deliver
          <strong> reliability, scalability, and secure remote management</strong> for
          organizations of every size.
        </p>
      </section>

      {/* Tabs */}
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
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {active === 'video' && (
        <section className="space-y-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key:'dome', title:'Dome', desc:'Reliable and versatile performance in almost any location.', img:'/vendors/verkada/video/dome.png' },
              { key:'mini', title:'Mini', desc:'Compact form factor for discreet monitoring in tight spaces.', img:'/vendors/verkada/video/mini.png' },
              { key:'bullet', title:'Bullet', desc:'Optimized for license plate recognition and highly-detailed monitoring.', img:'/vendors/verkada/video/bullet.png' },
              { key:'fisheye', title:'Fisheye', desc:'180-degree monitoring for expansive areas.', img:'/vendors/verkada/video/fisheye.png' },
              { key:'multisensor', title:'Multisensor', desc:'Two or four sensors in one unit for holistic coverage.', img:'/vendors/verkada/video/multisensor.png' },
              { key:'ptz', title:'PTZ', desc:'Flexible, wide-area coverage at a distance.', img:'/vendors/verkada/video/ptz.png' },
              { key:'remote', title:'Remote', desc:'Built-in battery and LTE modem for remote deployments.', img:'/vendors/verkada/video/remote.png' },
            ].map(card => (
              <div key={card.key} className="card p-6 flex flex-col">
                <img
                  src={encodeURI(card.img)}
                  alt={card.title}
                  className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {active === 'access' && (
        <section className="space-y-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'single-door', title: 'Single Door Controller', desc: 'Simple, reliable control for a single opening with cloud management.', img: '/vendors/verkada/access/singledoor.png' },
              { key: 'four-door', title: '4-Door Controller', desc: 'Scale up with a compact panel that handles four doors per unit.', img: '/vendors/verkada/access/4doorcontroller.png' },
              { key: 'mullion-reader', title: 'Mullion Reader', desc: 'Slim reader for tight jambs; supports NFC/BLE/mobile credentials.', img: '/vendors/verkada/access/singledoorreader.png' },
              { key: 'keypad-reader', title: 'Keypad Reader', desc: 'Keypad + reader for PIN and card/mobile access with audit trails.', img: '/vendors/verkada/access/keypad.png' },
            ].map(card => (
              <div key={card.key} className="card p-6 flex flex-col">
                <img
                  src={encodeURI(card.img)}
                  alt={card.title}
                  className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {active === 'intercom' && (
        <section className="space-y-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'TD33', title: 'TD33 — Slim Intercom', desc: 'Mullion-friendly form factor for tight jambs and retrofits.', img: '/vendors/verkada/intercom/td33.jpg' },
              { key: 'TD53', title: 'TD53 — Intercom', desc: 'Full-size unit with excellent video, audio, and scanning.', img: '/vendors/verkada/intercom/td53.jpg' },
              { key: 'TD63', title: 'TD63 — Intercom + Keypad', desc: 'Integrated keypad for PIN, MFA, and multi-tenant directories.', img: '/vendors/verkada/intercom/td63.jpg' },
            ].map(card => (
              <div key={card.key} className="card p-6 flex flex-col">
                <img
                  src={encodeURI(card.img)}
                  alt={card.title}
                  className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ALPR Video Section (autoplaying muted loop) */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Automatic License Plate Recognition (ALPR)
        </h2>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          See how Verkada’s ALPR solution automatically detects and logs vehicle plates
          for secure facility entry, parking management, and perimeter monitoring.
        </p>

        <div className="max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-lg">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            loading="lazy"
            poster="https://embed-ssl.wistia.com/deliveries/06f8ad69e811e9ccf678b80dc38a2ea560673db6.jpg?image_crop_resized=960x540"
            className="w-full h-full object-cover"
            decoding="async"
          >
            <source src="/videos/verkada-alpr.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          © Verkada Inc. — Video courtesy of Verkada Marketing Team.
        </p>
      </section>
    </main>
  )
}
