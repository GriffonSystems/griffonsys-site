import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Municipal() {
  return (
    <main className="container py-12">

      {/* ---- SEO META ---- */}
      <Helmet>
        <title>Municipal Security Systems | City, Police, Fire & DPW | Griffon Systems</title>
        <meta
          name="description"
          content="Security solutions for Illinois municipal facilities — police, fire, DPW, city halls, water treatment, and public works. Avigilon & Verkada cameras, access control, wireless backhaul, and analytics."
        />
        <link rel="canonical" href="https://www.griffonsys.com/municipal" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: "Municipal Security Systems",
            provider: {
              "@type": "LocalBusiness",
              name: "Griffon Systems, Inc.",
              url: "https://www.griffonsys.com",
            },
            areaServed: "Illinois",
            description:
              "Security systems for municipal facilities including city halls, police departments, fire stations, DPW, and water treatment plants.",
          })}
        </script>
      </Helmet>

      {/* ---- HERO ---- */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-3xl shadow-lg h-[40vh] md:h-[55vh]">
          <img
            src="/images/industries/muni.jpg"
            alt="Municipal Security"
            className="absolute inset-0 w-full h-full object-cover object-[center_35%]"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white max-w-2xl">
            <h1
              className="text-3xl md:text-5xl font-bold mb-4"
              style={{
                fontFamily:
                  'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
              }}
            >
              Security Solutions for Illinois Municipalities
            </h1>

            <p
              className="text-lg md:text-xl opacity-90"
              style={{
                fontFamily:
                  'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
              }}
            >
              Protect police stations, fire departments, DPW facilities, water plants,
              city halls, and public works with Avigilon & Verkada video surveillance,
              access control, and rugged municipal deployments.
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
        <h2
          className="text-2xl md:text-3xl font-semibold mb-6"
          style={{
            fontFamily:
              'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
          }}
        >
          Protect Essential City Services & Public Safety Assets
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
          Municipal facilities require security systems that are reliable,
          secure, and capable of covering diverse environments — from police
          lobbies and booking rooms to public works yards, fire stations,
          and outdoor intersections.
        </p>
      </section>

      {/* ---- KEY PROBLEMS SOLVED ---- */}
      <section className="mb-20">
        <h2
          className="text-2xl md:text-3xl font-semibold mb-8"
          style={{
            fontFamily:
              'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
          }}
        >
          We Solve Critical Municipal Security Challenges
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Police Station & Booking Area Monitoring", text: "Lobby, booking rooms, evidence rooms, sally ports." },
            { title: "Fire Stations & EMS Facilities", text: "Secure bay doors, gear, equipment storage, living quarters." },
            { title: "DPW & Public Works Yards", text: "Monitor fleets, salt domes, fuel tanks, maintenance shops." },
            { title: "City Hall & Administrative Buildings", text: "Protect staff, IT rooms, public counters, finance offices." },
            { title: "Water & Wastewater Treatment Plants", text: "EPA compliance with rugged outdoor Avigilon cameras." },
            { title: "Parks, Streets, & Intersections", text: "Wireless-linked cameras for parks, lots, trails, events." },
          ].map(({ title, text }) => (
            <div key={title} className="bg-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <h3
                className="text-xl font-semibold mb-2"
                style={{
                  fontFamily:
                    'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
                }}
              >
                {title}
              </h3>
              <p className="text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- AVIGILON + VERKADA ---- */}
      <section className="mb-20">
        <h2
          className="text-2xl md:text-3xl font-semibold mb-8"
          style={{
            fontFamily:
              'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
          }}
        >
          Avigilon & Verkada: Proven for Municipal Use
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3
              className="text-xl font-semibold mb-3"
              style={{
                fontFamily:
                  'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
              }}
            >
              Avigilon Unity (On-Prem)
            </h3>

            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>High retention evidence storage</li>
              <li>Advanced analytics for booking & sally ports</li>
              <li>Perfect for police & secured facilities</li>
              <li>Full ACM access control integration</li>
            </ul>
          </div>

          <div>
            <h3
              className="text-xl font-semibold mb-3"
              style={{
                fontFamily:
                  'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
              }}
            >
              Verkada (Cloud)
            </h3>

            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>Native facial blur for public areas</li>
              <li>5-second forensic search</li>
              <li>Ideal for parks, streets & DPW</li>
              <li>No servers — minimal IT overhead</li>
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
          <h2
            className="text-2xl md:text-3xl font-semibold mb-6"
            style={{
              fontFamily:
                'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
            }}
          >
            Case Study: Suburban Police Department
          </h2>

          <h3
            className="text-xl font-semibold mb-3"
            style={{
              fontFamily:
                'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
            }}
          >
            Overview
          </h3>

          <p className="mb-4 opacity-95">
            A suburban Illinois police department needed upgraded booking cameras,
            lobby monitoring, vehicle lot coverage, and secure access control.
          </p>

          <h3
            className="text-xl font-semibold mb-2"
            style={{
              fontFamily:
                'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
            }}
          >
            Solution
          </h3>

          <ul className="list-disc pl-5 opacity-95 space-y-1 mb-4">
            <li>42 Avigilon cameras installed</li>
            <li>ACM access control deployed</li>
            <li>Siklu wireless added for exterior coverage</li>
            <li>Unified monitoring for dispatch</li>
          </ul>

          <h3
            className="text-xl font-semibold mb-2"
            style={{
              fontFamily:
                'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
            }}
          >
            Outcome
          </h3>
          <p className="opacity-95">
            Improved incident documentation, reduced blind spots, and enhanced
            visitor and staff safety throughout the facility.
          </p>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="text-center mb-24">
        <h2
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{
            fontFamily:
              'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
          }}
        >
          Ready to Secure Your Municipal Facilities?
        </h2>

        <p
          className="text-gray-700 text-lg mb-6"
          style={{
            fontFamily:
              'Optima, Candara, "Noto Sans", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
          }}
        >
          Book a free walkthrough and system assessment with our engineering team.
        </p>

        <Link
          to="/contact?subject=Municipal%20Security%20Assessment"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg shadow-md"
        >
          Schedule Free Assessment
        </Link>
      </section>

    </main>
  )
}
