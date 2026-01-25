// /api/contact.js

const S = (v) => (typeof v === "string" ? v : v == null ? "" : String(v).trim())

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed")

  try {
    const d =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}

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
      SMTP_TO,
      SMTP_FROM,
    } = process.env

    // Require everything we need
    const missing = []
    if (!SMTP_HOST) missing.push("SMTP_HOST")
    if (!SMTP_PORT) missing.push("SMTP_PORT")
    if (!SMTP_USER) missing.push("SMTP_USER")
    if (!SMTP_PASS) missing.push("SMTP_PASS")
    if (!SMTP_TO) missing.push("SMTP_TO")
    if (!SMTP_FROM) missing.push("SMTP_FROM")

    if (missing.length) {
      console.error("❌ Missing env vars:", missing.join(", "))
      return res.status(500).json({ ok: false, error: "Missing SMTP env vars" })
    }

    // Enforce alignment: Microsoft 365 is happiest if FROM matches authenticated user
    const fromAddress = SMTP_FROM || SMTP_USER
    const toAddress = SMTP_TO

    // Microsoft 365 SMTP (587 STARTTLS)
    const tx = nodemailer.createTransport({
      host: SMTP_HOST, // smtp.office365.com
      port: Number(SMTP_PORT), // 587
      secure: false, // must be false for 587
      requireTLS: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    // Dynamic subject (your existing logic)
    let subject
    if (message.startsWith("Request for more information about:")) {
      const solution = message
        .replace("Request for more information about:", "")
        .trim()
      subject = `Info Request — ${solution || "Website"}`
    } else {
      subject = `Griffon Website Lead — ${name || "Unknown"}`
    }

    const html = `
      <h2>New Website Lead</h2>
      <p><b>Name:</b> ${name || "(not provided)"}</p>
      <p><b>Email:</b> ${email || "(not provided)"}</p>
      <p><b>Phone:</b> ${phone || "(not provided)"}</p>
      <p><b>Company:</b> ${company || "(not provided)"}</p>
      <p><b>Message:</b><br/>${S(message).replace(/\n/g, "<br/>")}</p>
    `

    // Helpful debug (no secrets)
    console.log("📨 CONTACT ->", {
      to: toAddress,
      from: fromAddress,
      user: SMTP_USER,
      hasReplyTo: !!email,
    })

    await tx.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email || undefined,
      subject,
      html,
    })

    console.log("✅ CONTACT sent to", toAddress)
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error("❌ CONTACT API error:", e)
    return res.status(500).json({ ok: false, error: "Internal Error" })
  }
}
