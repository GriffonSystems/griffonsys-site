// src/routes/LocationSEO.jsx
import React from "react"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { LOCATION_PAGES } from "../data/locationPages.js"
import { Link } from "react-router-dom"

export default function LocationSEO() {
  const { city, service } = useParams()

  const cityData = LOCATION_PAGES[city]
  const serviceData = cityData?.services?.[service]

  if (!cityData || !serviceData) {
    return (
      <div className="container py-20">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-gray-600">
          This service or city does not exist in our directory.
        </p>
      </div>
    )
  }

  const title = serviceData.title
  const description = `${title}. Griffon Systems is the leading commercial security integrator serving ${cityData.city}, IL — specializing in surveillance, access control, wireless backhaul, and enterprise security design.`

  return (
    <main className="container py-16 max-w-5xl">
      {/* --- SEO Tags --- */}
      <Helmet>
        <title>{title} | Griffon Systems</title>
        <meta name="description" content={description} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Griffon Systems, Inc.",
              "url": "https://www.griffonsys.com/",
              "telephone": "630-607-0346",
              "description": description,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "650 West Grand Ave #206",
                "addressLocality": "Elmhurst",
                "addressRegion": "IL",
                "postalCode": "60126",
                "addressCountry": "US"
              },
              "areaServed": cityData.city,
              "serviceType": title,
            }),
          }}
        />
      </Helmet>

      {/* --- TITLE --- */}
      <h1 className="text-4xl font-bold mb-4">{title}</h1>

      {/* --- SUBTEXT --- */}
      <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mb-10">
        Griffon Systems provides professional security camera integration,
        access control, wireless deployment, and fully managed security
        technology solutions throughout <strong>{cityData.city}, IL</strong>.
        <br /><br />
        As a trusted regional partner for Avigilon, Verkada, Openpath/Alta,
        Siklu, and UniFi, we deliver enterprise-grade protection for
        manufacturing, municipal, education, transportation, and commercial
        facilities across the Chicagoland region.
        <br /><br />
        Our team designs, installs, and supports complete physical security
        systems — from cameras and access control to video analytics, cloud
        management, LPR capture, and secure wireless backhaul.
      </p>

      {/* --- CTA SECTION (persistent on page) --- */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-semibold mb-3">
          Request a Security Assessment in {cityData.city}
        </h2>
        <p className="text-gray-700 mb-5">
          Speak with a local engineer for system design, pricing, and deployment
          options.
        </p>

        <Link
          to="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Schedule a Consultation →
        </Link>
      </div>

      {/* --- WHAT WE DO SECTION --- */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <h3 className="text-2xl font-bold mb-3">Core Services</h3>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
            <li>Commercial Security Camera Systems</li>
            <li>Access Control & Door Management</li>
            <li>Wireless Point-to-Point Links (Siklu)</li>
            <li>License Plate Recognition (LPR) Systems</li>
            <li>Cloud & On-Prem Video (Avigilon / Verkada)</li>
            <li>UniFi Networking & Infrastructure</li>
            <li>Security Operations Centers (SOC) Buildouts</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-3">Industries Served</h3>
          <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
            <li>Manufacturing & Logistics</li>
            <li>Municipal & Public Works</li>
            <li>Schools & Higher Education</li>
            <li>Retail & Commercial Properties</li>
            <li>Parks & Recreation</li>
            <li>Corporate Offices</li>
            <li>Hospitality & Healthcare</li>
          </ul>
        </div>
      </div>

      {/* --- FOOTER NOTE --- */}
      <p className="text-gray-600 text-sm mt-8">
        Serving all of Chicagoland — including Cook, DuPage, Lake, Kane, and Will County.
      </p>
    </main>
  )
}
