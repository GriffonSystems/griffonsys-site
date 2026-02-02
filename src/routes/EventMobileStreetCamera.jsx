// src/routes/EventMobileStreetCamera.jsx
import React, { useMemo, useState } from "react"
import { Helmet } from "react-helmet"

const S = (v) => (typeof v === "string" ? v : v == null ? "" : String(v))

const VERSION = "EVENT_RSVP_PAGE_v2026-02-02_11:15AM"

const EVENT = {
  title: "Law Enforcement Lunch & Roundtable",
  subtitle: "Mobile Street Camera (LPR + Mobile Deployments)",
  dateText: "Tuesday, February 25",
  timeText: "11:30 AM – 1:30 PM",
  venueName: "Gibsons Bar & Steakhouse",
  addressLine: "2105 Spring Rd, Oak Brook, IL 60523",
  capacityNote: "Attendance is limited to keep the discussion productive.",
  hostLine: "Hosted by Paul Grefenstette, Griffon Systems, Inc. • 630-607-0346",
  mapEmbedSrc: "https://www.google.com/maps?q=2105%20Spring%20Rd,%20Oak%20Brook,%20IL%2060523&output=embed",
  mapsLink: "https://www.google.com/maps?q=2105+Spring+Rd,+Oak+Brook,+IL+60523",
  topics: [
    "Alerting workflows (NCIC, IL SOS, custom hot lists, manual review)",
    "Mobile / temporary deployments (events, problem areas, short-term needs)",
    "Policy, retention, chain-of-custody, and operational best practices",
    "Where mobile surveillance and LPR are headed in Illinois",
  ],
}

const IMAGE_URLS = [
  `${import.meta.env.BASE_URL}images/lpr/lpr-hero.jpg`,
  `${import.meta.env.BASE_URL}hero/hero-01.jpg`,
]

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <div className="text-sm font-semibold text-slate-800">{label}</div>
      <div className="mt-1">{children}</div>
      {hint ? <div className="mt-1 text-xs text-slate-500">{hint}</div> : null}
    </label>
  )
}

