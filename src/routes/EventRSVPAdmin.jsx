import React, { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function EventRSVPAdmin() {
  const [params] = useSearchParams()
  const token = params.get("token")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [records, setRecords] = useState([])

  useEffect(() => {
    if (!token) {
      setError("Missing token")
      setLoading(false)
      return
    }

    fetch(`/api/event-rsvp-admin?token=${token}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.ok) throw new Error(d.error || "Failed")
        setRecords(d.records || [])
        setLoading(false)
      })
      .catch((e) => {
        setError(e.message)
        setLoading(false)
      })
  }, [token])

  if (loading) return <div className="container py-12">Loading…</div>
  if (error) return <div className="container py-12 text-red-600">{error}</div>

  const attending = records.filter(r => r.response === "yes")
  const notAttending = records.filter(r => r.response === "no")
  const followUp = records.filter(r => r.response === "followup")

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Event RSVP Admin</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="p-4 rounded bg-green-100">
          <b>Attending</b><br />{attending.length}
        </div>
        <div className="p-4 rounded bg-red-100">
          <b>Can’t Make It</b><br />{notAttending.length}
        </div>
        <div className="p-4 rounded bg-yellow-100">
          <b>Follow-Up</b><br />{followUp.length}
        </div>
      </div>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Agency</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Response</th>
            <th className="p-2 border">Plus-Ones</th>
            <th className="p-2 border">Notes</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.key}>
              <td className="p-2 border">{r.name}</td>
              <td className="p-2 border">{r.company}</td>
              <td className="p-2 border">{r.email}</td>
              <td className="p-2 border">{r.response}</td>
              <td className="p-2 border">{r.plusOnes || 0}</td>
              <td className="p-2 border">{r.notes || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
