import React, { useState, useEffect } from "react"

export default function VendorAvigilon() {
  const [section, setSection] = useState("video")
  const [data, setData] = useState({ title: "", images: [] })

  // dynamic JSON loading
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/vendors/avigilon/${section}/index.json`)
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error("Failed to load section:", err)
      }
    }
    load()
  }, [section])

  const PRODUCT_INFO = {
    // ---- VIDEO CAMERAS ----
    "slbullet.png": {
      title: "H6SL Bullet Camera",
      desc: "AI-powered bullet IP camera delivering superior situational awareness and long-range detail.",
    },
    "h5a-bullet.png": {
      title: "H5A Multisensor Camera",
      desc: "Be covered from all angles with the H5A Multisensor camera that can deliver 180°, 270°, or 360° views.",
    },
    "H6SL_Dome_1.avif": {
      title: "H6SL Dome Camera",
      desc: "The H6SL Dome is a weatherproof dome camera that secures your site by offering AI-powered video analytics and an optional mic.",
    },
    "H5A_Dual_Head_02.avif": {
      title: "H5A Dual Head Camera",
      desc: "Dual-sensor camera offering flexible positioning and wide coverage for hallways or intersections.",
    },
    "thermal.png": {
      title: "H5A Thermal Camera",
      desc: "Provides long-range perimeter protection with heat-based detection and analytics.",
    },
    "pro.png": {
      title: "H5 Pro Camera",
      desc: "High-resolution IP camera capturing image detail up to 10K for expansive scene coverage.",
    },
    "h5a_Modular_01.avif": {
      title: "H5A Modular Camera",
      desc: "Compact modular design enabling discreet monitoring with flexible sensor placement.",
    },
    "lpr.png": {
      title: "L6A Enterprise LPR Camera",
      desc: "Advanced license plate recognition camera with integrated analytics for vehicle tracking.",
    },

    // ---- ACCESS ----
    "acm.png": {
      title: "Avigilon ACM Access Control",
      desc: "Enterprise-grade access management platform integrating seamlessly with Avigilon video for unified security.",
    },
    "reader.png": {
      title: "Door Readers and Keypads",
      desc: "Smart, secure Avigilon readers and keypads supporting encrypted credentials and remote management.",
    },
    "controller.png": {
      title: "Access Controllers",
      desc: "Flexible 1, 2, and 4-door controllers enabling scalable deployments from single facilities to campuses.",
    },

    // ---- INTERCOM ----
    "intercomreader.png": {
      title: "Avigilon Intercom Reader Pro",
      desc: "Combined intercom and access reader with integrated camera, supporting two-way audio and remote entry control.",
    },
    "avaintercom.png": {
      title: "Ava Cloud Intercom",
      desc: "Cloud-native intercom system offering secure video and voice entry management from anywhere.",
    },
  }

  return (
    <main className="container py-12">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-center">Avigilon Solutions</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-10 space-x-4">
        {["video", "access", "intercom"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSection(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              section === tab
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab === "video"
              ? "Video"
              : tab === "access"
              ? "Access Control"
              : "Intercom"}
          </button>
        ))}
      </div>

      {/* Content */}
      <h2 className="text-2xl font-semibold text-center mb-8">
        {data.title || ""}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.images?.map((img) => {
          const info = PRODUCT_INFO[img] || {}
          return (
            <div
              key={img}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col items-center text-center p-6"
            >
              <img
                src={`/vendors/avigilon/${section}/${img}`}
                alt={info.title || img}
                className="h-48 object-contain mb-6"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mb-2">{info.title || img}</h3>

              {/* Badges for Video section */}
              {section === "video" && (
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  <span className="border border-blue-400 text-blue-600 text-sm px-3 py-1 rounded-full">
                    Unity On-Premise
                  </span>
                  <span className="border border-lime-400 text-lime-600 text-sm px-3 py-1 rounded-full">
                    Alta Cloud-Native
                  </span>
                </div>
              )}

              <p className="text-gray-700 mb-4">{info.desc || ""}</p>
            </div>
          )
        })}
      </div>
    </main>
  )
}
