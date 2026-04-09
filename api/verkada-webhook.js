import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_KV_REST_API_URL,
  token: process.env.UPSTASH_KV_REST_API_TOKEN,
})

// 👉 MAP CAMERA ID → LOCATION NAME
const CAMERA_LOCATIONS = {
  "1af42169-cdb2-4f5e-be28-f20904c9bedf": "Lake & Lathrop E/W",
  "77e9eac1-7b6b-4f28-a12b-91cb292d35c1": "Thatcher & Linden N/S",
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body || {}

    const eventType = String(
      body?.event_type || body?.webhook_type || ""
    ).toLowerCase()

    console.log("Verkada webhook received:", eventType)

    // Plate
    const plate = body?.data?.license_plate_number || null

    // Camera ID
    const cameraId =
      body?.data?.camera_id ||
      body?.camera_id ||
      "unknown"

    // 👉 LOCATION (instead of camera name)
    const location =
      CAMERA_LOCATIONS[cameraId] ||
      cameraId

    // Image
    const thumbnailUrl =
      body?.data?.thumbnail_url ||
      body?.data?.image_url ||
      null

    const confidence = body?.data?.confidence ?? null

    // Time
    const timestamp = body?.data?.created
      ? new Date(body.data.created * 1000).toISOString()
      : new Date().toISOString()

    // Store entry
    const entry = JSON.stringify({
      timestamp,
      eventType,
      plate,
      cameraId,
      location,
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
      location,
    })
  } catch (err) {
    console.error("WEBHOOK ERROR:", err)
    return res.status(500).json({
      ok: false,
      error: err?.message || "Internal Error",
    })
  }
}
