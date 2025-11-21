import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function LPR() {
  return (
    <main className="container py-12">

      {/* ---- SEO ---- */}
      <Helmet>
        <title>License Plate Recognition (LPR) Solutions | NCIC Alerts | Griffon Systems</title>
        <meta 
          name="description" 
          content="Illinois LPR systems with NCIC, SOS and Hotlist alerts. Cloud-managed Verkada CR series and Avigilon LPR cameras for police, municipal, and campus traffic monitoring." 
        />

        <link 
          rel="canonical" 
          href="https://www.griffonsys.com/lpr" 
        />

        {/* ---- OpenGraph ---- */}
        <meta property="og:title" content="License Plate Recognition (LPR) | NCIC & Hotlist Alerts | Griffon Systems" />
        <meta 
          property="og:description" 
          content="Modern LPR solutions for Illinois police and municipal agencies — NCIC, SOS, Hotlist alerts, real-time detections, and mobile deployments." 
        />
        <meta 
          property="og:image" 
          content="https://www.griffonsys.com/images/lpr/lpr-hero.jpg" 
        />
        <meta property="og:type" content="website" />

        {/* ---- Twitter ---- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta 
          name="twitter:description" 
          content="LPR solutions with NCIC, SOS, and Hotlist alerts for law enforcement and municipalities." 
        />

        {/* ---- JSON-LD ---- */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "License Plate Recognition (LPR)",
              "description": "LPR cameras with NCIC, SOS, and Hotlist alerting for Illinois police, municipal agencies, and campuses.",
              "image": "https://www.griffonsys.com/images/lpr/lpr-hero.jpg",
              "brand": { "@type": "Brand", "name": "Griffon Systems" },
              "url": "https://www.griffonsys.com/lpr",
              "provider": {
                "@type": "LocalBusiness",
                "name": "Griffon Systems, Inc.",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "650 W Grand Ave #206",
                  "addressLocality": "Elmhurst",
                  "addressRegion": "IL",
                  "postalCode": "60126",
                  "addressCountry": "US"
                },
                "telephone": "+16306070346"
              }
            }
          `}
        </script>
      </Helmet>

      {/* ---- HERO ---- */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-3xl shadow-lg h-[40vh] md:h-[55vh]">
          <img
            src="/images/lpr/lpr-hero.jpg"
            alt="LPR Camera — Illinois NCIC & Hotlist Alerts"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Optima" }}>
              License Plate Recognition for Illinois Agencies
            </h1>

            <p className="text-lg md:text-xl opacity-90" style={{ fontFamily: "Optima" }}>
              Real-time NCIC, SOS, and Hotlist alerts powered by Verkada CR series 
              and Avigilon LPR analytics — deployable anywhere.
            </p>

            <Link 
              to="/contact?subject=LPR%20Demo%20Request"
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow w-fit"
            >
              Request LPR Demo Unit
            </Link>
          </div>
        </div>
      </section>

      {/* ---- FEATURES ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: "Optima" }}>
          Real-Time Law Enforcement Alerts
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "NCIC Alerts", icon: "🔔", text: "Instant hits on stolen vehicles and persons of interest." },
            { title: "SOS Alerts", icon: "🛡️", text: "Detect vehicles associated with BOLOs or active investigations." },
            { title: "Hotlist Alerts", icon: "🚨", text: "Fully configurable hotlists for local, county, or regional use." }
          ].map(({ title, icon, text }) => (
            <div key={title} className="bg-gray-100 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Optima" }}>
                {icon} {title}
              </h3>
              <p className="text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- MOBILE / POLE DEPLOYMENTS ---- */}
      <section className="mb-20 grid md:grid-cols-2 gap-10">
        <img
          src="/images/lpr/lpr-pole.jpg"
          alt="LPR Pole Mount with Beam Straps"
          className="rounded-3xl shadow-lg w-full object-cover"
        />

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4" style={{ fontFamily: "Optima" }}>
            Deploy Anywhere — Poles, Trailers, Lots, Perimeters
          </h2>

          <p className="text-gray-700 text-lg">
            The Verkada CR series remote camera supports LTE, solar power, 
            and flexible mounting for temporary or permanent LPR deployments.
          </p>

          <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-700">
            <li>Beam-strap pole mounting</li>
            <li>Solar or AC powered</li>
            <li>LTE or WiFi backhaul</li>
            <li>Rapid 15-minute deployment</li>
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

        <Link
          to="/contact?subject=LPR%20Demo%20Request"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg shadow-md"
        >
          Request LPR Demo
        </Link>
      </section>

    </main>
  )
}
