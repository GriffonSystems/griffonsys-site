// src/routes/ServiceAreas.jsx
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

const cities = [
  "Chicago", "Arlington Heights", "Aurora", "Addison", "Algonquin", "Antioch",
  "Barrington", "Bartlett", "Batavia", "Bensenville", "Bloomingdale",
  "Bolingbrook", "Bridgeview", "Buffalo Grove", "Burr Ridge", "Carol Stream",
  "Carpentersville", "Cary", "Channahon", "Chicago Ridge", "Cicero",
  "Clarendon Hills", "Crystal Lake", "Darien", "Des Plaines", "Downers Grove",
  "East Dundee", "Elgin", "Elk Grove Village", "Elmhurst", "Elmwood Park",
  "Evanston", "Evergreen Park", "Fox Lake", "Fox River Grove", "Frankfort",
  "Geneva", "Glen Ellyn", "Glencoe", "Glendale Heights", "Glenview", "Golf",
  "Grayslake", "Gurnee", "Hainesville", "Hanover Park", "Harwood Heights",
  "Hawthorn Woods", "Highland Park", "Highwood", "Hinsdale",
  "Hoffman Estates", "Huntley", "Inverness", "Itasca", "Joliet", "Kildeer",
  "La Grange", "La Grange Park", "Lake Bluff", "Lake Forest",
  "Lake in the Hills", "Lake Villa", "Lake Zurich", "Lemont", "Libertyville",
  "Lincolnshire", "Lincolnwood", "Lisle", "Lombard", "Long Grove", "McHenry",
  "Medinah", "Melrose Park", "Mokena", "Mundelein", "Mount Prospect",
  "Naperville", "New Lenox", "Niles", "North Aurora", "North Barrington",
  "North Chicago", "Northbrook", "Northfield", "Northlake", "Oak Brook",
  "Oak Lawn", "Oak Park", "Orland Park", "Oswego", "Palatine",
  "Palos Heights", "Palos Hills", "Palos Park", "Park Ridge", "Plainfield",
  "Prospect Heights", "River Forest", "River Grove", "Riverwoods",
  "Riverside", "Rolling Meadows", "Romeoville", "Roselle", "Rosemont",
  "Round Lake", "St. Charles", "Schaumburg", "Schiller Park", "Skokie",
  "South Barrington", "South Elgin", "South Holland", "Streamwood",
  "Sugar Grove", "Tinley Park", "Vernon Hills", "Villa Park", "Warrenville",
  "Wauconda", "Waukegan", "West Chicago", "West Dundee", "Westchester",
  "Western Springs", "Wheaton", "Wheeling", "Willow Springs", "Willowbrook",
  "Wilmette", "Winfield", "Winnetka", "Wood Dale", "Woodridge", "Yorkville",

  // Chicago Neighborhoods
  "Lincoln Park", "Lakeview", "Wicker Park", "Bucktown", "Logan Square",
  "River North", "Gold Coast", "South Loop", "West Loop", "Hyde Park",
  "Bridgeport", "Chinatown", "Pilsen", "Albany Park", "Edison Park",
  "Jefferson Park", "Irving Park", "Portage Park", "Avondale", "Edgewater",
  "Rogers Park",
]

// Safer slugify: normalize apostrophes, dots, multiple spaces, etc.
const slugify = (c) =>
  c
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/\./g, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")

export default function ServiceAreas() {
  // Match Canonical.jsx non-www convention
  const pageUrl = "https://griffonsys.com/serviceareas"
  const ogImage = "https://griffonsys.com/images/og/griffon-building.jpg"

  const title = "Chicagoland Service Areas | Griffon Systems"
  const description =
    "Griffon Systems provides professional security camera, video surveillance, and access control services across Chicago and the surrounding suburbs."

  return (
    <main className="container py-16">
      {/* ---------- SEO ---------- */}
      <Helmet>
        <title>{title}</title>

        {/* IMPORTANT:
            Do NOT set a page-level canonical here.
            Global Canonical.jsx is the single source of truth (non-www).
        */}
        <meta key="description" name="description" content={description} />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Serving Chicago and surrounding suburbs with Avigilon & Verkada video surveillance and access control security systems."
        />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:url" content={pageUrl} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": "https://griffonsys.com/#serviceareas",
              url: pageUrl,
              name: "Chicagoland Service Areas",
              description,
              about: {
                "@type": "Service",
                name: "Security Cameras & Access Control",
                areaServed: ["Chicago", "Chicagoland", "Northern Illinois"],
                provider: {
                  "@type": "LocalBusiness",
                  name: "Griffon Systems, Inc.",
                  telephone: "+16306070346",
                  url: "https://griffonsys.com/",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Elmhurst",
                    addressRegion: "IL",
                    addressCountry: "US",
                  },
                },
              },
            }),
          }}
        />
      </Helmet>

      {/* ---------- Heading ---------- */}
      <h1 className="text-4xl font-bold mb-6">Chicagoland Service Areas</h1>
      <p className="text-gray-700 text-lg mb-10 max-w-3xl">
        Griffon Systems provides Avigilon & Verkada video surveillance, security camera installation,
        access control, wireless connectivity, and security system support services across Chicago
        and every surrounding suburb listed below.
      </p>

      {/* ---------- Cities Grid ---------- */}
      <ul className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 text-lg">
        {[...cities].sort().map((city) => (
          <li key={city}>
            <Link
              to={`/locations/${slugify(city)}/security-system-supplier`}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {city}
            </Link>
          </li>
        ))}
      </ul>

      {/* ---------- CTA ---------- */}
      <section className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-4">Not sure if we cover your city?</h2>
        <p className="text-gray-600 mb-6">We serve all of Northern Illinois — just ask.</p>
        <Link
          to="/contact?subject=Service%20Area%20Question"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg shadow"
        >
          Contact Us
        </Link>
      </section>
    </main>
  )
}
