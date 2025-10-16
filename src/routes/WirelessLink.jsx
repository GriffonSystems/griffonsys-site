// src/routes/WirelessLink.jsx
import React from 'react'
import { Helmet } from 'react-helmet'

export default function WirelessLink() {
  return (
    <main className="container py-12">
      <Helmet>
        <title>Police Department – Wireless Camera Bridge | Griffon Systems</title>
        <meta
          name="description"
          content="Siklu point-to-point wireless bridge connecting Avigilon surveillance and LPR cameras for a municipal police department in Illinois."
        />
        <meta
          property="og:title"
          content="Police Department – Wireless Camera Bridge | Griffon Systems"
        />
        <meta
          property="og:description"
          content="Griffon Systems deployed a Siklu wireless network linking Avigilon surveillance and license plate cameras for secure municipal monitoring."
        />
        <meta
          property="og:image"
          content="https://www.griffonsys.com/images/field/siklu-drone-thumb.jpg"
        />
        <meta property="og:type" content="video.other" />
        <meta
          property="og:url"
          content="https://www.griffonsys.com/from-the-field/wireless-link"
        />
        <link
          rel="canonical"
          href="https://www.griffonsys.com/from-the-field/wireless-link"
        />
      </Helmet>

      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-3">
          Police Department – Wireless Camera Bridge
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Griffon Systems designed and installed a Siklu point-to-point wireless network
          connecting Avigilon surveillance and license-plate-recognition cameras across
          multiple intersections for a municipal police department.
        </p>
      </header>

      <div className="rounded-2xl overflow-hidden shadow-lg mb-10 bg-black">
        <video
          className="w-full h-auto"
          controls
          preload="metadata"
          poster="/images/field/siklu-drone-thumb.jpg"
        >
          {/* ✅ Correct source path (no /public prefix) */}
          <source src="/videos/siklu-link-demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <section className="space-y-6 text-gray-700">
        <p>
          The project leveraged <strong>Siklu EtherHaul radios</strong> to deliver
          high-bandwidth, low-latency wireless connectivity between distributed Avigilon
          cameras — including both fixed and LPR models — allowing real-time monitoring and
          recording at the department’s command center.
        </p>
        <p>
          Each pole-mounted camera node includes ruggedized switches and PoE power,
          configured for reliable uptime and remote management through
          <strong> Avigilon Control Center (ACC)</strong>.
        </p>
        <p>
          This deployment eliminated the need for expensive trenching or fiber runs while
          maintaining <strong>gigabit-class performance</strong> and secure connectivity across
          all monitored intersections.
        </p>
      </section>

      <div className="mt-12 text-center">
        <a href="/contact" className="btn btn-primary inline-block">
          Discuss a Wireless Project
        </a>
      </div>
    </main>
  )
}
