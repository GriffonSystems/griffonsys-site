// src/routes/Training.jsx
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

/**
 * Lightweight YouTube embed (click-to-load) for performance.
 * Use for individual "recommended" videos.
 */
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

/**
 * Playlist embed for “official / auto-updating” training.
 * Great for Verkada + for Avigilon access control playlists.
 */
function YouTubePlaylist({ listId, title, desc }) {
  if (!listId) return null
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="relative aspect-video bg-black">
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
        <div className="font-semibold text-gray-900">{title}</div>
        {desc ? <p className="mt-1 text-sm text-gray-600">{desc}</p> : null}
      </div>
    </div>
  )
}

function VideoGrid({ items }) {
  if (!items?.length) return null
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((v) => (
        <YouTubeLite key={`${v.id}-${v.title}`} id={v.id} title={v.title} />
      ))}
    </div>
  )
}

function SectionHeader({ title, desc }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
      {desc ? <p className="mt-2 text-gray-600 max-w-3xl">{desc}</p> : null}
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
  // ✅ Verkada official playlist (you provided)
  const VERKADA_VIDEO_PLAYLIST = "PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX"

  // OPTIONAL: If you later find a Verkada Access playlist, drop the list ID here.
  // If you don’t have one, we can hand-pick 3–6 videos later.
  const VERKADA_ACCESS_PLAYLIST = "" // e.g. "PLAYLIST_ID_HERE"

  // ✅ Avigilon: curated, buyer-friendly “confidence builders”
  // Focus: find events fast, share/export, prove usability.
  const AVIGILON_RECOMMENDED_VIDEO = [
    { id: "ykMnzyIsIr4", title: "Avigilon Appearance Search — Introduction" },
    { id: "E-RFQHSgzlo", title: "How to Use Appearance Search in ACC" },
    { id: "yYpD09-pypc", title: "Thumbnail Search in Avigilon ACC 7" },
    { id: "vptadx5IdbI", title: "How to Export Video in ACC" },
    { id: "GfNwVWJfegU", title: "ACC — Sharing Video (Bookmarks, Snapshots, Export)" },
  ]

  // ✅ Avigilon access control playlist (ACM/Access Control topics)
  // This is low-maintenance and avoids outdated one-off videos.
  const AVIGILON_ACCESS_PLAYLIST = "PLKZM7d9bODv5IiVlCQjG_paOVYw3bGSeZ"

  return (
    <main className="bg-white">
      <Helmet>
        <title>Training | Verkada & Avigilon Video + Access Control | Griffon Systems</title>
        <meta
          name="description"
          content="Training videos for Verkada and Avigilon, organized by Video Surveillance and Access Control — curated by Griffon Systems in Chicagoland."
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
                Verkada & Avigilon training — organized for{" "}
                <span className="font-semibold">Video Surveillance</span> and{" "}
                <span className="font-semibold">Access Control</span>.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-white font-semibold hover:bg-gray-800 transition"
                >
                  Request a Live Training Session
                </Link>
                <Link
                  to="/resources/verkada-vs-avigilon"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-900 font-semibold hover:bg-gray-100 transition"
                >
                  Verkada vs Avigilon
                </Link>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                Bookmark this page for onboarding new staff and refreshers.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verkada */}
      <section className="mt-12 md:mt-16">
        <div className="container">
          <div className="flex items-start justify-between gap-6">
            <SectionHeader
              title="Verkada Training"
              desc="Use the official Verkada playlist for always-current training, plus Griffon best-practice notes below."
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
            <YouTubePlaylist
              listId={VERKADA_VIDEO_PLAYLIST}
              title="Verkada Video Surveillance — Official Training Playlist"
              desc="Command basics, search, alerts, and everyday workflows (auto-updated by Verkada)."
            />
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> Most teams only use 20–30% of the platform.
              Standardize alert rules + an “incident workflow” (who reviews, who exports, who notifies) to avoid alert fatigue.
            </div>
          </Subsection>

          <Subsection title="Access Control">
            {VERKADA_ACCESS_PLAYLIST ? (
              <YouTubePlaylist
                listId={VERKADA_ACCESS_PLAYLIST}
                title="Verkada Access Control — Training Playlist"
                desc="Doors, schedules, users, credentials, and troubleshooting."
              />
            ) : (
              <>
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="font-semibold text-gray-900">Recommended Verkada Access videos (coming next)</div>
                  <p className="mt-1 text-sm text-gray-600">
                    We’ll feature 5–7 short “admin confidence” videos (users, schedules, mobile creds, door troubleshooting).
                    If you send a Verkada Access playlist link (or a few URLs), I’ll drop them in and remove this placeholder.
                  </p>
                </div>
              </>
            )}

            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> Standardize door naming + hardware notes (strike type, REX type, contact location).
              It makes troubleshooting dramatically faster later.
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
          <div className="flex items-start justify-between gap-6">
            <SectionHeader
              title="Avigilon Training"
              desc="Buyer-friendly training that highlights speed-to-evidence, analytics, and day-to-day usability."
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
            <div className="rounded-2xl border border-gray-200 bg-white p-5 mb-6">
              <div className="font-semibold text-gray-900">Recommended (Start Here)</div>
              <p className="mt-1 text-sm text-gray-600">
                These are the videos that most directly help decision-makers and administrators understand why Avigilon is powerful *and* usable.
              </p>
            </div>

            <VideoGrid items={AVIGILON_RECOMMENDED_VIDEO} />

            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> If you’re public-sector, define an export + retention policy early
              (watermarking, who can share externally, redaction workflow). It prevents headaches later.
            </div>
          </Subsection>

          <Subsection title="Access Control (ACM)">
            <YouTubePlaylist
              listId={AVIGILON_ACCESS_PLAYLIST}
              title="Avigilon Access Control (ACM) — Training Playlist"
              desc="Overview, monitoring events/alarms, hardware monitoring, and daily admin workflows."
            />
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> Access control “pain” is usually schedules + expectations,
              not broken gear. Document holidays, unlock modes, and who approves changes.
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
                  We can run a 60–90 minute remote session (or on-site) tailored to your cameras, doors, and daily workflows.
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
            Note: Videos are embedded from their respective publishers. Griffon Systems is not affiliated with or endorsed by YouTube.
          </div>
        </div>
      </section>
    </main>
  )
}
