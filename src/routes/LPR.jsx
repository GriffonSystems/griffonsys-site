// src/routes/LPR.jsx
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import axios from "axios"

export default function LPR() {
  const [showForm, setShowForm] = useState(false)
  const [status, setStatus] = useState("idle")
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
  })

  // Match Canonical.jsx non-www convention
  const pageUrl = "https://griffonsys.com/lpr"
  const ogImage = "https://griffonsys.com/images/lpr/lpr-hero.jpg"

  const title = "License Plate Recognition (LPR) | NCIC / Hotlist Alerts | Griffon Systems"
  const description =
    "Illinois LPR systems with hotlist alerts for law enforcement, municipalities, and campuses. Verkada and Avigilon LPR cameras for traffic monitoring, investigations, and perimeter security."

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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
        message: "Request for LPR Demo Unit",
      })

      setStatus("ok")
      setTimeout(() => {
        setStatus("idle")
        setShowForm(false)
        setForm({ name: "", email: "", company: "" })
      }, 2000)
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <main className="container py-12">
      {/* ---- SEO ---- */}
      <Helmet>
        <title>{title}</title>

        {/* IMPORTANT:
            Do NOT set a page-level canonical here.
            Global Canonical.jsx is the single source of truth (non-www).
        */}
        <meta key="description" name="description" content={description} />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="License Plate Recognition (LPR) | Griffon Systems" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="License Plate Recognition (LPR) | Griffon Systems" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:url" content={pageUrl} />

        {/* JSON-LD (Service/WebPage instead of Product) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://griffonsys.com/#lpr",
              url: pageUrl,
              name: "License Plate Recognition (LPR)",
              description:
                "LPR systems for Illinois law enforcement and municipalities including hotlist alerts, traffic monitoring, investigations, and perimeter security.",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: ogImage,
              },
              about: {
                "@type": "Service",
                name: "License Plate Recognition (LPR) Systems",
                areaServed: "Illinois",
                provider: {
                  "@type": "LocalBusiness",
                  name: "Griffon Systems, Inc.",
                  telephone: "+16306070346",
                  url: "https://griffonsys.com/",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "650 West Grand Ave, Suite 206",
                    addressLocality: "Elmhurst",
                    addressRegion: "IL",
                    postalCode: "60126",
                    addressCountry: "US",
                  },
                },
              },
            }),
          }}
        />
      </Helmet>

      {/* ---- HERO ---- */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-3xl shadow-lg h-[40vh] md:h-[55vh]">
          <img
            src="/hero/hero-01.jpg"
            alt="License plate recognition camera with hotlist alerts in Illinois"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Optima" }}>
              License Plate Recognition for Illinois Law Enforcement
            </h1>

            <p className="text-lg md:text-xl opacity-90" style={{ fontFamily: "Optima" }}>
              Real-time hotlist alerts and fast search for investigations, traffic monitoring, and perimeter security
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow w-fit"
            >
              Request LPR Demo Unit
            </button>
          </div>
        </div>
      </section>

      {/* ---- FEATURES ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: "Optima" }}>
          Real-Time Alerts for Public Safety Teams
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Hotlist Alerts",
              icon: "🚨",
              text: "Instant hits on vehicles of interest based on agency-defined lists and criteria.",
            },
            {
              title: "Forensic Search",
              icon: "🔎",
              text: "Search by plate, partial plate, time window, direction, or location to accelerate investigations.",
            },
            {
              title: "Case-Ready Evidence",
              icon: "🗂️",
              text: "Exportable events and video clips for reports, prosecution support, and incident review.",
            },
          ].map(({ title, icon, text }) => (
            <div key={title} className="bg-gray-100 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Optima" }}>
                {icon} {title}
              </h3>
              <p className="text-gray-700">{text}</p>
            </div>
          ))}
        </div>

        {/* Extra SEO paragraph (helps avoid thin content) */}
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mt-8">
          Griffon Systems designs LPR deployments for Illinois municipalities, police departments, school districts,
          and critical facilities. Typical placements include arterial corridors, entry/exit points, public lots,
          DPW yards, water plants, and campus perimeters—often paired with wireless backhaul for hard-to-reach sites.
        </p>
      </section>

      {/* ---- MOBILE / POLE DEPLOYMENTS ---- */}
      <section className="mb-20 grid md:grid-cols-2 gap-10">
        <img
          src="/images/lpr/lpr-hero.jpg"
          alt="LPR pole mount deployment"
          className="rounded-3xl shadow-lg w-full object-cover"
          loading="lazy"
        />

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "Optima" }}>
            Deploy Anywhere — Poles, Trailers, Lots, Perimeters
          </h2>

          <p className="text-gray-700 text-lg">
            Build temporary or permanent LPR deployments with flexible mounting and reliable connectivity options.
          </p>

          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700">
            <li>Beam-strap pole mounting</li>
            <li>Solar or AC powered</li>
            <li>LTE, fiber, or wireless backhaul</li>
            <li>Rapid deployment for pilots and events</li>
          </ul>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="text-center mb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "Optima" }}>
          Want to Test an LPR Unit at Your Department?
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Schedule a demo or request a short-term pilot program.
        </p>

        <button
          onClick={() => setShowForm(true)}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg shadow-md"
        >
          Request LPR Demo
        </button>
      </section>

      {/* ---- RELATED INTERNAL LINKS (SEO BENEFIT) ---- */}
      <section className="text-center mt-8 mb-16">
        <p className="text-gray-600 text-sm">
          Looking for more solutions?&nbsp;
          <Link className="text-blue-600 underline" to="/municipal">
            Municipal Deployments
          </Link>
          &nbsp; | &nbsp;
          <Link className="text-blue-600 underline" to="/manufacturing">
            Manufacturing
          </Link>
        </p>
      </section>

      {/* ---- MODAL FORM ---- */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl leading-none"
              aria-label="Close form"
            >
              &times;
            </button>

            {status !== "ok" ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">Request LPR Demo</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full border border-gray-300 rounded p-2"
                  />

                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Department / Company"
                    className="w-full border border-gray-300 rounded p-2"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full border border-gray-300 rounded p-2"
                  />

                  <div className="flex items-center gap-2">
                    <input id="consent" type="checkbox" required className="h-4 w-4" />
                    <label htmlFor="consent" className="text-sm text-gray-600">
                      I agree to be contacted about this request.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Send Request"}
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
                <p>Your demo request has been received.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
