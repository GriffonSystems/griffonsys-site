import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_KV_REST_API_URL,
  token: process.env.UPSTASH_KV_REST_API_TOKEN,
})

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
  }

  // Require a secret path segment:
  // /api/verkada-webhook/griffonhook2026
  const pathSecret = req.query.secret

  if (!pathSecret || pathSecret !== "griffonhook2026") {
    console.warn("Unauthorized webhook attempt", { pathSecret })
    return res.status(401).json({ ok: false, error: "Unauthorized" })
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body || {}

    const eventType = String(
      body?.event_type || body?.webhook_type || ""
    ).toLowerCase()

    const plate = body?.data?.license_plate_number || null

    const cameraId =
      body?.data?.camera_id ||
      body?.camera_id ||
      "unknown"

    const cameraName =
      body?.data?.camera_name ||
      body?.data?.camera?.name ||
      body?.camera_name ||
      body?.camera?.name ||
      body?.source_camera_name ||
      cameraId ||
      "unknown"

    const thumbnailUrl =
      body?.data?.thumbnail_url ||
      body?.data?.image_url ||
      body?.image_url ||
      null

    const confidence = body?.data?.confidence ?? null

    const timestamp = body?.data?.created
      ? new Date(body.data.created * 1000).toISOString()
      : new Date().toISOString()

    const entry = JSON.stringify({
      timestamp,
      eventType,
      plate,
      cameraId,
      cameraName,
      thumbnailUrl,
      confidence,
    })

    await redis.lpush("verkada_plates", entry)
    await redis.ltrim("verkada_plates", 0, 4999)

    return res.status(200).json({
      ok: true,
      eventType,
      plate,
      cameraId,
      cameraName,
    })
  } catch (err) {
    console.error("WEBHOOK ERROR:", err)
    return res.status(500).json({
      ok: false,
      error: err?.message || "Internal Error",
    })
  }
}
