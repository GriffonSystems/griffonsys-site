import React, { useState } from 'react'
import axios from 'axios'

export default function Solutions() {
  const items = [
    {
      title: 'Cloud Video Surveillance',
      desc: 'Simple deployment, remote access, and automatic updates.',
      img: '/images/solutions/cloud-video.jpg',
      pos: 'center 40%',
    },
    {
      title: 'On-Prem Video (NVR/VMS)',
      desc: 'High performance systems for regulated and air-gapped environments.',
      img: '/images/solutions/onprem-video.jpg',
      pos: 'center 45%',
    },
    {
      title: 'Access Control',
      desc: 'Mobile credentials, remote unlock, and visitor management.',
      img: '/images/solutions/access-control.jpg',
      pos: 'center 30%',
    },
    {
      title: 'Video Intercom',
      desc: 'Secure entry with integrated cameras and cloud calling.',
      img: '/images/solutions/video-intercom.jpg',
      pos: 'center 12%',
    },
    {
      title: 'Wireless Backhaul',
      desc: 'Point-to-point and mesh links for large properties.',
      img: '/images/solutions/wireless-backhaul.jpg',
      pos: 'center 32%',
    },
    {
      title: 'Maintenance & Support',
      desc: 'Health monitoring, quarterly reviews, priority response.',
      img: '/images/solutions/maintenance.jpg',
      pos: 'center 35%',
    },
  ]

  const [selected, setSelected] = useState(null)
  const [state, setState] = useState({
    name: '',
    company: '',
    email: '',
  })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await axios.post('/api/contact', {
        name: state.name,
        email: state.email,
        company: state.company,
        phone: '', // optional
        message: `Request for more information about: ${selected}`,
      })
      setStatus('ok')
      setTimeout(() => {
        setStatus('idle')
        setSelected(null)
        setState({ name: '', company: '', email: '' })
      }, 2000)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Solutions</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={() => setSelected(item.title)}
            className="relative text-left rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundSize: 'cover',
              backgroundPosition: item.pos || 'center',
              height: '260px',
            }}
          >
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-all"></div>
            <div className="relative z-10 p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-200">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl leading-none"
            >
              &times;
            </button>

            {status !== 'ok' ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  Request Info — {selected}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <input
                    name="company"
                    value={state.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full border border-gray-300 rounded p-2"
                  />

                  <div className="flex items-center gap-2">
                    <input id="consent" type="checkbox" required className="h-4 w-4" />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      I agree to be contacted about this request.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending...' : 'Send'}
                  </button>

                  {status === 'error' && (
                    <p className="text-red-600 text-sm mt-2">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                <p>We’ll send more information about {selected} shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
