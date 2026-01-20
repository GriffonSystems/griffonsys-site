// src/routes/VendorVerkada.jsx
import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { Helmet } from "react-helmet"

function VerkadaLogo({ className = "h-10 w-auto object-contain" }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}vendors/verkada/logo.jpg`}
      alt="Verkada"
      className={className}
      width={160}
      height={40}
    />
  )
}

const TABS = [
  { key: "video", label: "Video" },
  { key: "access", label: "Access" },
  { key: "intercom", label: "Intercom" },
  { key: "connectivity", label: "Connectivity" },
]

export default function VendorVerkada() {
  const [active, setActive] = React.useState("video")
  const [showVideo, setShowVideo] = React.useState(false)
  const [selected, setSelected] = useState(null)
  const [status, setStatus] = useState("idle")
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
  })

  const location = useLocation()

  React.useEffect(() => {
    const fromHash = (location.hash || "").replace("#", "")
    const wanted = (fromHash || "").toLowerCase()
    if (wanted && ["video", "access", "intercom", "connectivity"].includes(wanted)) {
      setActive(wanted)
      window.scrollTo({ top: 0, behavior: "auto" })
    }
  }, [location.hash])

  const onTabClick = (key) => {
    setActive(key)
    window.history.replaceState(null, "", `#${key}`)
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  const grid = "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"

  const videoProducts = [
    { key: "dome", title: "Dome", desc: "Reliable performance for most environments.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/dome.png` },
    { key: "mini", title: "Mini", desc: "Compact form factor for tight spaces.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/mini.png` },
    { key: "bullet", title: "Bullet", desc: "Optimized for license plate recognition and detail.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/bullet.png` },
    { key: "fisheye", title: "Fisheye", desc: "180° panoramic coverage for large spaces.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/fisheye.png` },
    { key: "multisensor", title: "Multisensor", desc: "Two or four sensors in one housing.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/multisensor.png` },
    { key: "ptz", title: "PTZ", desc: "Pan-tilt-zoom for flexible, wide-area coverage.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/ptz.png` },
    { key: "remote", title: "Remote", desc: "Battery + LTE for mobile deployments.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/remote.png` },
    { key: "dualhead", title: "Dual-Head (CY53-E)", desc: "Two 5MP sensors in one housing.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/dualhead.jpeg` },
    { key: "viewstation", title: "Viewing Station", desc: "Appliance for live camera walls.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/viewstation.jpeg` },
  ]

  const accessProducts = [
    { key: "singledoor", title: "Single Door Controller", desc: "Cloud-managed control for one opening.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/singledoor.png` },
    { key: "4doorcontroller", title: "4-Door Controller", desc: "Controls up to four doors.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/4doorcontroller.png` },
    { key: "mullion", title: "Mullion Reader", desc: "Supports NFC/BLE/mobile credentials.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/singledoorreader.png` },
    { key: "keypad", title: "Keypad Reader", desc: "PIN + card/mobile access.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/keypad.png` },
  ]

  const intercomProducts = [
    {
      key: "TS12",
      title: "TS12 — Audio Intercom",
      desc: "Audio-only intercom for gates & entries.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/TS12.webp`,
    },
    {
      key: "TD33",
      title: "TD33 — Slim Intercom",
      desc: "Mullion-friendly cloud intercom.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td33.webp`,
    },
    {
      key: "TD53",
      title: "TD53 — Video Intercom",
      desc: "High-quality video + audio.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td53.webp`,
    },
    {
      key: "TD63",
      title: "TD63 — Video + Keypad",
      desc: "PIN, directory, and video calling.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td63.webp`,
    },
  ]

  const connectivityProducts = [
    {
      key: "gc31e",
      title: "GC31-E Outdoor Cellular Gateway",
      desc: "LTE backhaul + PoE output.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/connectivity/gc31.webp`,
      video: "https://www.youtube.com/embed/fb9LNytX7ac?autoplay=1",
    },
  ]

  const handleCardClick = (card) => {
    if (card.video) {
      setShowVideo(card.video)
      return
    }
    setSelected(card.title)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")

    try {
      await axios.post("/api/contact", {
        name: form.name,
        email: form.email,
        company: form.company,
        phone: "",
        message: `Request for more information about: ${selected}`,
      })

      setStatus("ok")
      setTimeout(() => {
        setSelected(null)
        setStatus("idle")
        setForm({ name: "", email: "", company: "" })
      }, 2000)
    } catch {
      setStatus("error")
    }
  }

  const renderGrid = (list) => (
    <div className={grid}>
      {list.map((card) => (
        <div
          key={card.key}
          onClick={() => handleCardClick(card)}
          className="card p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer hover:scale-[1.01]"
        >
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: "Optima, sans-serif" }}>
            {card.title}
          </h3>
          <p className="text-gray-700 text-sm">{card.desc}</p>
        </div>
      ))}
    </div>
  )

  return (
    <main className="container py-12">
      <Helmet>
        <title>Verkada Security Systems in Illinois | Griffon Systems</title>

        {/* ✅ CANONICAL (THIS IS THE FIX) */}
        <link
          rel="canonical"
          href="https://www.griffonsys.com/vendors/verkada"
        />

        <meta
          name="description"
          content="Authorized Verkada integrator in Illinois delivering cloud video, access control, intercom, cellular connectivity, and remote security monitoring."
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Verkada Cloud Security",
              brand: "Verkada",
              category: "Cloud Surveillance",
              provider: {
                "@type": "LocalBusiness",
                name: "Griffon Systems, Inc.",
                telephone: "630-607-0346",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "650 West Grand Ave #206",
                  addressLocality: "Elmhurst",
                  addressRegion: "IL",
                  postalCode: "60126",
                  addressCountry: "US",
                },
              },
              areaServed: "Illinois",
            }),
          }}
        />
      </Helmet>

      <h1 className="sr-only">Verkada Security Systems</h1>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative bg-black rounded-2xl w-[90%] max-w-4xl aspect-video overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={showVideo}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              title="Verkada Video"
            />
            <button
              className="absolute top-3 right-3 text-white bg-white/20 hover:bg-white/40 rounded-full p-2"
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* REQUEST INFO MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl"
              aria-label="Close request form"
            >
              &times;
            </button>

            {status !== "ok" ? (
              <>
                <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Optima, sans-serif" }}>
                  Request Info — {selected}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your Name"
                    required
                    className="w-full border rounded p-2"
                  />
                  <input
                    name="company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company"
                    className="w-full border rounded p-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Email"
                    required
                    className="w-full border rounded p-2"
                  />

                  <div className="flex items-center gap-2">
                    <input id="consent" type="checkbox" required className="h-4 w-4" />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      I agree to be contacted about this request.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                  >
                    {status === "loading" ? "Sending..." : "Send"}
                  </button>

                  {status === "error" && (
                    <p className="text-red-600 text-sm mt-2">Something went wrong. Try again.</p>
                  )}
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                <p>We'll send more information about {selected} shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <VerkadaLogo />
        </div>

        <Link to="/contact" className="btn btn-primary">
          Request a Demo
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => onTabClick(t.key)}
            className={`px-4 py-2 rounded-xl border transition ${
              active === t.key
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-gray-100 border-gray-300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === "video" && renderGrid(videoProducts)}
      {active === "access" && renderGrid(accessProducts)}
      {active === "intercom" && renderGrid(intercomProducts)}
      {active === "connectivity" && renderGrid(connectivityProducts)}
    </main>
  )
}
