// /api/service.js
import nodemailer from "nodemailer"

const S = (v) => (typeof v === "string" ? v : v == null ? "" : String(v).trim())

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed")

  try {
    const d =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}

    const company = S(d.company)
    const contact = S(d.contact)
    const phone = S(d.phone)
    const email = S(d.email)
    const issue = S(d.issue)
    const urgent = d.urgent ? "YES" : "No"

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
      SMTP_TO,
      SMTP_TO_SERVICE,
    } = process.env

    // Prefer service-specific recipient, fallback to SMTP_TO
    const toAddress = SMTP_TO_SERVICE || SMTP_TO

    const missing = []
    if (!SMTP_HOST) missing.push("SMTP_HOST")
    if (!SMTP_PORT) missing.push("SMTP_PORT")
    if (!SMTP_USER) missing.push("SMTP_USER")
    if (!SMTP_PASS) missing.push("SMTP_PASS")
    if (!SMTP_FROM) missing.push("SMTP_FROM")
    if (!toAddress) missing.push("SMTP_TO_SERVICE (or SMTP_TO)")

    if (missing.length) {
      console.error("❌ Missing env vars:", missing.join(", "))
      return res.status(500).json({ ok: false, error: "Missing SMTP env vars" })
    }

    const fromAddress = SMTP_FROM || SMTP_USER

    // Microsoft 365 SMTP (587 STARTTLS)
    const tx = nodemailer.createTransport({
      host: SMTP_HOST, // smtp.office365.com
      port: Number(SMTP_PORT), // 587
      secure: false,
      requireTLS: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    const html = `
      <h2>🚨 New Maintenance / Repair Request 🚨</h2>
      <p><b>Company:</b> ${company || "(not provided)"}</p>
      <p><b>Contact:</b> ${contact || "(not provided)"}</p>
      <p><b>Phone:</b> ${phone || "(not provided)"}</p>
      <p><b>Email:</b> ${email || "(not provided)"}</p>
      <p><b>Urgent:</b> ${urgent}</p>
      <p><b>Issue:</b><br/>${S(issue).replace(/\n/g, "<br/>")}</p>
    `

    console.log("📨 SERVICE ->", {
      to: toAddress,
      from: fromAddress,
      user: SMTP_USER,
      hasReplyTo: !!email,
      urgent,
    })

    await tx.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email || undefined,
      // Optional: keep a safety copy
      bcc: "paul@griffonsys.com",
      subject: `Maintenance Request — ${company || contact || "Unknown"}`,
      html,
    })

    console.log("✅ SERVICE sent to", toAddress)
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error("❌ SERVICE API error:", e)
    return res.status(500).json({ ok: false, error: "Internal Error" })
  }
}
