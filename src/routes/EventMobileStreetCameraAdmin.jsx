import React, { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom"

const S = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim())

// ✅ Set your seat capacity here
const EVENT_CAPACITY = 40

// Must match what you're using everywhere else
const EVENT_ID = "mobile-street-camera-lunch-2026-02-25"

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

function toCsvValue(v) {
  // CSV-safe quoting
  const s = v == null ? "" : String(v)
  const needsQuote = /[",\n\r]/.test(s)
  const escaped = s.replace(/"/g, '""')
  return needsQuote ? `"${escaped}"` : escaped
}

function downloadCsv(filename, rows, columns) {
  const header = columns.map((c) => toCsvValue(c.label)).join(",")
  const lines = rows.map((r) => columns.map((c) => toCsvValue(c.get(r))).join(","))
  const csv = [header, ...lines].join("\n")

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()

  URL.revokeObjectURL(url)
}

function Section({ title, rows }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm print:shadow-none print:border-slate-300">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
        <div className="text-sm text-slate-600">
          Count: <b>{rows.length}</b>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="mt-3 text-sm text-slate-500">None yet.</div>
      ) : (
        <div className="mt-4 overflow-auto print:overflow-visible">
          <table className="w-full text-sm print:text-xs">
            <thead className="text-left text-slate-600">
              <tr className="border-b">
                <th className="py-2 pr-3">Agency</th>
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Phone</th>
                <th className="py-2 pr-3">+1</th>
                <th className="py-2 pr-3">Guests</th>
                <th className="py-2 pr-3">Dietary</th>
                <th className="py-2 pr-3">Notes</th>
                <th className="py-2 pr-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.email} className="border-b align-top">
                  <td className="py-2 pr-3">{r.agency || "-"}</td>
                  <td className="py-2 pr-3">{r.name || "-"}</td>
                  <td className="py-2 pr-3">{r.email || "-"}</td>
                  <td className="py-2 pr-3">{r.phone || "-"}</td>
                  <td className="py-2 pr-3">{Number(r.plusCount || 0)}</td>
                  <td className="py-2 pr-3">{r.guestNames || "-"}</td>
                  <td className="py-2 pr-3">{r.dietary || "-"}</td>
                  <td className="py-2 pr-3">{r.notes || "-"}</td>
                  <td className="py-2 pr-3">
                    {r.updatedAt ? new Date(r.updatedAt).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function EventMobileStreetCameraAdmin() {
  const q = useQuery()
  const token = S(q.get("token"))

  const [data, setData] = useState(null)
  const [err, setErr] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function run() {
      if (!token) {
        setErr("Missing token. Add ?token=YOURTOKEN")
        return
      }

      setLoading(true)
      setErr("")
      try {
        const url = `/api/event-rsvp-list?eventId=${encodeURIComponent(
          EVENT_ID
        )}&token=${encodeURIComponent(token)}`
        const r = await fetch(url)
        const j = await r.json().catch(() => ({}))
        if (!r.ok || !j?.ok) throw new Error(j?.error || `Request failed (${r.status})`)
        setData(j)
      } catch (e) {
        setErr(e?.message || "Error")
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [token])

  const counts = data?.counts || {}
  const seatsRequested = Number(counts?.seatsRequested || 0)
  const seatsRemaining = Math.max(0, EVENT_CAPACITY - seatsRequested)

  const allRows = useMemo(() => {
    const add = (arr, rsvpLabel) =>
      (arr || []).map((x) => ({
        ...x,
        rsvp: rsvpLabel,
      }))
    return [
      ...add(data?.attending, "attending"),
      ...add(data?.notAttending, "cant_make_it"),
      ...add(data?.followup, "follow_up"),
    ]
  }, [data])

  const onExportCsv = () => {
    const columns = [
      { label: "rsvp", get: (r) => r.rsvp || "" },
      { label: "agency", get: (r) => r.agency || "" },
      { label: "name", get: (r) => r.name || "" },
      { label: "email", get: (r) => r.email || "" },
      { label: "phone", get: (r) => r.phone || "" },
      { label: "plusCount", get: (r) => Number(r.plusCount || 0) },
      { label: "guestNames", get: (r) => r.guestNames || "" },
      { label: "dietary", get: (r) => r.dietary || "" },
      { label: "notes", get: (r) => r.notes || "" },
      { label: "updatedAt", get: (r) => r.updatedAt || "" },
    ]

    const ts = new Date()
      .toISOString()
      .replace(/[:]/g, "-")
      .replace(/\..+$/, "")
    downloadCsv(`rsvp-${EVENT_ID}-${ts}.csv`, allRows, columns)
  }

  const onPrint = () => window.print()

  return (
    <main className="container mx-auto px-4 py-10 max-w-6xl">
      <Helmet>
        <title>Event RSVP Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      {/* ✅ Print-friendly rules */}
      <style>{`
        @media print {
          header, footer, nav { display: none !important; }
          .print-hide { display: none !important; }
          body { background: white !important; }
          a[href]:after { content: "" !important; }
        }
      `}</style>

      <div className="flex items-start justify-between gap-4 print-hide">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Event RSVP Admin</h1>
          <p className="mt-1 text-sm text-slate-600">
            Hidden page — requires token. (If you can see this page at all, routing is correct.)
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onExportCsv}
            disabled={!data}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 hover:border-slate-400 disabled:opacity-50"
          >
            Export CSV
          </button>

          <button
            type="button"
            onClick={onPrint}
            disabled={!data}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            Print
          </button>
        </div>
      </div>

      {loading ? <div className="mt-6 text-sm text-slate-600">Loading…</div> : null}
      {err ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {err}
        </div>
      ) : null}

      {data ? (
        <div className="mt-8 grid gap-6">
          {/* Summary + Seats */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm print:shadow-none">
            <div className="grid gap-2 md:grid-cols-2">
              <div className="text-sm text-slate-700">
                Total RSVPs: <b>{counts?.total ?? 0}</b> • Attending: <b>{counts?.attending ?? 0}</b> •
                Can’t make it: <b>{counts?.notAttending ?? 0}</b> • Follow-up: <b>{counts?.followup ?? 0}</b>
              </div>

              <div className="text-sm text-slate-700 md:text-right">
                Seats requested: <b>{seatsRequested}</b> • Capacity: <b>{EVENT_CAPACITY}</b> • Seats remaining:{" "}
                <b className={seatsRemaining <= 2 ? "text-rose-700" : "text-emerald-700"}>
                  {seatsRemaining}
                </b>
              </div>
            </div>
          </div>

          {/* Sections */}
          <Section title="Attending" rows={data.attending || []} />
          <Section title="Can’t Make It" rows={data.notAttending || []} />
          <Section title="Follow-up Requested" rows={data.followup || []} />

          {/* Print footer (only shows on print if you want it) */}
          <div className="hidden print:block text-xs text-slate-500">
            Printed: {new Date().toLocaleString()} • Event: {EVENT_ID}
          </div>
        </div>
      ) : null}
    </main>
  )
}
