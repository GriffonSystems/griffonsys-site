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

export default function VendorVerkada() {
  const location = useLocation()
  const [active, setActive] = React.useState("video")

  React.useEffect(() => {
    const hash = (location.hash || "").replace("#", "").toLowerCase()
    if (["video", "access", "intercom"].includes(hash)) setActive(hash)
  }, [location.hash])

  const changeTab = (key) => {
    setActive(key)
    window.history.replaceState(null, "", `#${key}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const grid = "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"

  // ----- Products -----
  const videoProducts = [
    { key: "dome", title: "Dome", desc: "Reliable performance for most locations.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/dome.png` },
    { key: "mini", title: "Mini", desc: "Compact form factor for tight spaces.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/mini.png` },
    { key: "bullet", title: "Bullet", desc: "Optimized for license plate recognition.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/bullet.png` },
    { key: "fisheye", title: "Fisheye", desc: "180° panoramic coverage.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/fisheye.png` },
    { key: "multisensor", title: "Multisensor", desc: "Two or four sensors in one unit.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/multisensor.png` },
    { key: "ptz", title: "PTZ", desc: "Pan-tilt-zoom coverage for wide areas.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/ptz.png` },
    { key: "remote", title: "Remote", desc: "Battery + LTE for mobile deployments.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/remote.png` },
    { key: "dualhead", title: "Dual-Head (CY53-E)", desc: "Two 5 MP sensors in one enclosure.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/dualhead.png` },
    { key: "viewstation", title: "Viewing Station", desc: "Appliance for live camera walls.", img: `${import.meta.env.BASE_URL}vendors/verkada/video/viewstation.png` },
  ]

  // ----- Render -----
  const renderGrid = (list) => (
    <div className={grid}>
      {list.map((p) => (
        <div key={p.key} className="card p-6 flex flex-col">
          <img
            src={p.img}
            alt={p.title}
            className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold">{p.title}</h3>
          <p className="text-gray-700">{p.desc}</p>
        </div>
      ))}
    </div>
  )

  return (
    <main className="container py-12">
      <Helmet>
        <title>Verkada Security Systems | Griffon Systems</title>
        <meta
          name="description"
          content="Authorized Verkada partner providing cloud-managed video surveillance, access control, and intercom systems throughout Illinois."
        />
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <VerkadaLogo />
        <Link to="/contact" className="btn btn-primary">Request a Demo</Link>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {["video", "access", "intercom"].map((tab) => (
          <button
            key={tab}
            onClick={() => changeTab(tab)}
            className={`px-4 py-2 rounded-xl border transition ${
              active === tab
                ? "bg-black text-white border-black"
                : "bg-white hover:bg-gray-100 border-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Video Tab */}
      {active === "video" && (
        <>
          {renderGrid(videoProducts)}

          {/* Verkada Solutions Section */}
          <section className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-8">Verkada Solutions in Action</h2>
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              <div>
                <h3 className="text-xl font-semibold mb-3">Automatic License Plate Recognition (ALPR)</h3>
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
        </>
      )}

      {/* Access Tab */}
      {active === "access" && (
        <section className="text-center text-gray-700 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Verkada Access Control</h2>
          <p>
            Secure, cloud-managed door access control with flexible configuration options and
            seamless integration into Verkada Command.
          </p>
        </section>
      )}

      {/* Intercom Tab */}
      {active === "intercom" && (
        <section className="text-center text-gray-700 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Verkada Intercom</h2>
          <p>
            Smart video intercom systems with HD video, intuitive controls, and full integration with Verkada Command for visitor management and remote unlocking.
          </p>
        </section>
      )}
    </main>
  )
}
