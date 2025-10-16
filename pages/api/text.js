// pages/api/text.js
import twilio from 'twilio'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { phone, message } = req.body

  if (!phone || !message) {
    return res.status(400).json({ error: 'Phone and message required' })
  }

  try {
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    )

    // send the SMS
    const msg = await client.messages.create({
      body: `📩 Website Inquiry from Griffon Systems:\n${message}`,
      from: process.env.TWILIO_PHONE_NUMBER, // your Twilio number
      to: phone, // number the user entered
    })

    console.log('✅ Text sent:', msg.sid)
    res.status(200).json({ success: true })
  } catch (err) {
    console.error('❌ Twilio error:', err.message)
    res.status(500).json({ error: 'Failed to send text' })
  }
}
