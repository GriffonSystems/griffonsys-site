// src/routes/Training.jsx
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

function YouTubeLite({ id, title }) {
  const [loaded, setLoaded] = React.useState(false)

  // Basic guard so empty IDs don’t render broken iframes
  if (!id) return null

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {!loaded ? (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="w-full text-left"
          aria-label={`Play video: ${title}`}
        >
          <div className="relative aspect-video bg-gray-100">
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-white/95 px-5 py-3 shadow-md flex items-center gap-2">
                <span className="inline-flex w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-black ml-1" />
                <span className="text-sm font-semibold text-gray-900">Play</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="font-semibold text-gray-900">{title}</div>
            <div className="text-sm text-gray-600 mt-1">
              Click to load the video (improves page speed).
            </div>
          </div>
        </button>
      ) : (
        <>
          <div className="relative aspect-video bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
              title={title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="p-4">
            <div className="font-semibold text-gray-900">{title}</div>
          </div>
        </>
      )}
    </div>
  )
}

function VideoGrid({ items }) {
  if (!items?.length) return null
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((v) => (
        <YouTubeLite key={v.id + v.title} id={v.id} title={v.title} />
      ))}
    </div>
  )
}

function SectionHeader({ title, desc }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
        {desc ? <p className="mt-2 text-gray-600 max-w-3xl">{desc}</p> : null}
      </div>
    </div>
  )
}

function Subsection({ title, children }) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export default function Training() {
  // ✅ Replace these placeholder IDs with real YouTube IDs.
  // Tip: YouTube ID is the part after "v=" in the URL.
  const VERKADA = {
    video: [
      { id: "VIDEO_ID_HERE", title: "Verkada Video — Getting Started in Command" },
      { id: "VIDEO_ID_HERE", title: "Verkada Video — Searching Footage & Smart Filters" },
      { id: "VIDEO_ID_HERE", title: "Verkada Video — Alerts & Notifications (Best Practices)" },
    ],
    access: [
      { id: "VIDEO_ID_HERE", title: "Verkada Access — Adding Doors, Schedules, and Users" },
      { id: "VIDEO_ID_HERE", title: "Verkada Access — Managing Credentials & Mobile Unlock" },
      { id: "VIDEO_ID_HERE", title: "Verkada Access — Troubleshooting a Door (Reader, REX, Contact)" },
    ],
  }

  const AVIGILON = {
    video: [
      { id: "VIDEO_ID_HERE", title: "Avigilon Video — ACC/Unity Basics: Live View & Layouts" },
      { id: "VIDEO_ID_HERE", title: "Avigilon Video — Searching & Exporting Video" },
      { id: "VIDEO_ID_HERE", title: "Avigilon Video — Analytics, Rules, and Alerts" },
    ],
    access: [
      { id: "VIDEO_ID_HERE", title: "Avigilon Access — ACM Basics: Users, Groups, and Roles" },
      { id: "VIDEO_ID_HERE", title: "Avigilon Access — Door Schedules, Holidays, and Unlock Modes" },
      { id: "VIDEO_ID_HERE", title: "Avigilon Access — Troubleshooting Door Events & Hardware" },
    ],
  }

  return (
    <main className="bg-white">
      <Helmet>
        <title>Training | Verkada & Avigilon Video + Access Control | Griffon Systems</title>
        <meta
          name="description"
          content="Curated training videos for Verkada and Avigilon: video surveillance and access control basics, best practices, and troubleshooting — from Griffon Systems in Chicagoland."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-10 md:pt-14">
        <div className="container">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-10">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                Training
              </h1>
              <p className="mt-3 text-gray-700 text-lg">
                Verkada & Avigilon training videos curated by Griffon Systems.
                Quick how-tos for <span className="font-semibold">Video Surveillance</span> and{" "}
                <span className="font-semibold">Access Control</span>.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-white font-semibold hover:bg-gray-800 transition"
                >
                  Request a Training Session
                </Link>
                <Link
                  to="/resources/verkada-vs-avigilon"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-900 font-semibold hover:bg-gray-100 transition"
                >
                  Verkada vs Avigilon
                </Link>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                Tip: We recommend bookmarking this page for new staff onboarding and refreshers.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verkada */}
      <section className="mt-12 md:mt-16">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <SectionHeader
              title="Verkada Training"
              desc="Short, practical videos for teams using Verkada Command — organized by Video Surveillance and Access Control."
            />
            <div className="hidden md:block">
              <Link
                to="/brands/verkada"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold hover:bg-gray-100 transition"
              >
                View Verkada Solutions →
              </Link>
            </div>
          </div>

          <Subsection title="Video Surveillance">
            <VideoGrid items={VERKADA.video} />
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> Build a shared “incident workflow” (who reviews,
              who exports, who notifies) so your team doesn’t scramble when something happens.
            </div>
          </Subsection>

          <Subsection title="Access Control">
            <VideoGrid items={VERKADA.access} />
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> Standardize door naming + hardware notes (strike type,
              REX type, contact location). It makes troubleshooting 10× faster later.
            </div>
          </Subsection>

          <div className="mt-6 md:hidden">
            <Link
              to="/brands/verkada"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold hover:bg-gray-100 transition"
            >
              View Verkada Solutions →
            </Link>
          </div>
        </div>
      </section>

      {/* Avigilon */}
      <section className="mt-14 md:mt-20 pb-16">
        <div className="container">
          <div className="flex items-center justify-between gap-4">
            <SectionHeader
              title="Avigilon Training"
              desc="Training videos for Avigilon ACC/Unity (video) and ACM (access control) — organized for quick onboarding and troubleshooting."
            />
            <div className="hidden md:block">
              <Link
                to="/brands/avigilon"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold hover:bg-gray-100 transition"
              >
                View Avigilon Solutions →
              </Link>
            </div>
          </div>

          <Subsection title="Video Surveillance (ACC / Unity)">
            <VideoGrid items={AVIGILON.video} />
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> For exports, define a policy for watermarking,
              retention, and who can share externally—especially for public-sector requests.
            </div>
          </Subsection>

          <Subsection title="Access Control (ACM)">
            <VideoGrid items={AVIGILON.access} />
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> Keep your door hardware “as-builts” and reader/lock
              schedules documented. Most service calls are configuration + expectations, not broken gear.
            </div>
          </Subsection>

          <div className="mt-6 md:hidden">
            <Link
              to="/brands/avigilon"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold hover:bg-gray-100 transition"
            >
              View Avigilon Solutions →
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-900">Want us to train your team live?</h2>
                <p className="mt-2 text-gray-700">
                  We can run a 60–90 minute remote session (or on-site) tailored to your cameras, doors,
                  and daily workflows.
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-white font-semibold hover:bg-gray-800 transition"
                >
                  Book Training
                </Link>
                <Link
                  to="/service"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-900 font-semibold hover:bg-gray-100 transition"
                >
                  Request Service
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-500">
            Note: All videos are embedded from their respective publishers. Griffon Systems is not affiliated with or endorsed by YouTube.
          </div>
        </div>
      </section>
    </main>
  )
}
