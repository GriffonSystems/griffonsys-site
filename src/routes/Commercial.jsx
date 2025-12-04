// src/routes/Commercial.jsx
import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Commercial() {
  return (
    <main className="container py-12">

      {/* ---- SEO ---- */}
      <Helmet>
        <title>Commercial Security Solutions | Video Surveillance & Access Control | Griffon Systems</title>
        <meta
          name="description"
          content="Commercial security systems for offices, retail, mixed-use and hospitality. Griffon Systems deploys Avigilon & Verkada video surveillance, access control and monitoring for Illinois businesses."
        />
        <link rel="canonical" href="https://www.griffonsys.com/commercial" />

        {/* OG */}
        <meta property="og:title" content="Commercial Security Solutions | Griffon Systems" />
        <meta
          property="og:description"
          content="Video surveillance, access control and intrusion systems for Illinois commercial facilities."
        />
        <meta property="og:image" content="https://www.griffonsys.com/images/industries/commercial2.jpg" />
        <meta property="og:url" content="https://www.griffonsys.com/commercial" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Commercial Security Solutions | Griffon Systems" />
        <meta
          name="twitter:description"
          content="Security systems for offices, retail and corporate buildings — Avigilon & Verkada."
        />
        <meta name="twitter:image" content="https://www.griffonsys.com/images/industries/commercial2.jpg" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Commercial Security Solutions",
              description:
                "Video surveillance, access control, intrusion and loss prevention for Illinois commercial properties.",
              image: "https://www.griffonsys.com/images/industries/commercial2.jpg",
              url: "https://www.griffonsys.com/commercial",
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
              Protect offices, retail, mixed-use properties and commercial spaces with Avigilon & Verkada surveillance and access control.
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
          Designed for Offices, Retail & Commercial Spaces
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
          Businesses need reliable security that protects employees, assets and customers — without disrupting daily operations.
          From public entrances to storage rooms and parking lots, our systems provide oversight across every square foot.
        </p>

        {/* 🔥 SEO expansion */}
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mt-4">
          We secure corporate offices, retail storefronts, distribution suites, multi-tenant buildings,
          coworking floors, restaurants, hospitality spaces and high-traffic commercial sites across Illinois.
          Ideal for loss prevention, investigations and remote management across multiple locations.
        </p>
      </section>


      {/* ---- CHALLENGES ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: "Optima" }}>
          We Protect What Matters to Your Business
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Reduce Theft & Liability", text: "HD coverage for inventory, POS areas and customer interaction zones." },
            { title: "Control Access & Visitors", text: "Mobile credentials, role permissions and door logging." },
            { title: "Parking Lots & Exterior Monitoring", text: "LPR, analytics and after-hours detection." },
            { title: "Improve Safety & Compliance", text: "Monitor exits, BOH corridors and emergency routes." },
            { title: "Multi-Site Visibility", text: "Manage every store/office from one dashboard." },
            { title: "Cloud or On-Prem Options", text: "Verkada (cloud) or Avigilon Unity (on-prem/hybrid)." },
          ].map(({ title, text }) => (
            <div key={title} className="bg-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Optima" }}>{title}</h3>
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
            Case Study: Multi-Location Retail Pro Shop
          </h2>
          <p className="mb-4 opacity-95">
            Needed visibility across sales floor, POS, storage and employee-only areas.
          </p>
          <ul className="list-disc pl-5 opacity-95 space-y-1 mb-4">
            <li>Avigilon cameras covering registers & sales floor</li>
            <li>Access control for stock rooms & employee access</li>
            <li>Remote monitoring across all sites</li>
          </ul>
          <p className="opacity-95">Outcome: 35% shrink reduction and safer work environment.</p>
        </div>
      </section>


      {/* ---- INTERNAL HUB ---- */}
      <section className="text-center mb-24">
        <h3 className="text-xl font-semibold mb-4">Explore Related Industries</h3>
        <ul className="space-y-2 text-blue-600 underline text-lg">
          <li><Link to="/manufacturing">Manufacturing</Link></li>
          <li><Link to="/municipal">Municipal</Link></li>
          <li><Link to="/from-the-field">From the Field Projects</Link></li>
        </ul>
      </section>


      {/* ---- FAQ ---- */}
      <section className="mb-24 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "Optima" }}>
          Commercial Security FAQs
        </h2>

        {[
          { q: "Do you support multi-location retail or franchise groups?", a: "Yes — cloud dashboards allow unified visibility across all sites." },
          { q: "Can we integrate cameras with access control?", a: "Yes — Avigilon Unity + ACM or Verkada provide unified video + door history." },
          { q: "Do you handle enterprise office deployments?", a: "Yes — 5,000+ seat offices and multi-floor HQ buildings." },
          { q: "Do you offer intrusion or alarm integration?", a: "Yes — we integrate video, access and alarm workflows." },
        ].map(item => (
          <div key={item.q} className="mb-6">
            <h4 className="font-bold text-lg">{item.q}</h4>
            <p className="text-gray-700">{item.a}</p>
          </div>
        ))}
      </section>


      {/* ---- CTA ---- */}
      <section className="text-center mb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "Optima" }}>
          Ready to Improve Your Commercial Security?
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Book a free walkthrough and system assessment with our engineering team.
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
