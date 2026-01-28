// src/routes/Training.jsx
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

/* ---------------- helpers ---------------- */

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

async function fetchOEmbed(url) {
  const endpoint = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`
  const res = await fetch(endpoint)
  if (!res.ok) throw new Error(`oEmbed failed: ${res.status}`)
  return await res.json()
}

/* ---------------- small modal ---------------- */

function Modal({ open, title, onClose, children }) {
  React.useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Dialog"}
      onMouseDown={(e) => {
        // click on backdrop closes
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="w-full max-w-5xl rounded-3xl bg-white shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div className="font-bold text-gray-900">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 rounded-xl border border-gray-300 font-semibold hover:bg-gray-100"
          >
            Close
          </button>
        </div>
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  )
}

/* ---------------- UI components ---------------- */

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
            <h2 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
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

/**
 * PlaylistPanel
 * - Desktop: fixed matched height so player "fills" properly and aligns with the list
 * - Mobile: aspect-video
 * - Full playlist opens in a MODAL (no weird panel below)
 */
function PlaylistPanel({ title, subtitle, playlistId, items = [] }) {
  const baseItems = React.useMemo(() => {
    const safe = Array.isArray(items) ? items.filter(Boolean) : []
    return safe
      .map((v) => {
        const id = v.id || getYouTubeId(v.url || "")
        return {
          id,
          url: v.url || (id ? `https://www.youtube.com/watch?v=${id}` : ""),
          note: v.note || "",
          fallbackTitle: v.title || "",
        }
      })
      .filter((v) => v.id && v.url)
  }, [items])

  const [activeId, setActiveId] = React.useState(baseItems[0]?.id || "")
  const [meta, setMeta] = React.useState({})
  const [playlistOpen, setPlaylistOpen] = React.useState(false)

  React.useEffect(() => {
    if (!activeId && baseItems[0]?.id) setActiveId(baseItems[0].id)
  }, [activeId, baseItems])

  React.useEffect(() => {
    let cancelled = false
    async function run() {
      const toFetch = baseItems.filter((v) => !meta[v.id])
      if (!toFetch.length) return

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
              title: v.fallbackTitle || "Training Video",
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
    <>
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <h4 className="text-xl font-bold text-gray-900">{title}</h4>
              {subtitle ? <p className="mt-1 text-sm text-gray-600">{subtitle}</p> : null}
            </div>

            {playlistId ? (
              <button
                type="button"
                onClick={() => setPlaylistOpen(true)}
                className="text-sm font-semibold rounded-xl border border-gray-300 bg-white px-4 py-2 hover:bg-gray-100 transition self-start md:self-auto"
              >
                Browse full playlist
              </button>
            ) : null}
          </div>
        </div>

        {/* Desktop: matched height columns. Mobile: stacks + aspect-video */}
        <div className="grid md:grid-cols-5">
          {/* Left: Player */}
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-gray-200">
            {/* Mobile aspect */}
            <div className="md:hidden" style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
              {activeId ? (
                <iframe
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                  src={`https://www.youtube-nocookie.com/embed/${activeId}`}
                  title="Training video player"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </div>

            {/* Desktop fixed height */}
            <div className="hidden md:block relative h-[520px] bg-black">
              {activeId ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/${activeId}`}
                  title="Training video player"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
            </div>
          </div>

          {/* Right: Thumbnails list */}
          <div className="md:col-span-2">
            <div className="md:h-[520px] overflow-y-auto">
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
                        <div className="text-sm font-semibold text-gray-900 line-clamp-2">
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

      {/* Playlist modal (stays on your site, no surprise panel below) */}
      <Modal
        open={playlistOpen}
        title="Full playlist"
        onClose={() => setPlaylistOpen(false)}
      >
        <div className="text-sm text-gray-600">
          Browse the whole playlist here without leaving griffonsys.com.
        </div>
        <div className="mt-4" style={{ position: "relative", paddingTop: "56.25%", background: "#000" }}>
          <iframe
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            src={`https://www.youtube-nocookie.com/embed/videoseries?list=${playlistId}`}
            title="Full playlist"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </Modal>
    </>
  )
}

/* ---------------- page ---------------- */

export default function Training() {
  // Verkada playlists
  const VERKADA_VIDEO_PLAYLIST_ID = "PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk"
  const VERKADA_ACCESS_PLAYLIST_ID = "PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX"

  // Verkada video URLs (your curated set)
  const VERKADA_VIDEO_ITEMS = [
    { url: "https://www.youtube.com/watch?v=jJwzwAoJ190&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=1", note: "Searching incidents (Command search + filters)." },
    { url: "https://www.youtube.com/watch?v=xBE68n-WFo4&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=2", note: "Day-to-day playback workflow." },
    { url: "https://www.youtube.com/watch?v=UrZNzxUpNzI&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=3", note: "Incident organization + workflow." },
    { url: "https://www.youtube.com/watch?v=pNBSTtnnb-c&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=4", note: "Sharing/exporting footage." },
    { url: "https://www.youtube.com/watch?v=wtpgjmmTnXc&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=5", note: "Maps + floor plans." },
    { url: "https://www.youtube.com/watch?v=may1Gz2UmIo&list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk&index=6", note: "Key alerts (signal over noise)." },
  ]

  const VERKADA_ACCESS_ITEMS = [
    { url: "https://www.youtube.com/watch?v=akeui7lbme0&list=PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX&index=7", note: "Core access admin workflow." },
    { url: "https://www.youtube.com/watch?v=LLMNrGyIjOM&list=PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX&index=5", note: "Users, permissions, schedules." },
    { url: "https://www.youtube.com/watch?v=XxIEGPXZzuw&list=PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX&index=6", note: "Credentials + mobile unlock." },
    { url: "https://www.youtube.com/watch?v=iUoFcWu4HOE&list=PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX&index=9", note: "Events + troubleshooting mindset." },
    { url: "https://www.youtube.com/watch?v=reGRRopgx7Q&list=PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX&index=12", note: "Ops/audit consistency for teams." },
  ]

  // Avigilon official playlists (from Avigilon’s own YouTube)
  const AVIGILON_TRAINING_PLAYLIST_ID = "PL05091E943AA92F20" // Avigilon Training playlist :contentReference[oaicite:4]{index=4}
  const AVIGILON_UNITY_ACCESS7_PLAYLIST_ID = "PLATTq93g2gMAWtk54bOCmz4CgeTw_tFI_" // Unity Access 7 :contentReference[oaicite:5]{index=5}

  // Avigilon curated “best usable” picks (official channel)
  // Note: Titles will load automatically via oEmbed on your page.
  const AVIGILON_VIDEO_ITEMS = [
    { url: "https://www.youtube.com/watch?v=NIsQy1xiOdU", note: "ACC basics: layout + core navigation." }, :contentReference[oaicite:6]{index=6}
    { url: "https://www.youtube.com/watch?v=YqsyRdP0vPg", note: "How to access Unity/Avigilon online training portals." }, :contentReference[oaicite:7]{index=7}
    { url: "https://www.youtube.com/watch?v=n3IZSyJvafI", note: "Appearance Search by description (when enabled/licensed)." }, :contentReference[oaicite:8]{index=8}
  ]

  const AVIGILON_ACCESS_ITEMS = [
    { url: "https://www.youtube.com/watch?v=1IcdpnaQ54g", note: "ACM overview (what it is / why it’s used)." }, :contentReference[oaicite:9]{index=9}
  ]

  const [verkadaTab, setVerkadaTab] = React.useState("video")
  const [avigilonTab, setAvigilonTab] = React.useState("video")

  return (
    <main className="bg-white">
      <Helmet>
        <title>Training | Griffon Systems</title>
        <meta
          name="description"
          content="Training videos for Verkada and Avigilon, organized by video surveillance and access control."
        />
      </Helmet>

      {/* Verkada */}
      <VendorSection
        eyebrow="Vendor"
        title="Verkada Training"
        desc="Task-based training that stays on your site."
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
          <PlaylistPanel
            title="Verkada Video Security"
            subtitle="Click a thumbnail to play. Browse the full playlist without leaving the site."
            playlistId={VERKADA_VIDEO_PLAYLIST_ID}
            items={VERKADA_VIDEO_ITEMS}
          />
        ) : (
          <PlaylistPanel
            title="Verkada Access Control"
            subtitle="Admin tasks + real-world operations."
            playlistId={VERKADA_ACCESS_PLAYLIST_ID}
            items={VERKADA_ACCESS_ITEMS}
          />
        )}
      </VendorSection>

      {/* Avigilon */}
      <VendorSection
        eyebrow="Vendor"
        title="Avigilon Training"
        desc="Official Avigilon/Motorola content only (no third-party integrators)."
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
          <PlaylistPanel
            title="Avigilon Video Surveillance (ACC / Unity)"
            subtitle="Curated official videos + full playlist in-modal."
            playlistId={AVIGILON_TRAINING_PLAYLIST_ID}
            items={AVIGILON_VIDEO_ITEMS}
          />
        ) : (
          <PlaylistPanel
            title="Avigilon Access Control (Unity Access / ACM)"
            subtitle="Official access content + full playlist in-modal."
            playlistId={AVIGILON_UNITY_ACCESS7_PLAYLIST_ID}
            items={AVIGILON_ACCESS_ITEMS}
          />
        )}

        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700">
          <span className="font-semibold">Griffon tip:</span> Avigilon is powerful but configuration-heavy.
          For best outcomes, plan a short admin training session with your Griffon engineer.
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
