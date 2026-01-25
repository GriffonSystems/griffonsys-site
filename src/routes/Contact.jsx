// /api/contact.js
import nodemailer from "nodemailer"

const S = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim())
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S(v))

export default async function handler(req, res) {
  // Basic CORS (safe default)
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") return res.status(204).end()
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed")

  try {
    const d = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}

    const name = S(d.name)
    const email = S(d.email)
    const phone = S(d.phone)
    const company = S(d.company)
    const message = S(d.message)

    // Environment variables set in Vercel Project Settings → Environment Variables
    const {
      SMTP_HOST, // e.g. smtp.office365.com
      SMTP_PORT, // e.g. 587
      SMTP_USER, // e.g. sales@griffonsys.com
      SMTP_PASS, // password or app password
      SMTP_TO,   // e.g. sales@griffonsys.com (can be comma-separated)
      SMTP_FROM, // e.g. "Griffon Website <sales@griffonsys.com>"
      SMTP_BCC,  // optional
    } = process.env

    const missing = []
    if (!SMTP_HOST) missing.push("SMTP_HOST")
    if (!SMTP_PORT) missing.push("SMTP_PORT")
    if (!SMTP_USER) missing.push("SMTP_USER")
    if (!SMTP_PASS) missing.push("SMTP_PASS")
    if (!SMTP_TO) missing.push("SMTP_TO")
    if (!SMTP_FROM) missing.push("SMTP_FROM")

    if (missing.length) {
      console.error("❌ CONTACT missing env vars:", missing.join(", "))
      return res.status(500).json({ ok: false, error: "Missing SMTP env vars", missing })
    }

    const toList = S(SMTP_TO)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)

    const badTo = toList.filter((x) => !isEmail(x))
    if (badTo.length) {
      console.error("❌ CONTACT invalid SMTP_TO:", badTo)
      return res.status(500).json({ ok: false, error: "Invalid SMTP_TO address(es)", badTo })
    }

    // Subject logic
    let subject
    if (message.startsWith("Request for more information about:")) {
      const solution = message.replace("Request for more information about:", "").trim()
      subject = `Info Request — ${solution || "Solution"}`
    } else {
      subject = `Griffon Website Lead — ${name || "Unknown"}`
    }

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.45">
        <h2 style="margin:0 0 10px;">New Website Lead</h2>
        <p style="margin:0 0 6px;"><b>Name:</b> ${name || "(not provided)"}</p>
        <p style="margin:0 0 6px;"><b>Email:</b> ${email || "(not provided)"}</p>
        <p style="margin:0 0 6px;"><b>Phone:</b> ${phone || "(not provided)"}</p>
        <p style="margin:0 0 12px;"><b>Company:</b> ${company || "(not provided)"}</p>
        <p style="margin:0 0 6px;"><b>Message:</b></p>
        <div style="padding:10px 12px; border:1px solid #ddd; border-radius:8px;">
          ${(message || "(not provided)").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")}
        </div>
      </div>
    `

    const text = [
      "New Website Lead",
      "----------------",
      `Name: ${name || "(not provided)"}`,
      `Email: ${email || "(not provided)"}`,
      `Phone: ${phone || "(not provided)"}`,
      `Company: ${company || "(not provided)"}`,
      "",
      "Message:",
      message || "(not provided)",
      "",
    ].join("\n")

    // Office 365 SMTP via STARTTLS on 587
    const tx = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: false,
      requireTLS: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    // Log helpful info (no secrets)
    console.log("📨 CONTACT sendMail:", {
      to: toList,
      from: SMTP_FROM,
      replyTo: isEmail(email) ? email : null,
      bcc: isEmail(SMTP_BCC) ? SMTP_BCC : null,
      subject,
    })

    const info = await tx.sendMail({
      from: SMTP_FROM,
      to: toList.join(","),
      replyTo: isEmail(email) ? email : undefined,
      bcc: isEmail(SMTP_BCC) ? SMTP_BCC : undefined,
      subject,
      text,
      html,
    })

    console.log("✅ CONTACT sent:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    })

    return res.status(200).json({ ok: true, accepted: info.accepted })
  } catch (e) {
    console.error("❌ CONTACT API error:", e)
    return res.status(500).json({ ok: false, error: "Internal Error", detail: String(e?.message || e) })
  }
}
