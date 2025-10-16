// src/routes/FromTheField.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function FromTheField() {
  const projects = [
    {
      title: 'Police Department – Wireless Camera Network',
      desc: 'Siklu wireless bridge linking Avigilon surveillance and LPR cameras across multiple intersections.',
      img: '/images/field/siklu-drone-thumb.jpg',
      link: '/from-the-field/wireless-link',
      tag: 'Municipal / Wireless'
    },
    {
      title: 'Avigilon Manufacturing Deployment',
      desc: 'AI-powered camera system providing full production-floor visibility and analytics.',
      img: '/images/field/avigilon-factory.jpg',
      link: '/from-the-field/avigilon-factory',
      tag: 'Manufacturing / Video'
    },
    {
      title: 'Municipal Camera Expansion',
      desc: 'Cloud-managed Verkada cameras providing traffic monitoring and remote oversight.',
      img: '/images/field/municipal-cameras.jpg',
      link: '/from-the-field/municipal',
      tag: 'Verkada / City'
    }
  ]

  return (
    <main className="container py-12">
      {/* ✅ SEO + OG metadata */}
      <Helmet>
        <title>From the Field | Griffon Systems</title>
        <meta
          name="description"
          content="Real-world installations by Griffon Systems — from municipal camera networks and wireless bridges to manufacturing video and access projects across Illinois."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="From the Field | Griffon Systems" />
        <meta
          property="og:description"
          content="Explore Griffon Systems’ real deployments of Avigilon, Verkada, and Siklu technology — bringing secure connectivity and intelligent surveillance to Illinois."
        />
        <meta property="og:image" content="https://www.griffonsys.com/images/field/siklu-drone-thumb.jpg" />
        <meta property="og:url" content="https://www.griffonsys.com/from-the-field" />
        <link rel="canonical" href="https://www.griffonsys.com/from-the-field" />
      </Helmet>

      {/* ✅ LocalBusiness / Service schema for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Video Surveillance & Wireless Integration",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Griffon Systems, Inc.",
              "image": "https://www.griffonsys.com/logo.png",
              "url": "https://www.griffonsys.com",
              "telephone": "+16306070346",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "650 West Grand Ave #206",
                "addressLocality": "Elmhurst",
                "addressRegion": "IL",
                "postalCode": "60126",
                "addressCountry": "US"
              },
              "areaServed": ["Chicago", "Elmhurst", "Naperville", "Illinois"],
              "sameAs": [
                "https://www.linkedin.com/company/griffon-systems-inc/"
              ]
            },
            "description":
              "A showcase of Griffon Systems’ field installations — wireless bridges, camera networks, and cloud-managed security deployments across Illinois."
          }),
        }}
      />

      {/* ---------- Hero ---------- */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">From the Field</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Stories and footage from real installations by the Griffon Systems team — featuring
          Avigilon, Verkada, and Siklu deployments that keep Illinois connected and secure.
        </p>
      </header>

      {/* ---------- Grid of projects ---------- */}
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p) => (
          <Link
            key={p.title}
            to={p.link}
            className="group card overflow-hidden hover:shadow-xl transition flex flex-col"
          >
            <div className="relative">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {p.tag}
              </div>
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
              <p className="text-gray-600 text-sm mb-3 flex-grow">{p.desc}</p>
              <span className="text-blue-600 font-medium mt-auto">View Project →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
