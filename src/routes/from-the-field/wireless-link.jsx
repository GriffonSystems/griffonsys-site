import React from 'react'
import { Helmet } from 'react-helmet'

export default function WirelessLink() {
  return (
    <main className="container py-12 space-y-10">
      <Helmet>
        <title>Chicago Ridge Police – Wireless Camera Link | Griffon Systems</title>
        <meta
          name="description"
          content="Griffon Systems deployed a Siklu wireless bridge network for the Chicago Ridge Police Department, linking Avigilon street cameras and license plate recognition (LPR) systems."
        />
        <meta property="og:title" content="Chicago Ridge Police – Wireless Camera Network" />
        <meta
          property="og:description"
          content="A high-bandwidth Siklu point-to-point wireless system connecting Avigilon surveillance and LPR cameras for the Chicago Ridge Police Department."
        />
        <meta property="og:url" content="https://www.griffonsys.com/from-the-field/wireless-link" />
        <meta
          property="og:image"
          content="https://www.griffonsys.com/images/field/siklu-drone-thumb.jpg"
        />
        <link rel="canonical" href="https://www.griffonsys.com/from-the-field/wireless-link" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">
        Chicago Ridge Police Department — Wireless Camera Network
      </h1>

      <p className="text-gray-700 max-w-3xl mb-6">
        Griffon Systems engineered and deployed a <strong>Siklu wireless point-to-point bridge</strong>
        to connect multiple <strong>Avigilon surveillance and license plate recognition (LPR) cameras</strong>
        across the Village of Chicago Ridge, Illinois. This municipal project expanded real-time
        situational awareness while avoiding costly trenching or fiber runs.
      </p>

      <div className="rounded-xl overflow-hidden shadow-lg">
        <video
          src="/videos/siklu-link-demo.mp4"
          poster="/images/field/siklu-drone-thumb.jpg"
          controls
          className="w-full h-auto"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-2">Technology Used</h3>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            <li>Siklu EtherHaul mmWave bridge network</li>
            <li>Avigilon H5A and LPR cameras</li>
            <li>Municipal pole and intersection mounts</li>
            <li>Edge-managed PoE switching and surge protection</li>
          </ul>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-lg mb-2">Project Highlights</h3>
          <ul className="list-disc list-inside text-gray-700 text-sm">
            <li>High-speed wireless connectivity between remote intersections</li>
            <li>Improved LPR accuracy and response times for public safety</li>
            <li>Zero trenching required — rapid municipal deployment</li>
            <li>Secure, encrypted transmission supporting Avigilon ACC</li>
          </ul>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-3">Field Overview</h2>
        <p className="text-gray-700 max-w-3xl">
          This deployment demonstrates Griffon Systems’ expertise in integrating
          <strong> wireless infrastructure and enterprise-grade video systems</strong>
          for municipalities. The Chicago Ridge Police Department can now monitor high-traffic
          intersections in real time, leveraging Avigilon analytics and LPR data for enhanced
          community safety.
        </p>
      </section>
    </main>
  )
}
