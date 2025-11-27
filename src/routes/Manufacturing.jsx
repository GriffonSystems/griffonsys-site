import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Manufacturing() {
  return (
    <main className="container py-12">
      {/* ---- SEO ---- */}
      <Helmet>
        <title>
          Manufacturing Security Solutions | Video Surveillance & Access Control | Griffon Systems
        </title>

        <meta
          name="description"
          content="Griffon Systems provides Avigilon, Verkada, and ACM access control security solutions for Illinois manufacturers — including industrial video surveillance, wireless backhaul, yard monitoring, PPE verification, and restricted zone protection."
        />

        <link rel="canonical" href="https://www.griffonsys.com/manufacturing" />

        {/* OpenGraph */}
        <meta property="og:title" content="Manufacturing Security Solutions | Griffon Systems" />
        <meta
          property="og:description"
          content="Security systems engineered for manufacturing — Avigilon & Verkada surveillance, ACM access control, wireless backhaul, OSHA compliance, and yard monitoring."
        />
        <meta property="og:image" content="https://www.griffonsys.com/images/industries/manufacturing2.jpg" />
        <meta property="og:url" content="https://www.griffonsys.com/manufacturing" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Manufacturing Security Solutions | Griffon Systems" />
        <meta
          name="twitter:description"
          content="Industrial video surveillance, access control, and wireless backhaul designed for Illinois manufacturing facilities."
        />
        <meta name="twitter:image" content="https://www.griffonsys.com/images/industries/manufacturing2.jpg" />

        {/* JSON-LD (correct format) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Manufacturing Security Solutions",
              description:
                "Video surveillance, access control, wireless backhaul, and OSHA compliance tools for Illinois manufacturing facilities.",
              image: "https://www.griffonsys.com/images/industries/manufacturing2.jpg",
              brand: { "@type": "Brand", name: "Griffon Systems" },
              url: "https://www.griffonsys.com/manufacturing",
              areaServed: "Illinois",
              provider: {
                "@type": "LocalBusiness",
                name: "Griffon Systems, Inc.",
                telephone: "+16306070346",
                url: "https://www.griffonsys.com",
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
            src="/images/industries/manufacturing.jpg"
            alt="Video surveillance in manufacturing environment"
            className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Optima" }}>
              Security Solutions for Illinois Manufacturers
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Protect your production lines, restricted areas, and workforce with industrial-grade
              video surveillance and access control.
            </p>

            <Link
              to="/contact?subject=Manufacturing%20Security%20Assessment"
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
          Built for Production Floors, Yards, and Restricted Zones
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
          Manufacturing environments demand security systems that can withstand dust, vibration,
          temperature swings, and long cable runs — without sacrificing analytics, retention, or uptime.
        </p>
      </section>

      {/* ---- CHALLENGES ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: "Optima" }}>
          We Solve Critical Manufacturing Security Challenges
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Protect Production Lines & Machinery", text: "Monitor robotics, conveyors, mixers, and reduce downtime." },
            { title: "Secure Restricted Access Zones", text: "Badge control for hazardous areas, tool cribs, and R&D labs." },
            { title: "Monitor Loading Docks & Yards", text: "Avigilon analytics detect tailgating and safety risks." },
            { title: "Track Personnel & OSHA Compliance", text: "Verify PPE and detect unauthorized entry with AI." },
            { title: "Prevent Theft & Inventory Loss", text: "Deter shrinkage across warehouses and shipping areas." },
            { title: "Monitor 24/7 — Cloud or On-Prem", text: "Choose Verkada, Avigilon Unity, or hybrid deployments." },
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

      {/* ---- PLATFORM BREAKDOWN ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: "Optima" }}>
          Avigilon & Verkada — The Best of Both Worlds
        </h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "Optima" }}>
              Avigilon Unity (On-Prem)
            </h3>
            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>Advanced video analytics</li>
              <li>High-resolution industrial cameras</li>
              <li>Long-term retention</li>
              <li>ACM access integration</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "Optima" }}>
              Verkada (Cloud)
            </h3>
            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>Native facial blur</li>
              <li>5-second search</li>
              <li>Integrated sensors</li>
              <li>No on-site servers</li>
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
              "linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.4)), url('/images/industries/manufacturing2.jpg')",
            backgroundSize: "60%",
            backgroundPosition: "center bottom",
          }}
        />

        <div className="relative z-10 p-10 md:p-14 text-white max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "Optima" }}>
            Case Study: Midwest Manufacturing Facility
          </h2>
          <p className="opacity-95 mb-4">
            A 220,000 sq ft Illinois manufacturer needed full visibility across production lines,
            warehouse, and exterior yard.
          </p>
          <ul className="list-disc pl-5 opacity-95 space-y-1 mb-4">
            <li>98 Avigilon cameras</li>
            <li>ACM access control on 34 doors</li>
            <li>Siklu PTP wireless backhaul</li>
            <li>Unified dashboard monitoring</li>
          </ul>
          <p className="opacity-95">Result: 40% incident reduction and improved OSHA compliance.</p>
        </div>
      </section>

      {/* ---- INTERNAL CROSS LINKS ---- */}
      <section className="text-center mb-24">
        <p className="text-gray-600 text-sm">
          Related solutions:&nbsp;
          <Link to="/municipal" className="text-blue-600 underline">
            Municipal
          </Link>
          &nbsp; | &nbsp;
          <Link to="/commercial" className="text-blue-600 underline">
            Commercial
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
          Ready to Upgrade Your Facility Security?
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Book a free walkthrough and system assessment with our engineers.
        </p>
        <Link
          to="/contact?subject=Manufacturing%20Security%20Assessment"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg shadow-md"
        >
          Schedule Free Assessment
        </Link>
      </section>
    </main>
  )
}
