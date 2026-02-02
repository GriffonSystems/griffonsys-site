import { kv } from "@vercel/kv"

export default async function handler(req, res) {
  try {
    const token = req.query.token
    if (!token || token !== process.env.EVENT_ADMIN_TOKEN) {
      return res.status(401).json({ ok: false, error: "Unauthorized" })
    }

    const keys = await kv.keys("rsvp:*")

    const records = await Promise.all(
      keys.map(async (key) => {
        const data = await kv.get(key)
        return { key, ...data }
      })
    )

    // Sort newest first
    records.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))

    return res.status(200).json({ ok: true, records })
  } catch (err) {
    console.error("RSVP ADMIN ERROR:", err)
    return res.status(500).json({ ok: false, error: "Internal Error" })
  }
}
