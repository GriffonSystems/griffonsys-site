import React from "react"
import { Link } from "react-router-dom"

export default function Manufacturing() {
  return (
    <main className="container py-12">
      {/* ---- HERO ---- */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-3xl shadow-lg h-[40vh] md:h-[55vh]">
          <img
            src="/images/industries/manufacturing.jpg"
            alt="Manufacturing Security"
            className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Security Solutions for Illinois Manufacturers
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              Protect your production lines, restricted areas, and workforce
              with Avigilon & Verkada video surveillance, smart access control,
              and ruggedized deployments designed for industrial environments.
            </p>
            <Link
              to="/contact?subject=Manufacturing%20Security%20Assessment"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow"
            >
              Schedule Free Facility Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* ---- OVERVIEW ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Built for Production Floors, Yards, and Restricted Zones
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
          Manufacturing environments demand security systems that can withstand
          dust, vibration, temperature swings, and long cable runs. Griffon
          Systems designs and deploys end-to-end video surveillance, access
          control, wireless backhaul, and monitoring platforms that keep your
          operations protected without interrupting productivity.
        </p>
      </section>

      {/* ---- KEY PROBLEMS SOLVED ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">
          We Solve Critical Manufacturing Security Challenges
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Protect Production Lines & Machinery",
              text: "Monitor critical machines, robotic cells, conveyors, and mixing/blending equipment—reducing downtime and capturing incidents.",
            },
            {
              title: "Secure Restricted Access Zones",
              text: "Badge-controlled access for hazardous areas, tool cribs, chemical storage, R&D labs, and FDA/SQF-compliant spaces.",
            },
            {
              title: "Monitor Loading Docks & Yards",
              text: "Avigilon analytics detect tailgating, wrong-way movement, and safety risks across large outdoor areas.",
            },
            {
              title: "Track Personnel & OSHA Compliance",
              text: "Verify PPE, detect unauthorized entry, and maintain safety records with AI-driven industrial cameras.",
            },
            {
              title: "Prevent Theft & Inventory Loss",
              text: "Deter internal and external shrinkage across warehouse storage, packaging, and shipping operations.",
            },
            {
              title: "Monitor 24/7 With Cloud or On-Prem",
              text: "Choose cloud (Verkada), on-prem (Avigilon Unity), or hybrid depending on IT policies and compliance requirements.",
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
          Avigilon & Verkada: The Best of Both Worlds
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-3">Avigilon Unity (On-Prem)</h3>
            <p className="text-gray-700 leading-relaxed">
              Ideal for plants requiring complete control over data, isolated
              networks, or air-gapped deployments. Features include:
            </p>
            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>Advanced video analytics</li>
              <li>High-resolution industrial cameras</li>
              <li>Long-term retention & customizable storage</li>
              <li>Integration with Alta Access control</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Verkada (Cloud)</h3>
            <p className="text-gray-700 leading-relaxed">
              Perfect for distributed facilities, warehouses, and operators
              needing instant access, fleet-wide management, and native
              analytics.
            </p>
            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>Native facial blur & redaction</li>
              <li>5-second forensic search</li>
              <li>Integrated access control & sensors</li>
              <li>No on-site servers required</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---- SIKLU / WIRELESS BACKHAUL ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Wireless Backhaul for Large Industrial Sites
        </h2>
        <p className="text-gray-700 max-w-3xl">
          For yards, tank farms, outdoor storage areas, and long-distance runs,
          we deploy high-throughput Siklu wireless links to avoid trenching and
          eliminate costly fiber work.
        </p>
      </section>

      {/* ---- CASE STUDY ---- */}
      <section className="mb-24">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Case Study: Midwest Manufacturing Facility
        </h2>

        <div className="bg-gray-100 rounded-3xl p-8 shadow-md">
          <h3 className="text-xl font-semibold mb-3">Overview</h3>
          <p className="text-gray-700 mb-4">
            A 220,000 sq ft Illinois manufacturer needed end-to-end visibility
            across their production lines, warehouse, and exterior yard.
          </p>

          <h3 className="text-xl font-semibold mb-2">Solution</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
            <li>58 Avigilon cameras</li>
            <li>Alta Access Control on 34 doors</li>
            <li>Siklu EH-series wireless for yard coverage</li>
            <li>Unified monitoring from a single dashboard</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">Outcome</h3>
          <p className="text-gray-700">
            Reduced incidents by 40%, improved safety compliance, and eliminated
            blind spots across the plant.
          </p>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="text-center mb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
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
