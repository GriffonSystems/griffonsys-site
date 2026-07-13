import React, { useState } from "react"
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

const money = (n) => {
  const v = Number(n)
  if (!Number.isFinite(v)) return ""
  return v.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  })
}

function ModalShell({ open, title, onClose, children }) {
  React.useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === "Escape" && onClose?.()
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="min-w-0">
            <div className="text-sm text-gray-500">Verkada</div>
            <h3 className="truncate text-lg font-bold text-gray-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  )
}

function PriceCallout({ msrpFrom }) {
  if (!msrpFrom) return null
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <div className="text-sm text-gray-600">Hardware MSRP from</div>
      <div className="mt-1 text-2xl font-extrabold text-gray-900">
        {money(msrpFrom)}
      </div>
      <div className="mt-2 text-xs text-gray-500">
        Final installed pricing varies by configuration, licensing term, and site conditions.
        Contact us for quantity discounts and installed pricing.
      </div>
    </div>
  )
}

export default function VendorVerkada() {
  const [active, setActive] = useState("video")

  // Modal state (single modal that can show video + MSRP)
  const [selectedCard, setSelectedCard] = useState(null)

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

  // MSRP values you provided (shown only inside the modal after click)
  const videoProducts = [
    {
      key: "dome",
      title: "Dome",
      desc: "Reliable performance for most environments.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/video/dome.png`,
      msrpFrom: 599,
    },
    {
      key: "mini",
      title: "Mini",
      desc: "Compact form factor for tight spaces.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/video/mini.png`,
      msrpFrom: 499,
    },
    {
      key: "bullet",
      title: "Bullet",
      desc: "Optimized for license plate recognition and detail, with optional IR illuminator.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/video/bullet.png`,
      msrpFrom: 1899,
    },
    {
      key: "fisheye",
      title: "Fisheye",
      desc: "180° panoramic coverage.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/video/fisheye.png`,
      msrpFrom: 1799,
    },
    {
      key: "multisensor",
      title: "Multisensor",
      desc: "Two or four sensors in one housing.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/video/multisensor.png`,
      msrpFrom: 3599,
    },
    {
      key: "ptz",
      title: "PTZ",
      desc: "Wide-area pan-tilt-zoom coverage.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/video/ptz.png`,
      msrpFrom: 3699,
    },
    {
      key: "remote",
      title: "Remote",
      desc: "Battery + LTE deployments.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/video/remote.png`,
      msrpFrom: 3500,
    },
    {
      key: "dualhead",
      title: "Dual-Head (CY53-E)",
      desc: "Two 5MP sensors in one housing.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/video/dualhead.jpeg`,
      msrpFrom: 2799,
    },
    {
      key: "viewstation",
      title: "Viewing Station",
      desc: "Live monitoring appliance.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/video/viewstation.jpeg`,
      msrpFrom: 499,
    },
  ]

  const accessProducts = [
    {
      key: "singledoor",
      title: "Single Door Controller",
      desc: "Cloud-managed single opening.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/access/singledoor.png`,
      msrpFrom: 799,
    },
    {
      key: "4door",
      title: "4-Door Controller",
      desc: "Controls up to four doors.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/access/4doorcontroller.png`,
      msrpFrom: 1799,
    },
    {
      key: "mullion",
      title: "Mullion Reader",
      desc: "NFC, BLE, and mobile credentials.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/access/singledoorreader.png`,
      msrpFrom: 349,
    },
    {
      key: "keypad",
      title: "Keypad Reader",
      desc: "PIN + card/mobile access.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/access/keypad.png`,
      msrpFrom: 599,
    },
  ]

  const intercomProducts = [
    {
      key: "TS12",
      title: "TS12 — Audio Intercom",
      desc: "Audio-only intercom.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/TS12.webp`,
      msrpFrom: 1099,
    },
    {
      key: "TD33",
      title: "TD33 — Slim Intercom",
      desc: "Mullion-friendly.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td33.webp`,
      msrpFrom: 1499,
    },
    {
      key: "TD53",
      title: "TD53 — Video Intercom",
      desc: "HD video + audio.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td53.webp`,
      msrpFrom: 1799,
    },
    {
      key: "TD63",
      title: "TD63 — Video + Keypad",
      desc: "Directory + keypad.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/intercom/td63.webp`,
      msrpFrom: 1999,
    },
  ]

  const connectivityProducts = [
    {
      key: "gc31e",
      title: "GC31-E Cellular Gateway",
      desc: "LTE backhaul with PoE output.",
      img: `${import.meta.env.BASE_URL}vendors/verkada/connectivity/gc31.webp`,
      video: "https://www.youtube.com/embed/fb9LNytX7ac?autoplay=1",
      msrpFrom: 1299,
    },
  ]

  const handleCardClick = (card) => {
    // One modal for everything. If card has a video, it will render inside the modal.
    setSelectedCard(card)
  }

  const closeModal = () => {
    setSelectedCard(null)
  }

  const renderGrid = (list) => (
    <div className={grid}>
      {list.map((card) => (
        <div
          key={card.key}
          onClick={() => handleCardClick(card)}
          className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition cursor-pointer"
        >
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-40 object-contain bg-gray-50 rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-1">{card.title}</h3>
          <p className="text-gray-700 text-sm">{card.desc}</p>

          <p className="mt-3 text-xs text-gray-500">
            {card.video ? "Click to watch video & see pricing" : "Click for specs & pricing"}
          </p>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Helmet>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <VerkadaLogo />
        <div className="flex gap-3">
          <Link
            to="/resources/verkada-vs-avigilon"
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Compare Verkada vs Avigilon
          </Link>
          <Link to="/contact" className="btn btn-primary">
            Request a Demo
          </Link>
        </div>
      </div>

      {/* WHY VERKADA */}
      <section className="max-w-4xl mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Why Organizations Choose Verkada
        </h2>

        <p className="text-gray-700 mb-4">
          Verkada delivers an integrated, cloud-managed security platform that
          unifies video surveillance, access control, intercoms, alarms, and
          environmental sensors into a single system.
        </p>

        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
          <li>Cloud-based management with multi-site visibility</li>
          <li>Plug-and-play deployment with minimal onsite infrastructure</li>
          <li>Predictable operating costs and easy scalability</li>
        </ul>

        <p className="text-sm text-gray-600 mb-4">
          Some organizations prefer fully on-prem systems due to regulatory,
          evidentiary, or internal IT requirements.{" "}
          <Link
            to="/brands/avigilon"
            className="underline font-medium hover:opacity-80"
          >
            Avigilon is often selected in those environments
          </Link>
          .
        </p>

        <p className="text-sm text-gray-700">
          Comparing platforms?{" "}
          <Link
            to="/resources/verkada-vs-avigilon"
            className="underline font-medium hover:opacity-80"
          >
            Read our Verkada vs Avigilon buyer guide for Illinois municipalities &
            manufacturers
          </Link>
          .
        </p>
      </section>

      {/* Tabs */}
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

      {/* Single merged modal: video (optional) + MSRP + CTA */}
      <ModalShell
        open={!!selectedCard}
        title={selectedCard?.title || ""}
        onClose={closeModal}
      >
        {selectedCard && (
          <div className="space-y-5">
            {/* Optional video at top (e.g., GC31-E) */}
            {selectedCard.video && (
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                <iframe
                  className="h-full w-full"
                  src={selectedCard.video}
                  title={`${selectedCard.title} video`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="grid gap-5 md:grid-cols-2">
              {/* LEFT */}
              <div>
                <img
                  src={selectedCard.img}
                  alt={selectedCard.title}
                  className="w-full rounded-2xl bg-gray-50 object-contain p-4"
                />

                <div className="mt-4 text-sm text-gray-700">
                  {selectedCard.desc}
                </div>

                <div className="mt-4 rounded-2xl border border-gray-200 p-4">
                  <div className="text-sm font-semibold text-gray-900">
                    Installed & supported by Griffon Systems
                  </div>
                  <div className="mt-1 text-xs text-gray-600">
                    Design • Installation • Configuration • Ongoing support across Illinois
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                <PriceCallout msrpFrom={selectedCard.msrpFrom} />

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="text-sm font-semibold text-gray-900">
                    Quantity & installed pricing
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    We’ll confirm configuration (lens/storage tier, mounting, cabling, power,
                    and license term), then provide an installed quote.
                  </div>

                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                    >
                      Get quantity & installed pricing
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
                    >
                      Request a demo
                    </Link>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    Hardware MSRP is informational; project pricing varies by configuration,
                    licensing, and site conditions.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ModalShell>
    </main>
  )
}
