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
  { key: "overview", label: "Overview" },
  { key: "cameras", label: "Cloud Cameras" },
  { key: "intercom", label: "Intercom" },
]

// ---------- CLOUD CAMERA INFO ----------
const PRODUCT_INFO = {
  "H6X_Cloud.avif": {
    title: "H6X Cloud Camera",
    desc: "Avigilon Alta’s flagship cloud-native camera with edge AI analytics, encrypted video streaming, and remote management through the Avigilon Alta platform.",
  },
  "slbullet.png": {
    title: "H6SL Bullet Cloud Camera",
    desc: "AI-powered outdoor bullet camera offering reliable long-range coverage, simple plug-and-play cloud onboarding, and smart alerts through Alta’s intuitive interface.",
  },
  "H6SL_Dome_1.avif": {
    title: "H6SL Dome Cloud Camera",
    desc: "Discreet and weather-resistant dome camera that connects directly to the Avigilon Alta Cloud for secure, encrypted video storage and AI-assisted event search.",
  },
  "H5A_Multisensor.png": {
    title: "H5A Multisensor Cloud",
    desc: "Multi-sensor 180°/270°/360° coverage with built-in cloud connectivity — enabling full-site visibility and simplified device management from a single dashboard.",
  },
  "H6Mini.avif": {
    title: "H6 Mini Dome Cloud",
    desc: "Compact AI-driven indoor camera for office or retail environments, streaming securely to Avigilon Alta without the need for NVRs or local servers.",
  },
  "H5A_Hybrid.avif": {
    title: "H5A Hybrid Bridge",
    desc: "Bridge existing Unity or legacy cameras to Avigilon Alta Cloud for centralized hybrid video management.",
  },
}

const CAMERA_ORDER = [
  "H6X_Cloud.avif",
  "slbullet.png",
  "H6SL_Dome_1.avif",
  "H5A_Multisensor.png",
  "H6Mini.avif",
  "H5A_Hybrid.avif",
]

// ---------- COMPONENT ----------
export default function VendorAvigilonCloud() {
  const location = useLocation()
  const [active, setActive] = React.useState("overview")
  const [videoImages, setVideoImages] = React.useState([])

  React.useEffect(() => {
    const hash = (location.hash || "").replace("#", "").toLowerCase()
    if (["overview", "cameras", "intercom"].includes(hash)) setActive(hash)
  }, [location.hash])

  // Load image list (optional JSON manifest)
  React.useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}vendors/avigilon/index.json`)
      .then((res) => res.json())
      .then((data) => {
        const imgs = data.images || []
        const sorted = CAMERA_ORDER.filter((x) => imgs.includes(x))
        setVideoImages(sorted)
      })
      .catch((err) => console.error("Failed to load Avigilon Cloud JSON:", err))
  }, [])

  const onTabClick = (key) => {
    setActive(key)
    window.history.replaceState(null, "", `#${key}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const grid = "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"

  // ---------- INTERCOM ----------
  const intercomProducts = [
    {
      key: "readerpro",
      title: "Video Intercom Reader Pro",
      desc: "Cloud-managed intercom and access reader in one sleek device for modern entryways, fully managed through Avigilon Alta.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/VideoIntercomReaderPro_01.avif`,
    },
  ]

  // ---------- RENDER CAMERA GRID ----------
  const renderCameraGrid = () => (
    <div className={grid}>
      {CAMERA_ORDER.map((file) => {
        const info = PRODUCT_INFO[file] || {
          title: file.replace(/\.[^/.]+$/, ""),
          desc: "Avigilon Alta Cloud-enabled camera.",
        }
        return (
          <div
            key={file}
            className="card p-6 flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <img
              src={`${import.meta.env.BASE_URL}vendors/avigilon/${file}`}
              alt={info.title}
              className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
            <p className="text-gray-700 text-sm">{info.desc}</p>
          </div>
        )
      })}
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

  // ---------- OVERVIEW ----------
  const renderOverview = () => (
    <div className="max-w-3xl">
      <img
        src={`${import.meta.env.BASE_URL}vendors/avigilon-cloud/avigiloncloud.avif`}
        alt="Avigilon Cloud Video"
        className="rounded-2xl mb-6 shadow-sm"
      />

      <h2 className="text-2xl font-semibold mb-4">Avigilon Alta Cloud Video</h2>

      <p className="text-gray-700 mb-4">
        Avigilon Alta Cloud Video is the next generation of video management —
        built for simplicity, scalability, and security. Part of the Avigilon
        ecosystem, Alta delivers a fully cloud-native platform that eliminates
        on-premise servers and enables instant, secure access to video from
        anywhere.
      </p>

      <p className="text-gray-700 mb-4">
        Powered by advanced AI analytics, Avigilon Cloud lets organizations
        detect, verify, and respond to events in real time. Centralized
        management provides a unified view across multiple facilities, while
        automatic updates and continuous health monitoring keep systems
        performing at their best.
      </p>

      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li>View and manage video securely from any device, anywhere</li>
        <li>AI-powered search, detection, and motion-based alerts</li>
        <li>End-to-end encryption and automatic firmware updates</li>
        <li>Centralized user and site management across all locations</li>
        <li>Seamless integration with Avigilon Alta Intercom</li>
      </ul>

      <Link to="/contact" className="btn btn-primary">
        Request a Cloud Demo
      </Link>
    </div>
  )

  // ---------- PAGE ----------
  return (
    <main className="container py-12">
      <Helmet>
        <title>Avigilon Cloud (Alta) | Griffon Systems Inc.</title>
        <meta
          name="description"
          content="Avigilon Alta Cloud video surveillance — secure, scalable, and AI-powered for modern enterprises."
        />
      </Helmet>

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
          Request a Demo
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

      {/* Content */}
      {active === "overview" && renderOverview()}
      {active === "cameras" && renderCameraGrid()}
      {active === "intercom" && renderGrid(intercomProducts)}
    </main>
  )
}
