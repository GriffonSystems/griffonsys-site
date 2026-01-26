import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { Helmet } from "react-helmet"

function AvigilonLogo({ className = "h-10 w-auto object-contain" }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}vendors/avigilon/logo.jpg`}
      alt="Avigilon"
      className={className}
      width={160}
      height={40}
      loading="lazy"
    />
  )
}

const TABS = [
  { key: "video", label: "Video" },
  { key: "access", label: "Access" },
  { key: "intercom", label: "Intercom" },
  { key: "analytics", label: "Analytics" },
]

export default function BrandAvigilon() {
  const [active, setActive] = useState("video")
  const [selected, setSelected] = useState(null)
  const [status, setStatus] = useState("idle")
  const [form, setForm] = useState({ name: "", email: "", company: "" })

  const location = useLocation()

  // --- SEO (route-unique; canonical handled globally) ---
  const pageUrl = "https://griffonsys.com/brands/avigilon"
  const title =
    "Avigilon Security Systems | ACC Video, Analytics & ACM Access | Griffon Systems"
  const description =
    "Avigilon integrator in Illinois delivering ACC/Unity video surveillance, advanced analytics, and ACM access control for municipalities, schools, and manufacturers."
  const ogImage = "https://griffonsys.com/vendors/avigilon/logo.jpg"

  React.useEffect(() => {
    const fromHash = (location.hash || "").replace("#", "")
    const wanted = (fromHash || "").toLowerCase()
    if (wanted && ["video", "access", "intercom", "analytics"].includes(wanted)) {
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

  // --- Product tiles (edit images/names to match your assets) ---
  const videoProducts = [
    {
      key: "acc",
      title: "Avigilon ACC / Unity",
      desc: "On-prem video management with enterprise scaling and forensic search.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/acc.png`,
    },
    {
      key: "h6sl-bullet",
      title: "H6SL Bullet",
      desc: "AI-assisted bullet camera for perimeter coverage and detail.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/h6sl-bullet.png`,
    },
    {
      key: "h6sl-dome",
      title: "H6SL Dome",
      desc: "Durable dome camera for indoor/outdoor coverage and analytics.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/h6sl-dome.png`,
    },
    {
      key: "multisensor",
      title: "Multisensor",
      desc: "Multi-imager coverage to reduce blind spots in large areas.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/multisensor.png`,
    },
    {
      key: "lpr",
      title: "License Plate Recognition",
      desc: "Purpose-built capture for vehicles and investigative workflows.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/lpr.png`,
    },
    {
      key: "ai-nvr",
      title: "AI NVR / Recording",
      desc: "Local recording designed for performance and retention requirements.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/ainvr.png`,
    },
  ]

  const accessProducts = [
    {
      key: "acm",
      title: "Avigilon ACM",
      desc: "Enterprise access control with flexible integrations and workflows.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/access/acm.png`,
    },
    {
      key: "doors",
      title: "Door Hardware + Readers",
      desc: "Controllers, readers, locks, and door monitoring design & install.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/access/doors.png`,
    },
    {
      key: "integrations",
      title: "Video + Access Integration",
      desc: "Tie doors to cameras for faster response and verification.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/access/integration.png`,
    },
  ]

  const intercomProducts = [
    {
      key: "intercom",
      title: "Intercom Integrations",
      desc: "Integrate intercom + video workflows for entries and gates.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/intercom/intercom.png`,
    },
    {
      key: "gate",
      title: "Gate & Entry Systems",
      desc: "Visitor workflows, directory, and secure entry design.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/intercom/gate.png`,
    },
  ]

  const analyticsProducts = [
    {
      key: "appearance-search",
      title: "Appearance Search",
      desc: "Accelerate investigations with AI-assisted filtering and review.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/analytics/appearance-search.png`,
    },
    {
      key: "uof",
      title: "Unusual Activity Detection",
      desc: "Analytics designed to highlight relevant events and reduce noise.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/analytics/uad.png`,
    },
    {
      key: "rules",
      title: "Rules & Alerts",
      desc: "Event rules and notifications tailored to your operations.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/analytics/alerts.png`,
    },
  ]

  const handleCardClick = (card) => {
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
            loading="lazy"
          />
          <h3
            className="text-xl font-semibold mb-1"
            style={{ fontFamily: "Optima, sans-serif" }}
          >
            {card.title}
          </h3>
          <p className="text-gray-700 text-sm">{card.desc}</p>
        </div>
      ))}
    </div>
  )

  // Structured data: Brand page (not a single product)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": "https://griffonsys.com/#brand-avigilon",
    name: "Avigilon",
    url: pageUrl,
    description,
    sameAs: ["https://www.avigilon.com/"],
  }

  return (
    <main className="container py-12">
      <Helmet>
        <title>{title}</title>

        {/* IMPORTANT:
            Do NOT set a page-level canonical here.
            Global Canonical.jsx should be the single source of truth (non-www).
        */}

        <meta key="description" name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Avigilon Security Systems | Griffon Systems" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Avigilon Security Systems | Griffon Systems" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Helmet>

      <h1 className="sr-only">Avigilon Security Systems</h1>

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
                <h2
                  className="text-2xl font-semibold mb-4"
                  style={{ fontFamily: "Optima, sans-serif" }}
                >
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
                    <p className="text-red-600 text-sm mt-2">
                      Something went wrong. Try again.
                    </p>
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

      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <AvigilonLogo />
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/resources/verkada-vs-avigilon"
            className="px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 transition"
          >
            Compare Verkada vs Avigilon
          </Link>

          <Link to="/contact" className="btn btn-primary">
            Request a Demo
          </Link>
        </div>
      </div>

      {/* WHY AVIGILON (tight version) */}
      <section className="max-w-4xl mb-12">
        <h2
          className="text-2xl font-semibold mb-4"
          style={{ fontFamily: "Optima, sans-serif" }}
        >
          Why Organizations Choose Avigilon
        </h2>

        <p className="text-gray-700 mb-4">
          Avigilon is commonly selected for environments that need enterprise-grade
          video surveillance with strong on-prem or hybrid control, scalable
          architecture, and advanced investigative workflows.
        </p>

        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li>On-prem or hybrid control for evidence retention and IT policies</li>
          <li>Advanced analytics and forensic tools for faster investigations</li>
          <li>Flexible architecture and integrations (including access control)</li>
        </ul>

        <p className="text-sm text-gray-600 mb-4">
          Some organizations prefer cloud-managed simplicity for multi-site operations.{" "}
          <Link
            to="/brands/verkada"
            className="underline font-medium hover:opacity-80"
          >
            Verkada is often selected in those environments
          </Link>
          .
        </p>

        <p className="text-sm text-gray-700">
          Comparing platforms?{" "}
          <Link
            to="/resources/verkada-vs-avigilon"
            className="underline font-medium hover:opacity-80"
          >
            Read our Verkada vs Avigilon buyer guide for Illinois municipalities &
            manufacturers
          </Link>
          .
        </p>
      </section>

      {/* Tabs */}
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
      {active === "analytics" && renderGrid(analyticsProducts)}
    </main>
  )
}
