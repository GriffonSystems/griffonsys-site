// /api/event-rsvp-list.js
const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN
const ADMIN_TOKEN = process.env.EVENT_ADMIN_TOKEN

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

function parseJsonSafe(v) {
  if (!v) return null
  if (typeof v === "object") return v
  if (typeof v === "string") {
    try {
      return JSON.parse(v)
    } catch {
      return null
    }
  }
  return null
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
  }

  res.setHeader("Cache-Control", "no-store, max-age=0")
  res.setHeader("Pragma", "no-cache")

  try {
    const token = S(req.query.token)
    if (!ADMIN_TOKEN) {
      return res.status(500).json({ ok: false, error: "Missing EVENT_ADMIN_TOKEN env var" })
    }
    if (!token || token !== ADMIN_TOKEN) {
      return res.status(401).json({ ok: false, error: "Unauthorized" })
    }

    const eventId = S(req.query.eventId) || "mobile-street-camera-lunch-2026-02-25"
    const match = `event:${eventId}:rsvp:*`

    // ---- SCAN ALL KEYS ----
    let cursor = "0"
    const keys = []
    do {
      const out = await upstashCmd(["scan", cursor, "match", match, "count", "200"])
      // Upstash returns [cursor, keys]
      const nextCursor = String(out?.[0] ?? "0")
      const batch = Array.isArray(out?.[1]) ? out[1] : []
      keys.push(...batch)
      cursor = nextCursor
    } while (cursor !== "0")

    // ---- FETCH VALUES ----
    const rows = []
    for (const k of keys) {
      const raw = await upstashCmd(["get", k])
      const obj = parseJsonSafe(raw)
      if (obj) rows.push(obj)
    }

    const attending = rows.filter((r) => r?.rsvp === "yes")
    const notAttending = rows.filter((r) => r?.rsvp === "no")
    const followup = rows.filter((r) => r?.rsvp === "followup")

    const seatsRequested = attending.reduce(
      (sum, r) => sum + 1 + Number(r?.plusCount || 0),
      0
    )

    // Helpful debug you can see in Vercel logs
    console.log("RSVP LIST", { eventId, match, keysFound: keys.length, rowsParsed: rows.length })

    return res.status(200).json({
      ok: true,
      eventId,
      match,
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
