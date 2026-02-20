// src/routes/LocationSEO.jsx
import React from "react"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { LOCATION_PAGES } from "../data/locationPages"

const NEIGHBORHOODS = new Set([
  "Lincoln Park", "Lakeview", "Wicker Park", "Bucktown", "Logan Square",
  "River North", "Gold Coast", "South Loop", "West Loop", "Hyde Park",
  "Bridgeport", "Chinatown", "Pilsen", "Albany Park", "Edison Park",
  "Jefferson Park", "Irving Park", "Portage Park", "Avondale", "Edgewater",
  "Rogers Park",
])

export default function LocationSEO() {
  const { city, service } = useParams()

  const cityData = LOCATION_PAGES?.[city]
  const serviceData = cityData?.services?.[service]

  if (!cityData || !serviceData) {
    return (
      <main className="container py-20">
        <Helmet>
          <title>Page Not Found | Griffon Systems</title>
          <meta name="robots" content="noindex,follow" />
        </Helmet>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          This location or service does not exist in our directory.
        </p>
        <Link to="/serviceareas" className="text-blue-600 underline">
          View all service areas →
        </Link>
      </main>
    )
  }

  const isNeighborhood = NEIGHBORHOODS.has(cityData.city)
  const cityLabel = isNeighborhood ? cityData.city : `${cityData.city}, IL`
  const title = (serviceData.title || "").replace(/,\s*IL\s*$/i, "")
  const description = `${title}. Griffon Systems delivers professional security cameras, access control, cloud video, wireless backhaul and fully managed security integration across ${cityLabel}.`
  const pageUrl = `https://griffonsys.com/locations/${city}/${service}`
  const ogImage = "https://griffonsys.com/images/og/griffon-building.jpg"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    areaServed: {
      "@type": "Place",
      name: cityLabel,
      address: isNeighborhood
        ? { "@type": "PostalAddress", addressLocality: "Chicago", addressRegion: "IL", addressCountry: "US" }
        : { "@type": "PostalAddress", addressLocality: cityData.city, addressRegion: "IL", addressCountry: "US" },
    },
    provider: {
      "@type": "LocalBusiness",
      name: "Griffon Systems, Inc.",
      url: "https://griffonsys.com/",
      telephone: "+16306070346",
      address: {
        "@type": "PostalAddress",
        streetAddress: "650 West Grand Ave #206",
        addressLocality: "Elmhurst",
        addressRegion: "IL",
        postalCode: "60126",
        addressCountry: "US",
      },
    },
    url: pageUrl,
  }

  return (
    <main className="container py-16">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:image" content={ogImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-6">{title}</h1>

      <p className="text-lg text-gray-700 max-w-3xl mb-10 leading-relaxed">
        Griffon Systems provides professional security camera installation, access control, cloud
        video, wireless backhaul, server integration and fully managed security solutions for
        organizations throughout {cityLabel}.
        <br /><br />
        We specialize in:
        <br />• Avigilon (Motorola Solutions)
        <br />• Verkada Cloud
        <br />• Openpath / Avigilon Alta Access
        <br />• Siklu Wireless Backhaul
        <br />• Ubiquiti UniFi Networks
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-2xl mb-14">
        <h2 className="text-2xl font-semibold mb-4">
          Ready to Secure Your {cityData.city} Facility?
        </h2>
        <p className="text-gray-700 mb-6">
          Talk with a local Chicagoland security expert. We design, deploy and support all systems
          in-house — no subcontractors.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Request Consultation
          </Link>
          <Link
            to="/service"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            Start a Service Ticket
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Related Services in {cityLabel}</h2>
        <ul className="space-y-2">
          {Object.entries(cityData.services).map(([key, info]) => {
            if (key === service) return null
            return (
              <li key={key}>
                <Link
                  to={`/locations/${city}/${key}`}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {(info.title || "").replace(/,\s*IL\s*$/i, "")}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </main>
  )
}
