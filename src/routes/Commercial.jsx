// src/routes/Commercial.jsx
import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Commercial() {
  return (
    <main className="container py-12">
      {/* ---- SEO ---- */}
      <Helmet>
        <title>
          Commercial Security Solutions | Video Surveillance & Access Control | Griffon Systems
        </title>

        <meta
          name="description"
          content="Commercial security systems for offices, retail, mixed-use, and hospitality. Griffon Systems provides Avigilon & Verkada video surveillance, access control, intrusion, and real-time monitoring for Chicago and Illinois businesses."
        />

        <meta
          name="keywords"
          content="commercial security, business security cameras, office video surveillance, chicago security integrator, avigilon installer, verkada dealer illinois, access control office, retail security cameras, loss prevention cameras, commercial alarm systems"
        />

        <link rel="canonical" href="https://www.griffonsys.com/commercial" />

        {/* ---- OpenGraph ---- */}
        <meta property="og:title" content="Commercial Security Solutions | Griffon Systems" />
        <meta
          property="og:description"
          content="Professional commercial security systems — Avigilon & Verkada cameras, access control, and monitoring for Illinois businesses."
        />
        <meta property="og:image" content="https://www.griffonsys.com/images/industries/commercial2.jpg" />
        <meta property="og:url" content="https://www.griffonsys.com/commercial" />
        <meta property="og:type" content="website" />

        {/* ---- Twitter ---- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Commercial Security Solutions | Griffon Systems" />
        <meta
          name="twitter:description"
          content="Griffon Systems protects offices, retail, and commercial properties with modern surveillance and access control systems."
        />
        <meta name="twitter:image" content="https://www.griffonsys.com/images/industries/commercial2.jpg" />

        {/* ---- JSON-LD ---- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Commercial Security Solutions",
              description:
                "Video surveillance, access control, monitoring, and loss prevention systems for Illinois commercial properties.",
              image: "https://www.griffonsys.com/images/industries/commercial2.jpg",
              url: "https://www.griffonsys.com/commercial",
              areaServed: "Illinois",
              provider: {
                "@type": "LocalBusiness",
                name: "Griffon Systems, Inc.",
                url: "https://www.griffonsys.com",
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
            }),
          }}
        />
      </Helmet>

      {/* ---- HERO ---- */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-3xl shadow-lg h-[40vh] md:h-[55vh]">
          <img
            src="/images/industries/commercial2.jpg"
            alt="Commercial Security"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Optima" }}>
              Security Solutions for Illinois Businesses
            </h1>
            <p className="text-lg md:text-xl opacity-90" style={{ fontFamily: "Optima" }}>
              Protect offices, retail shops, mixed-use properties, and commercial
              spaces with Avigilon & Verkada surveillance and access control.
            </p>
            <Link
              to="/contact?subject=Commercial%20Security%20Assessment"
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
          Designed for Offices, Retail, and Commercial Spaces
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
          Commercial properties require flexible security systems that protect
          employees, customers, and assets while maintaining a polished,
          professional environment. Griffon Systems deploys surveillance, access
          control, sensors, and remote monitoring tailored to each location type.
        </p>
      </section>

      {/* ---- PROBLEMS SOLVED ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: "Optima" }}>
          We Protect What Matters to Your Business
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Reduce Theft & Liability", text: "HD cameras protect inventory, cashwrap, and customer areas." },
            { title: "Manage Access & Visitors", text: "Mobile credentials, schedules & role-based permissions." },
            { title: "Monitor Parking Lots & Exteriors", text: "Detect loitering, after-hours activity, and vehicle incidents." },
            { title: "Improve Safety & Compliance", text: "Monitor entrances, back-of-house & emergency exits." },
            { title: "Multi-Site Management", text: "View all stores & offices from one unified dashboard." },
            { title: "Cloud or On-Prem Options", text: "Verkada (cloud) or Avigilon Unity (on-prem)." },
          ].map(({ title, text }) => (
            <div key={title} className="bg-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Optima" }}>
                {title}
              </h3>
              <p className="text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- CASE STUDY ---- */}
      <section className="mb-24 relative rounded-3xl overflow-hidden shadow-xl">
        <div
          className="absolute inset-0 bg-center bg-black"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.4)), url('/images/industries/commercial2.jpg')",
            backgroundSize: "70%",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 p-10 md:p-14 text-white max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "Optima" }}>
            Case Study: Illinois Retail Pro Shop
          </h2>
          <p className="mb-4 opacity-95">
            A multi-location retail shop needed full visibility across sales floor, storage,
            registers, and customer entry points.
          </p>
          <ul className="list-disc pl-5 opacity-95 space-y-1 mb-4">
            <li>Avigilon cameras covering registers & sales floor</li>
            <li>Access control for stock rooms and employee-only areas</li>
            <li>Real-time remote monitoring from HQ and mobile</li>
          </ul>
          <p className="opacity-95">
            Outcome: reduced shrink by 35%, enhanced employee safety, and unified oversight across locations.
          </p>
        </div>
      </section>

      {/* ---- INTERNAL CROSS-LINKS FOR SEO ---- */}
      <section className="text-center mb-20">
        <p className="text-gray-600 text-sm">
          Related solutions:&nbsp;
          <Link to="/manufacturing" className="text-blue-600 underline">
            Manufacturing
          </Link>
          &nbsp; | &nbsp;
          <Link to="/municipal" className="text-blue-600 underline">
            Municipal
          </Link>
          &nbsp; | &nbsp;
          <Link to="/lpr" className="text-blue-600 underline">
            LPR Systems
          </Link>
        </p>
      </section>

      {/* ---- CTA ---- */}
      <section className="text-center mb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "Optima" }}>
          Ready to Improve Your Commercial Security?
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Book a free walkthrough and system assessment with our engineers.
        </p>
        <Link
          to="/contact?subject=Commercial%20Security%20Assessment"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg shadow-md"
        >
          Schedule Free Assessment
        </Link>
      </section>
    </main>
  )
}
