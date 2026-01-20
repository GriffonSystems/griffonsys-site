import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function BrandSiklu() {
  return (
    <>
      <Helmet>
        <title>Siklu EtherHaul & MultiHaul TG Wireless | Griffon Systems</title>

        {/* ✅ CANONICAL (THIS IS THE FIX) */}
        <link
          rel="canonical"
          href="https://www.griffonsys.com/brands/siklu"
        />

        <meta
          name="description"
          content="Siklu EtherHaul and MultiHaul TG wireless solutions including EH-614TX, EH-710TX, EH-8010FX, EH-8020FX, and MPL-260/261 Gig-In-A-Box PtP links. Deployed by Griffon Systems across Illinois municipalities, campuses, manufacturing and enterprise environments."
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Brand",
            name: "Siklu (by Ceragon)",
            url: "https://www.griffonsys.com/brands/siklu",
            description:
              "Siklu EtherHaul and MultiHaul TG wireless backhaul deployed by Griffon Systems across Illinois.",
            product: [
              {
                "@type": "Product",
                name: "EtherHaul EH-614TX",
                image:
                  "https://www.griffonsys.com/vendors/siklu/eh-614tx.webp",
                category: "60GHz Wireless Backhaul",
              },
              {
                "@type": "Product",
                name: "EtherHaul EH-710TX",
                image:
                  "https://www.griffonsys.com/vendors/siklu/eh-710tx.webp",
                category: "60GHz Wireless Backhaul",
              },
              {
                "@type": "Product",
                name: "EtherHaul EH-8010FX",
                image:
                  "https://www.griffonsys.com/vendors/siklu/eh-8010fx.webp",
                category: "80GHz Wireless Backhaul",
              },
              {
                "@type": "Product",
                name: "EtherHaul EH-8020FX",
                image:
                  "https://www.griffonsys.com/vendors/siklu/eh-8020fx.png",
                category: "80GHz High-Capacity Wireless Backhaul",
              },
              {
                "@type": "Product",
                name: "MultiHaul TG MPL-260 / MPL-261",
                image:
                  "https://www.griffonsys.com/vendors/siklu/mh-tg-mpl260-261.webp",
                category: "60GHz PtP Auto-Connecting Wireless",
              },
            ],
          })}
        </script>
      </Helmet>

      {/* HEADER */}
      <section className="container py-16">
        <h1 className="text-4xl font-bold mb-6">
          Siklu (by Ceragon) Wireless Backhaul & MultiHaul TG Solutions
        </h1>
        <p className="text-lg max-w-3xl mb-10">
          Griffon Systems deploys Siklu’s EtherHaul and MultiHaul TG wireless
          platforms across Illinois municipalities, school districts,
          industrial facilities and enterprise campuses. These gigabit-class
          60GHz and 80GHz links deliver fiber-like speed, auto-alignment
          options, and secure, high-reliability connectivity for video
          backhaul and building-to-building transport.
        </p>
      </section>

      {/* PRODUCT GRID */}
      <section className="container pb-16">
        <h2 className="text-3xl font-bold mb-8">
          Siklu Product Portfolio
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* EH-614TX */}
          <div className="p-6 border rounded-xl bg-white shadow">
            <img
              src="/vendors/siklu/eh-614tx.webp"
              alt="Siklu EH-614TX"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-2xl font-semibold">
              EH-614TX (60GHz)
            </h3>
            <p className="mb-3">
              Compact gigabit 60GHz link ideal for intersections, LPR
              cameras, secure lots and short-to-medium municipal hops.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>1+ Gbps throughput</li>
              <li>Interference-free 60GHz spectrum</li>
              <li>Perfect for Avigilon and Verkada backhaul</li>
            </ul>
          </div>

          {/* EH-710TX */}
          <div className="p-6 border rounded-xl bg-white shadow">
            <img
              src="/vendors/siklu/eh-710tx.webp"
              alt="Siklu EH-710TX"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-2xl font-semibold">
              EH-710TX (60GHz)
            </h3>
            <p className="mb-3">
              High-capacity 60GHz link for dense municipal networks and
              campus connectivity with auto-alignment and rapid
              deployment.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Multi-gigabit capacity</li>
              <li>Urban-optimized performance</li>
              <li>Ideal for city-wide video deployments</li>
            </ul>
          </div>

          {/* EH-8010FX */}
          <div className="p-6 border rounded-xl bg-white shadow">
            <img
              src="/vendors/siklu/eh-8010fx.webp"
              alt="Siklu EH-8010FX"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-2xl font-semibold">
              EH-8010FX (80GHz)
            </h3>
            <p className="mb-3">
              Fiber-class long-range 80GHz wireless delivering up to
              10Gbps for municipal backbone, manufacturing and critical
              infrastructure.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>10Gbps full-duplex</li>
              <li>Long-distance 70/80GHz operation</li>
              <li>Carrier-grade reliability</li>
            </ul>
          </div>

          {/* EH-8020FX */}
          <div className="p-6 border rounded-xl bg-white shadow">
            <img
              src="/vendors/siklu/eh-8020fx.png"
              alt="Siklu EH-8020FX"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-2xl font-semibold">
              EH-8020FX (80GHz High-Power)
            </h3>
            <p className="mb-3">
              Heavy-duty 80GHz backhaul for demanding industrial,
              municipal and long-range connectivity applications.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>High-power long-range design</li>
              <li>Supports large video networks</li>
              <li>Ideal for police & municipal infrastructure</li>
            </ul>
          </div>

          {/* MULTIHAUL */}
          <div className="p-6 border rounded-xl bg-white shadow md:col-span-2">
            <img
              src="/vendors/siklu/mh-tg-mpl260-261.webp"
              alt="Siklu MultiHaul TG MPL260 MPL261"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-2xl font-semibold">
              MultiHaul TG: MPL-260 / MPL-261
            </h3>
            <p className="mb-3">
              Plug-and-play auto-aligning PtP link designed for fast
              deployment.
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
  );
}
