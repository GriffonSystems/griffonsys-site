// /api/contact.js
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const S = (v) =>
  typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim()

const oneLine = (s) =>
  S(s)
    .replace(/[\r\n]+/g, " ") // remove line breaks
    .replace(/\s+/g, " ")     // collapse whitespace
    .trim()

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

    // ✅ Basic validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: "Valid email is required." })
    }
    if (!message) {
      return res.status(400).json({ ok: false, error: "Message is required." })
    }

    // ✅ Subject logic (newline-safe)
    let subject = "Griffon Website Lead"
    if (message.startsWith("Request for more information about:")) {
      const clean = oneLine(
        message.replace("Request for more information about:", "")
      )
      subject = oneLine(`Info Request — ${clean}`)
    } else {
      // also keep subject safe no matter what
      subject = oneLine(subject)
    }

    const html = `
      <h2>New Website Lead</h2>
      <p><b>Name:</b> ${name || "(not provided)"}</p>
      <p><b>Email:</b> ${email || "(not provided)"}</p>
      <p><b>Phone:</b> ${phone || "(not provided)"}</p>
      <p><b>Company:</b> ${company || "(not provided)"}</p>
      <p><b>Message:</b><br/>${(message || "").replace(/\n/g, "<br/>")}</p>
    `

    const text = [
      "New Website Lead",
      `Name: ${name || "(not provided)"}`,
      `Email: ${email || "(not provided)"}`,
      `Phone: ${phone || "(not provided)"}`,
      `Company: ${company || "(not provided)"}`,
      "",
      "Message:",
      message || "",
    ].join("\n")

    // ✅ Normal production routing
    const to = ["sales@griffonsys.com"]
    const bcc = ["paul@griffonsys.com"]

    // ✅ Send and capture result
    const result = await resend.emails.send({
      from: "Griffon Website <noreply@griffonsys.com>",
      to,
      bcc,
      reply_to: email || undefined,
      subject,
      html,
      text,
    })

    // Resend SDK may return {data,error} or direct fields depending on version
    const resendError = result?.error
    const resendId = result?.data?.id || result?.id

    if (resendError) {
      console.error("RESEND ERROR:", resendError)
      return res.status(500).json({
        ok: false,
        error: resendError?.message || "Resend error",
      })
    }

    return res.status(200).json({ ok: true, id: resendId })
  } catch (err) {
    console.error("CONTACT ERROR:", err)
    return res.status(500).json({ ok: false, error: err?.message || "Internal Error" })
  }
}
