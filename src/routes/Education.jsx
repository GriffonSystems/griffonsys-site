// src/routes/Education.jsx
import React from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Education() {
  const [showVideo, setShowVideo] = React.useState(false)
  const VIDEO_URL = "https://www.youtube.com/embed/hhfsZHMLMEk?autoplay=1"

  // Match Canonical.jsx non-www convention
  const pageUrl = "https://griffonsys.com/education"
  const ogImage = "https://griffonsys.com/images/industries/education.jpg"

  const title = "School & Campus Security Systems | K-12 & Higher-Ed | Griffon Systems"
  const description =
    "School and campus security systems for K-12 and Higher-Ed in Illinois. Video surveillance, access control, vaping/THC detection, and secure vestibule design with Avigilon, Verkada, and HALO sensors."

  return (
    <main className="container py-12">
      {/* ---- SEO ---- */}
      <Helmet>
        <title>{title}</title>

        {/* IMPORTANT:
            Do NOT set a page-level canonical here.
            Global Canonical.jsx is the single source of truth (non-www).
        */}
        <meta key="description" name="description" content={description} />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="School & Campus Security Systems | Griffon Systems" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={pageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="School & Campus Security Systems | Griffon Systems" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:url" content={pageUrl} />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "@id": "https://griffonsys.com/#education",
              url: pageUrl,
              name: "School & Campus Security Systems",
              description:
                "Security systems for K-12 schools and Higher-Ed campuses in Illinois, including video surveillance, access control, sensors and analytics.",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: ogImage,
              },
              about: {
                "@type": "Service",
                name: "School & Campus Security Systems",
                areaServed: "Illinois",
                provider: {
                  "@type": "LocalBusiness",
                  name: "Griffon Systems, Inc.",
                  telephone: "+16306070346",
                  url: "https://griffonsys.com/",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "650 West Grand Ave #206",
                    addressLocality: "Elmhurst",
                    addressRegion: "IL",
                    postalCode: "60126",
                    addressCountry: "US",
                  },
                },
              },
            }),
          }}
        />
      </Helmet>

      {/* ---- VIDEO MODAL ---- */}
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
              src={VIDEO_URL}
              title="Education Security Overview"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ---- HERO ---- */}
      <section className="mb-16">
        <div className="relative overflow-hidden rounded-3xl shadow-lg h-[40vh] md:h-[55vh]">
          <img
            src="/images/industries/education.jpg"
            alt="School and campus security systems in Illinois"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Optima" }}>
              Security for K-12 Schools & Campuses
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              Vestibules, hallways, parking lots, stadiums and classrooms — secured with modern video,
              access control and sensor technology.
            </p>

            <ul className="mt-4 text-sm md:text-base opacity-95 space-y-1">
              <li>• Secure entries & vestibules</li>
              <li>• Vaping / THC / air quality detection</li>
              <li>• Indoor / outdoor cameras with analytics</li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/contact?subject=School%20Security%20Assessment"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow"
              >
                Schedule School Security Assessment
              </Link>

              <button
                type="button"
                onClick={() => setShowVideo(true)}
                className="border border-white/70 text-white px-5 py-3 rounded-xl text-sm md:text-base hover:bg-white/10"
              >
                Watch Overview Video
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- OVERVIEW ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "Optima" }}>
          Built Around How Schools Actually Operate
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
          Schools need security that supports students and staff — not systems that feel like a fortress.
          We design solutions around arrival and dismissal, visitor management, after-school activities,
          athletics, and events, so cameras and access control match how your buildings are actually used.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mt-4">
          Griffon Systems secures K-12 buildings, district offices, transportation yards, stadiums,
          parking lots and Higher-Ed campuses across Illinois with Avigilon, Verkada and sensor-based
          monitoring platforms.
        </p>
      </section>

      {/* ---- CHALLENGES ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: "Optima" }}>
          We Solve Real-World School Security Challenges
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            { title: "Secure Entrances & Vestibules", text: "Control visitor flow with intercoms, cameras and controlled door release." },
            { title: "Hallway & Commons Coverage", text: "Monitor high-traffic corridors, stairwells, cafeterias and gyms." },
            { title: "Vaping / THC Detection", text: "Deploy HALO or similar sensors in restrooms and locker rooms." },
            { title: "Parking Lots & Stadiums", text: "LPR and long-lens cameras for drop-off lanes, bus loops and events." },
            { title: "After-Hours & Event Monitoring", text: "Adjust schedules for practices, games, performances and rentals." },
            { title: "District-Wide Visibility", text: "Centralized dashboards for principals, SROs and district administration." },
          ].map(({ title, text }) => (
            <div
              key={title}
              className="bg-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Optima" }}>
                {title}
              </h3>
              <p className="text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- PLATFORM BREAKDOWN ---- */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8" style={{ fontFamily: "Optima" }}>
          Avigilon, Verkada & Sensors — Unified for Schools
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "Optima" }}>
              Avigilon Unity
            </h3>
            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>High-resolution hallway and exterior cameras</li>
              <li>Analytics for loitering, crowding and object left</li>
              <li>Integration with access control at key doors</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "Optima" }}>
              Verkada (Cloud)
            </h3>
            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>Cloud-managed cameras for every building</li>
              <li>Privacy features for student-facing spaces</li>
              <li>Rapid video search for incidents and investigations</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "Optima" }}>
              Sensor & Alerting
            </h3>
            <ul className="list-disc pl-5 mt-3 text-gray-700 space-y-2">
              <li>Vape / THC / air quality sensors</li>
              <li>Noise and aggression detection in sensitive areas</li>
              <li>Alerts sent to administrators or SROs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ---- CASE STUDY ---- */}
      <section className="mb-24 relative rounded-3xl overflow-hidden shadow-xl">
        <div
          className="absolute inset-0 bg-center bg-black"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url('/images/industries/education.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
          }}
        />
        <div className="relative z-10 p-10 md:p-14 text-white max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "Optima" }}>
            Case Study: Suburban Middle School
          </h2>
          <p className="mb-4 opacity-95">
            A middle school needed better hallway coverage, secure vestibule control and a way to
            address vaping in restrooms.
          </p>
          <ul className="list-disc pl-5 opacity-95 space-y-1 mb-4">
            <li>Avigilon cameras covering entries, hallways and commons</li>
            <li>Access control at main vestibule and staff entries</li>
            <li>Vape/THC sensors deployed in restrooms</li>
            <li>Centralized monitoring for administration and SRO</li>
          </ul>
          <p className="opacity-95">
            Result: Improved response to student incidents, fewer blind spots and better visibility
            for administrators and school resource officers.
          </p>
        </div>
      </section>

      {/* ---- INTERNAL LINK HUB ---- */}
      <section className="text-center mb-24">
        <h3 className="text-xl font-semibold mb-4">Explore Related Solutions</h3>
        <ul className="space-y-2 text-blue-600 underline text-lg">
          <li><Link to="/industries">All Industries</Link></li>
          <li><Link to="/municipal">Municipal Facilities</Link></li>
          <li><Link to="/from-the-field">Project Highlights</Link></li>
        </ul>
      </section>

      {/* ---- FAQ ---- */}
      <section className="mb-24 max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6" style={{ fontFamily: "Optima" }}>
          School & Campus Security FAQs
        </h2>

        {[
          {
            q: "Do you work directly with school districts?",
            a: "Yes — we work with individual schools and full districts, coordinating with administrators, IT and facilities.",
          },
          {
            q: "Can you integrate cameras with access control and sensors?",
            a: "Yes — we design unified systems where cameras, door events and sensor alerts all connect.",
          },
          {
            q: "Do you support bond-funded or grant-based projects?",
            a: "Yes — we can help scope phased projects that align with funding cycles and RFP requirements.",
          },
          {
            q: "Can we monitor multiple schools from one location?",
            a: "Yes — Avigilon and Verkada both support district-wide dashboards for authorized staff.",
          },
        ].map(({ q, a }) => (
          <div key={q} className="mb-6">
            <h4 className="font-bold text-lg">{q}</h4>
            <p className="text-gray-700">{a}</p>
          </div>
        ))}
      </section>

      {/* ---- CTA ---- */}
      <section className="text-center mb-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "Optima" }}>
          Ready to Review Your School Security Plan?
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          Schedule a walkthrough or share your current floor plans — we’ll map cameras, doors and sensors.
        </p>
        <Link
          to="/contact?subject=School%20Security%20Assessment"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg shadow-md"
        >
          Schedule School Assessment
        </Link>
      </section>
    </main>
  )
}
