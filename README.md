# Griffon Systems — Vercel-Ready Site

A Vite + React site with a serverless API route for the Contact form.
Import to Vercel → set env vars → deploy.

**Build settings**
- Framework: Vite (React)
- Install: npm ci
- Build: npm run build
- Output: dist
- Node: 18 or 20

**Env vars (Project → Settings → Environment Variables)**
SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_TO, SMTP_FROM
(Optional) HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID
