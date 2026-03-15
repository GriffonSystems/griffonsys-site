// api/verkada-plates.js
import { kv } from "@vercel/kv"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
  }

  const token = req.query.token
  if (!token || token !== process.env.VERKADA_ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized" })
  }

  try {
    const raw    = await kv.lrange("verkada_plates", 0, 4999)
    const plates = raw.map((r) => {
      try { return JSON.parse(r) } catch { return null }
    }).filter(Boolean)

    return res.status(200).json({ ok: true, plates })
  } catch (err) {
    console.error("PLATES ERROR:", err)
    return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
  }
    }
