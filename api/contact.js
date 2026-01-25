// /api/contact.js
import nodemailer from "nodemailer"

const S = (v) =>
  typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim()

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S(v))

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed")

  try {
    const d = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}

    const name = S(d.name)
    const email = S(d.email)
    const phone = S(d.phone)
    const company = S(d.company)
    const message = S(d.message)

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_TO, // sales@griffonsys.com
      SMTP_FROM,
      SMTP_BCC,
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
      return res.status(500).json({ ok: false, error: "Missing SMTP env vars" })
    }

    const toList = S(SMTP_TO)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)

    const badTo = toList.filter((x) => !isEmail(x))
    if (badTo.length) {
      console.error("❌ CONTACT invalid TO:", badTo)
      return res.status(500).json({ ok: false, error: "Invalid TO address" })
    }

    // ✅ Dynamic subject line if it’s a Solutions request
    let subject
    if (message.startsWith("Request for more information about:")) {
      const solution = message.replace("Request for more information about:", "").trim()
      subject = `Info Request — ${solution || "Solution"}`
    } else {
      subject = `Griffon Website Lead — ${name || "Unknown"}`
    }

    const html = `
      <h2>New Website Lead</h2>
      <p><b>Name:</b> ${name || "(not provided)"}</p>
      <p><b>Email:</b> ${email || "(not provided)"}</p>
      <p><b>Phone:</b> ${phone || "(not provided)"}</p>
      <p><b>Company:</b> ${company || "(not provided)"}</p>
      <p><b>Message:</b><br/>${(message || "(not provided)").replace(/\n/g, "<br/>")}</p>
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

    // Microsoft 365 SMTP (587 STARTTLS)
    const tx = nodemailer.createTransport({
      host: SMTP_HOST, // smtp.office365.com
      port: Number(SMTP_PORT || 587),
      secure: false, // STARTTLS
      requireTLS: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    console.log("📨 CONTACT sendMail payload:", {
      to: toList.join(","),
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

    console.log("✅ CONTACT nodemailer info:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    })

    return res.status(200).json({ ok: true, accepted: info.accepted })
  } catch (e) {
    console.error("❌ CONTACT API error:", e)
    return res.status(500).json({ ok: false, error: "Internal Error" })
  }
}
