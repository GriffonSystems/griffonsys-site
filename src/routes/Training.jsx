// src/routes/Training.jsx
import React from "react"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

/* ---------- helpers ---------- */
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
  if (!res.ok) throw new Error("oEmbed failed")
  return await res.json()
}

/* ---------- playlist panel ---------- */
function PlaylistPanel({ title, subtitle, playlistUrl, items = [] }) {
  const baseItems = React.useMemo(
    () =>
      items
        .map((v) => ({
          id: getYouTubeId(v.url),
          url: v.url,
          note: v.note || "",
        }))
        .filter((v) => v.id),
    [items]
  )

  const [activeId, setActiveId] = React.useState(baseItems[0]?.id || "")
  const [meta, setMeta] = React.useState({})

  React.useEffect(() => {
    baseItems.forEach(async (v) => {
      if (meta[v.id]) return
      try {
        const data = await fetchOEmbed(v.url)
        setMeta((m) => ({
          ...m,
          [v.id]: {
            title: data.title,
            thumb: data.thumbnail_url,
            author: data.author_name,
          },
        }))
      } catch {
        setMeta((m) => ({
          ...m,
          [v.id]: {
            title: "Training Video",
            thumb: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
            author: "",
          },
        }))
      }
    })
  }, [baseItems, meta])

  return (
    <div className="rounded-3xl border border-gray-200 bg-white overflow-hidden">
      <div className="p-5 border-b border-gray-200 flex justify-between">
        <div>
          <h4 className="text-xl font-bold">{title}</h4>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
        {playlistUrl && (
          <a
            href={playlistUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-blue-700 hover:underline"
          >
            Open playlist →
          </a>
        )}
      </div>

      <div className="grid md:grid-cols-5">
        {/* Player */}
        <div className="md:col-span-3 border-r border-gray-200">
          <div className="relative pt-[56.25%] bg-black">
            {activeId && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${activeId}`}
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="md:col-span-2 max-h-[520px] overflow-y-auto">
          {baseItems.map((v) => {
            const isActive = v.id === activeId
            const m = meta[v.id]
            return (
              <button
                key={v.id}
                onClick={() => setActiveId(v.id)}
                className={`w-full flex gap-3 p-4 border-b text-left hover:bg-gray-50 ${
                  isActive ? "bg-gray-50" : ""
                }`}
              >
                <img
                  src={m?.thumb}
                  alt=""
                  className="w-28 rounded-lg"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-semibold line-clamp-2">
                    {m?.title}
                  </div>
                  {v.note && (
                    <div className="text-xs text-gray-600 mt-1">{v.note}</div>
                  )}
                  <div className="text-[11px] text-gray-500">{m?.author}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ---------- layout helpers ---------- */
function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm font-semibold border ${
        active
          ? "bg-black text-white border-black"
          : "bg-white border-gray-300 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  )
}

function VendorSection({ title, desc, brandHref, children }) {
  return (
    <section className="mt-16">
      <div className="container">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-3xl font-bold">{title}</h2>
            <p className="text-gray-600">{desc}</p>
          </div>
          <Link
            to={brandHref}
            className="hidden md:inline-flex px-4 py-2 rounded-xl border font-semibold hover:bg-gray-100"
          >
            View →
          </Link>
        </div>
        {children}
      </div>
    </section>
  )
}

/* ---------- page ---------- */
export default function Training() {
  const VERKADA_VIDEO_PLAYLIST = "https://www.youtube.com/playlist?list=PL3USUWfBbtdJpB2F8sOOJOdvv2qlWcfpk"
  const VERKADA_ACCESS_PLAYLIST = "https://www.youtube.com/playlist?list=PL3USUWfBbtdKLA-SVC0lbE4ssgvDYsdeX"

  const VERKADA_VIDEO = [
    { url: "https://www.youtube.com/watch?v=jJwzwAoJ190", note: "Searching incidents" },
    { url: "https://www.youtube.com/watch?v=xBE68n-WFo4", note: "Reviewing footage" },
    { url: "https://www.youtube.com/watch?v=UrZNzxUpNzI", note: "Incident workflows" },
    { url: "https://www.youtube.com/watch?v=pNBSTtnnb-c", note: "Exporting & sharing" },
    { url: "https://www.youtube.com/watch?v=wtpgjmmTnXc", note: "Maps & layouts" },
    { url: "https://www.youtube.com/watch?v=may1Gz2UmIo", note: "Alerts" },
  ]

  const VERKADA_ACCESS = [
    { url: "https://www.youtube.com/watch?v=akeui7lbme0" },
    { url: "https://www.youtube.com/watch?v=LLMNrGyIjOM" },
    { url: "https://www.youtube.com/watch?v=XxIEGPXZzuw" },
    { url: "https://www.youtube.com/watch?v=iUoFcWu4HOE" },
    { url: "https://www.youtube.com/watch?v=reGRRopgx7Q" },
  ]

  const [tab, setTab] = React.useState("video")

  return (
    <main>
      <Helmet>
        <title>Training | Griffon Systems</title>
      </Helmet>

      <VendorSection
        title="Verkada Training"
        desc="Official Verkada training videos for daily operation."
        brandHref="/brands/verkada"
      >
        <div className="flex gap-2 mb-4">
          <TabButton active={tab === "video"} onClick={() => setTab("video")}>
            Video Surveillance
          </TabButton>
          <TabButton active={tab === "access"} onClick={() => setTab("access")}>
            Access Control
          </TabButton>
        </div>

        {tab === "video" ? (
          <PlaylistPanel
            title="Verkada Video Security"
            subtitle="Official Verkada training"
            playlistUrl={VERKADA_VIDEO_PLAYLIST}
            items={VERKADA_VIDEO}
          />
        ) : (
          <PlaylistPanel
            title="Verkada Access Control"
            subtitle="Official Verkada training"
            playlistUrl={VERKADA_ACCESS_PLAYLIST}
            items={VERKADA_ACCESS}
          />
        )}
      </VendorSection>
    </main>
  )
}
