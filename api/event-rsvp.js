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
    const rsvp = S(body.rsvp)
    const name = S(body.name)
    const email = S(body.email).toLowerCase()
    const agency = S(body.agency)

    if (!eventId || !rsvp || !name || !email || !agency) {
      return res.status(400).json({ ok: false, error: "Missing required fields." })
    }

    const record = {
      eventId,
      rsvp,
      name,
      email,
      agency,
      title: S(body.title),
      phone: S(body.phone),
      plusCount: Number(body.plusCount || 0),
      guestNames: S(body.guestNames),
      dietary: S(body.dietary),
      notes: S(body.notes),
      updatedAt: new Date().toISOString(),
    }

    const key = `event:${eventId}:rsvp:${email}`

    console.log("RSVP WRITE TRY", { eventId, email, key })

    // write
    await upstashCmd(["set", key, JSON.stringify(record)])

    // verify write
    const verify = await upstashCmd(["get", key])
    const wrote = typeof verify === "string" && verify.length > 0

    console.log("RSVP WRITE OK", { key, wrote })

    return res.status(200).json({ ok: true, key, wrote })
  } catch (err) {
    console.error("EVENT RSVP STORE ERROR:", err)
    return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
  }
}
