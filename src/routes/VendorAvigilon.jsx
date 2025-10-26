import React from "react"

export default function VendorAvigilon() {
  const BASE = "/vendors/avigilon"

  const PRODUCTS = [
    {
      img: "slbullet.png",
      title: "H6SL Bullet Camera",
      desc: "AI-powered bullet IP camera delivering superior situational awareness and long-range detail.",
    },
    {
      img: "h5a-bullet.png",
      title: "H5A Multisensor Camera",
      desc: "Be covered from all angles with the H5A Multisensor camera that can deliver 180°, 270°, or 360° views.",
    },
    {
      img: "H6SL_Dome_1.avif",
      title: "H6SL Dome Camera",
      desc: "The H6SL Dome is a weatherproof dome camera that secures your site by offering AI-powered video analytics and an optional mic.",
    },
    {
      img: "H5A_Dual_Head_02.avif",
      title: "H5A Dual Head Camera",
      desc: "Dual-sensor camera offering flexible positioning and wide coverage for hallways or intersections.",
    },
    {
      img: "thermal.png",
      title: "H5A Thermal Camera",
      desc: "Provides long-range perimeter protection with heat-based detection and analytics.",
    },
    {
      img: "pro.png",
      title: "H5 Pro Camera",
      desc: "High-resolution IP camera capturing image detail up to 10K for expansive scene coverage.",
    },
    {
      img: "h5a_Modular_01.avif",
      title: "H5A Modular Camera",
      desc: "Compact modular design enabling discreet monitoring with flexible sensor placement.",
    },
    {
      img: "lpr.png",
      title: "L6A Enterprise LPR Camera",
      desc: "Advanced license plate recognition camera with integrated analytics for vehicle tracking.",
    },
  ]

  return (
    <main className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Avigilon — Video Solutions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((p) => (
          <div
            key={p.title}
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col items-center text-center p-6"
          >
            <img
              src={`${BASE}/${p.img}`}
              alt={p.title}
              className="h-48 object-contain mb-6"
              loading="lazy"
            />

            <h2 className="text-xl font-semibold mb-2">{p.title}</h2>

            {/* Avigilon platform badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <span className="border border-blue-400 text-blue-600 text-sm px-3 py-1 rounded-full">
                Unity On-Premise
              </span>
              <span className="border border-lime-400 text-lime-600 text-sm px-3 py-1 rounded-full">
                Alta Cloud-Native
              </span>
            </div>

            <p className="text-gray-700 mb-4">{p.desc}</p>

            <button
              className="text-blue-600 font-medium hover:underline"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}
