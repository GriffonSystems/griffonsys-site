import React from "react"
import { Helmet } from "react-helmet"

export default function ServiceAreas() {
  return (
    <main className="container py-16">
      <Helmet>
        <title>Service Areas | Griffon Systems</title>
        <meta
          name="description"
          content="Griffon Systems provides surveillance and access control services throughout the Chicagoland area."
        />
      </Helmet>

      <h1 className="text-4xl font-bold mb-8">Service Areas</h1>

      <p className="text-lg text-gray-700 mb-10">
        We provide video surveillance, access control, wireless backhaul, and 
        security integration services across the Chicagoland area.
      </p>

      <ul className="grid md:grid-cols-3 gap-6 text-lg">
        <li>Chicago</li>
        <li>Elmhurst</li>
        <li>Oak Brook</li>
        <li>Naperville</li>
        <li>Aurora</li>
        <li>Schaumburg</li>
        <li>Downers Grove</li>
        <li>St. Charles</li>
        <li>Geneva</li>
        <li>Glenview</li>
        <li>Bolingbrook</li>
        <li>Wheaton</li>
      </ul>
    </main>
  )
}
