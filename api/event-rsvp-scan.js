// /api/event-rsvp-scan.js
const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN

const S = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim())

function baseUrl(u) {
  return (u || "").replace(/\/+$/, "")
}

async function upstashCmd(args) {
  if (!KV_URL || !KV_TOKEN) throw new Error("Missing KV_REST_API_URL or KV_REST_API_TOKEN")

  const url = baseUrl(KV_URL) + "/" + args.map((a) => encodeURIComponent(String(a))).join("/")

  const r = await fetch(url, { method: "GET", headers: { Authorization: `Bearer ${KV_TOKEN}` } })
  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j?.error || `Upstash error (${r.status})`)
  return j?.result
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0")
  res.setHeader("Pragma", "no-cache")
  res.setHeader("Expires", "0")

  try {
    const eventId = S(req.query?.eventId) || "mobile-street-camera-lunch-2026-02-25"
    const match = `event:${eventId}:rsvp:*`

    let cursor = "0"
    const keys = []
    do {
      const out = await upstashCmd(["scan", cursor, "match", match, "count", "200"])
      const next = String(out?.[0] ?? "0")
      const batch = Array.isArray(out?.[1]) ? out[1] : []
      for (const k of batch) {
        keys.push(k)
        if (keys.length >= 25) break
      }
      cursor = next
      if (keys.length >= 25) break
    } while (cursor !== "0")

    return res.status(200).json({ ok: true, match, keys })
  } catch (err) {
    console.error("RSVP SCAN ERROR:", err)
    return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
  }
}
