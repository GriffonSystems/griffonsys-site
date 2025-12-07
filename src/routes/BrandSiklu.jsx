import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function BrandSiklu() {
  return (
    <>
      <Helmet>
        <title>Siklu EtherHaul Wireless Backhaul | Griffon Systems</title>
        <meta
          name="description"
          content="Siklu (by Ceragon) EtherHaul wireless backhaul solutions including EH-614TX, EH-710TX, EH-8010FX, EH-8020FX, and EH-2600. High-capacity 60GHz and 80GHz wireless links deployed by Griffon Systems across Illinois municipalities, school districts, manufacturing, and commercial campuses."
        />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Brand",
            name: "Siklu (by Ceragon)",
            url: "https://www.griffonsys.com/brands/siklu",
            logo: "https://www.griffonsys.com/vendors/siklu/siklu-logo.png",
            description:
              "Siklu EtherHaul wireless backhaul deployed by Griffon Systems across Illinois.",
            product: [
              {
                "@type": "Product",
                name: "Siklu EtherHaul EH-614TX",
                image: "https://www.griffonsys.com/vendors/siklu/eh-614tx.webp",
                category: "60GHz Wireless Backhaul",
              },
              {
                "@type": "Product",
                name: "Siklu EtherHaul EH-710TX",
                image: "https://www.griffonsys.com/vendors/siklu/eh-710tx.webp",
                category: "60GHz Wireless Backhaul",
              },
              {
                "@type": "Product",
                name: "Siklu EtherHaul EH-8010FX",
                image: "https://www.griffonsys.com/vendors/siklu/eh-8010fx.webp",
                category: "80GHz Wireless Backhaul",
              },
              {
                "@type": "Product",
                name: "Siklu EtherHaul EH-8020FX",
                image: "https://www.griffonsys.com/vendors/siklu/eh-8020fx.png",
                category: "80GHz High Capacity Wireless Backhaul",
              },
              {
                "@type": "Product",
                name: "Siklu EtherHaul EH-2600",
                image: "https://www.griffonsys.com/vendors/siklu/eh-2600.webp",
                category: "Ultra Long-Range Wireless Backhaul",
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Header */}
      <section className="container py-16">
        <h1 className="text-4xl font-bold mb-6">
          Siklu (by Ceragon) Wireless Backhaul Solutions
        </h1>
        <p className="text-lg max-w-3xl mb-10">
          Griffon Systems deploys Siklu’s EtherHaul millimeter-wave wireless
          solutions for high-bandwidth, ultra-reliable point-to-point connectivity.
          These 60GHz and 80GHz links power Illinois municipal surveillance
          networks, manufacturing campuses, school districts, and enterprise
          environments requiring fiber-class performance without the cost of
          trenching fiber.
        </p>
      </section>

      {/* Product Family */}
      <section className="container pb-16">
        <h2 className="text-3xl font-bold mb-8">EtherHaul Product Family</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* EH-614TX */}
          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <img
              src="/vendors/siklu/eh-614tx.webp"
              alt="Siklu EH-614TX"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">EH-614TX (60GHz)</h3>
            <p className="mb-3">
              Compact gigabit mmWave link used for intersections, LPR backhaul,
              secure lots, and short-to-medium municipal deployments.
            </p>
            <ul className="list-disc ml-5 text-gray-700">
              <li>1+ Gbps throughput</li>
              <li>Interference-free 60GHz</li>
              <li>Ideal for Avigilon & Verkada camera networks</li>
            </ul>
          </div>

          {/* EH-710TX */}
          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <img
              src="/vendors/siklu/eh-710tx.webp"
              alt="Siklu EH-710TX"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">EH-710TX (60GHz)</h3>
            <p className="mb-3">
              High-capacity 60GHz point-to-point bridge for dense municipal
              surveillance, multi-building connectivity, and high device-count sites.
            </p>
            <ul className="list-disc ml-5 text-gray-700">
              <li>Multi-gigabit capacity</li>
              <li>Optimized for urban environments</li>
              <li>Perfect for city-wide video deployments</li>
            </ul>
          </div>

          {/* EH-8010FX */}
          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <img
              src="/vendors/siklu/eh-8010fx.webp"
              alt="Siklu EH-8010FX"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">EH-8010FX (80GHz)</h3>
            <p className="mb-3">
              Fiber-class 10Gbps wireless for long-distance backhaul and municipal
              backbone use cases.
            </p>
            <ul className="list-disc ml-5 text-gray-700">
              <li>Up to 10Gbps full-duplex</li>
              <li>70/80GHz long-range performance</li>
              <li>Carrier-grade reliability</li>
            </ul>
          </div>

          {/* EH-8020FX */}
          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <img
              src="/vendors/siklu/eh-8020fx.png"
              alt="Siklu EH-8020FX"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">EH-8020FX (80GHz High Capacity)</h3>
            <p className="mb-3">
              Heavy-duty, high-power 80GHz wireless designed for demanding
              industrial, municipal, and long-distance connectivity.
            </p>
            <ul className="list-disc ml-5 text-gray-700">
              <li>High-power 80GHz backhaul</li>
              <li>Supports large multi-camera networks</li>
              <li>Ideal for police and critical infrastructure</li>
            </ul>
          </div>

          {/* EH-2600 */}
          <div className="p-6 border rounded-xl bg-white shadow-sm md:col-span-2">
            <img
              src="/vendors/siklu/eh-2600.webp"
              alt="Siklu EH-2600"
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">EH-2600 (Ultra Long-Range)</h3>
            <p className="mb-3">
              Ultra long-range 80GHz connectivity for industrial, municipal, and
              city-to-city wireless transport applications.
            </p>
            <ul className="list-disc ml-5 text-gray-700">
              <li>Long distance 70/80GHz link</li>
              <li>High-capacity video transport</li>
              <li>Great for large-scale Illinois deployments</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="container pb-16">
        <h2 className="text-3xl font-bold mb-6">Where Griffon Deploys Siklu</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Municipal Camera Networks</h3>
            <p>High-bandwidth backhaul for Avigilon & Verkada city surveillance and LPR.</p>
          </div>

          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Manufacturing Campuses</h3>
            <p>Fiber replacement for connecting warehouses, lots, and remote buildings.</p>
          </div>

          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-2">School District Networks</h3>
            <p>Reliable gigabit wireless for cameras, intercoms, and multi-building links.</p>
          </div>

          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Police & Secure Lots</h3>
            <p>Long-distance 80GHz transport for LPR trailers and secure lot monitoring.</p>
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
