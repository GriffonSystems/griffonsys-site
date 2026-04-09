import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_KV_REST_API_URL,
  token: process.env.UPSTASH_KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
  }

  const token = req.query.token || req.headers["x-admin-token"]
  if (!token || token !== process.env.VERKADA_ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: "Unauthorized" })
  }

  try {
    const raw = await redis.lrange("verkada_plates", 0, 4999)
    const plates = raw
      .map((r) => {
        try {
          return typeof r === "string" ? JSON.parse(r) : r
        } catch {
          return null
        }
      })
      .filter(Boolean)

    return res.status(200).json({
      ok: true,
      count: plates.length,
      plates,
    })
  } catch (err) {
    console.error("PLATES ERROR:", err)
    return res.status(500).json({
      ok: false,
      error: err?.message || "Internal Error",
    })
  }
}
