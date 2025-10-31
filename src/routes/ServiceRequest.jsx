import React, { useState } from "react"
import { Helmet } from "react-helmet"

export default function ServiceRequest() {
  const [formData, setFormData] = useState({
    company: "",
    contact: "",
    phone: "",
    email: "",
    issue: "",
    urgent: false,
    photo: null,
  })
  const [status, setStatus] = useState("idle")

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === "checkbox") setFormData({ ...formData, [name]: checked })
    else if (type === "file") setFormData({ ...formData, photo: files[0] })
    else setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")

    const body = new FormData()
    Object.entries(formData).forEach(([k, v]) => body.append(k, v))

    try {
      // 🔧 Replace `/api/contact` with your actual service/Twilio endpoint
      const res = await fetch("/api/service", { method: "POST", body })
      if (!res.ok) throw new Error("Request failed")

      setStatus("success")
      setFormData({
        company: "",
        contact: "",
        phone: "",
        email: "",
        issue: "",
        urgent: false,
        photo: null,
      })
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <main className="container py-12 max-w-2xl">
      <Helmet>
        <title>Maintenance Ticket | Griffon Systems</title>
        <meta
          name="description"
          content="Submit a maintenance or repair request for your Griffon Systems installation."
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-2">Maintenance & Repair Request</h1>
      <p className="text-gray-700 mb-8">
        Use this form to request service or report an issue with your Griffon
        Systems installation. Our team will respond within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="input w-full"
            placeholder="e.g. Elmhurst Manufacturing Co."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Name</label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="input w-full"
            placeholder="Your name"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              className="input w-full"
              placeholder="630-607-0346"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="input w-full"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Describe the issue
          </label>
          <textarea
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            rows={4}
            required
            className="input w-full"
            placeholder="Describe the camera, intercom, or access issue..."
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="urgent"
              checked={formData.urgent}
              onChange={handleChange}
              className="h-4 w-4 accent-black"
            />
            <span className="text-sm text-gray-700">
              Mark as <strong>Urgent</strong>
            </span>
          </label>

          <div>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="text-sm text-gray-600"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className={`btn btn-primary w-full ${
            status === "loading" ? "opacity-70 cursor-wait" : ""
          }`}
        >
          {status === "loading" ? "Submitting..." : "Submit Request"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-center mt-3">
            ✅ Ticket submitted! We’ll be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center mt-3">
            ❌ There was a problem sending your request. Please call 630-607-0346.
          </p>
        )}
      </form>
    </main>
  )
}
