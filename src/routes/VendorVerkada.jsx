import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet"

function VerkadaLogo({ className = "h-10 w-auto object-contain" }) {
  const [src, setSrc] = React.useState("/vendors/verkada/logo.jpg")
  return <img src={src} alt="Verkada" className={className} width={160} height={40} />
}

const TABS = [
  { key: "video", label: "Video" },
  { key: "access", label: "Access" },
  { key: "intercom", label: "Intercom" },
]

export default function VendorVerkada() {
  const location = useLocation()
  const [active, setActive] = React.useState("video")

  React.useEffect(() => {
    const wanted = (location.hash || "").replace("#", "").toLowerCase()
    if (["video", "access", "intercom"].includes(wanted)) setActive(wanted)
  }, [location.hash])

  const changeTab = (key) => {
    setActive(key)
    window.scrollTo({ top: 0, behavior: "smooth" })
    window.history.replaceState(null, "", `#${key}`)
  }

  const renderCards = (list) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((card) => (
        <div key={card.key} className="card p-6 flex flex-col">
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold">{card.title}</h3>
          <p className="text-gray-700">{card.desc}</p>
        </div>
      ))}
    </div>
  )

  const videoProducts = [
    { key: "dome", title: "Dome", desc: "Reliable and versatile performance in almost any location.", img: "/vendors/verkada/video/dome.png" },
    { key: "mini", title: "Mini", desc: "Compact form factor for discreet monitoring.", img: "/vendors/verkada/video/mini.png" },
    { key: "bullet", title: "Bullet", desc: "Optimized for license plate recognition.", img: "/vendors/verkada/video/bullet.png" },
    { key: "fisheye", title: "Fisheye", desc: "180° monitoring for expansive areas.", img: "/vendors/verkada/video/fisheye.png" },
    { key: "multisensor", title: "Multisensor", desc: "Two or four sensors in one unit for holistic coverage.", img: "/vendors/verkada/video/multisensor.png" },
    { key: "ptz", title: "PTZ", desc: "Flexible, wide-area coverage at a distance.", img: "/vendors/verkada/video/ptz.png" },
    { key: "remote", title: "Remote", desc: "Battery + LTE for off-grid deployments.", img: "/vendors/verkada/video/remote.png" },
    { key: "dualhead", title: "Dual-Head (CY53-E)", desc: "Two 5 MP sensors for dual-view coverage.", img: "/vendors/verkada/video/dualhead.png" },
    { key: "viewstation", title: "Viewing Station", desc: "Appliance for displaying up to 36 feeds.", img: "/vendors/verkada/video/viewstation.png" },
  ]

  const accessProducts = [
    { key: "single", title: "Single Door Controller", desc: "Simple, reliable control for one opening.", img: "/vendors/verkada/access/singledoor.png" },
    { key: "four", title: "4-Door Controller", desc: "Compact panel that handles four doors.", img: "/vendors/verkada/access/4doorcontroller.png" },
    { key: "mullion", title: "Mullion Reader", desc: "Slim reader for tight jambs (BLE/NFC).", img: "/vendors/verkada/access/singledoorreader.png" },
    { key: "keypad", title: "Keypad Reader", desc: "PIN + card/mobile access with audit trails.", img: "/vendors/verkada/access/keypad.png" },
  ]

  const intercomProducts = [
    { key: "td33", title: "TD33 — Slim Intercom", desc: "Mullion-friendly design for retrofits.", img: "/vendors/verkada/intercom/td33.jpg" },
    { key: "td53", title: "TD53 — Intercom", desc: "Full-size with HD video and audio.", img: "/vendors/verkada/intercom/td53.jpg" },
    { key: "td63", title: "TD63 — Intercom + Keypad", desc: "Integrated keypad for MFA and directories.", img: "/vendors/verkada/intercom/td63.jpg" },
  ]

  return (
    <main className="container py-12">
      <Helmet>
        <title>Verkada Security Systems | Griffon Systems</title>
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <VerkadaLogo />
        <Link to="/contact" className="btn btn-primary">
          Request a Demo
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => changeTab(tab.key)}
            className={`px-4 py-2 rounded-xl border transition ${
              active === tab.key
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-gray-100 border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render Correct Grid */}
      {active === "video" && renderCards(videoProducts)}
      {active === "access" && renderCards(accessProducts)}
      {active === "intercom" && renderCards(intercomProducts)}

      {/* Bottom videos */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-8">Verkada Solutions in Action</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-3">ALPR</h3>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-2">
              <iframe
                src="https://fast.wistia.net/embed/iframe/12wtrfxii4?videoFoam=true"
                title="Verkada ALPR"
                allow="autoplay; fullscreen"
                frameBorder="0"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Incident Management</h3>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg mb-2">
              <iframe
                src="https://fast.wistia.net/embed/iframe/wvjnlck3kd?videoFoam=true"
                title="Verkada Incident Management"
                allow="autoplay; fullscreen"
                frameBorder="0"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
