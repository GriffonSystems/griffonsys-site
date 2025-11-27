// src/routes/Solutions.jsx
import React, { useState } from "react"
import axios from "axios"
import { Helmet } from "react-helmet"

export default function Solutions() {
  const items = [
    {
      title: "Cloud Video Surveillance",
      desc: "Simple deployment, remote access, and automatic updates.",
      img: "/images/solutions/cloud-video.jpg",
      pos: "center 40%",
    },
    {
      title: "On-Prem Video (NVR/VMS)",
      desc: "High performance systems for regulated and air-gapped environments.",
      img: "/images/solutions/onprem-video.jpg",
      pos: "center 45%",
    },
    {
      title: "Access Control",
      desc: "Mobile credentials, remote unlock, and visitor management.",
      img: "/images/solutions/access-control.jpg",
      pos: "center 30%",
    },
    {
      title: "Video Intercom",
      desc: "Secure entry with integrated cameras and cloud calling.",
      img: "/images/solutions/video-intercom.jpg",
      pos: "center 12%",
    },
    {
      title: "Wireless Backhaul",
      desc: "Point-to-point and mesh links for large properties.",
      img: "/images/solutions/wireless-backhaul.jpg",
      pos: "center 32%",
    },
    {
      title: "Maintenance & Support",
      desc: "Health monitoring, quarterly reviews, priority response.",
      img: "/images/solutions/maintenance.jpg",
      pos: "center 35%",
    },
  ]

  const [selected, setSelected] = useState(null)
  const [state, setState] = useState({ name: "", company: "", email: "" })
  const [status, setStatus] = useState("idle")

  const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("loading")
    try {
      await axios.post("/api/contact", {
        name: state.name,
        email: state.email,
        company: state.company,
        phone: "",
        message: `Request for more information about: ${selected}`,
      })
      setStatus("ok")
      setTimeout(() => {
        setState({ name: "", company: "", email: "" })
        setSelected(null)
        setStatus("idle")
      }, 2000)
    } catch {
      setStatus("error")
    }
  }

  return (
    <main className="container py-12">
      {/* ---- SEO ---- */}
      <Helmet>
        <title>
          Security Solutions | Video Surveillance, Access Control & Intercom | Griffon Systems
        </title>
        <meta
          name="description"
          content="Explore cloud video, on-prem VMS, access control, video intercom, wireless backhaul, and maintenance services provided by Griffon Systems across Chicago and Northern Illinois."
        />
        <link rel="canonical" href="https://www.griffonsys.com/solutions" />

        {/* Social share images */}
        <meta property="og:title" content="Security Solutions | Griffon Systems" />
        <meta
          property="og:description"
          content="Avigilon & Verkada security solutions — video, access control, intercom, wireless backhaul, and managed support."
        />
        <meta property="og:image" content="https://www.griffonsys.com/images/solutions/cloud-video.jpg" />
        <meta property="og:url" content="https://www.griffonsys.com/solutions" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Security Solutions",
              url: "https://www.griffonsys.com/solutions",
              numberOfItems: items.length,
              itemListElement: items.map((x, i) => ({
                "@type": "Product",
                position: i + 1,
                name: x.title,
                description: x.desc,
                image: `https://www.griffonsys.com${x.img}`,
                brand: { "@type": "Brand", name: "Griffon Systems" },
                provider: {
                  "@type": "LocalBusiness",
                  name: "Griffon Systems, Inc.",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "650 West Grand Ave #206",
                    addressLocality: "Elmhurst",
                    addressRegion: "IL",
                    postalCode: "60126",
                    addressCountry: "US",
                  },
                  telephone: "+16306070346",
                },
              })),
            }),
          }}
        />
      </Helmet>

      {/* ---- PAGE HEADER ---- */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: "Optima" }}>
        Security Solutions
      </h1>
      <p className="text-gray-700 text-lg mb-10 max-w-3xl">
        Whether you need cloud surveillance, rugged industrial cameras, mobile credentials, or
        wireless backhaul across large properties — we design, deploy, and support end-to-end
        security systems across Illinois.
      </p>

      {/* ---- GRID ---- */}
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={() => setSelected(item.title)}
            className="relative text-left rounded-2xl overflow-hidden group focus:outline-none"
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundSize: "cover",
              backgroundPosition: item.pos || "center",
              height: "260px",
            }}
          >
            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/60 transition-all"></div>
            <div className="relative z-10 p-6 text-white">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-200">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* ---- MODAL ---- */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              ×
            </button>

            {status !== "ok" ? (
              <>
                <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "Optima" }}>
                  Request Info — {selected}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <input
                    name="company"
                    value={state.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <input
                    type="email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full border border-gray-300 rounded p-2"
                  />

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <input id="consent" type="checkbox" required className="h-4 w-4" />
                    <label htmlFor="consent">I agree to be contacted about this request.</label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Send Request"}
                  </button>

                  {status === "error" && (
                    <p className="text-red-600 text-sm mt-2">Something went wrong. Try again.</p>
                  )}
                </form>
              </>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                <p>We’ll get back to you shortly.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---- INTERNAL LINKS FOR SEO ---- */}
      <div className="text-center mt-16 text-gray-600 text-sm">
        Related:{" "}
        <a href="/manufacturing" className="text-blue-600 underline">
          Manufacturing
        </a>{" "}
        •{" "}
        <a href="/municipal" className="text-blue-600 underline">
          Municipal
        </a>{" "}
        •{" "}
        <a href="/commercial" className="text-blue-600 underline">
          Commercial
        </a>{" "}
        •{" "}
        <a href="/lpr" className="text-blue-600 underline">
          LPR Systems
        </a>
      </div>
    </main>
  )
}
