import { useEffect, useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "react-router-dom"

function useQuery() {
  const { search } = useLocation()
  return useMemo(() => new URLSearchParams(search), [search])
}

function downloadCsv(plates) {
  const header = "timestamp,plate,location,cameraId,thumbnailUrl"
  const lines = plates.map((p) =>
    [p.timestamp, p.plate, p.location, p.cameraId, p.thumbnailUrl]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(",")
  )
  const csv  = [header, ...lines].join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement("a")
  a.href = url
  a.download = `plates-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function VerkadaPlates() {
  const q     = useQuery()
  const token = q.get("token") || ""

  const [plates,  setPlates]  = useState([])
  const [err,     setErr]     = useState("")
  const [loading, setLoading] = useState(false)
  const [search,  setSearch]  = useState("")

  function loadPlates() {
    if (!token) { setErr("Missing token. Add ?token=YOURTOKEN"); return }
    setLoading(true)
    setErr("")
    fetch(`/api/verkada-plates?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((j) => {
        if (!j.ok) throw new Error(j.error || "Request failed")
        setPlates(j.plates || [])
      })
      .catch((e) => setErr(e.message || "Error"))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadPlates() }, [token])

  const filtered = plates.filter((p) =>
    p.plate?.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.toLowerCase().includes(search.toLowerCase())
  )

  const uniquePlates = new Set(plates.map((p) => p.plate)).size

  return (
    <main className="container mx-auto px-4 py-10 max-w-6xl">
      <Helmet>
        <title>Verkada Plate Log — Admin</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Vehicle Plate Log</h1>
          <p className="mt-1 text-sm text-slate-600">
            Live LPR reads from Verkada cameras.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadPlates}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold"
          >
            Refresh
          </button>
          <button
            onClick={() => downloadCsv(filtered)}
            disabled={!plates.length}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-6 text-sm">
          <span>Total reads: <b>{plates.length}</b></span>
          <span>Unique plates: <b>{uniquePlates}</b></span>
          <span>Showing: <b>{filtered.length}</b></span>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by plate or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 w-full rounded-xl border px-4 py-2 text-sm"
      />

      {loading && <div className="mt-6 text-sm">Loading...</div>}
      {err && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {err}
        </div>
      )}

      {!loading && plates.length > 0 && (
        <div className="mt-6 rounded-2xl border bg-white shadow-sm overflow-hidden">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-900 text-white text-left">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Plate</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Snapshot</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={i} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(p.timestamp).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-blue-700">
                      {p.plate}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {p.location}
                    </td>
                    <td className="px-4 py-3">
                      <a href={p.thumbnailUrl} target="_blank" rel="noreferrer">
                        <img
                          src={p.thumbnailUrl}
                          alt={p.plate}
                          className="h-14 rounded-lg object-cover"
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  )
}
