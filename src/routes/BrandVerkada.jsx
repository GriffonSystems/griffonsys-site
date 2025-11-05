import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet"

function VerkadaLogo({ className = "h-10 w-auto object-contain" }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}vendors/verkada/logo.jpg`}
      alt="Verkada"
      className={className}
      width={160}
      height={40}
    />
  )
}

/* ---------- Tabs ---------- */
const TABS = [
  { key: "video", label: "Video" },
  { key: "access", label: "Access" },
  { key: "intercom", label: "Intercom" },
  { key: "connectivity", label: "Connectivity" },
]

export default function VendorVerkada() {
  const [active, setActive] = React.useState("video")
  const [showVideo, setShowVideo] = React.useState(false)
  const location = useLocation()

  React.useEffect(() => {
    const fromHash = (location.hash || "").replace("#", "")
    const wanted = (fromHash || "").toLowerCase()
    if (wanted && ["video", "access", "intercom", "connectivity"].includes(wanted)) {
      setActive(wanted)
      window.scrollTo({ top: 0, behavior: "auto" })
    }
  }, [location.hash])

  const onTabClick = (key) => {
    setActive(key)
    window.history.replaceState(null, "", `#${key}`)
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  const grid = "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"

  /* ---------- PRODUCTS ---------- */
  const videoProducts = [
    { key: "dome", title: "Dome", desc: "Reliable performance for most environments.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/dome.png` },
    { key: "mini", title: "Mini", desc: "Compact form factor for tight spaces.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/mini.png` },
    { key: "bullet", title: "Bullet", desc: "Optimized for license plate recognition and detail.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/bullet.png` },
    { key: "fisheye", title: "Fisheye", desc: "180° panoramic coverage for large spaces.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/fisheye.png` },
    { key: "multisensor", title: "Multisensor", desc: "Two or four sensors in one unit for holistic coverage.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/multisensor.png` },
    { key: "ptz", title: "PTZ", desc: "Pan-tilt-zoom for flexible, wide-area coverage.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/ptz.png` },
    { key: "remote", title: "Remote", desc: "Battery and LTE for mobile or remote deployments.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/remote.png` },
    { key: "dualhead", title: "Dual-Head (CY53-E)", desc: "Two 5MP sensors in one housing for versatile coverage.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/dualhead.jpeg` },
    { key: "viewstation", title: "Viewing Station", desc: "Appliance for live camera walls and command centers.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/viewstation.jpeg` },
  ]

  const accessProducts = [
    { key: "singledoor", title: "Single Door Controller", desc: "Simple, reliable control for one opening with cloud management.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/singledoor.png` },
    { key: "4doorcontroller", title: "4-Door Controller", desc: "Compact panel that controls up to four doors per unit.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/4doorcontroller.png` },
    { key: "singledoorreader", title: "Mullion Reader", desc: "Slim reader for tight jambs; supports NFC/BLE/mobile credentials.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/singledoorreader.png` },
    { key: "keypad", title: "Keypad Reader", desc: "Reader + keypad for PIN and card/mobile access.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/keypad.png` },
  ]

  const intercomProducts = [
    { key: "TD33", title: "TD33 — Slim Intercom", desc: "Mullion-friendly form factor for retrofits and tight jambs.", img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td33.jpg` },
    { key: "TD53", title: "TD53 — Intercom", desc: "Full-size unit with high-quality video, audio, and scanning.", img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td53.jpg` },
    { key: "TD63", title: "TD63 — Intercom + Keypad", desc: "Integrated keypad for PIN, MFA, and multi-tenant directories.", img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td63.jpg` },
  ]

  const connectivityProducts = [
    {
      key: "gc31e",
      title: "GC31-E Outdoor Cellular Gateway",
      desc: "Deploy Verkada anywhere — pole, lot, or rooftop with LTE backhaul and PoE output.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/connectivity/gc31e.jpg`,
      url: "https://www.verkada.com/gateways/gc31-e/",
      video: "https://www.youtube.com/embed/fb9LNytX7ac?autoplay=1",
    },
  ]

  /* ---------- RENDER GRID ---------- */
  const renderGrid = (list) => (
    <div className={grid}>
      {list.map((card) => (
        <div
          key={card.key}
          onClick={() => card.video && setShowVideo(card.video)}
          className={`card p-6 flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition ${
            card.video ? "cursor-pointer hover:shadow-lg hover:scale-[1.02]" : ""
          }`}
        >
          <a
            href={card.url || "#"}
            onClick={(e) => {
              if (card.video) e.preventDefault()
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
            />
          </a>
          <h3 className="text-xl font-semibold mb-1">{card.title}</h3>
          <p className="text-gray-700 text-sm">{card.desc}</p>
        </div>
      ))}
    </div>
  )

  /* ---------- MODAL ---------- */
  const renderModal = () =>
    showVideo && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn"
        onClick={() => setShowVideo(false)}
      >
        <div
          className="relative bg-black rounded-2xl overflow-hidden shadow-xl w-[90%] max-w-4xl aspect-video"
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            src={showVideo}
            title="Verkada Connectivity Case Study"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white"
          >
            ✕
          </button>
        </div>
      </div>
    )

  /* ---------- PAGE ---------- */
  return (
    <main className="container py-12">
      <Helmet>
        <title>Verkada Security Systems in Illinois | Griffon Systems</title>
        <meta
          name="description"
          content="Authorized Verkada partner providing design, installation, and support for cloud-based video surveillance, access control, intercom, and connectivity solutions across Illinois."
        />
      </Helmet>

      {renderModal()}

      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <VerkadaLogo />
          <h1 className="sr-only">Verkada Security Systems Illinois</h1>
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

      {/* Tab Content */}
      {active === "video" && (
        <>
          {renderGrid(videoProducts)}

          {/* Verkada Wistia Promo Video */}
          <div className="mt-12 text-center">
            <a
              href="https://www.verkada.com/security-cameras/?wvideo=dxkrisglgn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://embed-ssl.wistia.com/deliveries/8fea68dbfb118ce77eaa9b64991c0768.jpg?image_play_button_size=2x&image_crop_resized=960x538&image_play_button_rounded=1&image_play_button_color=06aff8e0"
                alt="Security Cameras | Commercial Video Security | Verkada"
                className="mx-auto rounded-2xl shadow-lg w-full max-w-[400px] h-auto object-cover"
              />
            </a>
            <p className="mt-3">
              <a
                href="https://www.verkada.com/security-cameras/?wvideo=dxkrisglgn"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Security Cameras | Commercial Video Security | Verkada
              </a>
            </p>
          </div>
        </>
      )}

      {active === "access" && renderGrid(accessProducts)}
      {active === "intercom" && renderGrid(intercomProducts)}
      {active === "connectivity" && renderGrid(connectivityProducts)}
    </main>
  )
}
