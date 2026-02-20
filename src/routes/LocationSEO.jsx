// src/routes/VendorLocationSEO.jsx
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

const VENDOR_CONFIG = {
  "verkada-installer": {
    vendor: "Verkada",
    badge: "Authorized Verkada Partner",
    tagline: "Cloud-Managed Security for Modern Organizations",
    description: (cityLabel) =>
      `Griffon Systems is an authorized Verkada installer serving ${cityLabel}. We design, deploy, and support Verkada's cloud-managed security platform — including cameras, access control, intercoms, and environmental sensors — for manufacturers, municipalities, schools, and commercial facilities across Chicagoland.`,
    whyUs: [
      "Authorized Verkada partner since 2024",
      "Local Chicagoland team — no subcontractors",
      "Full deployment: design, installation, training & ongoing support",
      "Specialists in multi-site and enterprise Verkada rollouts",
      "20+ years of security integration experience",
    ],
    vendorFeatures: [
      { title: "Cloud-Based Management", desc: "Manage all cameras and access points from anywhere with Verkada Command." },
      { title: "Plug-and-Play Deployment", desc: "Minimal onsite infrastructure — no NVR servers required." },
      { title: "Unified Platform", desc: "Video, access control, intercoms, alarms and sensors in one system." },
      { title: "Predictable Licensing", desc: "Simple per-device licensing with no surprise upgrade costs." },
      { title: "Remote Health Monitoring", desc: "Griffon monitors your system proactively to catch issues before they impact you." },
    ],
    relatedLink: "/brands/verkada",
    relatedLinkText: "Explore Verkada Products →",
    compareLink: "/resources/verkada-vs-avigilon",
    compareLinkText: "Verkada vs Avigilon — Which is right for you?",
    ctaHeading: (city) => `Get a Verkada Quote for Your ${city} Facility`,
    ctaBody: "Talk with a certified Verkada specialist. We'll assess your site, design the right system, and handle everything from installation to training.",
  },
  "avigilon-dealer": {
    vendor: "Avigilon",
    badge: "Authorized Avigilon Dealer — 15+ Year Partner",
    tagline: "On-Premises HD Video & Access Control by Motorola Solutions",
    description: (cityLabel) =>
      `Griffon Systems is an authorized Avigilon dealer serving ${cityLabel} with 15+ years of Avigilon installation experience. We specialize in Avigilon's on-premises HD video surveillance and access control systems for manufacturers, municipalities, schools, and commercial facilities that require local storage, air-gapped networks, or regulatory compliance.`,
    whyUs: [
      "Authorized Avigilon dealer for 15+ years",
      "Deep expertise in Avigilon ACC, H5A, and H6SL camera lines",
      "Specialists in on-prem, air-gapped, and compliance-driven environments",
      "Local Chicagoland team — no subcontractors",
      "Full lifecycle support: design, installation, training & service",
    ],
    vendorFeatures: [
      { title: "On-Premises Storage", desc: "Full local control of footage — ideal for regulatory, evidentiary, or IT security requirements." },
      { title: "AI-Powered Analytics", desc: "Avigilon Appearance Search and unusual motion detection built into the platform." },
      { title: "High-Resolution Imaging", desc: "H5A and H6SL cameras deliver exceptional clarity for license plate and facial identification." },
      { title: "Avigilon Alta Access Control", desc: "Cloud-managed access control that integrates seamlessly with Avigilon video." },
      { title: "Scalable Architecture", desc: "From single-site to multi-building enterprise deployments — Avigilon grows with you." },
    ],
    relatedLink: "/brands/avigilon",
    relatedLinkText: "Explore Avigilon Products →",
    compareLink: "/resources/verkada-vs-avigilon",
    compareLinkText: "Avigilon vs Verkada — Which is right for you?",
    ctaHeading: (city) => `Get an Avigilon Quote for Your ${city} Facility`,
    ctaBody: "Talk with a certified Avigilon specialist with 15+ years of local experience. We'll design the right on-prem system and handle everything from installation to ongoing support.",
  },
}

export default function VendorLocationSEO() {
  const { city, vendor } = useParams()

  const cityData = LOCATION_PAGES?.[city]
  const vendorConfig = VENDOR_CONFIG?.[vendor]

  if (!cityData || !vendorConfig) {
    return (
      <main className="container py-20">
        <Helmet>
          <title>Page Not Found | Griffon Systems</title>
          <meta name="robots" content="noindex,follow" />
        </Helmet>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          This location or vendor page does not exist in our directory.
        </p>
        <Link to="/serviceareas" className="text-blue-600 underline">
          View all service areas →
        </Link>
      </main>
    )
  }

  const isNeighborhood = NEIGHBORHOODS.has(cityData.city)
  const cityLabel = isNeighborhood ? cityData.city : `${cityData.city}, IL`
  const title = `${vendorConfig.vendor} Installer in ${cityLabel} | Griffon Systems`
  const description = vendorConfig.description(cityLabel)
  const pageUrl = `https://griffonsys.com/locations/${city}/${vendor}`
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

      <div className="mb-2">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
          {vendorConfig.badge}
        </span>
      </div>
      <h1 className="text-4xl font-bold mb-2">
        {vendorConfig.vendor} Installer in {cityLabel}
      </h1>
      <p className="text-lg text-gray-500 mb-8">{vendorConfig.tagline}</p>

      <p className="text-lg text-gray-700 max-w-3xl mb-10 leading-relaxed">
        {description}
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-3xl mb-10">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Griffon Systems?</h2>
        <ul className="space-y-2">
          {vendorConfig.whyUs.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">What {vendorConfig.vendor} Delivers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {vendorConfig.vendorFeatures.map((feature, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-2xl mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {vendorConfig.ctaHeading(cityData.city)}
        </h2>
        <p className="text-gray-700 mb-6">{vendorConfig.ctaBody}</p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Request a Quote
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
        <h2 className="text-xl font-semibold mb-4">More Resources</h2>
        <ul className="space-y-2">
          <li>
            <Link to={vendorConfig.relatedLink} className="text-blue-600 hover:text-blue-800 underline">
              {vendorConfig.relatedLinkText}
            </Link>
          </li>
          <li>
            <Link to={vendorConfig.compareLink} className="text-blue-600 hover:text-blue-800 underline">
              {vendorConfig.compareLinkText}
            </Link>
          </li>
          <li>
            <Link to={`/locations/${city}/security-integrator`} className="text-blue-600 hover:text-blue-800 underline">
              Security Integrator in {cityLabel} →
            </Link>
          </li>
          <li>
            <Link to={`/locations/${city}/access-control-integrator`} className="text-blue-600 hover:text-blue-800 underline">
              Access Control Integrator in {cityLabel} →
            </Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
