const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN

const S = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim())

function baseUrl(u) {
  return (u || "").replace(/\/+$/, "")
}

async function upstashCmd(args) {
  if (!KV_URL || !KV_TOKEN) throw new Error("Missing KV_REST_API_URL or KV_REST_API_TOKEN")

  const url = baseUrl(KV_URL) + "/" + args.map((a) => encodeURIComponent(String(a))).join("/")

  const r = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
  })

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
    const email = S(req.query?.email).toLowerCase()

    if (!email) return res.status(400).json({ ok: false, error: "Missing email" })

    const key = `event:${eventId}:rsvp:${email}`
    const val = await upstashCmd(["get", key])

    return res.status(200).json({
      ok: true,
      key,
      exists: val != null,
      valuePreview: typeof val === "string" ? val.slice(0, 300) : val,
    })
  } catch (err) {
    console.error("EVENT RSVP DEBUG ERROR:", err)
    return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
  }
}
