// src/routes/Training.jsx
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

/**
 * Extract the YouTube video ID from a URL.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID&...
 * - https://youtu.be/VIDEO_ID?...
 */
function getYouTubeId(url) {
  try {
    const u = new URL(url)
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "").trim()
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v") || ""
    return ""
  } catch {
    return ""
  }
}

/**
 * Fetch oEmbed metadata for a YouTube URL (title, thumbnail, author)
 * No API key required.
 */
async function fetchOEmbed(url) {
  const endpoint = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`
  const res = await fetch(endpoint)
  if (!res.ok) throw new Error(`oEmbed fetch failed: ${res.status}`)
  return await res.json()
}

/**
 * PlaylistPanel
 * - Left: selected video player
 * - Right: clickable thumbnails list (YouTube-like)
 * - Titles/thumbnails auto-load via oEmbed so they always match the actual video.
 */
function PlaylistPanel({ title, subtitle, playlistUrl, items = [] }) {
  const baseItems = React.useMemo(() => {
    const safe = Array.isArray(items) ? items.filter(Boolean) : []
    return safe
      .map((v) => {
        const id = v.id || getYouTubeId(v.url || "")
        return {
          id,
          url: v.url || (id ? `https://www.youtube.com/watch?v=${id}` : ""),
          // optional “Griffon note”
          note: v.note || "",
          // optional fallback title if oEmbed fails
          fallbackTitle: v.title || "",
        }
      })
      .filter((v) => v.id && v.url)
  }, [items])

  const [activeId, setActiveId] = React.useState(baseItems[0]?.id || "")
  const [meta, setMeta] = React.useState({}) // id -> { title, thumbnail_url, author_name }

  React.useEffect(() => {
    if (!activeId && baseItems[0]?.id) setActiveId(baseItems[0].id)
  }, [activeId, baseItems])

  React.useEffect(() => {
    let cancelled = false

    async function run() {
      const toFetch = baseItems.filter((v) => !meta[v.id])
      if (!toFetch.length) return

      // Fetch sequentially (small list, avoids hammering)
      for (const v of toFetch) {
        try {
          const data = await fetchOEmbed(v.url)
          if (cancelled) return
          setMeta((m) => ({
            ...m,
            [v.id]: {
              title: data?.title || v.fallbackTitle || "YouTube Video",
              thumbnail_url:
                data?.thumbnail_url || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
              author_name: data?.author_name || "",
            },
          }))
        } catch {
          if (cancelled) return
          setMeta((m) => ({
            ...m,
            [v.id]: {
              title: v.fallbackTitle || "YouTube Video",
              thumbnail_url: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
              author_name: "",
            },
          }))
        }
      }
    }

    run()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseItems])

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
                Add videos to enable playback.
              </div>
            )}
          </div>
        </div>

        {/* Right: Thumbnails list */}
        <div className="md:col-span-2">
          <div className="max-h-[420px] md:max-h-[520px] overflow-y-auto">
            {baseItems.length ? (
              baseItems.map((v) => {
                const isActive = v.id === activeId
                const m = meta[v.id]
                const displayTitle = m?.title || v.fallbackTitle || `Video (${v.id})`
                const thumb =
                  m?.thumbnail_url || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`

                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setActiveId(v.id)}
                    className={`w-full text-left flex gap-3 p-4 border-b border-gray-200 hover:bg-gray-50 ${
                      isActive ? "bg-gray-50" : ""
                    }`}
                    aria-label={`Play ${displayTitle}`}
                  >
                    <div className="w-28 shrink-0">
                      <div className="rounded-xl overflow-hidden bg-gray-100">
                        <img
                          src={thumb}
                          alt={displayTitle}
                          className="w-full h-auto block"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div
                        className={`text-sm font-semibold ${
                          isActive ? "text-gray-900" : "text-gray-800"
                        } line-clamp-2`}
                      >
                        {displayTitle}
                      </div>

                      {v.note ? (
                        <div className="mt-1 text-xs text-gray-600 line-clamp-2">{v.note}</div>
                      ) : null}

                      {m?.author_name ? (
                        <div className="mt-1 text-[11px] text-gray-500 line-clamp-1">
                          {m.author_name}
                        </div>
                      ) : null}
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="p-5 text-sm text-gray-600">No videos added yet.</div>
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

function VendorSection({ eyebrow, title, desc, brandHref, brandLabel, children }) {
  return (
    <section className="mt-14 md:mt-20">
      <div className="container">
        <div className="flex items-start justify-between gap-6">
          <div>
            {eyebrow ? (
              <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                {eyebrow}
              </div>
            ) : null}
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
              {title}
            </h2>
            {desc ? <p className="mt-2 text-gray-600 max-w-3xl">{desc}</p> : null}
          </div>

          {brandHref ? (
            <Link
              to={brandHref}
              className="hidden md:inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold hover:bg-gray-100 transition"
            >
              {brandLabel || "View"} →
            </Link>
          ) : null}
        </div>

        <div className="mt-8">{children}</div>

        {brandHref ? (
          <div className="mt-6 md:hidden">
            <Link
              to={brandHref}
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-900 font-semibold hover:bg-gray-100 transition"
            >
              {brandLabel || "View"} →
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default function Training() {
  // ✅ Verkada playlists
  const VERKADA_VIDEO_PLAYLIST_ID = "PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk"
  const VERKADA_ACCESS_PLAYLIST_ID = "PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX"
  const VERKADA_VIDEO_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${VERKADA_VIDEO_PLAYLIST_ID}`
  const VERKADA_ACCESS_PLAYLIST_URL = `https://www.youtube.com/playlist?list=${VERKADA_ACCESS_PLAYLIST_ID}`

  // ✅ Verkada VIDEO URLs (in order)
  const VERKADA_VIDEO_ITEMS = [
    {
      url: "https://www.youtube.com/watch?v=jJwzwAoJ190&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=1",
      note: "Finding incidents fast (search + filters).",
    },
    {
      url: "https://www.youtube.com/watch?v=xBE68n-WFo4&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=2",
      note: "Day-to-day review workflow (what admins actually do).",
    },
    {
      url: "https://www.youtube.com/watch?v=UrZNzxUpNzI&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=3",
      note: "Incident workflow / organization (keep teams consistent).",
    },
    {
      url: "https://www.youtube.com/watch?v=pNBSTtnnb-c&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=4",
      note: "Sharing / exporting footage (common buyer question).",
    },
    {
      url: "https://www.youtube.com/watch?v=wtpgjmmTnXc&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=5",
      note: "Maps / organization / navigation (scale-friendly operations).",
    },
    {
      url: "https://www.youtube.com/watch?v=may1Gz2UmIo&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=6",
      note: "Alerts & notifications (reduce noise, keep signal).",
    },
  ]

  // ✅ Verkada ACCESS CONTROL URLs (in the order you pasted)
  const VERKADA_ACCESS_ITEMS = [
    {
      url: "https://www.youtube.com/watch?v=akeui7lbme0&list=PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX&index=7",
      note: "Access admin workflow (core operator tasks).",
    },
    {
      url: "https://www.youtube.com/watch?v=LLMNrGyIjOM&list=PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX&index=5",
      note: "Users / permissions / schedules (most common changes).",
    },
    {
      url: "https://www.youtube.com/watch?v=XxIEGPXZzuw&list=PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX&index=6",
      note: "Credentials / mobile unlock (end-user experience).",
    },
    {
      url: "https://www.youtube.com/watch?v=iUoFcWu4HOE&list=PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX&index=9",
      note: "Events / troubleshooting (what to check when a door misbehaves).",
    },
    {
      url: "https://www.youtube.com/watch?v=reGRRopgx7Q&list=PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX&index=12",
      note: "Operations / audit mindset (keep your team consistent).",
    },
  ]

  const [verkadaTab, setVerkadaTab] = React.useState("video")

  // Avigilon: official-only placeholders. Paste official playlists later to mirror this UX.
  const [avigilonTab, setAvigilonTab] = React.useState("video")
  const AVIGILON_VIDEO_PLAYLIST_URL = ""
  const AVIGILON_ACCESS_PLAYLIST_URL = ""
  const AVIGILON_VIDEO_ITEMS = []
  const AVIGILON_ACCESS_ITEMS = []

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
        desc="Official playlists with a YouTube-style player + clickable thumbnail list."
        brandHref="/brands/verkada"
        brandLabel="View Verkada Solutions"
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
              subtitle="Titles and thumbnails load automatically from YouTube to stay accurate."
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
              subtitle="Titles and thumbnails load automatically from YouTube to stay accurate."
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
        desc="We’ll embed Avigilon/Motorola-published content only. Paste official playlists and this becomes identical to Verkada."
        brandHref="/brands/avigilon"
        brandLabel="View Avigilon Solutions"
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
              subtitle="Official Avigilon/Motorola content."
              playlistUrl={AVIGILON_VIDEO_PLAYLIST_URL}
              items={AVIGILON_VIDEO_ITEMS}
            />
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="font-bold text-gray-900">Avigilon video playlists needed</div>
              <p className="mt-2 text-sm text-gray-600">
                Paste an official Avigilon/Motorola YouTube playlist link for ACC/Unity training and we’ll wire it in.
              </p>
            </div>
          )
        ) : (
          AVIGILON_ACCESS_PLAYLIST_URL ? (
            <PlaylistPanel
              title="Avigilon Access Control (ACM)"
              subtitle="Official Avigilon/Motorola content."
              playlistUrl={AVIGILON_ACCESS_PLAYLIST_URL}
              items={AVIGILON_ACCESS_ITEMS}
            />
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-6">
              <div className="font-bold text-gray-900">Avigilon access playlists needed</div>
              <p className="mt-2 text-sm text-gray-600">
                Paste an official Avigilon/Motorola YouTube playlist link for ACM training and we’ll wire it in.
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
