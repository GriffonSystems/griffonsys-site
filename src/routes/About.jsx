// src/routes/About.jsx
import React from "react"
import { Helmet } from "react-helmet"

export default function About() {
  const POST_1 = "7182407145689169920"
  const POST_2 = "7378967268157927425"

  return (
    <main className="container py-12">
      {/* ---- SEO ---- */}
      <Helmet>
        <title>About Griffon Systems | Illinois Security Integrator</title>
        <meta
          name="description"
          content="Griffon Systems designs and deploys enterprise IP video surveillance and access control systems — trusted by manufacturing, municipal, education, and commercial organizations across Illinois."
        />
        <link rel="canonical" href="https://www.griffonsys.com/about" />

        {/* OpenGraph */}
        <meta property="og:title" content="About Griffon Systems" />
        <meta
          property="og:description"
          content="Meet the Illinois-based team behind Avigilon, Verkada, Axis, and municipal wireless deployments."
        />
        <meta property="og:image" content="https://www.griffonsys.com/logo.png" />
        <meta property="og:url" content="https://www.griffonsys.com/about" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* JSON-LD Brand / LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Griffon Systems, Inc.",
              url: "https://www.griffonsys.com",
              logo: "https://www.griffonsys.com/logo.png",
              description:
                "Illinois-based security integrator specializing in Avigilon, Verkada, and Axis systems.",
              areaServed: "Illinois",
              address: {
                "@type": "PostalAddress",
                streetAddress: "650 West Grand Ave #206",
                addressLocality: "Elmhurst",
                addressRegion: "IL",
                postalCode: "60126",
                addressCountry: "US",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+16306070346",
                contactType: "Sales",
                areaServed: "US",
              },
              sameAs: [
                "https://www.linkedin.com/company/griffon-systems-inc/",
                "https://www.linkedin.com/in/paul-grefenstette-0667211/",
              ],
            }),
          }}
        />
      </Helmet>

      {/* ---------- Header ---------- */}
      <h1 className="text-3xl font-bold mb-4">About Griffon Systems</h1>

      <p className="text-lg text-gray-800 mb-10 max-w-3xl">
        Griffon Systems, Inc. designs and deploys high-resolution IP video surveillance systems
        from leading manufacturers including <strong>Avigilon</strong>, <strong>Verkada</strong>, and <strong>Axis</strong>.
        Our mission is to deliver intelligent, scalable, and secure technology solutions
        that help organizations protect their people, property, and productivity.
      </p>

      {/* ---------- Video Interview ---------- */}
      <section className="mb-16 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Industry Insight: Ceragon Interview
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Griffon Systems president Paul Grefenstette joins Ceragon Networks to discuss wireless backhaul,
          municipal camera networks, and future trends in public-safety connectivity.
        </p>
        <div className="aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/_iCiRTbhx0w"
            title="Ceragon Interview – Griffon Systems"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-6">
          <a
            href="/from-the-field"
            className="inline-block px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Watch More Field Interviews →
          </a>
        </div>
      </section>

      {/* ---------- LinkedIn Posts ---------- */}
      <section className="bg-gray-50 py-10 px-6 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Recent LinkedIn Highlights
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative w-full h-[520px] rounded-xl overflow-hidden border shadow-sm bg-white">
            <iframe
              loading="lazy"
              className="absolute inset-0 w-full h-full"
              src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${POST_1}`}
              title="LinkedIn post 1"
              allow="encrypted-media; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className="relative w-full h-[520px] rounded-xl overflow-hidden border shadow-sm bg-white">
            <iframe
              loading="lazy"
              className="absolute inset-0 w-full h-full"
              src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${POST_2}`}
              title="LinkedIn post 2"
              allow="encrypted-media; clipboard-write"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>

        <noscript>You need JavaScript enabled to view LinkedIn embeds.</noscript>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-4">Ready to Connect?</h2>
        <p className="text-gray-600 mb-6">
          Follow us on LinkedIn for real-world deployment stories and new technology updates.
        </p>
        <a
          href="https://www.linkedin.com/in/paul-grefenstette-0667211"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Visit Our LinkedIn →
        </a>
      </section>
    </main>
  )
}
