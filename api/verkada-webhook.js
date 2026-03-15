// api/verkada-webhook.js
import OpenAI from "openai"
import { kv } from "@vercel/kv"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
  }

  // Verify shared secret Verkada sends in header
  const secret = req.headers["x-verkada-auth"]
  if (!secret || secret !== process.env.VERKADA_WEBHOOK_SECRET) {
    console.warn("Unauthorized webhook attempt")
    return res.status(401).json({ ok: false, error: "Unauthorized" })
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}
    const eventType = (body?.event_type || "").toLowerCase()

    console.log("Verkada webhook received:", eventType)

    if (eventType.includes("vehicle") || eventType.includes("object")) {
      const data         = body?.data || {}
      const thumbnailUrl = data.thumbnail_url || data.image_url
      const cameraId     = data.camera_id || "unknown"
      const cameraName   = data.camera_name || "unknown"
      const timestamp    = body?.created || new Date().toISOString()

      if (thumbnailUrl) {
        const plate = await extractPlate(thumbnailUrl)
        console.log(`Plate result: ${plate} | Camera: ${cameraName}`)

        if (plate && plate !== "NO_PLATE") {
          const entry = JSON.stringify({ timestamp, plate, cameraId, cameraName, thumbnailUrl })
          await kv.lpush("verkada_plates", entry)
          await kv.ltrim("verkada_plates", 0, 4999)
        }
      }
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error("WEBHOOK ERROR:", err)
    return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
  }
}

async function extractPlate(imageUrl) {
  try {
    const imgResp = await fetch(imageUrl, {
      headers: { "x-api-key": process.env.VERKADA_API_KEY },
    })
    if (!imgResp.ok) throw new Error(`Image fetch failed: ${imgResp.status}`)

    const buffer  = await imgResp.arrayBuffer()
    const b64     = Buffer.from(buffer).toString("base64")
    const mime    = imgResp.headers.get("content-type") || "image/jpeg"

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "user",
        content: [
          {
            type: "text",
            text: "This is a security camera vehicle snapshot. If a license plate is visible and readable, return ONLY the plate text — no explanation, no punctuation. If no plate is readable, return exactly: NO_PLATE",
          },
          {
            type: "image_url",
            image_url: { url: `data:${mime};base64,${b64}`, detail: "high" },
          },
        ],
      }],
      max_tokens: 20,
    })

    return response.choices[0].message.content.trim()
  } catch (err) {
    console.error("extractPlate error:", err)
    return null
  }
}
