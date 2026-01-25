// /api/service.js
import nodemailer from "nodemailer"

const S = (v) =>
  typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim()

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S(v))

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed")

  try {
    const d = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}

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
      SMTP_BCC,
    } = process.env

    // Prefer service-specific recipient, fallback to SMTP_TO
    const toAddress = S(SMTP_TO_SERVICE || SMTP_TO)

    const missing = []
    if (!SMTP_HOST) missing.push("SMTP_HOST")
    if (!SMTP_PORT) missing.push("SMTP_PORT")
    if (!SMTP_USER) missing.push("SMTP_USER")
    if (!SMTP_PASS) missing.push("SMTP_PASS")
    if (!SMTP_FROM) missing.push("SMTP_FROM")
    if (!toAddress) missing.push("SMTP_TO_SERVICE (or SMTP_TO)")

    if (missing.length) {
      console.error("❌ SERVICE missing env vars:", missing.join(", "))
      return res.status(500).json({ ok: false, error: "Missing SMTP env vars" })
    }

    // Basic sanity check: prevents obvious typos like "support@griffon"
    const toList = toAddress
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)

    const badTo = toList.filter((x) => !isEmail(x))
    if (badTo.length) {
      console.error("❌ SERVICE invalid TO:", badTo)
      return res.status(500).json({ ok: false, error: "Invalid TO address" })
    }

    const fromAddress = S(SMTP_FROM) || S(SMTP_USER)

    // Microsoft 365 SMTP (587 STARTTLS)
    const tx = nodemailer.createTransport({
      host: SMTP_HOST, // smtp.office365.com
      port: Number(SMTP_PORT || 587),
      secure: false, // STARTTLS
      requireTLS: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    const html = `
      <h2>New Maintenance / Repair Request</h2>
      <p><b>Company:</b> ${company || "(not provided)"}</p>
      <p><b>Contact:</b> ${contact || "(not provided)"}</p>
      <p><b>Phone:</b> ${phone || "(not provided)"}</p>
      <p><b>Email:</b> ${email || "(not provided)"}</p>
      <p><b>Urgent:</b> ${urgent}</p>
      <p><b>Issue:</b><br/>${(issue || "(not provided)").replace(/\n/g, "<br/>")}</p>
    `

    const text = [
      "New Maintenance / Repair Request",
      "--------------------------------",
      `Company: ${company || "(not provided)"}`,
      `Contact: ${contact || "(not provided)"}`,
      `Phone: ${phone || "(not provided)"}`,
      `Email: ${email || "(not provided)"}`,
      `Urgent: ${urgent}`,
      "",
      "Issue:",
      issue || "(not provided)",
      "",
    ].join("\n")

    console.log("📨 SERVICE sendMail payload:", {
      to: toList.join(","),
      from: fromAddress,
      replyTo: isEmail(email) ? email : null,
      bcc: isEmail(SMTP_BCC) ? SMTP_BCC : null,
      urgent,
    })

    const info = await tx.sendMail({
      from: fromAddress,
      to: toList.join(","),
      replyTo: isEmail(email) ? email : undefined,
      bcc: isEmail(SMTP_BCC) ? SMTP_BCC : undefined,
      subject: `Maintenance Request — ${company || contact || "Unknown"}`,
      text,
      html,
    })

    console.log("✅ SERVICE nodemailer info:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    })

    return res.status(200).json({ ok: true, accepted: info.accepted })
  } catch (e) {
    console.error("❌ SERVICE API error:", e)
    return res.status(500).json({ ok: false, error: "Internal Error" })
  }
}
