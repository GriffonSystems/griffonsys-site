import nodemailer from "nodemailer"
const S = (v) => (typeof v === "string" ? v : v == null ? "" : String(v))

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
    } = process.env

    const SMTP_TO = "service@griffonsys.com" // 👈 hardcode destination

    if (!(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && SMTP_FROM))
      return res.status(500).json({ ok: false, error: "Missing SMTP env vars" })

    const tx = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    const html = `
      <h2>🚨 New Maintenance / Repair Request 🚨</h2>
      <p><b>Company:</b> ${company}</p>
      <p><b>Contact:</b> ${contact}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Urgent:</b> ${urgent}</p>
      <p><b>Issue:</b><br/>${issue.replace(/\n/g, "<br/>")}</p>
    `

    await tx.sendMail({
      from: SMTP_FROM,
      to: SMTP_TO,
      bcc: "paul@griffonsys.com", // optional
      subject: `Maintenance Request — ${company || contact || "Unknown"}`,
      html,
    })

    console.log("✅ Sent maintenance ticket email to", SMTP_TO)
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error("❌ Service API error:", e)
    return res.status(500).json({ ok: false, error: e.message })
  }
}
