// src/routes/Training.jsx
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

/**
 * PlaylistPanel
 * - Left: selected video player
 * - Right: clickable thumbnails list
 * NOTE: Requires explicit {id,title} items for the right list.
 * (YouTube playlists can’t be reliably enumerated client-side without YouTube Data API.)
 */
function PlaylistPanel({ title, subtitle, playlistUrl, items = [] }) {
  const safeItems = Array.isArray(items) ? items.filter(Boolean).filter(v => v?.id) : []
  const [activeId, setActiveId] = React.useState(safeItems[0]?.id || "")

  React.useEffect(() => {
    if (!activeId && safeItems[0]?.id) setActiveId(safeItems[0].id)
  }, [activeId, safeItems])

  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="p-5 md:p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h4 className="text-xl font-bold text-gray-900">{title}</h4>
            {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
          </div>

          {playlistUrl ? (
            <a
              href={playlistUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-blue-700 hover:underline"
            >
              Open full playlist on YouTube →
            </a>
          ) : null}
        </div>
      </div>

      <div className="grid md:grid-cols-5">
        {/* Left: Player */}
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-gray-200">
          <div style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
            {activeId ? (
              <iframe
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                src={`https://www.youtube-nocookie.com/embed/${activeId}`}
                title="Training video player"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div
                style={{ position: "absolute", inset: 0 }}
                className="flex items-center justify-center text-gray-300 text-sm"
              >
                Add video IDs to enable the thumbnail list player.
              </div>
            )}
          </div>
        </div>

        {/* Right: Thumbnails list */}
        <div className="md:col-span-2">
          <div className="max-h-[420px] md:max-h-[520px] overflow-y-auto">
            {safeItems.length ? (
              safeItems.map((v) => {
                const isActive = v.id === activeId
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setActiveId(v.id)}
                    className={`w-full text-left flex gap-3 p-4 border-b border-gray-200 hover:bg-gray-50 ${
                      isActive ? "bg-gray-50" : ""
                    }`}
                    aria-label={`Play ${v.title}`}
                  >
                    <div className="w-28 shrink-0">
                      <div className="rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                          alt={v.title}
                          className="w-full h-auto block"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-semibold ${isActive ? "text-gray-900" : "text-gray-800"} line-clamp-2`}>
                        {v.title}
                      </div>
                      {v.note ? (
                        <div className="mt-1 text-xs text-gray-600 line-clamp-2">{v.note}</div>
                      ) : null}
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="p-5 text-sm text-gray-600">
                <div className="font-semibold text-gray-900">Thumbnails list not configured yet</div>
                <p className="mt-1">
                  To make the right-side thumbnails clickable, paste 6–12 video URLs from this playlist and we’ll extract the IDs.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
        active
          ? "bg-black text-white border-black"
          : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  )
}

function VendorSection({ eyebrow, title, desc, brandLink, children }) {
  return (
    <section className="mt-14 md:mt-20">
      <div className="container">
        <div className="flex items-start justify-between gap-6">
          <div>
            {eyebrow ? <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase">{eyebrow}</div> : null}
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
            {desc ? <p className="mt-2 text-gray-600 max-w-3xl">{desc}</p> : null}
          </div>
          {brandLink ? (
            <Link
              to={brandLink.href}
              className="hidden md:inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold hover:bg-gray-100 transition"
            >
              {brandLink.label} →
            </Link>
          ) : null}
        </div>

        <div className="mt-8">{children}</div>

        {brandLink ? (
          <div className="mt-6 md:hidden">
            <Link
              to={brandLink.href}
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold hover:bg-gray-100 transition"
            >
              {brandLink.label} →
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default function Training() {
  // ✅ Verkada playlists (you provided)
  const VERKADA_VIDEO_PLAYLIST_ID = "PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk"
  const VERKADA_ACCESS_PLAYLIST_ID = "PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX"

  const VERKADA_VIDEO_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${VERKADA_VIDEO_PLAYLIST_ID}`
  const VERKADA_ACCESS_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${VERKADA_ACCESS_PLAYLIST_ID}`

  /**
   * IMPORTANT:
   * To get the YouTube-style right-hand clickable list, we need video IDs.
   * Replace the VIDEO_ID_* with real IDs from the playlist.
   *
   * How to find an ID:
   * Open any playlist video → URL contains ...watch?v=VIDEO_ID&list=PLAYLIST_ID
   */
  const VERKADA_VIDEO_ITEMS = [
    // 👇 Replace these IDs with real ones from the Verkada VIDEO playlist:
    // Example placeholder titles based on what you showed in your screenshot.
    { id: "VIDEO_ID_1", title: "Searching in Command (Command User)", note: "Find incidents fast" },
    { id: "VIDEO_ID_2", title: "Viewing Historical Footage (Command User)", note: "Review timeline + playback" },
    { id: "VIDEO_ID_3", title: "Archiving & Incident Management (Command User)", note: "Operational workflow" },
    { id: "VIDEO_ID_4", title: "Sharing Camera Footage (Command User)", note: "Exports + permissions" },
    { id: "VIDEO_ID_5", title: "Maps & Floor Plans (Command User)", note: "Contextual views" },
    { id: "VIDEO_ID_6", title: "Key Camera Alerts (Command User)", note: "Signal over noise" },
  ]

  const VERKADA_ACCESS_ITEMS = [
    // 👇 Replace these IDs with real ones from the Verkada ACCESS CONTROL playlist:
    { id: "ACCESS_ID_1", title: "Access Overview (Command User)", note: "Day-to-day admin basics" },
    { id: "ACCESS_ID_2", title: "Users, Schedules & Permissions", note: "Most common admin tasks" },
    { id: "ACCESS_ID_3", title: "Credentials & Mobile Unlock", note: "What end-users actually do" },
    { id: "ACCESS_ID_4", title: "Door Events & Troubleshooting", note: "Fast diagnostics" },
  ]

  // Avigilon: keep official-only. Paste official playlist IDs when ready.
  const [avigilonTab, setAvigilonTab] = React.useState("video")
  const AVIGILON_VIDEO_PLAYLIST_URL = ""   // paste official Avigilon ACC/Unity playlist URL
  const AVIGILON_ACCESS_PLAYLIST_URL = ""  // paste official Avigilon ACM/Unity Access playlist URL

  // If you paste official Avigilon playlist URLs, you can also add items here (IDs) to drive the right-side list:
  const AVIGILON_VIDEO_ITEMS = []
  const AVIGILON_ACCESS_ITEMS = []

  const [verkadaTab, setVerkadaTab] = React.useState("video")

  return (
    <main className="bg-white">
      <Helmet>
        <title>Training | Verkada & Avigilon | Griffon Systems</title>
        <meta
          name="description"
          content="Training videos for Verkada and Avigilon, organized by video surveillance and access control — curated by Griffon Systems."
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
                YouTube-style training panels for{" "}
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
                Tip: Click a thumbnail on the right to play the video on the left.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verkada */}
      <VendorSection
        eyebrow="Vendor"
        title="Verkada Training"
        desc="Official Verkada playlists with a YouTube-style player + thumbnail list layout."
        brandLink={{ href: "/brands/verkada", label: "View Verkada Solutions" }}
      >
        <div className="flex flex-wrap gap-2 mb-5">
          <TabButton active={verkadaTab === "video"} onClick={() => setVerkadaTab("video")}>
            Video Surveillance
          </TabButton>
          <TabButton active={verkadaTab === "access"} onClick={() => setVerkadaTab("access")}>
            Access Control
          </TabButton>
        </div>

        {verkadaTab === "video" ? (
          <>
            <PlaylistPanel
              title="Verkada Video Security"
              subtitle="Start here. Click a video on the right to play it on the left."
              playlistUrl={VERKADA_VIDEO_PLAYLIST_URL}
              items={VERKADA_VIDEO_ITEMS}
            />
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> Define an incident workflow (who reviews, who exports, who notifies)
              and tune alerts so you don’t create alert fatigue.
            </div>
          </>
        ) : (
          <>
            <PlaylistPanel
              title="Verkada Access Control"
              subtitle="Admin tasks + real-world operations. Click a thumbnail to play."
              playlistUrl={VERKADA_ACCESS_PLAYLIST_URL}
              items={VERKADA_ACCESS_ITEMS}
            />
            <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
              <span className="font-semibold">Griffon tip:</span> Standardize door naming + hardware notes (strike type, REX type, contact location).
              It makes troubleshooting dramatically faster later.
            </div>
          </>
        )}
      </VendorSection>

      {/* Avigilon */}
      <VendorSection
        eyebrow="Vendor"
        title="Avigilon Training"
        desc="We’ll embed Avigilon/Motorola-published content only. Paste official playlists and this section becomes identical to Verkada."
        brandLink={{ href: "/brands/avigilon", label: "View Avigilon Solutions" }}
      >
        <div className="flex flex-wrap gap-2 mb-5">
          <TabButton active={avigilonTab === "video"} onClick={() => setAvigilonTab("video")}>
            Video Surveillance (ACC / Unity)
          </TabButton>
          <TabButton active={avigilonTab === "access"} onClick={() => setAvigilonTab("access")}>
            Access Control (ACM)
          </TabButton>
        </div>

        {avigilonTab === "video" ? (
          AVIGILON_VIDEO_PLAYLIST_URL ? (
            <PlaylistPanel
              title="Avigilon Video Surveillance (ACC / Unity)"
              subtitle="Official Avigilon/Motorola content. Click a thumbnail to play."
              playlistUrl={AVIGILON_VIDEO_PLAYLIST_URL}
              items={AVIGILON_VIDEO_ITEMS}
            />
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="font-bold text-gray-900">Avigilon video playlists needed</div>
              <p className="mt-2 text-sm text-gray-600">
                Paste an official Avigilon/Motorola YouTube playlist link for ACC/Unity training and I’ll wire it into this same layout.
              </p>
            </div>
          )
        ) : (
          AVIGILON_ACCESS_PLAYLIST_URL ? (
            <PlaylistPanel
              title="Avigilon Access Control (ACM)"
              subtitle="Official Avigilon/Motorola content. Click a thumbnail to play."
              playlistUrl={AVIGILON_ACCESS_PLAYLIST_URL}
              items={AVIGILON_ACCESS_ITEMS}
            />
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="font-bold text-gray-900">Avigilon access playlists needed</div>
              <p className="mt-2 text-sm text-gray-600">
                Paste an official Avigilon/Motorola YouTube playlist link for ACM training and I’ll wire it into this same layout.
              </p>
            </div>
          )
        )}

        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
          <span className="font-semibold">Griffon tip:</span> For public-sector and HR-sensitive environments,
          define an export/redaction workflow early (who approves, who exports, retention).
        </div>
      </VendorSection>

      {/* CTA */}
      <section className="mt-14 md:mt-20 pb-16">
        <div className="container">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-10">
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
