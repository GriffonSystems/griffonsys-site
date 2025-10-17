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

      {/* ---------- Header ---------- */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Police Department – Wireless Camera Bridge
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Griffon Systems designed and installed a Siklu point-to-point wireless network
          connecting Avigilon surveillance and license-plate-recognition cameras across
          multiple intersections for a municipal police department.
        </p>
      </header>

      {/* ---------- Video Player ---------- */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full md:w-3/4 lg:w-2/3 rounded-2xl overflow-hidden shadow-lg bg-black group">
          <video
            className="w-full h-auto aspect-video rounded-2xl"
            controls
            preload="metadata"
            poster="/images/field/siklu-drone-thumb.jpg"
          >
            <source src="/videos/siklu-link-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play overlay (visible before play) */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 text-white text-lg font-semibold bg-black/60 px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="h-5 w-5"
              >
                <path d="M6.79 5.093a.5.5 0 0 0-.79.407v4.998a.5.5 0 0 0 .79.407l3.507-2.498a.5.5 0 0 0 0-.814L6.79 5.093z"/>
              </svg>
              Play Demo
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Caption ---------- */}
      <p className="text-center text-sm text-gray-500 mb-12">
        Drone footage of a Siklu EtherHaul wireless bridge connecting Avigilon LPR and fixed cameras.
      </p>

      {/* ---------- Description ---------- */}
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
