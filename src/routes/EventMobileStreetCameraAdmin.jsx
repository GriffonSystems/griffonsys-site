// src/routes/EventMobileStreetCameraAdmin.jsx
import React, { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom"

const S = (v) => (typeof v === "string" ? v.trim() : v == null ? "" : String(v).trim())

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

function Section({ title, rows }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>
        <div className="text-sm text-slate-600">Count: {rows.length}</div>
      </div>

      {rows.length === 0 ? (
        <div className="mt-3 text-sm text-slate-500">None yet.</div>
      ) : (
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-600">
              <tr className="border-b">
                <th className="py-2 pr-3">Agency</th>
                <th className="py-2 pr-3">Name</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Phone</th>
                <th className="py-2 pr-3">+1</th>
                <th className="py-2 pr-3">Guests</th>
                <th className="py-2 pr-3">Dietary</th>
                <th className="py-2 pr-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.email} className="border-b">
                  <td className="py-2 pr-3">{r.agency}</td>
                  <td className="py-2 pr-3">{r.name}</td>
                  <td className="py-2 pr-3">{r.email}</td>
                  <td className="py-2 pr-3">{r.phone || "-"}</td>
                  <td className="py-2 pr-3">{Number(r.plusCount || 0)}</td>
                  <td className="py-2 pr-3">{r.guestNames || "-"}</td>
                  <td className="py-2 pr-3">{r.dietary || "-"}</td>
                  <td className="py-2 pr-3">{r.updatedAt ? new Date(r.updatedAt).toLocaleString() : "-"}</td>
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
        setErr("Missing token in URL. Add ?token=YOURTOKEN")
        return
      }

      setLoading(true)
      setErr("")
      try {
        const url = `/api/event-rsvp-list?eventId=mobile-street-camera-lunch-2026-02-25&token=${encodeURIComponent(
          token
        )}`
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

  return (
    <main className="container mx-auto px-4 py-10 max-w-6xl">
      <Helmet>
        <title>Event RSVP Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <h1 className="text-2xl font-extrabold text-slate-900">Event RSVP Admin</h1>
      <p className="mt-1 text-sm text-slate-600">Hidden page. Requires token.</p>

      {loading ? <div className="mt-6 text-sm text-slate-600">Loading…</div> : null}
      {err ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{err}</div>
      ) : null}

      {data ? (
        <div className="mt-8 grid gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-sm text-slate-700">
              Total: <b>{data.counts.total}</b> • Attending: <b>{data.counts.attending}</b> • Not attending:{" "}
              <b>{data.counts.notAttending}</b> • Follow-up: <b>{data.counts.followup}</b> • Seats requested:{" "}
              <b>{data.counts.seatsRequested}</b>
            </div>
          </div>

          <Section title="Attending" rows={data.attending || []} />
          <Section title="Can’t Make It" rows={data.notAttending || []} />
          <Section title="Follow-up Requested" rows={data.followup || []} />
        </div>
      ) : null}
    </main>
  )
}
