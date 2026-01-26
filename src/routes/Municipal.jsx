// src/routes/Municipal.jsx
import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Municipal() {
  // Match Canonical.jsx non-www convention
  const pageUrl = "https://griffonsys.com/municipal"
  const ogImage = "https://griffonsys.com/images/industries/muni.jpg"

  const title =
    "Municipal Security Systems | Police, Fire, DPW & City Facilities | Griffon Systems"
  const description =
    "Municipal security systems for Illinois — police, fire, DPW, water plants, public works and city buildings. Avigilon & Verkada cameras, access control, LPR, wireless backhaul and analytics."

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
        <meta property="og:title" content="Municipal Security Systems | Griffon Systems" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Municipal Security Systems | Griffon Systems" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:url" content={pageUrl} />

        {/* Schema (keep as Service; just normalize URL to non-www) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Municipal Security Systems",
              areaServed: "Illinois",
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
              description:
                "Security systems for municipal facilities including police, fire, DPW, water plants, parks and city buildings.",
            }),
          }}
        />
      </Helmet>

      {/* ---- HERO ---- */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-3xl shadow-lg h-[40vh] md:h-[55vh]">
          <img
            src="/images/industries/muni.jpg"
            alt="Municipal security systems for police, fire, DPW, and city facilities"
            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Optima" }}>
              Security Solutions for Illinois Municipalities
            </h1>
            <p className="text-lg md:text-xl opacity-90" style={{ fontFamily: "Optima" }}>
              Protect police stations, fire departments, DPW yards, water plants, and public buildings
              with Avigilon & Verkada deployments engineered for government environments.
            </p>

            <Link
              to="/contact?subject=Municipal%20Security%20Assessment"
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow w-fit"
            >
              Schedule Free Facility Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* ---- OVERVIEW ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "Optima" }}>
          Protect Essential City Services & Public Safety Assets
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
          Municipal facilities require security that ensures safety, evidence retention, and public access
          without compromising staff or infrastructure. From police booking rooms to DPW fleets and community parks,
          our systems scale across entire municipalities.
        </p>

        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mt-4">
          We secure police departments, fire stations, 911 dispatch centers, water treatment,
          public works garages, salt domes, fleet yards, fuel depots, parks, intersections,
          libraries, and civic buildings. Ideal for Illinois towns, villages, and counties looking
          to modernize surveillance, control access, and link remote assets with wireless PTP.
        </p>
      </section>

      {/* ---- SOLUTIONS ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: "Optima" }}>
          We Solve Critical Municipal Security Challenges
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Police Station & Booking Rooms", text: "Lobby, cells, evidence rooms, interview rooms, sally ports." },
            { title: "Fire Stations & EMS", text: "Secure gear storage, bay doors, turnout lockers and living quarters." },
            { title: "DPW & Public Works", text: "Fleet monitoring, fuel tanks, salt domes, tool shops & yards." },
            { title: "City Hall & Government Buildings", text: "Public counters, records, IT server rooms & finance offices." },
            { title: "Water/Wastewater Treatment", text: "Perimeter cameras for compliance and secure SCADA-adjacent zones." },
            { title: "Parks / Street Cameras", text: "Wireless-linked intersections, public lots, trails and playgrounds." },
          ].map(({ title, text }) => (
            <div
              key={title}
              className="bg-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Optima" }}>
                {title}
              </h3>
              <p className="text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- PLATFORMS ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: "Optima" }}>
          Avigilon & Verkada — Proven for City Infrastructure
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "Optima" }}>
              Avigilon Unity (On-Prem)
            </h3>
            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>High-retention evidence storage</li>
              <li>Advanced analytics for booking & sally ports</li>
              <li>Access control integration</li>
              <li>Ideal for secured public safety environments</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "Optima" }}>
              Verkada (Cloud)
            </h3>
            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>Native facial/identity blur for public areas</li>
              <li>5-second forensic search</li>
              <li>No servers — low IT overhead for cities</li>
              <li>Perfect for parks, DPW & intersections</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---- CASE STUDY ---- */}
      <section className="mb-24 relative rounded-3xl overflow-hidden shadow-xl">
        <div
          className="absolute inset-0 bg-center bg-black"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.4)), url('/images/industries/muni.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
          }}
        />
        <div className="relative z-10 p-10 md:p-14 text-white max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "Optima" }}>
            Case Study: Suburban Police Department
          </h2>
          <p className="mb-4 opacity-95">
            A suburban Illinois police department required booking upgrades, lobby monitoring,
            vehicle lot coverage and controlled access doors.
          </p>
          <ul className="list-disc pl-5 opacity-95 space-y-1 mb-4">
            <li>42 Avigilon cameras</li>
            <li>Access control on key doors</li>
            <li>Siklu wireless backhaul for yard areas</li>
            <li>Unified monitoring for dispatch</li>
          </ul>
          <p className="opacity-95">
            Result: Lower incident gaps and improved evidence documentation.
          </p>
        </div>
      </section>

      {/* ---- INTERNAL LINK HUB ---- */}
      <section className="text-center mb-24">
        <h3 className="text-xl font-semibold mb-4">Explore Related Solutions</h3>
        <ul className="space-y-2 text-blue-600 underline text-lg">
          <li><Link to="/manufacturing">Manufacturing</Link></li>
          <li><Link to="/commercial">Commercial</Link></li>
          <li><Link to="/from-the-field">Project Highlights</Link></li>
        </ul>
      </section>

      {/* ---- FAQ ---- */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "Optima" }}>
          Municipal Security FAQs
        </h2>

        <div className="space-y-6 text-gray-700 max-w-3xl">
          <div>
            <h4 className="font-bold text-lg">Do you work with small towns and villages?</h4>
            <p>Yes — from single-building installs to city-wide deployments with parks and DPW yards.</p>
          </div>

          <div>
            <h4 className="font-bold text-lg">Can you integrate cameras with access control?</h4>
            <p>Yes — Avigilon & Verkada support door event linking, evidence bookmarks and dispatch review.</p>
          </div>

          <div>
            <h4 className="font-bold text-lg">Do you support wireless street cameras?</h4>
            <p>Yes — Siklu mmWave links parks, intersections, trailheads and water plants without trenching.</p>
          </div>

          <div>
            <h4 className="font-bold text-lg">What is a typical municipal deployment size?</h4>
            <p>20–100+ cameras across police, city hall, DPW, water plant and public buildings.</p>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="text-center mb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "Optima" }}>
          Ready to Secure Your Community?
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Schedule a free assessment — we'll review buildings, yards and public areas.
        </p>
        <Link
          to="/contact?subject=Municipal%20Security%20Assessment"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg shadow-md"
        >
          Book Walkthrough
        </Link>
      </section>
    </main>
  )
}
