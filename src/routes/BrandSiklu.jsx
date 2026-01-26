import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

export default function BrandSiklu() {
  // Match your Canonical.jsx non-www convention
  const pageUrl = "https://griffonsys.com/brands/siklu"
  const ogImage = "https://griffonsys.com/vendors/siklu/eh-8010fx.webp"

  const title = "Siklu Wireless Backhaul | EtherHaul & MultiHaul TG | Griffon Systems"
  const description =
    "Siklu EtherHaul and MultiHaul TG wireless backhaul (EH-614TX, EH-710TX, EH-8010FX, EH-8020FX, MPL-260/261). Griffon Systems designs and deploys gigabit 60/80GHz links across Chicagoland and Illinois."

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": "https://griffonsys.com/#brand-siklu",
    name: "Siklu (by Ceragon)",
    url: pageUrl,
    description:
      "Siklu EtherHaul and MultiHaul TG wireless backhaul solutions deployed by Griffon Systems across Illinois.",
    sameAs: [
      // Optional, but helps entity association
      "https://www.siklu.com/",
      "https://www.ceragon.com/",
    ],
    product: [
      {
        "@type": "Product",
        name: "EtherHaul EH-614TX",
        image: "https://griffonsys.com/vendors/siklu/eh-614tx.webp",
        category: "60GHz Wireless Backhaul",
        brand: { "@type": "Brand", name: "Siklu" },
      },
      {
        "@type": "Product",
        name: "EtherHaul EH-710TX",
        image: "https://griffonsys.com/vendors/siklu/eh-710tx.webp",
        category: "60GHz Wireless Backhaul",
        brand: { "@type": "Brand", name: "Siklu" },
      },
      {
        "@type": "Product",
        name: "EtherHaul EH-8010FX",
        image: "https://griffonsys.com/vendors/siklu/eh-8010fx.webp",
        category: "80GHz Wireless Backhaul",
        brand: { "@type": "Brand", name: "Siklu" },
      },
      {
        "@type": "Product",
        name: "EtherHaul EH-8020FX",
        image: "https://griffonsys.com/vendors/siklu/eh-8020fx.png",
        category: "80GHz High-Capacity Wireless Backhaul",
        brand: { "@type": "Brand", name: "Siklu" },
      },
      {
        "@type": "Product",
        name: "MultiHaul TG MPL-260 / MPL-261",
        image: "https://griffonsys.com/vendors/siklu/mh-tg-mpl260-261.webp",
        category: "60GHz Point-to-Point Wireless (Auto-Connecting)",
        brand: { "@type": "Brand", name: "Siklu" },
      },
    ],
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>

        {/* IMPORTANT:
            DO NOT set a canonical here.
            The global Canonical.jsx component is the single source of truth
            and forces non-www everywhere.
        */}
        <meta name="description" content={description} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Siklu Wireless Backhaul | Griffon Systems" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Siklu Wireless Backhaul | Griffon Systems" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Helmet>

      {/* HEADER */}
      <section className="container py-16">
        <h1 className="text-4xl font-bold mb-6">
          Siklu (Ceragon) Wireless Backhaul: EtherHaul & MultiHaul TG
        </h1>

        <p className="text-lg max-w-3xl mb-10">
          Griffon Systems designs and deploys Siklu EtherHaul and MultiHaul TG wireless
          backhaul across Chicagoland and Illinois — ideal for municipal intersections,
          campuses, industrial facilities, and enterprise sites. These gigabit-class 60GHz
          and 70/80GHz links deliver fiber-like performance for video surveillance backhaul,
          building-to-building connectivity, and rapid deployments where trenching fiber
          isn’t practical.
        </p>
      </section>

      {/* PRODUCT GRID */}
      <section className="container pb-16">
        <h2 className="text-3xl font-bold mb-8">Siklu Product Portfolio</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* EH-614TX */}
          <div className="p-6 border rounded-xl bg-white shadow">
            <img
              src="/vendors/siklu/eh-614tx.webp"
              alt="Siklu EtherHaul EH-614TX 60GHz wireless backhaul radio"
              className="w-full h-48 object-contain mb-4"
              loading="lazy"
            />
            <h3 className="text-2xl font-semibold">EtherHaul EH-614TX (60GHz)</h3>
            <p className="mb-3">
              Compact gigabit 60GHz link for intersections, LPR cameras, secure lots, and
              short-to-medium municipal hops.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Gigabit-class throughput</li>
              <li>Low interference 60GHz spectrum</li>
              <li>Great for Avigilon / Verkada video backhaul</li>
            </ul>
          </div>

          {/* EH-710TX */}
          <div className="p-6 border rounded-xl bg-white shadow">
            <img
              src="/vendors/siklu/eh-710tx.webp"
              alt="Siklu EtherHaul EH-710TX 60GHz wireless backhaul radio"
              className="w-full h-48 object-contain mb-4"
              loading="lazy"
            />
            <h3 className="text-2xl font-semibold">EtherHaul EH-710TX (60GHz)</h3>
            <p className="mb-3">
              Higher-capacity 60GHz link for dense municipal networks and campus connectivity
              where fast deployment and clean spectrum matter.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Multi-gigabit capability (model dependent)</li>
              <li>Optimized for urban/campus deployments</li>
              <li>Ideal for city-wide video networks</li>
            </ul>
          </div>

          {/* EH-8010FX */}
          <div className="p-6 border rounded-xl bg-white shadow">
            <img
              src="/vendors/siklu/eh-8010fx.webp"
              alt="Siklu EtherHaul EH-8010FX 80GHz wireless backhaul radio"
              className="w-full h-48 object-contain mb-4"
              loading="lazy"
            />
            <h3 className="text-2xl font-semibold">EtherHaul EH-8010FX (70/80GHz)</h3>
            <p className="mb-3">
              Fiber-class 70/80GHz wireless designed for long-range, high-capacity links —
              strong fit for municipal backbone, manufacturing, and critical infrastructure.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Up to 10Gbps (platform dependent)</li>
              <li>Long-distance 70/80GHz operation</li>
              <li>Carrier-grade reliability</li>
            </ul>
          </div>

          {/* EH-8020FX */}
          <div className="p-6 border rounded-xl bg-white shadow">
            <img
              src="/vendors/siklu/eh-8020fx.png"
              alt="Siklu EtherHaul EH-8020FX high-power 80GHz wireless backhaul radio"
              className="w-full h-48 object-contain mb-4"
              loading="lazy"
            />
            <h3 className="text-2xl font-semibold">EtherHaul EH-8020FX (High-Power 70/80GHz)</h3>
            <p className="mb-3">
              High-power 70/80GHz backhaul engineered for demanding industrial, municipal,
              and longer-range connectivity applications.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>High-power design for tougher links</li>
              <li>Supports large video networks</li>
              <li>Great for municipal infrastructure</li>
            </ul>
          </div>

          {/* MULTIHAUL */}
          <div className="p-6 border rounded-xl bg-white shadow md:col-span-2">
            <img
              src="/vendors/siklu/mh-tg-mpl260-261.webp"
              alt="Siklu MultiHaul TG MPL-260 / MPL-261 auto-aligning point-to-point wireless kit"
              className="w-full h-48 object-contain mb-4"
              loading="lazy"
            />
            <h3 className="text-2xl font-semibold">MultiHaul TG: MPL-260 / MPL-261</h3>
            <p className="mb-3">
              Plug-and-play, auto-aligning point-to-point link designed for fast deployment
              (“Gig-In-A-Box” style). Great for temporary or rapid installs where you need
              reliable backhaul in hours — not weeks.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container pb-24 text-center">
        <Link
          to="/contact"
          className="px-8 py-4 inline-block bg-black text-white text-lg rounded-lg hover:opacity-80 transition"
        >
          Request a Siklu Wireless Site Survey
        </Link>
      </section>
    </>
  )
}