export default function EventMobileStreetCamera() {
  const [status, setStatus] = useState("idle") // idle | sending | success | error
  const [err, setErr] = useState("")
  const [form, setForm] = useState({
    rsvp: "yes", // yes | no | followup
    name: "",
    email: "",
    phone: "",
    agency: "",
    title: "",
    plusCount: 0,
    guestNames: "",
    dietary: "",
    notes: "",
  })

  const isAttending = form.rsvp === "yes"

  const validation = useMemo(() => {
    const problems = []
    if (!S(form.name).trim()) problems.push("Name is required.")
    if (!S(form.agency).trim()) problems.push("Agency/Department is required.")
    if (!S(form.email).trim()) problems.push("Email is required.")
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(S(form.email).trim())) {
      problems.push("Email looks invalid.")
    }
    if (isAttending) {
      const pc = Number(form.plusCount || 0)
      if (pc < 0 || pc > 3) problems.push("Plus-one count should be between 0 and 3.")
      if (pc > 0 && !S(form.guestNames).trim()) problems.push("Please add guest name(s) for your plus-one(s).")
    }
    return problems
  }, [form, isAttending])

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  function buildMessage() {
    const rsvpLabel =
      form.rsvp === "yes" ? "ATTENDING" : form.rsvp === "followup" ? "FOLLOW-UP REQUESTED" : "NOT ATTENDING"

    const pc = isAttending ? Number(form.plusCount || 0) : 0

    // triggers your /api/contact.js subject override
    const header = "Request for more information about: Event RSVP — Mobile Street Camera Lunch (Feb 25)"

    return [
      header,
      "",
      `Event: ${EVENT.title} — ${EVENT.subtitle}`,
      `When: ${EVENT.dateText} • ${EVENT.timeText}`,
      `Where: ${EVENT.venueName}, ${EVENT.addressLine}`,
      "----------------------------------------",
      `RSVP: ${rsvpLabel}`,
      `Name: ${S(form.name).trim()}`,
      `Agency/Dept: ${S(form.agency).trim()}`,
      `Title/Role: ${S(form.title).trim() || "-"}`,
      `Email: ${S(form.email).trim()}`,
      `Phone: ${S(form.phone).trim() || "-"}`,
      `Plus-one count: ${pc}`,
      `Guest name(s): ${pc > 0 ? S(form.guestNames).trim() : "-"}`,
      `Dietary: ${S(form.dietary).trim() || "-"}`,
      `Notes: ${S(form.notes).trim() || "-"}`,
    ].join("\n")
  }

  async function onSubmit(e) {
    e.preventDefault()
    console.log("RSVP SUBMIT HANDLER HIT", VERSION)

    setErr("")
    if (validation.length) {
      console.log("RSVP VALIDATION FAILED:", validation)
      setErr(validation[0])
      setStatus("error")
      return
    }

    setStatus("sending")

    try {
      console.log("CALLING /api/contact")

      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: S(form.name).trim(),
          email: S(form.email).trim(),
          phone: S(form.phone).trim(),
          company: S(form.agency).trim(),
          message: buildMessage(),
        }),
      })

      const data = await r.json().catch(() => ({}))
      console.log("RETURNED FROM /api/contact", { status: r.status, data })

      if (!r.ok || !data?.ok) {
        throw new Error(data?.error || `Request failed (${r.status})`)
      }

      setStatus("success")
    } catch (e2) {
      console.error("RSVP SUBMIT ERROR", e2)
      setErr(e2?.message || "Something went wrong.")
      setStatus("error")
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Helmet>
        <title>{EVENT.title} | Feb 25 | Oak Brook</title>
        <meta
          name="description"
          content="RSVP for a law enforcement lunch & roundtable discussion focused on mobile street camera deployments and LPR workflows."
        />
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left */}
          <div>
            <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {EVENT.dateText} • {EVENT.timeText}
            </div>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{EVENT.title}</h1>
            <p className="mt-2 text-lg font-semibold text-slate-700">{EVENT.subtitle}</p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Event Details</div>
              <div className="mt-2 space-y-1 text-sm text-slate-700">
                <div>
                  <span className="font-semibold">When:</span> {EVENT.dateText} • {EVENT.timeText}
                </div>
                <div>
                  <span className="font-semibold">Where:</span> {EVENT.venueName} • {EVENT.addressLine}
                </div>
                <div className="text-xs text-slate-500">{EVENT.capacityNote}</div>
                <div className="pt-2 text-xs text-slate-600">{EVENT.hostLine}</div>
                <div className="pt-3">
                  <a
                    href={EVENT.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:border-slate-400"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-semibold text-slate-900">Discussion Topics</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {EVENT.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="mt-3 text-xs text-slate-500">Note: This is a working discussion (not a sales presentation).</div>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Overview</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {IMAGE_URLS.map((src, idx) => (
                  <a
                    key={src}
                    href={src}
                    target="_blank"
                    rel="noreferrer"
                    className="group block overflow-hidden rounded-xl border border-slate-200"
                    title="View"
                  >
                    <img
                      src={src}
                      alt={idx === 0 ? "Mobile LPR deployment overview" : "LPR roadway deployment"}
                      className="h-40 w-full object-cover transition-transform group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">Location Map</div>
              <iframe
                title="Map"
                src={EVENT.mapEmbedSrc}
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* RSVP Form */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-900">RSVP</h2>

          {/* Visible deploy/version marker */}
          <div className="mt-2 text-xs text-slate-500">Debug: {VERSION}</div>

          <form onSubmit={onSubmit} className="mt-6 grid gap-5">
            <Field label="Will you attend?">
              <div className="flex flex-wrap gap-3">
                {[
                  { v: "yes", label: "Yes, I’m attending" },
                  { v: "no", label: "No, I can’t make it" },
                  { v: "followup", label: "Can’t attend, but I want a follow-up" },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.v}
                    onClick={() => update("rsvp", opt.v)}
                    className={
                      "rounded-xl border px-4 py-2 text-sm font-semibold transition " +
                      (form.rsvp === opt.v
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-800 hover:border-slate-400")
                    }
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Name">
                <input
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                  placeholder="Full name"
                />
              </Field>

              <Field label="Agency / Department">
                <input
                  value={form.agency}
                  onChange={(e) => update("agency", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                  placeholder="Department / Agency"
                />
              </Field>

              <Field label="Title / Role (optional)">
                <input
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                  placeholder="Chief, Commander, IT, etc."
                />
              </Field>

              <Field label="Email">
                <input
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                  placeholder="name@agency.gov"
                />
              </Field>

              <Field label="Phone (optional)">
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                  placeholder="Best contact number"
                />
              </Field>

              {isAttending ? (
                <Field label="Plus-one count" hint="If you’re bringing a colleague, select 1 (or more).">
                  <select
                    value={form.plusCount}
                    onChange={(e) => update("plusCount", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                  >
                    {[0, 1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </Field>
              ) : null}
            </div>

            {isAttending && Number(form.plusCount) > 0 ? (
              <Field label="Guest name(s)" hint="Please list the name(s) of your guest(s).">
                <textarea
                  value={form.guestNames}
                  onChange={(e) => update("guestNames", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                  rows={2}
                />
              </Field>
            ) : null}

            <Field label="Dietary restrictions (optional)">
              <input
                value={form.dietary}
                onChange={(e) => update("dietary", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
              />
            </Field>

            <Field label="Notes / topics you’d like to cover (optional)">
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
                rows={3}
              />
            </Field>

            {status === "error" && err ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{err}</div>
            ) : null}

            {status === "success" ? (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                Thanks — your RSVP was received.
              </div>
            ) : (
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-fit items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-60"
              >
                {status === "sending" ? "Submitting…" : "Submit RSVP"}
              </button>
            )}
          </form>
        </div>
      </div>
    </main>
  )
}
