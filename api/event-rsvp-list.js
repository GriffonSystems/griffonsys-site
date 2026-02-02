// /api/event-rsvp-list.js
const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN

const S = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim())

function baseUrl(u) {
  // normalize trailing slash
  return (u || "").replace(/\/+$/, "")
}

async function upstashCmd(args) {
  if (!KV_URL || !KV_TOKEN) throw new Error("Missing KV_REST_API_URL or KV_REST_API_TOKEN")

  // Upstash REST: /<COMMAND>/<arg1>/<arg2>/...
  // Example: /get/mykey
  const url =
    baseUrl(KV_URL) +
    "/" +
    args
      .map((a) => encodeURIComponent(String(a)))
      .join("/")

  const r = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
    },
  })

  const j = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j?.error || `Upstash error (${r.status})`)
  return j?.result
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
    const match = `event:${eventId}:rsvp:*`

    // 🔍 SCAN loop until cursor returns "0"
    let cursor = "0"
    const keys = []

    do {
      const out = await upstashCmd(["scan", cursor, "match", match, "count", "200"])
      // SCAN returns [nextCursor, keys[]]
      const nextCursor = String(out?.[0] ?? "0")
      const batch = Array.isArray(out?.[1]) ? out[1] : []
      keys.push(...batch)
      cursor = nextCursor
    } while (cursor !== "0")

    const rows = []
    for (const k of keys) {
      const v = await upstashCmd(["get", k])
      if (v) rows.push(v)
    }

    const attending = rows.filter((r) => r?.rsvp === "yes")
    const notAttending = rows.filter((r) => r?.rsvp === "no")
    const followup = rows.filter((r) => r?.rsvp === "followup")

    const seatsRequested = attending.reduce(
      (sum, r) => sum + 1 + Number(r?.plusCount || 0),
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
