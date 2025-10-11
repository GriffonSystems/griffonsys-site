import React from 'react'
import Gallery from '../components/Gallery'
import { Link } from 'react-router-dom'

const tabs = [
  { key: 'video',    label: 'Video',    base: '/vendors/verkada/video' },
  { key: 'access',   label: 'Access',   base: '/vendors/verkada/access' },
  { key: 'intercom', label: 'Intercom', base: '/vendors/verkada/intercom' }
]

export default function VendorVerkada(){
  const [active, setActive] = React.useState('video')

  return (
    <main className="container py-12">
      <div className="flex items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold">Verkada</h1>
        <Link to="/contact" className="btn btn-primary">Request a Demo</Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(t => (
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

      {/* Content */}
      {tabs.map(t => (
        <section
          key={t.key}
          style={{ display: active === t.key ? 'block' : 'none' }}
          className="space-y-4"
        >
          {/* Optional intro copy per tab */}
          {t.key === 'video' && (
            <p className="text-gray-700">
              Cloud-managed cameras with powerful search, people/vehicle analytics, and simple deployment.
            </p>
          )}
          {t.key === 'access' && (
            <p className="text-gray-700">
              Cloud access control with mobile credentials, role-based policies, and centralized management.
            </p>
          )}
          {t.key === 'intercom' && (
            <p className="text-gray-700">
              Smart intercom with video, calling, and door release from the Verkada Command platform.
            </p>
          )}

          <Gallery base={t.base} />
        </section>
      ))}
    </main>
  )
}
