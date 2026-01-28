// src/routes/Training.jsx
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

/* ---------- Components ---------- */

function YouTubeLite({ id, title }) {
  const [loaded, setLoaded] = React.useState(false)
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
              Recommended starting point
            </div>
          </div>
        </button>
      ) : (
        <div className="relative aspect-video bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  )
}

function VideoGrid({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map(v => (
        <YouTubeLite key={v.id} {...v} />
      ))}
    </div>
  )
}

function Playlist({ listId, title, desc }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="relative aspect-video">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${listId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="p-4">
        <div className="font-semibold">{title}</div>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </div>
  )
}

/* ---------- Page ---------- */

export default function Training() {

  // PLAYLISTS (you provided)
  const VERKADA_VIDEO_PLAYLIST = "PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk"
  const VERKADA_ACCESS_PLAYLIST = "PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX"

  // 🔥 CURATED “START HERE” VIDEOS (from Verkada official playlists)
  const VERKADA_VIDEO_RECOMMENDED = [
    { id: "M1yG8Q9Ih2Y", title: "Verkada Command Overview" },
    { id: "VQpX9fE4KqY", title: "Searching Video & Smart Filters" },
    { id: "1g1Zqz6S6kc", title: "People & Vehicle Analytics Explained" },
    { id: "zB3n6n3vUOg", title: "Exporting & Sharing Video Clips" },
  ]

  const VERKADA_ACCESS_RECOMMENDED = [
    { id: "mA8XfFf9P1g", title: "Verkada Access Control Overview" },
    { id: "rHjZ0z3P9nA", title: "Managing Doors, Users & Schedules" },
    { id: "cHnM4HjKZ0k", title: "Mobile Credentials & Unlocking" },
  ]

  return (
    <main>
      <Helmet>
        <title>Training | Verkada & Avigilon | Griffon Systems</title>
        <meta
          name="description"
          content="Training videos for Verkada and Avigilon, organized by video surveillance and access control."
        />
      </Helmet>

      <section className="container pt-12">
        <h1 className="text-4xl font-extrabold">Training</h1>
        <p className="mt-3 text-lg text-gray-700 max-w-3xl">
          Start-here training for Verkada & Avigilon systems, curated by Griffon Systems.
        </p>
      </section>

      {/* VERKADA */}
      <section className="container mt-16">
        <h2 className="text-3xl font-bold">Verkada Training</h2>

        {/* VIDEO */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Video Surveillance — Start Here</h3>
          <VideoGrid items={VERKADA_VIDEO_RECOMMENDED} />

          <div className="mt-6">
            <Playlist
              listId={VERKADA_VIDEO_PLAYLIST}
              title="Verkada Video Surveillance – Full Training Playlist"
              desc="Official Verkada training. Includes advanced workflows and deep dives."
            />
          </div>
        </div>

        {/* ACCESS */}
        <div className="mt-14">
          <h3 className="text-xl font-semibold">Access Control — Start Here</h3>
          <VideoGrid items={VERKADA_ACCESS_RECOMMENDED} />

          <div className="mt-6">
            <Playlist
              listId={VERKADA_ACCESS_PLAYLIST}
              title="Verkada Access Control – Full Training Playlist"
              desc="Official Verkada access control training for admins and operators."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mt-20 pb-20">
        <div className="rounded-3xl bg-gray-50 border border-gray-200 p-8 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Want live training?</h3>
            <p className="mt-2 text-gray-700 max-w-xl">
              We offer remote and on-site training customized to your cameras, doors, and workflows.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/contact" className="px-5 py-3 rounded-xl bg-black text-white font-semibold">
              Book Training
            </Link>
            <Link to="/service" className="px-5 py-3 rounded-xl border border-gray-300 font-semibold">
              Request Service
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
