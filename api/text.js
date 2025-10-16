// /api/text.js
import twilio from 'twilio'

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { phone, message } = req.body
  if (!phone || !message)
    return res.status(400).json({ error: 'Missing phone or message' })

  try {
    await client.messages.create({
      body: `New message from Griffon Systems website:\n${message}`,
      from: process.env.TWILIO_PHONE_NUMBER, // your Twilio number
      to: phone,
    })
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send SMS' })
  }
}
