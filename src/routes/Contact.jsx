// /src/routes/Contact.jsx
import React, { useRef, useState } from "react"

const S = (v) => (typeof v === "string" ? v : v == null ? "" : String(v))

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    contact_ref: "", // honeypot, stays empty for real visitors
  })
  const [status, setStatus] = useState({ state: "idle", msg: "" })
  const loadedAt = useRef(Date.now())

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: "sending", msg: "Sending..." })

    try {
      const payload = {
        name: S(form.name).trim(),
        email: S(form.email).trim(),
        phone: S(form.phone).trim(),
        company: S(form.company).trim(),
        message: S(form.message).trim(),
        contact_ref: S(form.contact_ref),
        elapsedMs: Date.now() - loadedAt.current,
      }

      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await r.json().catch(() => ({}))

      if (!r.ok || !data?.ok) {
        throw new Error(data?.error || `Request failed (${r.status})`)
      }

      setStatus({
        state: "sent",
        msg: `✅ Sent! (Message ID: ${data?.id || "ok"})`,
      })
      setForm({ name: "", email: "", phone: "", company: "", message: "", contact_ref: "" })
    } catch (err) {
      setStatus({
        state: "error",
        msg: `❌ Not sent: ${err?.message || "Unknown error"}`,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Contact</h1>
      <p className="text-gray-600 mb-8">Send us a message and we’ll get back to you.</p>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Honeypot: off-screen for people, bots fill it in. Must stay empty. */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
        >
          <label>
            Leave this field blank
            <input
              name="contact_ref"
              value={form.contact_ref}
              onChange={onChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="w-full border rounded-lg p-3"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            className="w-full border rounded-lg p-3"
            placeholder="you@company.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            className="w-full border rounded-lg p-3"
            placeholder="(555) 555-5555"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            name="company"
            value={form.company}
            onChange={onChange}
            className="w-full border rounded-lg p-3"
            placeholder="Agency / Company"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message *</label>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            className="w-full border rounded-lg p-3 min-h-[140px]"
            placeholder="How can we help?"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status.state === "sending"}
          className="w-full bg-black text-white rounded-lg p-3 font-semibold disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending..." : "Send Message"}
        </button>

        {status.state !== "idle" && (
          <div
            className={`text-sm mt-3 ${
              status.state === "error" ? "text-red-600" : "text-green-700"
            }`}
          >
            {status.msg}
          </div>
        )}
      </form>
    </div>
  )
}
