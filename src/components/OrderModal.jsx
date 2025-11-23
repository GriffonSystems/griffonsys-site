import React, { useState } from "react"
import axios from "axios"

export default function OrderModal({ open, onClose }) {
  const [state, setState] = useState({
    name: "",
    company: "",
    email: "",
    orderDetails: "",
  })

  const [status, setStatus] = useState("idle")

  if (!open) return null

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")

    try {
      await axios.post("/api/contact", {
        name: state.name,
        email: state.email,
        company: state.company,
        message: `DIRECT CAMERA ORDER REQUEST:\n\n${state.orderDetails}`,
      })

      setStatus("ok")

      // reset after short pause
      setTimeout(() => {
        setStatus("idle")
        onClose()
        setState({
          name: "",
          company: "",
          email: "",
          orderDetails: "",
        })
      }, 2000)
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl leading-none"
        >
          ×
        </button>

        {status !== "ok" ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Direct Camera Order
            </h2>

            <p className="text-gray-600 mb-4">
              No sales calls — just tell us what you want to order and we’ll send
              a secure invoice.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={state.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border border-gray-300 rounded p-2"
              />

              <input
                name="company"
                value={state.company}
                onChange={handleChange}
                placeholder="Company (optional)"
                className="w-full border border-gray-300 rounded p-2"
              />

              <input
                type="email"
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full border border-gray-300 rounded p-2"
              />

              <textarea
                name="orderDetails"
                value={state.orderDetails}
                onChange={handleChange}
                placeholder="Camera models & quantities (e.g., 4 × Verkada CD42-E, 2 × CR63-E, etc.)"
                rows="5"
                required
                className="w-full border border-gray-300 rounded p-2"
              />

              <div className="flex items-center gap-2">
                <input
                  id="consent"
                  type="checkbox"
                  required
                  className="h-4 w-4"
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  I agree to be contacted regarding this order.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Submit Order"}
              </button>

              {status === "error" && (
                <p className="text-red-600 text-sm mt-2">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
            <p>Your order request has been received.</p>
          </div>
        )}
      </div>
    </div>
  )
}
