import React from 'react'
import axios from 'axios'

export default function Contact() {
  // Toggle Twilio text feature when ready
  const ENABLE_TWILIO = false

  const [state, setState] = React.useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = React.useState('idle')

  const [textMsg, setTextMsg] = React.useState({ phone: '', message: '' })
  const [textStatus, setTextStatus] = React.useState('idle')
  const [showTextForm, setShowTextForm] = React.useState(false)
  const [textFeedback, setTextFeedback] = React.useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await axios.post('/api/contact', state)
      setStatus('ok')
      setState({ name: '', email: '', phone: '', company: '', message: '' })
    } catch (e) {
      setStatus('error')
    }
  }

  const sendText = async (e) => {
    e.preventDefault()
    setTextStatus('loading')
    setTextFeedback('')
    try {
      const res = await axios.post('/api/text', textMsg)
      if (res.status === 200) {
        setTextStatus('ok')
        setTextFeedback('✅ Text sent successfully! We’ll reply shortly.')
        setTextMsg({ phone: '', message: '' })
        setTimeout(() => setTextFeedback(''), 5000)
      } else {
        setTextStatus('error')
        setTextFeedback('❌ Something went wrong sending your text.')
      }
    } catch (e) {
      console.error(e)
      setTextStatus('error')
      setTextFeedback('❌ Failed to send text. Please try again.')
    }
  }

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>

      {/* LocalBusiness JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Griffon Systems, Inc.",
            image: "https://www.griffonsys.com/logo.png",
            url: "https://www.griffonsys.com",
            telephone: "+16306070346",
            address: {
              "@type": "PostalAddress",
              streetAddress: "650 West Grand Ave #206",
              addressLocality: "Elmhurst",
              addressRegion: "IL",
              postalCode: "60126",
              addressCountry: "US",
            },
            openingHours: "Mo-Fr 08:00-17:00",
            priceRange: "$$",
            geo: {
              "@type": "GeoCoordinates",
              latitude: "41.908517",
              longitude: "-87.952383",
            },
            sameAs: [
              "https://www.linkedin.com/company/griffon-systems-inc/",
            ],
          }),
        }}
      />

      <form onSubmit={submit} className="grid md:grid-cols-2 gap-6 max-w-4xl">
        <div className="space-y-3">
          <input
            className="w-full border rounded-xl p-3"
            placeholder="Name"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />
          <input
            className="w-full border rounded-xl p-3"
            type="email"
            placeholder="Work email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
          />
          <input
            className="w-full border rounded-xl p-3"
            placeholder="Phone"
            value={state.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
          />
          <input
            className="w-full border rounded-xl p-3"
            placeholder="Company"
            value={state.company}
            onChange={(e) => setState({ ...state, company: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <textarea
            className="w-full border rounded-xl p-3 min-h-[180px]"
            placeholder="Tell us about your sites, camera count, doors, or goals..."
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
          />

          <div className="flex items-center gap-2">
            <input id="consent" type="checkbox" required className="h-4 w-4" />
            <label htmlFor="consent" className="text-sm text-gray-600">
              I agree to be contacted about this request.
            </label>
          </div>

          <button className="btn btn-primary" type="submit">
            {status === 'loading' ? 'Sending...' : 'Send'}
          </button>

          {status === 'ok' && (
            <span className="ml-3 text-green-600">
              Thanks! We’ll be in touch.
            </span>
          )}
          {status === 'error' && (
            <span className="ml-3 text-red-600">
              Something went wrong.
            </span>
          )}

          {/* Twilio section remains hidden until ENABLE_TWILIO = true */}
          {ENABLE_TWILIO && (
            <div className="mt-8">
              <button
                type="button"
                onClick={() => setShowTextForm(!showTextForm)}
                className="text-blue-600 underline hover:text-blue-800 transition"
              >
                {showTextForm ? 'Hide Text Option' : 'Prefer a Text Instead?'}
              </button>

              {showTextForm && (
                <div className="mt-4 p-4 border rounded-xl bg-gray-50 space-y-3 animate-fadeIn">
                  <h2 className="text-lg font-semibold">Send Us a Text</h2>
                  <form onSubmit={sendText} className="space-y-3">
                    <input
                      className="w-full border rounded-xl p-3"
                      placeholder="Your mobile number (e.g. +13125551234)"
                      value={textMsg.phone}
                      onChange={(e) =>
                        setTextMsg({ ...textMsg, phone: e.target.value })
                      }
                    />
                    <textarea
                      className="w-full border rounded-xl p-3 min-h-[100px]"
                      placeholder="Quick message..."
                      value={textMsg.message}
                      onChange={(e) =>
                        setTextMsg({ ...textMsg, message: e.target.value })
                      }
                    />
                    <button
                      type="submit"
                      className="btn btn-outline"
                      disabled={textStatus === 'loading'}
                    >
                      {textStatus === 'loading' ? 'Texting...' : 'Send Text'}
                    </button>
                  </form>
                  {textFeedback && (
                    <p
                      className={`mt-2 text-sm ${
                        textStatus === 'ok'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {textFeedback}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </form>

      {/* Business Info + Map */}
      <div className="mt-12 text-sm text-gray-700 max-w-2xl">
        <h2 className="text-lg font-semibold mb-2">Our Office</h2>
        <p>Griffon Systems, Inc.</p>
        <p>650 West Grand Ave #206</p>
        <p>Elmhurst, IL 60126</p>
        <p>
          <a
            href="tel:16306070346"
            className="text-blue-600 hover:underline"
          >
            (630) 607-0346
          </a>
        </p>
        <div className="mt-4">
          <iframe
            title="Griffon Systems Elmhurst IL"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.916651871323!2d-87.9523834!3d41.908517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e4d45e6bdb44f%3A0xe6d8ec49f2e9c5d5!2s650%20W%20Grand%20Ave%20%23206%2C%20Elmhurst%2C%20IL%2060126!5e0!3m2!1sen!2sus!4v1698412844011"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </main>
  )
}
