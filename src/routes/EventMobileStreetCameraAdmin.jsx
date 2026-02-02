import React, { useState } from "react"
import { Helmet } from "react-helmet"

const S = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim())

export default function EventMobileStreetCamera() {
  const [status, setStatus] = useState("idle")
  const [form, setForm] = useState({
    rsvp: "yes",
    name: "",
    agency: "",
    title: "",
    email: "",
    phone: "",
    plusCount: 0,
    guestNames: "",
    dietary: "",
    notes: "",
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")

    try {
      // 1️⃣ Store RSVP in KV
      await fetch("/api/event-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: "mobile-street-camera-lunch-2026-02-25",
          rsvp: form.rsvp,
          name: S(form.name),
          email: S(form.email),
          phone: S(form.phone),
          agency: S(form.agency),
          title: S(form.title),
          plusCount: Number(form.plusCount || 0),
          guestNames: S(form.guestNames),
          dietary: S(form.dietary),
          notes: S(form.notes),
        }),
      })

      // 2️⃣ Email notification (uses existing contact backend)
      const message = `Request for more information about: Event RSVP — Mobile Street Camera Lunch (Feb 25)

RSVP: ${form.rsvp}
Name: ${form.name}
Agency: ${form.agency}
Title: ${form.title}
Email: ${form.email}
Phone: ${form.phone}
Plus-ones: ${form.plusCount}
Guests: ${form.guestNames}
Dietary: ${form.dietary}
Notes: ${form.notes}
`

      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: S(form.name),
          email: S(form.email),
          phone: S(form.phone),
          company: S(form.agency),
          message,
        }),
      })

      setStatus("ok")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-3xl">
      <Helmet>
        <title>Mobile Street Camera Lunch | Griffon Systems</title>
        <meta name="description" content="Law enforcement discussion on mobile street cameras and LPR technology." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-2">Mobile Street Camera Lunch</h1>
      <p className="text-gray-600 mb-6">
        Working discussion for Illinois law enforcement on mobile surveillance and LPR technology.
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-8 text-sm">
        <p><b>When:</b> Tuesday, February 25 · 11:30 AM – 1:30 PM</p>
        <p>
          <b>Where:</b> Gibson’s Bar & Steakhouse<br />
          2105 Spring Rd, Oak Brook, IL 60523
        </p>
        <p className="mt-2 text-gray-600">
          Attendance is limited to keep the discussion productive.
        </p>
      </div>

      {status === "ok" ? (
        <div className="bg-green-100 border border-green-300 text-green-800 rounded-xl p-4">
          ✅ Thanks — your RSVP was received.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          {/* RSVP */}
          <div>
            <label className="block text-sm font-medium mb-1">Will you attend?</label>
            <select
              name="rsvp"
              value={form.rsvp}
              onChange={onChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="yes">Yes, I’m attending</option>
              <option value="no">No, I can’t make it</option>
              <option value="followup">Can’t attend, but want a follow-up</option>
            </select>
          </div>

          <input name="name" placeholder="Name" required value={form.name} onChange={onChange} className="w-full border rounded-lg p-3" />
          <input name="agency" placeholder="Agency / Department" required value={form.agency} onChange={onChange} className="w-full border rounded-lg p-3" />
          <input name="title" placeholder="Title / Role (optional)" value={form.title} onChange={onChange} className="w-full border rounded-lg p-3" />
          <input type="email" name="email" placeholder="Email" required value={form.email} onChange={onChange} className="w-full border rounded-lg p-3" />
          <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={onChange} className="w-full border rounded-lg p-3" />

          {form.rsvp === "yes" && (
            <>
              <select name="plusCount" value={form.plusCount} onChange={onChange} className="w-full border rounded-lg p-3">
                <option value="0">No guests</option>
                <option value="1">+1 guest</option>
                <option value="2">+2 guests</option>
              </select>

              <input name="guestNames" placeholder="Guest name(s)" value={form.guestNames} onChange={onChange} className="w-full border rounded-lg p-3" />
              <input name="dietary" placeholder="Dietary restrictions (optional)" value={form.dietary} onChange={onChange} className="w-full border rounded-lg p-3" />
            </>
          )}

          <textarea name="notes" placeholder="Topics you’d like to cover (optional)" value={form.notes} onChange={onChange} className="w-full border rounded-lg p-3 min-h-[120px]" />

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-black text-white rounded-lg p-3 font-semibold disabled:opacity-60"
          >
            {status === "sending" ? "Submitting…" : "Submit RSVP"}
          </button>

          {status === "error" && (
            <p className="text-red-600 text-sm mt-2">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </main>
  )
}
