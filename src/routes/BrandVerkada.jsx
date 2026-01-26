import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import { Helmet } from "react-helmet"

function VerkadaLogo({ className = "h-10 w-auto object-contain" }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}vendors/verkada/logo.jpg`}
      alt="Verkada"
      className={className}
      width={160}
      height={40}
      loading="lazy"
    />
  )
}

const TABS = [
  { key: "video", label: "Video" },
  { key: "access", label: "Access" },
  { key: "intercom", label: "Intercom" },
  { key: "connectivity", label: "Connectivity" },
]

export default function VendorVerkada() {
  const [active, setActive] = useState("video")
  const [showVideo, setShowVideo] = useState(false)
  const [selected, setSelected] = useState(null)
  const [status, setStatus] = useState("idle")
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
  })

  const location = useLocation()

  // --- SEO ---
  const pageUrl = "https://griffonsys.com/brands/verkada"
  const title =
    "Verkada Security Systems | Cloud Video, Access & Intercom | Griffon Systems"
  const description =
    "Authorized Verkada integrator in Illinois delivering cloud-managed video surveillance, access control, intercoms, alarms, and connectivity for municipalities, schools, and manufacturers."
  const ogImage = "https://griffonsys.com/vendors/verkada/logo.jpg"

  React.useEffect(() => {
    const fromHash = (location.hash || "").replace("#", "")
    if (["video", "access", "intercom", "connectivity"].includes(fromHash)) {
      setActive(fromHash)
      window.scrollTo({ top: 0, behavior: "auto" })
    }
  }, [location.hash])

  const onTabClick = (key) => {
    setActive(key)
    window.history.replaceState(null, "", `#${key}`)
    window.scrollTo({ top: 0, behavior: "auto" })
  }

  const grid = "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"

  const videoProducts = [
    { key: "dome", title: "Dome", desc: "Reliable performance for most environments.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/dome.png` },
    { key: "mini", title: "Mini", desc: "Compact form factor for tight spaces.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/mini.png` },
    { key: "bullet", title: "Bullet", desc: "Optimized for license plate recognition and detail.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/bullet.png` },
    { key: "fisheye", title: "Fisheye", desc: "180° panoramic coverage.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/fisheye.png` },
    { key: "multisensor", title: "Multisensor", desc: "Two or four sensors in one housing.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/multisensor.png` },
    { key: "ptz", title: "PTZ", desc: "Wide-area pan-tilt-zoom coverage.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/ptz.png` },
    { key: "remote", title: "Remote", desc: "Battery + LTE deployments.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/remote.png` },
    { key: "dualhead", title: "Dual-Head (CY53-E)", desc: "Two 5MP sensors in one housing.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/dualhead.jpeg` },
    { key: "viewstation", title: "Viewing Station", desc: "Live monitoring appliance.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/viewstation.jpeg` },
  ]

  const accessProducts = [
    { key: "singledoor", title: "Single Door Controller", desc: "Cloud-managed single opening.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/singledoor.png` },
    { key: "4door", title: "4-Door Controller", desc: "Controls up to four doors.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/4doorcontroller.png` },
    { key: "mullion", title: "Mullion Reader", desc: "NFC, BLE, and mobile credentials.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/singledoorreader.png` },
    { key: "keypad", title: "Keypad Reader", desc: "PIN + card/mobile access.", img: `${import.meta.env.BASE_URL}vendors/verkada/access/keypad.png` },
  ]

  const intercomProducts = [
    { key: "TS12", title: "TS12 — Audio Intercom", desc: "Audio-only intercom.", img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/TS12.webp` },
    { key: "TD33", title: "TD33 — Slim Intercom", desc: "Mullion-friendly.", img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td33.webp` },
    { key: "TD53", title: "TD53 — Video Intercom", desc: "HD video + audio.", img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td53.webp` },
    { key: "TD63", title: "TD63 — Video + Keypad", desc: "Directory + keypad.", img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td63.webp` },
  ]

  const connectivityProducts = [
    {
      key: "gc31e",
      title: "GC31-E Cellular Gateway",
      desc: "LTE backhaul with PoE output.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/connectivity/gc31.webp`,
      video: "https://www.youtube.com/embed/fb9LNytX7ac?autoplay=1",
    },
  ]

  const handleCardClick = (card) => {
    if (card.video) {
      setShowVideo(card.video)
    } else {
      setSelected(card.title)
    }
  }

  const renderGrid = (list) => (
    <div className={grid}>
      {list.map((card) => (
        <div
          key={card.key}
          onClick={() => handleCardClick(card)}
          className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer"
        >
          <img src={card.img} alt={card.title} className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4" />
          <h3 className="text-xl font-semibold mb-1">{card.title}</h3>
          <p className="text-gray-700 text-sm">{card.desc}</p>
        </div>
      ))}
    </div>
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": "https://griffonsys.com/#brand-verkada",
    name: "Verkada",
    url: pageUrl,
    description,
    sameAs: ["https://www.verkada.com/"],
  }

  return (
    <main className="container py-12">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Helmet>

      <div className="flex items-center justify-between mb-6">
        <VerkadaLogo />
        <div className="flex gap-3">
          <Link to="/resources/verkada-vs-avigilon" className="px-4 py-2 rounded-xl border">
            Compare Verkada vs Avigilon
          </Link>
          <Link to="/contact" className="btn btn-primary">
            Request a Demo
          </Link>
        </div>
      </div>

      <section className="max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Organizations Choose Verkada</h2>
        <p className="text-gray-700 mb-4">
          Verkada offers an integrated, cloud-managed security platform combining video surveillance,
          access control, intercoms, alarms, and environmental sensors into a single system.
        </p>
        <p className="text-gray-700 mb-4">
          Organizations choose Verkada for simplified deployment, centralized management, and the
          ability to securely manage multiple sites from a browser-based dashboard. Plug-and-play
          hardware, automatic firmware updates, and long-term warranties reduce IT overhead.
        </p>
        <p className="text-gray-700 mb-4">
          Verkada is commonly selected by municipalities, school districts, park districts, and
          manufacturers that value predictable operating costs, rapid deployment, and scalability.
        </p>
        <p className="text-sm text-gray-600">
          Some organizations prefer fully on-prem systems due to regulatory or internal IT requirements.
        </p>
      </section>

      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => onTabClick(t.key)}
            className={`px-4 py-2 rounded-xl border ${
              active === t.key ? "bg-black text-white" : "bg-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === "video" && renderGrid(videoProducts)}
      {active === "access" && renderGrid(accessProducts)}
      {active === "intercom" && renderGrid(intercomProducts)}
      {active === "connectivity" && renderGrid(connectivityProducts)}
    </main>
  )
}
