import React from "react"
import { Helmet } from "react-helmet"
import { Link, useLocation } from "react-router-dom"

function AvigilonLogo({ className = "h-10 w-auto object-contain" }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}vendors/avigilon/logo.jpg`}
      alt="Avigilon"
      className={className}
    />
  )
}

const TABS = [
  { key: "video", label: "Video" },
  { key: "access", label: "Access" },
  { key: "intercom", label: "Intercom" },
]

const PRODUCT_INFO = {
  "slbullet.png": {
    title: "H6SL Bullet Camera",
    desc: "AI-powered bullet IP camera delivering superior situational awareness and long-range detail.",
  },
  "H6SL_Dome_1.avif": {
    title: "H6SL Dome Camera",
    desc: "Weatherproof dome camera that secures your site with AI-powered analytics and an optional mic.",
  },
  "H5A_Multisensor.png": {
    title: "H5A Multisensor Camera",
    desc: "Covers all angles with 180°, 270°, or 360° views from a single housing using multiple sensors.",
  },
  "H5A_Dual_Head_02.avif": {
    title: "H5A Dual Head Camera",
    desc: "Dual-sensor camera offering flexible positioning and wide coverage for hallways or intersections.",
  },
  "H5A_Modular_01.avif": {
    title: "H5A Modular Camera",
    desc: "Compact modular design enabling discreet monitoring with flexible sensor placement.",
  },
  "H5M.avif": {
    title: "H5M Mini Dome Camera",
    desc: "Compact, cost-effective dome ideal for indoor or sheltered outdoor applications.",
  },
  "fisheye.avif": {
    title: "H5A Fisheye Camera",
    desc: "360° panoramic fisheye camera that provides complete situational awareness in a single view.",
  },
  "thermal.png": {
    title: "H5A Thermal Camera",
    desc: "Provides long-range perimeter protection with heat-based detection and analytics.",
  },
  "pro.png": {
    title: "H5 Pro Camera",
    desc: "High-resolution IP camera capturing image detail up to 10K for expansive scene coverage.",
  },
  "lpr.png": {
    title: "L6A Enterprise LPR Camera",
    desc: "Advanced license plate recognition camera with integrated analytics for vehicle tracking.",
  },
}

const CAMERA_ORDER = [
  "slbullet.png",
  "H6SL_Dome_1.avif",
  "H5A_Multisensor.png",
  "H5A_Dual_Head_02.avif",
  "H5A_Modular_01.avif",
  "H5M.avif",
  "fisheye.avif",
  "thermal.png",
  "pro.png",
  "lpr.png",
]

export default function VendorAvigilon() {
  const location = useLocation()
  const [active, setActive] = React.useState("video")
  const [videoImages, setVideoImages] = React.useState([])
  const [showVideo, setShowVideo] = React.useState(null)

  React.useEffect(() => {
    const hash = (location.hash || "").replace("#", "").toLowerCase()
    if (["video", "access", "intercom"].includes(hash)) setActive(hash)
  }, [location.hash])

  React.useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}vendors/avigilon/index.json`)
      .then((res) => res.json())
      .then((data) => {
        const imgs = data.images || []
        const sorted = CAMERA_ORDER.filter((x) => imgs.includes(x))
        setVideoImages(sorted)
      })
      .catch((err) => console.error("Failed to load Avigilon JSON:", err))
  }, [])

  const onTabClick = (key) => {
    setActive(key)
    window.history.replaceState(null, "", `#${key}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const grid = "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"

  const accessProducts = [
    {
      key: "acm",
      title: "Access Control Manager (ACM)",
      desc: "Scalable on-premise access control platform integrated with Avigilon Unity.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/ACM.mp4`,
    },
    {
      key: "readerpro",
      title: "Video Intercom Reader Pro",
      desc: "Reader and video intercom combined in one secure, cloud-connected device.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/VideoIntercomReaderPro_01.avif`,
    },
    {
      key: "rackmounted",
      title: "Rack-Mounted Controller",
      desc: "Enterprise-grade controller to manage door hardware and access points.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/Rack.avif`,
    },
  ]

  const intercomProducts = [
    {
      key: "readerpro",
      title: "Video Intercom Reader Pro",
      desc: "Smart intercom providing HD video, door control, and remote unlocking.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/VideoIntercomReaderPro_01.avif`,
    },
    {
      key: "h4intercom",
      title: "H4 Video Intercom",
      desc: "Legacy unified intercom for Avigilon Unity deployments.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/intercom.png`,
    },
    {
      key: "infrastructure",
      title: "Video Infrastructure Integration",
      desc: "Seamless integration between Avigilon Command and intercom endpoints.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/videoinf.png`,
    },
  ]

  // ---------- VIDEO GRID ----------
  const renderVideoGrid = () => (
    <div className={grid}>
      {videoImages.map((file) => {
        const info = PRODUCT_INFO[file] || {
          title: file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          desc: "Avigilon camera model for enterprise environments.",
        }
        const isLPR = file === "lpr.png"

        return (
          <div
            key={file}
            onClick={() => isLPR && setShowVideo("lpr")}
            className={`card p-6 flex flex-col bg-white rounded-2xl shadow-sm transition ${
              isLPR
                ? "cursor-pointer hover:shadow-lg hover:scale-[1.02]"
                : "hover:shadow-md"
            }`}
          >
            <div className="relative">
              <img
                src={`${import.meta.env.BASE_URL}vendors/avigilon/${file}`}
                alt={info.title}
                className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
              />
              {isLPR && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 rounded-lg transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 text-white opacity-80 hover:opacity-100 transition"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
            <p className="text-gray-700 text-sm">{info.desc}</p>
          </div>
        )
      })}

      {/* --- Visual Alerts Teaser --- */}
      <div
        onClick={() => setShowVideo("visual")}
        className="card p-6 flex flex-col bg-white rounded-2xl shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.02] transition"
      >
        <div className="relative">
          <img
            src={`${import.meta.env.BASE_URL}vendors/avigilon/visualalerts-thumb.jpg`}
            alt="Visual Alerts Coming Soon"
            className="w-full h-40 object-cover bg-gray-50 rounded-lg mb-4"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 rounded-lg transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-white opacity-80 hover:opacity-100 transition"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Visual Alerts (Coming Soon)</h3>
        <p className="text-gray-700 text-sm">
          Describe a scene and instantly create an alert — next-gen Avigilon analytics.
        </p>
      </div>

      {/* --- Avigilon Unity Suite Teaser --- */}
      <div
        onClick={() => setShowVideo("unity")}
        className="card p-6 flex flex-col bg-white rounded-2xl shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.02] transition"
      >
        <div className="relative">
          <img
            src={`${import.meta.env.BASE_URL}vendors/avigilon/unity-thumb.jpg`}
            alt="Avigilon Unity End-to-End Security"
            className="w-full h-40 object-cover bg-gray-50 rounded-lg mb-4"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 rounded-lg transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-white opacity-80 hover:opacity-100 transition"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Avigilon Unity Suite</h3>
        <p className="text-gray-700 text-sm">
          Explore Avigilon Unity’s end-to-end video, analytics, and access control platform.
        </p>
      </div>
    </div>
  )

  // ---------- GENERIC GRID ----------
  const renderGrid = (list) => (
    <div className={grid}>
      {list.map((card) => (
        <div
          key={card.key}
          className="card p-6 flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition"
        >
          {card.img.endsWith(".mp4") ? (
            <video
              src={card.img}
              controls
              className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
            />
          ) : (
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
            />
          )}
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-700 text-sm">{card.desc}</p>
        </div>
      ))}
    </div>
  )

  // ---------- MODAL ----------
  const renderModal = () => {
    if (!showVideo) return null

    const videoSrc =
      showVideo === "lpr"
        ? "https://www.youtube.com/embed/bJS9dWi1uzk?autoplay=1"
        : showVideo === "visual"
        ? "https://www.youtube.com/embed/8ZZ5ri2QXUE?autoplay=1"
        : showVideo === "unity"
        ? "https://www.youtube.com/embed/GGypm25cNs8?autoplay=1"
        : ""

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="relative bg-black rounded-2xl overflow-hidden shadow-xl w-[90%] max-w-4xl aspect-video">
          <iframe
            src={videoSrc}
            title="Avigilon Demo Video"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <button
            onClick={() => setShowVideo(null)}
            className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
          >
            ✕
          </button>
        </div>
      </div>
    )
  }

  // ---------- PAGE ----------
  return (
    <main className="container py-12">
      <Helmet>
        <title>Avigilon Security Systems | Griffon Systems Inc.</title>
        <meta
          name="description"
          content="Authorized Avigilon partner in Illinois providing video surveillance, access control, and intercom systems for manufacturing, education, and municipalities."
        />
      </Helmet>

      {renderModal()}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <AvigilonLogo className="h-10 w-auto object-contain" />
          <img
            src={`${import.meta.env.BASE_URL}vendors/avigilon/avigilon-text.png`}
            alt="Avigilon"
            className="h-6 w-auto object-contain"
          />
        </div>
        <Link to="/contact" className="btn btn-primary">
          Request a Quote
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => onTabClick(t.key)}
            className={`px-4 py-2 rounded-xl border transition ${
              active === t.key
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-gray-100 border-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === "video" && renderVideoGrid()}
      {active === "access" && renderGrid(accessProducts)}
      {active === "intercom" && renderGrid(intercomProducts)}
    </main>
  )
}
