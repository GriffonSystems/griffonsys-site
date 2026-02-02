// /api/contact.js
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

    const name = S(body.name)
    const email = S(body.email)
    const phone = S(body.phone)
    const company = S(body.company)
    const message = S(body.message)

    let subject = "Griffon Website Lead"
    if (message.startsWith("Request for more information about:")) {
      subject = `Info Request — ${message
        .replace("Request for more information about:", "")
        .trim()}`
    }

    // ✅ TEST OVERRIDE:
    // Send directly to you so we can confirm delivery
    const to = ["paul@griffonsys.com"]

    const result = await resend.emails.send({
      from: "Griffon Website <noreply@griffonsys.com>",
      to,
      // bcc removed during test
      reply_to: email || undefined, // Resend prefers reply_to
      subject,
      html: `
        <h2>New Website Lead</h2>
        <p><b>Name:</b> ${name || "(not provided)"}</p>
        <p><b>Email:</b> ${email || "(not provided)"}</p>
        <p><b>Phone:</b> ${phone || "(not provided)"}</p>
        <p><b>Company:</b> ${company || "(not provided)"}</p>
        <p><b>Message:</b><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
      `,
    })

    // Return Resend response so we can diagnose suppression/bounce
    return res.status(200).json({ ok: true, resend: result })
  } catch (err) {
    console.error("CONTACT ERROR:", err)
    return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
  }
}
