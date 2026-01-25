// /api/service.js
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const S = (v) =>
  typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim()

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" })
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}

    const company = S(body.company)
    const contact = S(body.contact)
    const phone = S(body.phone)
    const email = S(body.email)
    const issue = S(body.issue)
    const urgent = body.urgent ? "YES" : "No"

    // Let you route service requests separately if you want
    // (Set RESEND_TO_SERVICE in Vercel. Fallback to sales@ if not set.)
    const toEnv = S(process.env.RESEND_TO_SERVICE)
    const to = (toEnv ? toEnv.split(",") : ["sales@griffonsys.com"])
      .map((x) => x.trim())
      .filter(Boolean)

    const subject = `Maintenance Request — ${company || contact || "Unknown"}`

    await resend.emails.send({
      from: "Griffon Website <noreply@griffonsys.com>",
      to,
      replyTo: email || undefined,
      subject,
      html: `
        <h2>New Maintenance / Repair Request</h2>
        <p><b>Company:</b> ${company || "(not provided)"}</p>
        <p><b>Contact:</b> ${contact || "(not provided)"}</p>
        <p><b>Phone:</b> ${phone || "(not provided)"}</p>
        <p><b>Email:</b> ${email || "(not provided)"}</p>
        <p><b>Urgent:</b> ${urgent}</p>
        <p><b>Issue:</b><br/>${(issue || "(not provided)").replace(/\n/g, "<br/>")}</p>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error("SERVICE ERROR:", err)
    return res.status(500).json({ ok: false, error: "Internal Error" })
  }
}
