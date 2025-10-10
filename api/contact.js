// api/contact.js — ESM for Vercel (Node 18/20)
import nodemailer from 'nodemailer';
import axios from 'axios';

const S = (v) => (typeof v === 'string' ? v : (v == null ? '' : String(v)));

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const data = req.body || {};
    const name = S(data.name), email = S(data.email), phone = S(data.phone);
    const company = S(data.company), industry = S(data.industry), interest = S(data.interest);
    const message = S(data.message);

    const {
      SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO, SMTP_FROM,
      HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID
    } = process.env;

    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && SMTP_TO && SMTP_FROM) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      const html = `
        <h2>New Website Lead</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Industry:</b> ${industry}</p>
        <p><b>Interested In:</b> ${interest}</p>
        <p><b>Message:</b><br/>${S(message).replace(/\n/g,'<br/>')}</p>
      `;

      await transporter.sendMail({
        from: SMTP_FROM,
        to: SMTP_TO,
        subject: `Griffon Website Lead — ${name}`,
        html,
      });
    }

    if (HUBSPOT_PORTAL_ID && HUBSPOT_FORM_GUID) {
      const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;
      await axios.post(endpoint, {
        fields: [
          { name: 'firstname', value: name },
          { name: 'email', value: email },
          { name: 'phone', value: phone },
          { name: 'company', value: company },
          { name: 'industry', value: industry },
          { name: 'interest', value: interest },
          { name: 'message', value: message }
        ],
        context: { pageUri: 'https://www.griffonsys.com/contact', pageName: 'Contact Griffon Systems' }
      }, { headers: { 'Content-Type': 'application/json' } });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).send('Internal Error');
  }
}
