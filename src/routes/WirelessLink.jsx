import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function WirelessLink() {
  return (
    <main className="container py-12">
      {/* ---------- SEO + Meta ---------- */}
      <Helmet>
        <title>Police Department – Wireless Camera Bridge | Griffon Systems</title>
        <meta
          name="description"
          content="Siklu point-to-point wireless bridge connecting multiple Avigilon surveillance and LPR cameras for a municipal police department."
        />
        <link rel="canonical" href="https://www.griffonsys.com/from-the-field/wireless-link" />
        <meta property="og:title" content="Police Department – Wireless Camera Bridge | Griffon Systems" />
        <meta
          property="og:description"
          content="Griffon Systems engineered a Siklu wireless bridge linking Avigilon surveillance and LPR cameras for a municipal police department."
        />
        <meta property="og:image" content="https://www.griffonsys.com/images/field/siklu-drone-thumb.jpg" />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content="https://www.griffonsys.com/from-the-field/wireless-link" />
      </Helmet>

      {/* ---------- Header ---------- */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-3">
          Police Department – Wireless Camera Bridge
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Griffon Systems designed and deployed a <strong>Siklu point-to-point wireless link</strong>
          connecting multiple <strong>Avigilon surveillance</strong> and <strong>LPR cameras</strong> across
          key intersections for a municipal police department — achieving gigabit-class throughput without trenching.
        </p>
      </header>

      {/* ---------- Video Section ---------- */}
      <div className="rounded-2xl overflow-hidden shadow-xl mb-10">
        <video
          className="w-full h-auto"
          controls
          preload="metadata"
          poster="/images/field/siklu-drone-thumb.jpg"
        >
          <source src="/videos/siklu-link-demo-web.mp4" type="video/mp4" />
          Your browser does not support the video tag. 
          <a href="/videos/siklu-link-demo-web.mp4" className="text-blue-600 underline">Download the video</a>.
        </video>
      </div>

      {/* ---------- Project Details ---------- */}
      <section className="space-y-6 text-gray-700">
        <p>
          The deployment utilized <strong>Siklu EtherHaul millimeter-wave radios</strong> to deliver
          high-bandwidth, low-latency communication between pole-mounted Avigilon cameras and the
          police command center.
        </p>
        <p>
          Each camera location includes <strong>PoE-powered switches</strong> housed in NEMA enclosures,
          providing rugged reliability and remote monitoring through <strong>Avigilon Control Center (ACC)</strong>.
        </p>
        <p>
          This wireless architecture replaced traditional fiber trenching — cutting costs while maintaining
          exceptional video performance, uptime, and scalability for future city-wide expansion.
        </p>
      </section>

      {/* ---------- Back Link ---------- */}
      <div className="mt-12 text-center">
        <Link to="/from-the-field" className="btn btn-outline">
          ← Back to From the Field
        </Link>
      </div>
    </main>
  )
}
