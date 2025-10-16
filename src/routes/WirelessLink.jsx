import React from 'react'
import { Helmet } from 'react-helmet'

export default function WirelessLink() {
  return (
    <main className="container py-12">
      <Helmet>
        <title>Police Department – Wireless Camera Bridge | Griffon Systems</title>
        <meta
          name="description"
          content="Siklu point-to-point wireless bridge connecting multiple Avigilon surveillance and LPR cameras for a municipal police department."
        />
        <link rel="canonical" href="https://www.griffonsys.com/from-the-field/wireless-link" />
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

      <div className="rounded-2xl overflow-hidden shadow-lg mb-10">
        <video
          className="w-full h-auto"
          controls
          preload="metadata"
          poster="/images/field/siklu-drone-thumb.jpg"
        >
          <source src="/videos/siklu-drone.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <section className="space-y-6 text-gray-700">
        <p>
          The project leveraged <strong>Siklu EtherHaul radios</strong> to provide
          high-bandwidth, low-latency connections between distributed Avigilon cameras,
          including fixed and LPR models, allowing real-time monitoring and recording at
          the department’s command center.
        </p>
        <p>
          Each pole-mounted camera node includes ruggedized switches and PoE power,
          configured to ensure reliable uptime and easy remote management through
          Avigilon Control Center (ACC).
        </p>
        <p>
          This deployment eliminated costly trenching or fiber runs while maintaining
          <strong> gigabit-class performance</strong> and full-time connectivity across
          all monitored intersections.
        </p>
      </section>
    </main>
  )
}
