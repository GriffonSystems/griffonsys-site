// /api/event-rsvp-clear.js
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

async function scanAllKeys(match) {
  let cursor = "0"
  const keys = []

  do {
    const out = await upstashCmd(["scan", cursor, "match", match, "count", "500"])
    const next = String(out?.[0] ?? "0")
    const batch = Array.isArray(out?.[1]) ? out[1] : []
    if (batch.length) keys.push(...batch)
    cursor = next
  } while (cursor !== "0")

  return keys
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0")
  res.setHeader("Pragma", "no-cache")
  res.setHeader("Expires", "0")

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}

    const token = S(body.token)
    if (!ADMIN_TOKEN) return res.status(500).json({ ok: false, error: "Missing EVENT_ADMIN_TOKEN env var" })
    if (!token || token !== ADMIN_TOKEN) return res.status(401).json({ ok: false, error: "Unauthorized" })

    const eventId = S(body.eventId) || "mobile-street-camera-lunch-2026-02-25"
    const match = `event:${eventId}:rsvp:*`

    const keys = await scanAllKeys(match)
    if (!keys.length) {
      return res.status(200).json({ ok: true, eventId, deleted: 0 })
    }

    // DEL in chunks to avoid huge URLs
    let deleted = 0
    const chunkSize = 200
    for (let i = 0; i < keys.length; i += chunkSize) {
      const chunk = keys.slice(i, i + chunkSize)
      const n = await upstashCmd(["del", ...chunk])
      deleted += Number(n || 0)
    }

    return res.status(200).json({ ok: true, eventId, match, deleted })
  } catch (err) {
    console.error("EVENT RSVP CLEAR ERROR:", err)
    return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
  }
}
