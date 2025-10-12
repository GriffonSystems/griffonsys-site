// src/routes/VendorVerkada.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import Gallery from '../components/Gallery'

const TABS = [
  { key: 'video',    label: 'Video',    base: '/vendors/verkada/video' },
  { key: 'access',   label: 'Access',   base: '/vendors/verkada/access' },
  { key: 'intercom', label: 'Intercom', base: '/vendors/verkada/intercom' }
]

export default function VendorVerkada() {
  const [active, setActive] = React.useState('video')

  return (
    <main className="container py-12">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Verkada</h1>
        <Link to="/contact" className="btn btn-primary">Request a Demo</Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-4 py-2 rounded-xl border transition ${
              active === t.key ? 'bg-black text-white border-black' : 'bg-white hover:bg-gray-100 border-gray-200'
            }`}
            aria-pressed={active === t.key}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Video */}
      {active === 'video' && (
        <section className="space-y-6">
          <p className="text-gray-700">
            Cloud-managed cameras with powerful search, people/vehicle analytics, and simple deployment.
          </p>
          <Gallery base="/vendors/verkada/video" />
        </section>
      )}

      {/* Access */}
      {active === 'access' && (
        <section className="space-y-6">
          <p className="text-gray-700">
            Cloud access control with mobile credentials, role-based policies, and centralized management.
          </p>
          <Gallery base="/vendors/verkada/access" />
        </section>
      )}

      {/* Intercom */}
      {active === 'intercom' && (
        <section className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Video Intercom', desc: '5MP video, crisp audio, AI analytics on every call.' },
              { title: 'Access Controller', desc: 'Grant or deny entry directly from the call UI.' },
              { title: 'Door Reader', desc: 'HF/LF cards, mobile NFC/BLE, and QR credentials.' },
              { title: 'Multi-Purpose Keypad', desc: 'PIN entry, MFA, or multi-tenant directory (TD63).' },
              { title: 'Clear Imaging', desc: '130° FoV, WDR, and night mode for any lighting.' },
              { title: 'Hear & Be Heard', desc: '4 mics with noise cancellation and echo reduction.' },
            ].map(card => (
              <div key={card.title} className="card p-6">
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Intercom Models</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                key: 'TD33', img: '/vendors/verkada/intercom/td33.jpg',
                blurb: 'Slim form factor for mullions and tight spaces.',
                io: ['2 × dry inputs', '1 × dry relay', '1 × RS-485'],
                creds: ['LF/HF cards & fobs', 'Mobile NFC/BLE', 'QR code']
              },
              {
                key: 'TD53', img: '/vendors/verkada/intercom/td53.jpg',
                blurb: 'Full-size intercom with exceptional audio and scan.',
                io: ['3 × dry inputs', '2 × dry relays', '1 × RS-485'],
                creds: ['LF/HF cards & fobs', 'Mobile NFC/BLE', 'QR code']
              },
              {
                key: 'TD63', img: '/vendors/verkada/intercom/td63.jpg',
                blurb: 'Full-size intercom with integrated keypad.',
                io: ['3 × dry inputs', '2 × dry relays', '1 × RS-485'],
                creds: ['LF/HF cards & fobs', 'Mobile NFC/BLE', 'QR code', 'PIN code']
              },
            ].map(m => (
              <div key={m.key} className="card p-6 flex flex-col">
                <img src={m.img} alt={m.key} className="w-full h-40 object-contain mb-4 bg-gray-50 rounded-lg" />
                <h3 className="text-xl font-semibold">{m.key}</h3>
                <p className="text-gray-700 mb-4">{m.blurb}</p>
                <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
                  <div><span className="font-medium">I/O:</span> {m.io.join(' · ')}</div>
                  <div><span className="font-medium">Credentials:</span> {m.creds.join(' · ')}</div>
                </div>
              </div>
            ))}
          </div>

          <Gallery base="/vendors/verkada/intercom" />
        </section>
      )}
    </main>
  )
}
