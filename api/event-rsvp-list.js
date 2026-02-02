// /api/event-rsvp-list.js
const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN

const S = (v) =>
  typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim()

async function upstash(path, init) {
  const r = await fetch(`${KV_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  })
  const j = await r.json().catch(() => ({}))
  return { ok: r.ok	tr: r, j }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
  }

  try {
    const token = S(req.query.token)
    if (!token || token !== process.env.EVENT_ADMIN_TOKEN) {
      return res.status(401).json({ ok: false, error: "Unauthorized" })
    }

    const eventId = S(req.query.eventId) || "mobile-street-camera-lunch-2026-02-25"

    // Find keys: event:<eventId>:rsvp:*
    const scan = await upstash(`/scan/0?match=${encodeURIComponent(`event:${eventId}:rsvp:*`)}&count=200`)
    if (!scan.ok) throw new Error(scan.j?.error || "Upstash scan failed")
    const keys = scan.j?.result || []

    const rows = []
    for (const k of keys) {
      const g = await upstash(`/get/${encodeURIComponent(k)}`)
      if (!g.ok) continue
      if (g.j?.result) rows.push(g.j.result)
    }

    const attending = rows.filter((r) => r.rsvp === "yes")
    const notAttending = rows.filter((r) => r.rsvp === "no")
    const followup = rows.filter((r) => r.rsvp === "followup")

    const seatsRequested = attending.reduce(
      (sum, r) => sum + 1 + Number(r.plusCount || 0),
      0
    )

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
