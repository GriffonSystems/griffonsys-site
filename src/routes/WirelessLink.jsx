// src/routes/WirelessLink.jsx
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

export default function WirelessLink() {
  // Match Canonical.jsx non-www convention
  const pageUrl = "https://griffonsys.com/from-the-field/wireless-link"
  const ogImage = "https://griffonsys.com/images/field/siklu-drone-thumb.jpg"

  const title = "Police Department Wireless Camera Bridge | Siklu + Avigilon | Griffon Systems"
  const description =
    "Siklu point-to-point wireless bridge connecting Avigilon surveillance and LPR cameras across multiple intersections for a municipal police department."

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Police Department – Wireless Camera Bridge",
    description,
    image: [ogImage],
    mainEntityOfPage: pageUrl,
    author: { "@type": "Organization", name: "Griffon Systems, Inc." },
    publisher: {
      "@type": "Organization",
      name: "Griffon Systems, Inc.",
      logo: {
        "@type": "ImageObject",
        url: "https://griffonsys.com/logos/griffon_logo.png",
      },
    },
  }

  return (
    <main className="container py-12">
      <Helmet>
        <title>{title}</title>

        {/* IMPORTANT:
            Do NOT set a page-level canonical here.
            Global Canonical.jsx is the single source of truth (non-www).
        */}
        <meta key="description" name="description" content={description} />

        {/* OpenGraph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:url" content={pageUrl} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Helmet>

      {/* ---------- Header ---------- */}
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Police Department – Wireless Camera Bridge
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Griffon Systems designed and installed a Siklu point-to-point wireless network connecting
          Avigilon surveillance and license-plate-recognition cameras across multiple intersections
          for a municipal police department.
        </p>

        {/* optional internal nav for crawl depth */}
        <div className="mt-4 text-sm">
          <Link className="text-blue-600 underline" to="/from-the-field">
            ← Back to From the Field
          </Link>
        </div>
      </header>

      {/* ---------- Video Player ---------- */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full md:w-3/4 lg:w-2/3 rounded-2xl overflow-hidden shadow-lg bg-black">
          <video
            className="w-full h-auto aspect-video rounded-2xl"
            controls
            muted
            playsInline
            preload="metadata"
            poster="/images/field/siklu-drone-thumb.jpg"
          >
            <source src="/videos/sikludemo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* ---------- Caption ---------- */}
      <p className="text-center text-sm text-gray-500 mb-12">
        Drone footage of a Siklu EtherHaul wireless bridge connecting Avigilon LPR and fixed cameras.
      </p>

      {/* ---------- Description ---------- */}
      <section className="space-y-6 text-gray-700 max-w-3xl mx-auto">
        <p>
          The project leveraged <strong>Siklu EtherHaul radios</strong> to provide high-bandwidth,
          low-latency connections between distributed Avigilon cameras, including fixed and LPR
          models, allowing real-time monitoring and recording at the department’s command center.
        </p>
        <p>
          Each pole-mounted camera node includes ruggedized switches and PoE power, configured to
          ensure reliable uptime and easy remote management through Avigilon Control Center (ACC).
        </p>
        <p>
          This deployment eliminated costly trenching or fiber runs while maintaining{" "}
          <strong>gigabit-class performance</strong> and full-time connectivity across all monitored
          intersections.
        </p>

        {/* Small internal link hub helps indexing */}
        <div className="pt-6 border-t text-sm text-gray-600">
          Related:&nbsp;
          <Link className="text-blue-600 underline" to="/brands/siklu">
            Siklu Wireless
          </Link>
          &nbsp;•&nbsp;
          <Link className="text-blue-600 underline" to="/brands/avigilon#video">
            Avigilon Cameras
          </Link>
          &nbsp;•&nbsp;
          <Link className="text-blue-600 underline" to="/lpr">
            LPR Solutions
          </Link>
        </div>
      </section>
    </main>
  )
}
