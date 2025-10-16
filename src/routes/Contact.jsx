import React from 'react'
import axios from 'axios'

export default function Contact() {
  const [state, setState] = React.useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = React.useState('idle')

  // New state for texting form
  const [textMsg, setTextMsg] = React.useState({ phone: '', message: '' })
  const [textStatus, setTextStatus] = React.useState('idle')

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
    try {
      await axios.post('/api/text', textMsg)
      setTextStatus('ok')
      setTextMsg({ phone: '', message: '' })
    } catch (e) {
      setTextStatus('error')
    }
  }

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Contact</h1>
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
            <span className="ml-3 text-green-600">Thanks! We’ll be in touch.</span>
          )}
          {status === 'error' && (
            <span className="ml-3 text-red-600">Something went wrong.</span>
          )}

          {/* --- New Twilio text section --- */}
          <hr className="my-6" />
          <h2 className="text-lg font-semibold">Prefer a Text?</h2>
          <form onSubmit={sendText} className="space-y-3">
            <input
              className="w-full border rounded-xl p-3"
              placeholder="Your mobile number"
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
            {textStatus === 'ok' && (
              <span className="ml-3 text-green-600">Text sent successfully!</span>
            )}
            {textStatus === 'error' && (
              <span className="ml-3 text-red-600">Failed to send text.</span>
            )}
          </form>
        </div>
      </form>
    </main>
  )
}
