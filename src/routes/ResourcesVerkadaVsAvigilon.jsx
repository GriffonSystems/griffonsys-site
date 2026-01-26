import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

export default function ResourcesVerkadaVsAvigilon() {
  const pageUrl = "https://griffonsys.com/resources/verkada-vs-avigilon"
  const title =
    "Verkada vs Avigilon | Which Security Platform Is Right for Illinois Organizations?"
  const description =
    "A practical comparison of Verkada and Avigilon for Illinois municipalities, schools, park districts, and manufacturers."

  return (
    <main className="container py-12 max-w-4xl">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
      </Helmet>

      <h1 className="text-4xl font-bold mb-6">
        Verkada vs Avigilon
      </h1>

      <p className="text-lg text-gray-700 mb-8">
        Organizations across Illinois often evaluate <strong>Verkada</strong> and{" "}
        <strong>Avigilon</strong> when planning a new or upgraded video
        surveillance system. While both platforms are enterprise-grade, they
        solve different problems and fit different operating environments.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        Quick Guidance
      </h2>

      <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-2">
        <li>
          Choose <strong>Verkada</strong> for cloud-managed simplicity, fast
          deployment, and multi-site visibility.
        </li>
        <li>
          Choose <strong>Avigilon</strong> for full on-prem control, advanced
          customization, and environments with strict regulatory requirements.
        </li>
      </ul>

      <p className="text-gray-700 mb-10">
        The right choice depends on IT policies, evidentiary requirements,
        network infrastructure, and long-term operating preferences.
      </p>

      <div className="flex flex-wrap gap-4">
        <Link
          to="/brands/verkada"
          className="px-4 py-2 rounded-xl border hover:bg-gray-100"
        >
          View Verkada Systems
        </Link>

        <Link
          to="/brands/avigilon"
          className="px-4 py-2 rounded-xl border hover:bg-gray-100"
        >
          View Avigilon Systems
        </Link>

        <Link
          to="/contact"
          className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90"
        >
          Request a Platform Consultation
        </Link>
      </div>
    </main>
  )
}
