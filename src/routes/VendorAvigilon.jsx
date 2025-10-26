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
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/thermal.png`,
    },
    {
      key: "pro",
      title: "H5 Pro Camera",
      desc: "Ultra-high-resolution IP camera providing up to 10K (61MP) detail for wide-area coverage and unmatched clarity.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/pro.png`,
    },
    {
      key: "slbullet",
      title: "H6SL Bullet Camera",
      desc: "The H6SL Bullet is a bullet IP camera delivering superior situational awareness and long-range detail — available in both Unity On-Premise and Alta Cloud-Native options.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/slbullet.png`,
    },
    {
      key: "h5a-bullet",
      title: "H5A Bullet",
      desc: "Next-generation bullet camera with advanced object detection and analytics.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/h5a-bullet.png`,
    },
    {
      key: "h5a-dome",
      title: "H5A Dome",
      desc: "Vandal-resistant indoor/outdoor dome with adaptive IR and wide dynamic range.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/h5a-dome.png`,
    },
    {
      key: "h5m",
      title: "H5M Camera",
      desc: "Cost-effective option for small spaces requiring 2–5 MP performance.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/h5m.png`,
    },
    {
      key: "h6sl",
      title: "H6SL Dome",
      desc: "Simplified dome camera designed for fast installation and reliable AI-based detection.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/video/h6sl.png`,
    },
  ]

  const accessProducts = [
    {
      key: "acm",
      title: "ACM Access Control Manager",
      desc: "Enterprise-grade access control system with Avigilon Unity integration.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/access/acm.png`,
    },
    {
      key: "reader",
      title: "Smart Reader",
      desc: "Secure readers supporting RFID, mobile credentials, and unified management.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/access/reader.png`,
    },
  ]

  const analyticsProducts = [
    {
      key: "appearance-search",
      title: "Appearance Search",
      desc: "AI-powered search technology that allows operators to locate a person or vehicle across cameras within seconds.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/analytics/appearance-search.png`,
    },
    {
      key: "focus-of-attention",
      title: "Focus of Attention",
      desc: "Revolutionary interface highlighting events that require immediate attention through intuitive color and animation cues.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/analytics/focus-of-attention.png`,
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
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
          />
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
          content="Authorized Avigilon partner providing camera, access control, and analytics solutions throughout Illinois. Featuring H6SL Bullet, H5A Thermal, and H5 Pro cameras."
        />
        <meta
          property="og:image"
          content="https://www.griffonsys.com/images/vendors/avigilon-og.jpg"
        />
        <meta property="og:title" content="Avigilon Security Systems | Griffon Systems Inc." />
        <meta
          property="og:description"
          content="Authorized Avigilon partner delivering professional design, installation, and support for advanced video surveillance and access control systems."
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
