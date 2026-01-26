// src/routes/Home.jsx
import ReviewsMarqueeStatic from "../components/ReviewsMarqueeStatic"
import VideoHero from "../components/VideoHero"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Home() {
  // Match Canonical.jsx non-www convention
  const pageUrl = "https://griffonsys.com/"
  const ogImage = "https://griffonsys.com/images/home/cloud-video.jpg"

  const title = "Security Cameras & Access Control | Chicago & Illinois | Griffon Systems"
  const description =
    "Griffon Systems delivers enterprise video surveillance, access control, intercom, wireless backhaul, and managed security solutions across Chicagoland and Northern Illinois. Avigilon, Verkada, Alta."

  return (
    <main>
      <Helmet>
        <title>{title}</title>

        <meta key="description" name="description" content={description} />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Griffon Systems | Security Cameras & Access Control" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Griffon Systems | Security Cameras & Access Control" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:url" content={pageUrl} />

        {/* JSON-LD: WebSite (Home Page) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://griffonsys.com/#website",
              url: "https://griffonsys.com/",
              name: "Griffon Systems",
              description,
              publisher: {
                "@type": "Organization",
                name: "Griffon Systems, Inc.",
                url: "https://griffonsys.com/",
              },
            }),
          }}
        />
      </Helmet>

      {/* Hero contains main H1 + subhead */}
      <VideoHero />

      <section className="container py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Core Solutions</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {/* LPR Solution Card */}
          <div
            className="relative card p-6 flex flex-col h-full bg-cover bg-center rounded-2xl overflow-hidden"
            style={{ backgroundImage: "url('/images/lpr/lpr-hero.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col h-full text-white">
              <h3 className="text-xl font-semibold mb-2">License Plate Recognition (LPR)</h3>
              <p className="text-gray-100 mb-4">
                Real-time hotlist alerts and fast search powered by modern LPR cameras and analytics.
              </p>
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link className="btn btn-primary w-full sm:w-auto" to="/lpr">
                  Explore LPR Solutions
                </Link>
              </div>
            </div>
          </div>

          {/* Cloud Video Surveillance */}
          <div
            className="relative card p-6 flex flex-col h-full bg-cover bg-center rounded-2xl overflow-hidden"
            style={{ backgroundImage: "url('/images/home/cloud-video.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col h-full text-white">
              <h3 className="text-xl font-semibold mb-2">Cloud Video Surveillance</h3>
              <p className="text-gray-100 mb-4">
                Modern, scalable systems with AI analytics and secure remote access.
              </p>
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link className="btn btn-primary w-full sm:w-auto" to="/brands/verkada#video">
                  Explore Verkada
                </Link>
                <Link className="btn btn-primary w-full sm:w-auto" to="/brands/avigilon-cloud">
                  Explore Avigilon
                </Link>
              </div>
            </div>
          </div>

          {/* Cloud Access Control */}
          <div
            className="relative card p-6 flex flex-col h-full bg-cover bg-center rounded-2xl overflow-hidden"
            style={{ backgroundImage: "url('/images/home/cloud-access.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col h-full text-white">
              <h3 className="text-xl font-semibold mb-2">Cloud Access Control</h3>
              <p className="text-gray-100 mb-4">
                Mobile credentials, remote unlock, and cloud management for doors and elevators.
              </p>
              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link className="btn btn-primary w-full sm:w-auto" to="/brands/verkada#access">
                  Explore Verkada
                </Link>
                <Link className="btn btn-primary w-full sm:w-auto" to="/brands/alta">
                  Explore Alta Access
                </Link>
              </div>
            </div>
          </div>

          {/* On-Prem Video Surveillance */}
          <div
            className="relative card p-6 flex flex-col h-full bg-cover bg-center rounded-2xl overflow-hidden"
            style={{ backgroundImage: "url('/images/home/onprem.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col h-full text-white">
              <h3 className="text-xl font-semibold mb-2">On-Prem Video Surveillance</h3>
              <p className="text-gray-100 mb-4">
                Enterprise-grade reliability for campuses, plants, and regulated environments.
              </p>
              <div className="mt-auto">
                <Link className="btn btn-primary w-full md:w-auto" to="/brands/avigilon">
                  Explore Avigilon
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReviewsMarqueeStatic />
    </main>
  )
}
