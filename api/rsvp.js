// api/rsvp.js
import { Resend } from "resend"

const S = (v) => (typeof v === "string" ? v : v == null ? "" : String(v))

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed")

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const d = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {}

    const eventId = S(d.eventId)
    const eventTitle = S(d.eventTitle)

    const rsvp = S(d.rsvp) // yes | no | followup
    const name = S(d.name)
    const agency = S(d.agency)
    const title = S(d.title)
    const email = S(d.email)
    const phone = S(d.phone)
    const plusCount = Number(d.plusCount || 0)
    const guestNames = S(d.guestNames)
    const dietary = S(d.dietary)
    const notes = S(d.notes)

    if (!name || !agency || !email) return res.status(400).send("Missing required fields.")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).send("Invalid email.")

    const notifyTo = process.env.RSVP_NOTIFY_EMAIL
    const from = process.env.RSVP_FROM_EMAIL || "Griffon Systems <noreply@griffonsys.com>"
    if (!notifyTo) return res.status(500).send("Missing RSVP_NOTIFY_EMAIL env var.")

    const rsvpLabel =
      rsvp === "yes" ? "ATTENDING" : rsvp === "followup" ? "FOLLOW-UP REQUESTED" : "NOT ATTENDING"

    // Internal notification (to you)
    const internalSubject = `[RSVP] ${rsvpLabel} — ${name} (${agency})`
    const internalHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.4">
        <h2 style="margin:0 0 8px">${eventTitle || "Event RSVP"}</h2>
        <div><b>Event ID:</b> ${eventId || "-"}</div>
        <div><b>Status:</b> ${rsvpLabel}</div>
        <hr />
        <div><b>Name:</b> ${name}</div>
        <div><b>Agency:</b> ${agency}</div>
        <div><b>Title:</b> ${title || "-"}</div>
        <div><b>Email:</b> ${email}</div>
        <div><b>Phone:</b> ${phone || "-"}</div>
        <div><b>Plus-one count:</b> ${Number.isFinite(plusCount) ? plusCount : 0}</div>
        <div><b>Guest name(s):</b> ${guestNames || "-"}</div>
        <div><b>Dietary:</b> ${dietary || "-"}</div>
        <div><b>Notes:</b><br/>${(notes || "-").replace(/\n/g, "<br/>")}</div>
      </div>
    `.trim()

    await resend.emails.send({
      from,
      to: notifyTo,
      subject: internalSubject,
      html: internalHtml,
      reply_to: email, // lets you hit reply right back to them
    })

    // Confirmation email to attendee
    const attendeeSubject =
      rsvp === "yes"
        ? "RSVP Confirmed — Feb 25 Lunch & Discussion"
        : rsvp === "followup"
        ? "Thanks — we’ll follow up after Feb 25"
        : "Thanks for the reply — Feb 25 Lunch & Discussion"

    const attendeeHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <p>Hi ${name},</p>
        ${
          rsvp === "yes"
            ? `<p>Thanks — we’ve confirmed your RSVP for the Feb 25 lunch & roundtable in Oak Brook.</p>`
            : rsvp === "followup"
            ? `<p>Thanks — we’ll follow up with a summary and/or schedule time to review the platform after the lunch.</p>`
            : `<p>Thanks for letting us know. We’ll keep you posted on future sessions.</p>`
        }
        <p>
          <b>Your response:</b> ${rsvpLabel}<br/>
          <b>Agency:</b> ${agency}<br/>
          <b>Plus-one(s):</b> ${rsvp === "yes" ? plusCount : 0}
        </p>
        <p>
          Regards,<br/>
          Paul Grefenstette<br/>
          Griffon Systems, Inc.<br/>
          630-607-0346
        </p>
      </div>
    `.trim()

    await resend.emails.send({
      from,
      to: email,
      subject: attendeeSubject,
      html: attendeeHtml,
    })

    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(500).send(e?.message || "Server error")
  }
}
