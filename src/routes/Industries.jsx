// src/routes/Industries.jsx
import React from "react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Industries() {
  const [showVideo, setShowVideo] = React.useState(false)
  const navigate = useNavigate()

  const items = [
    {
      title: "Manufacturing",
      desc: "Rugged systems for production floors and yards",
      img: "/images/industries/manufacturing.jpg",
      focal: "object-[center_25%]",
      link: "/manufacturing",
    },
    {
      title: "Education",
      desc: "K-12 and Higher-Ed with privacy controls and alerts",
      img: "/images/industries/education.jpg",
      video: "https://www.youtube.com/embed/hhfsZHMLMEk?autoplay=1",
      focal: "object-[center_10%]",
    },
    {
      title: "Municipal",
      desc: "City facilities, utilities, and law enforcement needs",
      img: "/images/industries/municipal.jpg",
      focal: "object-center",
      link: "/municipal",
    },
    {
      title: "Commercial",
      desc: "Offices, retail, and mixed-use properties",
      img: "/images/industries/commercial.jpg",
      focal: "object-[center_20%]",
      link: "/commercial",
    },
  ]

  return (
    <main className="container py-12">
      <Helmet>
        <title>Industries We Serve | Griffon Systems</title>
        <meta
          name="description"
          content="Griffon Systems provides security camera, access control, and wireless backhaul solutions for manufacturing, education, municipal, and commercial industries across Illinois."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Video Surveillance & Access Control",
              "provider": {
                "@type": "LocalBusiness",
                "name": "Griffon Systems, Inc.",
                "telephone": "630-607-0346",
                "areaServed": "Illinois",
              },
              "categories": ["Manufacturing", "Education", "Municipal", "Commercial"],
            }),
          }}
        />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Industries</h1>

      {/* ---- Video Modal ---- */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative bg-black rounded-2xl overflow-hidden shadow-xl w-[90%] max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={showVideo}
              title="Industry Video"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ---- GRID ---- */}
      <div className="grid md:grid-cols-2 gap-6">
        {items.map(({ title, desc, img, focal, video, link }) => (
          <div
            key={title}
            role="button"
            tabIndex={0}
            onClick={() => (video ? setShowVideo(video) : link && navigate(link))}
            onKeyDown={(e) => e.key === "Enter" && (video ? setShowVideo(video) : navigate(link))}
            className={`relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition ${
              video || link ? "cursor-pointer" : ""
            }`}
          >
            <img
              src={img}
              alt={title}
              className={`w-full h-48 md:h-60 object-cover transform transition-transform duration-700 hover:scale-105 ${focal}`}
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute bottom-0 p-6 text-white">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-1 text-sm opacity-90">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
