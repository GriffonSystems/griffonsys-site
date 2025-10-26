import React from "react"
import { Helmet } from "react-helmet"
import { Link, useLocation } from "react-router-dom"

// ---------- Avigilon Logo ----------
function AvigilonLogo({ className = "h-10 w-auto object-contain" }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}vendors/avigilon/logo.jpg`}
      alt="Avigilon"
      className={className}
    />
  )
}

// ---------- Tabs ----------
const TABS = [
  { key: "video", label: "Video" },
  { key: "access", label: "Access" },
  { key: "analytics", label: "Analytics" },
]

export default function VendorAvigilon() {
  const location = useLocation()
  const [active, setActive] = React.useState("video")

  React.useEffect(() => {
    const hash = (location.hash || "").replace("#", "").toLowerCase()
    if (["video", "access", "analytics"].includes(hash)) setActive(hash)
  }, [location.hash])

  const onTabClick = (key) => {
    setActive(key)
    window.history.replaceState(null, "", `#${key}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const grid = "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"

  // ---------- PRODUCTS ----------
  const videoProducts = [
    {
      key: "thermal",
      title: "H5A Thermal Camera",
      desc: "Outdoor bullet camera that delivers long-range perimeter protection using heat-sensing technology for low-visibility or high-security environments.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/H5A_Modular_01.avif`,
    },
    {
      key: "pro",
      title: "H5 Pro Camera",
      desc: "Ultra-high-resolution IP camera providing up to 10K (61MP) detail for wide-area coverage and unmatched clarity.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/H5A_Dual_Head_02.avif`,
    },
    {
      key: "slbullet",
      title: "H6SL Bullet Camera",
      desc: "The H6SL Bullet delivers superior situational awareness and long-range detail — available in both Unity On-Premise and Alta Cloud-Native options.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/H6SL_Bullet_1.avif`,
    },
    {
      key: "ptz",
      title: "H6A PTZ Camera",
      desc: "High-speed pan-tilt-zoom camera designed for wide-area coverage and detailed tracking.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/H6A-PTZ-Product_Detail_Image_2_2024-07-02-210404_cxtc.avif`,
    },
    {
      key: "multisensor",
      title: "H5A Multisensor",
      desc: "Four independent sensors offering 360° coverage with advanced analytics.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/H5A_Multisensor_01_2024-09-02-173128_gmdn.avif`,
    },
    {
      key: "infrastructure",
      title: "Video Infrastructure",
      desc: "Reliable and secure Avigilon recording and management platforms for any scale.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/Videoinfrastructure_Benefit_1_v1.avif`,
    },
  ]

  const accessProducts = [
    {
      key: "acm",
      title: "Access Control Manager (ACM)",
      desc: "Enterprise-grade access control system integrated with Avigilon Unity and Alta.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/ACM.mp4`,
    },
    {
      key: "readerpro",
      title: "Video Intercom Reader Pro",
      desc: "Two-in-one door reader and video intercom solution for secure, cloud-connected entry.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/VideoIntercomReaderPro_01.avif`,
    },
  ]

  const analyticsProducts = [
    {
      key: "appearance-search",
      title: "Appearance Search",
      desc: "AI-powered search that allows operators to locate people or vehicles across all cameras within seconds.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/CamerasOverview_850x850-1.avif`,
    },
    {
      key: "focus-of-attention",
      title: "Focus of Attention",
      desc: "Intuitive interface highlighting events requiring immediate attention through color and animation cues.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/fisheye.avif`,
    },
  ]

  // ---------- Render ----------
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

  // ---------- Page ----------
  return (
    <main className="container py-12">
      <Helmet>
        <title>Avigilon Security Systems | Griffon Systems Inc.</title>
        <meta
          name="description"
          content="Authorized Avigilon partner providing design, installation, and support for video surveillance, access control, and analytics systems across Illinois."
        />
        <meta
          property="og:image"
          content="https://www.griffonsys.com/images/vendors/avigilon-og.jpg"
        />
        <link rel="canonical" href="https://www.griffonsys.com/vendors/avigilon" />
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <AvigilonLogo />
        <Link to="/contact" className="btn btn-primary">
          Request a Quote
        </Link>
      </div>

      {/* Tabs */}
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

      {/* Tab Content */}
      {active === "video" && (
        <>
          {renderGrid(videoProducts)}
          <div className="text-center mt-10">
            <a
              href="https://www.avigilon.com/security-cameras"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-black rounded-full px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
            >
              Compare Cameras
            </a>
          </div>
        </>
      )}

      {active === "access" && renderGrid(accessProducts)}
      {active === "analytics" && renderGrid(analyticsProducts)}
    </main>
  )
}
