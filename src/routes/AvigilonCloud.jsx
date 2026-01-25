// src/routes/AvigilonCloud.jsx
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

const PRODUCT_INFO = {
  "H6X_Cloud.avif": {
    title: "H6X Cloud Camera",
    desc: "Flagship AI-powered cloud-native camera with encrypted streaming and remote fleet management."
  },
  "slbullet.png": {
    title: "H6SL Bullet Cloud Camera",
    desc: "Reliable long-range outdoor bullet with plug-and-play cloud onboarding and smart alerts."
  },
  "H6SL_Dome_1.avif": {
    title: "H6SL Dome Cloud Camera",
    desc: "Discreet weather-resistant indoor/outdoor dome powered by Avigilon Alta cloud AI."
  },
  "H5A_Multisensor.png": {
    title: "H5A Multisensor Cloud",
    desc: "180°/270°/360° multi-imager with Alta cloud support for unified situational awareness."
  },
  "H6Mini.avif": {
    title: "H6 Mini Dome Cloud",
    desc: "Compact indoor cloud dome ideal for offices and retail environments."
  },
  "Rack.avif": {
    title: "Alta Cloud Connector (Rack-Mount)",
    desc: "Connect existing cameras to the cloud with local storage and AI analytics — up to 200 cameras."
  },
}

const CAMERA_ORDER = Object.keys(PRODUCT_INFO)

export default function AvigilonCloud() {
  const location = useLocation()
  const [active, setActive] = React.useState("overview")

  const intercomProducts = [
    {
      key: "readerpro",
      title: "Video Intercom Reader Pro",
      desc: "Cloud-managed intercom and access reader in one device — managed from the Avigilon Alta dashboard.",
      img: `${import.meta.env.BASE_URL}vendors/avigilon/VideoIntercomReaderPro_01.avif`,
    }
  ]

  const onTabClick = (key) => {
    setActive(key)
    window.history.replaceState(null, "", `#${key}`)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const grid = "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"

  const renderCameraGrid = () => (
    <div className={grid}>
      {CAMERA_ORDER.map((file) => {
        const info = PRODUCT_INFO[file]
        return (
          <div key={file} className="card p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
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

  const renderGrid = (list) => (
    <div className={grid}>
      {list.map((card) => (
        <div key={card.key} className="card p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
          <img className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4" src={card.img} alt={card.title} />
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-700 text-sm">{card.desc}</p>
        </div>
      ))}
    </div>
  )

  const renderOverview = () => (
    <div className="max-w-3xl">
      <img
        src={`${import.meta.env.BASE_URL}vendors/avigilon-cloud/avigiloncloud.avif`}
        alt="Avigilon Cloud Alta"
        className="rounded-2xl mb-6 shadow-sm"
      />

      <h2 className="text-2xl font-semibold mb-4">Avigilon Alta Cloud Video</h2>
      <p className="text-gray-700 mb-4">
        Avigilon Alta delivers fully cloud-native video management built for scalability,
        cybersecurity, and AI-assisted investigations — with no NVRs or onsite servers.
      </p>

      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        <li>AI-powered search and alerts</li>
        <li>Encrypted streaming and automatic updates</li>
        <li>Multi-site and multi-tenant management</li>
        <li>Browser & mobile access from anywhere</li>
        <li>Seamless integration with Alta Intercom and Access Control</li>
      </ul>

      <Link to="/contact" className="btn btn-primary">
        Request a Cloud Demo Today
      </Link>
    </div>
  )

  return (
    <main className="container py-12">
      <Helmet>
        <title>Avigilon Alta Cloud Video | Griffon Systems</title>
        <meta
          name="description"
          content="Avigilon Alta Cloud — AI-powered video surveillance with no servers required. Secure, scalable, and ideal for modern enterprises and municipalities."
        />
        <meta
          name="keywords"
          content="Avigilon Alta, cloud video surveillance, Avigilon cloud cameras, cloud VMS, Illinois Avigilon dealer"
        />
        <link rel="canonical" href="https://www.griffonsys.com/brands/avigilon-cloud" />

        <meta property="og:title" content="Avigilon Alta Cloud Video | Griffon Systems" />
        <meta property="og:description" content="Cloud-native AI video surveillance — simple, scalable, and secure." />
        <meta property="og:image" content="https://www.griffonsys.com/images/og/avigilon-cloud.jpg" />
        <meta property="og:url" content="https://www.griffonsys.com/brands/avigilon-cloud" />
        <meta property="og:type" content="product" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "Avigilon Alta Cloud Video",
              brand: "Avigilon",
              category: "Cloud Video Surveillance",
              url: "https://www.griffonsys.com/brands/avigilon-cloud",
              areaServed: "Illinois",
              provider: {
                "@type": "LocalBusiness",
                name: "Griffon Systems, Inc.",
                telephone: "+16306070346",
                url: "https://www.griffonsys.com",
              },
            }),
          }}
        />
      </Helmet>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <AvigilonLogo className="h-10 w-auto" />
          <img
            src={`${import.meta.env.BASE_URL}vendors/avigilon/avigilon-text.png`}
            alt="Avigilon"
            className="h-6 w-auto"
          />
        </div>
        <Link to="/contact" className="btn btn-primary">
          Request a Demo
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

      {active === "overview" && renderOverview()}
      {active === "cameras" && renderCameraGrid()}
      {active === "intercom" && renderGrid(intercomProducts)}

      {/* CTA footer */}
      <section className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-3">Considering Avigilon Alta?</h2>
        <p className="text-gray-600 mb-6">We can design a camera count, retention plan, and pilot deployment.</p>
        <Link to="/contact?subject=Avigilon%20Alta%20Pilot" className="btn btn-primary">
          Schedule a Consultation
        </Link>
      </section>
    </main>
  )
}
