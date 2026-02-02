// /api/event-rsvp.js
const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN

const S = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim())

function baseUrl(u) {
  return (u || "").replace(/\/+$/, "")
}

async function upstashCmd(args) {
  if (!KV_URL || !KV_TOKEN) throw new Error("Missing KV_REST_API_URL or KV_REST_API_TOKEN")

  const url =
    baseUrl(KV_URL) +
    "/" +
    args.map((a) => encodeURIComponent(String(a))).join("/")

  const r = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
  })

  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j?.error || `Upstash error (${r.status})`)
  return j?.result
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
  }

  res.setHeader("Cache-Control", "no-store, max-age=0")
  res.setHeader("Pragma", "no-cache")

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

    // ✅ This key pattern MUST match your list endpoint scan
    const key = `event:${eventId}:rsvp:${email}`

    // Store JSON string
    await upstashCmd(["set", key, JSON.stringify(record)])

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error("EVENT RSVP STORE ERROR:", err)
    return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
  }
}
