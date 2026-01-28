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
  // ✅ Verkada playlists (you provided)
  const VERKADA_VIDEO_PLAYLIST = "PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk"
  const VERKADA_ACCESS_PLAYLIST = "PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX"

  // ✅ Avigilon: keep OFFICIAL-only. If you have official Avigilon playlist links,
  // paste them and we’ll embed playlists instead of individual IDs.
  // For now, keep this minimal and official-safe:
  const AVIGILON_RECOMMENDED_VIDEO = [] // optional curated official video IDs later
  const AVIGILON_VIDEO_PLAYLIST = "" // official Avigilon video training playlist ID (if you have it)
  const AVIGILON_ACCESS_PLAYLIST = "" // official Avigilon ACM/Unity access playlist ID (if you have it)

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
              desc="Official Verkada training playlists, plus Griffon best-practice notes."
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
              title="Verkada Video Surveillance — Training Playlist"
              desc="Command basics, search, alerts, mobile workflows, and exporting — maintained by Verkada."
            />
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> Define an “incident workflow” (who reviews, who exports, who notifies),
              and tune alerts so you don’t create alert fatigue.
            </div>
          </Subsection>

          <Subsection title="Access Control">
            <YouTubePlaylist
              listId={VERKADA_ACCESS_PLAYLIST}
              title="Verkada Access Control — Training Playlist"
              desc="Doors, schedules, users, credentials, mobile unlock, and everyday administration — maintained by Verkada."
            />
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> Standardize door naming + hardware notes
              (strike type, REX type, contact location). It makes troubleshooting dramatically faster later.
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
              desc="We’ll embed Avigilon/Motorola-published videos only (no 3rd-party integrator content)."
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
            {AVIGILON_VIDEO_PLAYLIST ? (
              <YouTubePlaylist
                listId={AVIGILON_VIDEO_PLAYLIST}
                title="Avigilon Video Surveillance — Training Playlist"
                desc="Official Avigilon/Motorola training content."
              />
            ) : AVIGILON_RECOMMENDED_VIDEO.length ? (
              <VideoGrid items={AVIGILON_RECOMMENDED_VIDEO} />
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="font-semibold text-gray-900">Avigilon official videos (add playlist link)</div>
                <p className="mt-1 text-sm text-gray-600">
                  Paste an official Avigilon/Motorola YouTube playlist link for ACC/Unity training and I’ll wire it in as a playlist embed.
                  That keeps it current and avoids third-party sources.
                </p>
              </div>
            )}

            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> For municipalities and HR-sensitive environments,
              define an export/redaction workflow early (who approves, who exports, retention).
            </div>
          </Subsection>

          <Subsection title="Access Control (ACM)">
            {AVIGILON_ACCESS_PLAYLIST ? (
              <YouTubePlaylist
                listId={AVIGILON_ACCESS_PLAYLIST}
                title="Avigilon Access Control (ACM) — Training Playlist"
                desc="Official Avigilon/Motorola access-control training."
              />
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="font-semibold text-gray-900">Avigilon ACM official videos (add playlist link)</div>
                <p className="mt-1 text-sm text-gray-600">
                  Paste an official Avigilon/Motorola ACM playlist link and I’ll embed it here.
                </p>
              </div>
            )}

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
