// api/verkada-webhook.js
import OpenAI from "openai"
import { kv } from "@vercel/kv"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
        if (req.method !== "POST") {
                    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
        }

    // Verify shared secret Verkada sends in header
    const secret = req.headers["verkada-signature"]
        if (!secret || secret !== process.env.VERKADA_WEBHOOK_SECRET) {
                    console.warn("Unauthorized webhook attempt")
                    return res.status(401).json({ ok: false, error: "Unauthorized" })
        }

    try {
                const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}
                            const eventType = (body?.event_type || "").toLowerCase()

            console.log("Verkada webhook received:", eventType)
                console.log("Verkada full payload:", JSON.stringify(body))

            // DEBUG: log ALL events to KV so we can see what Verkada actually sends
            const debugEntry = JSON.stringify({
                            timestamp: new Date().toISOString(),
                            eventType,
                            plate: "DEBUG",
                            cameraId: body?.data?.camera_id || "unknown",
                            cameraName: body?.data?.camera_name || "unknown",
                            thumbnailUrl: body?.data?.thumbnail_url || body?.data?.image_url || null,
                            rawPayload: body,
            })
                await kv.lpush("verkada_plates", debugEntry)
                await kv.ltrim("verkada_plates", 0, 4999)

            return res.status(200).json({ ok: true })
    } catch (err) {
                console.error("WEBHOOK ERROR:", err)
                return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
    }
}
