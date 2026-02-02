// /api/event-rsvp-list.js
import { kv } from "@vercel/kv"

const S = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim())

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ ok: false, error: "Method Not Allowed" })

  try {
    const token = S(req.query.token)
    if (!token || token !== process.env.EVENT_ADMIN_TOKEN) {
      return res.status(401).json({ ok: false, error: "Unauthorized" })
    }

    const eventId = S(req.query.eventId) || "mobile-street-camera-lunch-2026-02-25"
    const emails = await kv.smembers(`event:${eventId}:emails`)
    const keys = (emails || []).map((e) => `event:${eventId}:rsvp:${String(e).toLowerCase()}`)
    const rows = (keys.length ? await kv.mget(keys) : []).filter(Boolean)

    const sortFn = (a, b) =>
      String(a.agency || "").localeCompare(String(b.agency || "")) ||
      String(a.name || "").localeCompare(String(b.name || ""))

    const attending = rows.filter((r) => r.rsvp === "yes").sort(sortFn)
    const notAttending = rows.filter((r) => r.rsvp === "no").sort(sortFn)
    const followup = rows.filter((r) => r.rsvp === "followup").sort(sortFn)

    const seatsRequested = attending.reduce((sum, r) => sum + 1 + Number(r.plusCount || 0), 0)

    return res.status(200).json({
      ok: true,
      eventId,
      counts: {
        total: rows.length,
        attending: attending.length,
        notAttending: notAttending.length,
        followup: followup.length,
        seatsRequested,
      },
      attending,
      notAttending,
      followup,
    })
  } catch (err) {
    console.error("EVENT RSVP LIST ERROR:", err)
    return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
  }
}
