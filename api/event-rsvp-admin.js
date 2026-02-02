// /api/event-rsvp.js
import { kv } from "@vercel/kv"

const S = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim())

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "Method Not Allowed" })

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}

    const eventId = S(body.eventId) || "mobile-street-camera-lunch-2026-02-25"
    const rsvp = S(body.rsvp) // yes | no | followup
    const name = S(body.name)
    const email = S(body.email).toLowerCase()
    const agency = S(body.agency)
    const title = S(body.title)
    const phone = S(body.phone)
    const plusCount = Number(body.plusCount || 0)
    const guestNames = S(body.guestNames)
    const dietary = S(body.dietary)
    const notes = S(body.notes)

    if (!eventId || !rsvp || !name || !email || !agency) {
      return res.status(400).json({ ok: false, error: "Missing required fields." })
    }

    const record = {
      eventId,
      rsvp,
      name,
      email,
      agency,
      title,
      phone,
      plusCount,
      guestNames,
      dietary,
      notes,
      updatedAt: new Date().toISOString(),
    }

    // Store by email (overwrites if they submit again — good)
    const key = `event:${eventId}:rsvp:${email}`
    await kv.set(key, record)

    // Track emails list for this event
    await kv.sadd(`event:${eventId}:emails`, email)

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error("EVENT RSVP ERROR:", err)
    return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
  }
}
