import nodemailer from "nodemailer"

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed")

  try {
    const form = req.body || {}
    const text = `
🚨 New Maintenance / Repair Request 🚨

Company: ${form.company || ""}
Contact: ${form.contact || ""}
Phone: ${form.phone || ""}
Email: ${form.email || ""}
Urgent: ${form.urgent ? "YES" : "No"}

Issue:
${form.issue || "(none provided)"}
    `.trim()

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Griffon Systems" <${process.env.SMTP_USER}>`,
      to: "service@griffonsys.com",
      subject: `Service Request from ${form.company || "Unknown Company"}`,
      text,
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error("Service API error:", err)
    res.status(500).json({ success: false, message: err.message })
  }
}
