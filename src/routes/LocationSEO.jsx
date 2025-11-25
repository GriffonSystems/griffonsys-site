// src/routes/LocationSEO.jsx
import React from "react"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { LOCATION_PAGES } from "../data/locationPages.js"

export default function LocationSEO() {
  const { city, service } = useParams()

  const cityData = LOCATION_PAGES[city]
  const serviceData = cityData?.services?.[service]

  if (!cityData || !serviceData) {
    return (
      <div className="container py-20">
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-gray-600 mt-4">
          This location or service does not exist.
        </p>
      </div>
    )
  }

  // Detect Chicago neighborhood formatting
  const isNeighborhood =
    [
      "Lincoln Park", "Lakeview", "Wicker Park", "Bucktown", "Logan Square",
      "River North", "Gold Coast", "South Loop", "West Loop", "Hyde Park",
      "Bridgeport", "Chinatown", "Pilsen", "Albany Park", "Edison Park",
      "Jefferson Park", "Irving Park", "Portage Park", "Avondale",
      "Edgewater", "Rogers Park",
    ].includes(cityData.city)

  const fullCity = isNeighborhood
    ? `${cityData.city}, Chicago`
    : `${cityData.city}, IL`

  const title = `${serviceData.title.replace(cityData.city + ", IL", fullCity)}`

  const description = `${title} — Griffon Systems provides enterprise-grade security cameras, access control, wireless backhaul, and managed security integration throughout ${fullCity}.`

  return (
    <main className="container py-12">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Griffon Systems, Inc.",
              "url": "https://www.griffonsys.com/",
              "telephone": "630-607-0346",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "650 West Grand Ave #206",
                "addressLocality": "Elmhurst",
                "addressRegion": "IL",
                "postalCode": "60126",
                "addressCountry": "US",
              },
              "areaServed": fullCity,
              "serviceType": serviceData.title,
            }),
          }}
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-6">{title}</h1>

      <p className="text-lg text-gray-700 max-w-3xl leading-relaxed mb-12">
        Griffon Systems provides video surveillance, access control, wireless
        networks, and managed security integration services in {fullCity}.
        <br /><br />
        We deploy Avigilon, Verkada, Openpath/Alta, Siklu wireless backhaul, and
        UniFi networks for commercial, municipal, industrial, and educational facilities.
      </p>

      {/* CTA */}
      <div className="bg-gray-100 p-8 rounded-xl shadow-sm max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Request a Quote</h2>
        <p className="text-gray-700 mb-6">
          Speak with a senior security advisor today.
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Contact Us
        </a>
      </div>
    </main>
  )
}
