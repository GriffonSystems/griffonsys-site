import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_KV_REST_API_URL,
  token: process.env.UPSTASH_KV_REST_API_TOKEN,
})

function clean(val) {
  return typeof val === "string" ? val.trim() : ""
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
  }

  const headers = req.headers || {}

  const secretCandidates = {
    "verkada-signature": headers["verkada-signature"],
    "x-verkada-signature": headers["x-verkada-signature"],
    "authorization": headers["authorization"],
    "x-api-key": headers["x-api-key"],
  }

  console.log("Webhook header keys:", Object.keys(headers))
  console.log("Webhook secret candidates:", {
    "verkada-signature": secretCandidates["verkada-signature"] ? "[present]" : "[missing]",
    "x-verkada-signature": secretCandidates["x-verkada-signature"] ? "[present]" : "[missing]",
    "authorization": secretCandidates["authorization"] ? "[present]" : "[missing]",
    "x-api-key": secretCandidates["x-api-key"] ? "[present]" : "[missing]",
  })

  const providedSecret =
    clean(headers["verkada-signature"]) ||
    clean(headers["x-verkada-signature"]) ||
    clean(headers["authorization"]) ||
    clean(headers["x-api-key"])

  const expectedSecret = clean(process.env.VERKADA_WEBHOOK_SECRET)

  if (!providedSecret || providedSecret !== expectedSecret) {
    console.warn("Unauthorized webhook attempt", {
      providedLength: providedSecret.length,
      expectedLength: expectedSecret.length,
    })
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

    console.log("Verkada webhook received:", eventType)
    console.log("Verkada full payload:", JSON.stringify(body))

    const plate = body?.data?.license_plate_number || null
    const cameraId = body?.data?.camera_id || "unknown"
    const cameraName = body?.data?.camera_name || "unknown"
    const thumbnailUrl =
      body?.data?.thumbnail_url ||
      body?.data?.image_url ||
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
      rawPayload: body,
    })

    await redis.lpush("verkada_plates", entry)
    await redis.ltrim("verkada_plates", 0, 4999)

    return res.status(200).json({
      ok: true,
      eventType,
      plate,
    })
  } catch (err) {
    console.error("WEBHOOK ERROR:", err)
    return res.status(500).json({
      ok: false,
      error: err?.message || "Internal Error",
    })
  }
}
