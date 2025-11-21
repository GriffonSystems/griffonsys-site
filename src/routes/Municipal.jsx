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
        <link rel="canonical" href="https://www.griffonsys.com/industries/municipal" />

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
            className="absolute inset-0 w-full h-full object-cover object-[center_15%]"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Security Solutions for Illinois Municipalities
            </h1>

            <p className="text-lg md:text-xl opacity-90">
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
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Protect Essential City Services & Public Safety Assets
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
          Municipal facilities require security systems that are reliable, 
          secure, and capable of covering diverse environments — from police 
          lobbies and booking rooms to public works yards, fire stations, 
          and outdoor intersections. Griffon Systems designs and deploys 
          end-to-end surveillance, access control, and wireless networks 
          tailored for city operations.
        </p>
      </section>

      {/* ---- KEY PROBLEMS SOLVED ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          We Solve Critical Municipal Security Challenges
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Police Station & Booking Area Monitoring",
              text: "High-resolution coverage of lobbies, booking rooms, evidence rooms, and sally ports.",
            },
            {
              title: "Fire Stations & EMS Facilities",
              text: "Secure bay doors, equipment storage, and living quarters with access control and cameras.",
            },
            {
              title: "DPW & Public Works Yards",
              text: "Monitor vehicle fleets, salt domes, fuel tanks, and maintenance shops.",
            },
            {
              title: "City Hall & Administrative Buildings",
              text: "Protect staff, records, IT rooms, finance offices, and public counters.",
            },
            {
              title: "Water & Wastewater Treatment Plants",
              text: "Comply with EPA/utility standards using Avigilon analytics and rugged outdoor cameras.",
            },
            {
              title: "Parks, Streets, & Intersections",
              text: "Deploy wireless-linked cameras for playgrounds, parking lots, trails, and municipal events.",
            },
          ].map(({ title, text }) => (
            <div
              key={title}
              className="bg-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- AVIGILON + VERKADA ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          Avigilon & Verkada: Proven for Municipal Use
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-3">Avigilon Unity (On-Prem)</h3>
            <p className="text-gray-700 leading-relaxed">
              Ideal for police departments and city facilities requiring high-security, 
              on-prem infrastructure with complete control over evidence and retention.
            </p>
            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>High retention evidence storage</li>
              <li>Advanced analytics (PPE, intrusion, crowding)</li>
              <li>Great for sally ports, booking, and lobbies</li>
              <li>Deep integration with ACM access control</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Verkada (Cloud)</h3>
            <p className="text-gray-700 leading-relaxed">
              A perfect fit for parks, streets, DPW yards, and mobile municipal operations 
              requiring fast, cloud-based video access.
            </p>
            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>Native facial blur for public spaces</li>
              <li>5-second forensic search for investigations</li>
              <li>Perfect for distributed municipal sites</li>
              <li>No servers — low maintenance for IT</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---- WIRELESS BACKHAUL ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Wireless Backhaul for Parks, Intersections & Events
        </h2>
        <p className="text-gray-700 max-w-3xl">
          Using Siklu & Cambium wireless links, we connect cameras across parks, 
          intersections, downtown corridors, parking lots, water plants, and 
          special event zones — without trenching fiber or disturbing utilities.
        </p>
      </section>

      {/* ---- CASE STUDY ---- */}
      <section className="mb-24 relative rounded-3xl overflow-hidden shadow-xl">
        <div
          className="absolute inset-0 bg-center bg-black"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%), url('/images/industries/muni.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="relative z-10 p-10 md:p-14 text-white max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Case Study: Suburban Police Department
          </h2>

          <h3 className="text-xl font-semibold mb-3">Overview</h3>
          <p className="mb-4 opacity-95">
            A suburban Illinois police department required upgraded booking 
            cameras, lobby monitoring, parking lot coverage, and secure access 
            control for staff-only areas.
          </p>

          <h3 className="text-xl font-semibold mb-2">Solution</h3>
          <ul className="list-disc pl-5 opacity-95 space-y-1 mb-4">
            <li>42 Avigilon cameras</li>
            <li>ACM access control for restricted areas</li>
            <li>Siklu wireless for exterior parking coverage</li>
            <li>Unified monitoring at dispatch and command</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">Outcome</h3>
          <p className="opacity-95">
            Improved incident documentation, reduced blind spots, and enhanced 
            staff and visitor safety across the police facility.
          </p>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="text-center mb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Secure Your Municipal Facilities?
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Book a free walkthrough and system assessment with our engineers.
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
