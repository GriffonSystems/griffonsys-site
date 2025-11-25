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

  const title = serviceData.title
  const description = `${title} — Griffon Systems is the leading security integrator serving ${cityData.city}, IL and the surrounding Chicagoland area.`

  return (
    <main className="container py-12">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

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
              "areaServed": cityData.city,
              "serviceType": title,
            }),
          }}
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-6">
        {title}
      </h1>

      <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
        Griffon Systems provides professional security camera installation,
        access control, wireless deployment and fully managed security
        integration services throughout {cityData.city}, IL.  
        <br /><br />
        We specialize in Avigilon, Verkada, Openpath/Alta, Siklu wireless backhaul,
        and UniFi networking for commercial, municipal, and educational clients.
      </p>
    </main>
  )
}
