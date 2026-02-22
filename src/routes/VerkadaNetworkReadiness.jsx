// src/routes/VerkadaNetworkReadiness.jsx
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Helmet } from "react-helmet"

const TOOL_URL = "https://network-tester.support.verkada.com/network-tester"
const SITE = "https://griffonsys.com"

// TODO: replace with your real endpoint if/when you want submissions saved server-side
// Example: "/api/network-readiness-lead" (Vercel/Express/Lambda/etc.)
// Leave null to skip network call and just show success + open tester.
const LEAD_ENDPOINT = null

function safeStr(v) {
  return typeof v === "string" ? v : v == null ? "" : String(v)
}

function track(eventName, params = {}) {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, params)
    }
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...params })
    }
  } catch {
    // no-op
  }
}

function Modal({ open, title, onClose, children }) {
  const panelRef = useRef(null)

  // ESC to close + basic focus management
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.()
    }
    document.addEventListener("keydown", onKeyDown)
    // focus panel
    setTimeout(() => panelRef.current?.focus?.(), 0)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/60"
        aria-label="Close modal"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 mx-4 w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">
              We’ll send you practical deployment guidance if anything looks off. Then you’ll continue to the official
              Verkada Network Tester.
            </p>
          </div>
          <button
            type="button"
            className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <div className="mt-5">{children}</div>

        <p className="mt-4 text-xs text-slate-500">
          Note: The Network Tester is an official Verkada support tool. Griffon Systems does not operate the tester; we
          provide network readiness guidance and implementation best practices.
        </p>
      </div>
    </div>
  )
}

export default function VerkadaNetworkReadiness() {
  const pageUrl = `${SITE}/training/verkada-network-readiness`

  const [gateOpen, setGateOpen] = useState(false)
  const [gateSubmitting, setGateSubmitting] = useState(false)
  const [gateError, setGateError] = useState("")
  const [gateForm, setGateForm] = useState({
    name: "",
    email: "",
    org: "",
    projectType: "Cameras",
    wantReview: true,
  })

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Verkada Network Readiness & Pre-Deployment Testing",
      url: pageUrl,
      description:
        "Technical guide to validate network readiness for Verkada cloud deployments: bandwidth, DNS, latency, and firewall considerations plus an official Network Tester link.",
      publisher: {
        "@type": "Organization",
        name: "Griffon Systems, Inc.",
        url: SITE,
        telephone: "+1-630-607-0346",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Elmhurst",
          addressRegion: "IL",
          addressCountry: "US",
        },
      },
    }
  }, [pageUrl])

  function openGate(source = "primary") {
    track("verkada_network_gate_open", { page_location: pageUrl, source })
    setGateError("")
    setGateOpen(true)
  }

  function closeGate() {
    track("verkada_network_gate_close", { page_location: pageUrl })
    setGateOpen(false)
  }

  async function submitGate(e) {
    e.preventDefault()
    setGateError("")
    setGateSubmitting(true)

    const payload = {
      name: safeStr(gateForm.name).trim(),
      email: safeStr(gateForm.email).trim(),
      org: safeStr(gateForm.org).trim(),
      projectType: safeStr(gateForm.projectType),
      wantReview: !!gateForm.wantReview,
      page: pageUrl,
      ts: new Date().toISOString(),
    }

    track("verkada_network_gate_submit", {
      page_location: pageUrl,
      project_type: payload.projectType,
      want_review: payload.wantReview ? "yes" : "no",
    })

    try {
      // Optional: send to your backend
      if (LEAD_ENDPOINT) {
        const res = await fetch(LEAD_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error(`Lead endpoint returned ${res.status}`)
      }

      // Open Verkada tool in new tab, keep your page open
      track("verkada_network_tester_open_after_gate", { page_location: pageUrl, link_url: TOOL_URL })
      window.open(TOOL_URL, "_blank", "noopener,noreferrer")

      // Close modal + light confirmation state
      setGateOpen(false)
      setGateSubmitting(false)
    } catch (err) {
      setGateSubmitting(false)
      setGateError(
        "We couldn’t submit that right now. You can still run the tester — or try again in a moment."
      )
      // Still allow tester open so you don't block the user
      window.open(TOOL_URL, "_blank", "noopener,noreferrer")
    }
  }

  const Section = ({ title, children }) => (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 text-slate-700 leading-relaxed">{children}</div>
    </section>
  )

  return (
    <>
      <Helmet>
        <title>Verkada Network Readiness | Griffon Systems</title>
        <meta
          name="description"
          content="Technical guide for validating network readiness for Verkada cloud deployments: bandwidth, DNS, latency, firewall considerations, plus the official Verkada Network Tester."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Verkada Network Readiness | Griffon Systems" />
        <meta
          property="og:description"
          content="Validate bandwidth, DNS, latency, and firewall readiness before a Verkada cloud deployment. Practical checklist + official Network Tester."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Hero */}
        <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-wider text-slate-300">
                Griffon • Technical Resource
              </p>
              <h1 className="mt-2 text-3xl font-bold md:text-4xl">
                Verkada Network Readiness & Pre-Deployment Testing
              </h1>
              <p className="mt-3 text-slate-200">
                A practical, IT-friendly guide to validating bandwidth, DNS, latency, and firewall readiness before
                deploying Verkada cloud cameras, access control, intercoms, or gateways.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => openGate("hero")}
                  className="rounded-xl bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-100"
                >
                  Run Network Readiness Test
                </button>

                <a
                  href="#checklist"
                  onClick={() => track("verkada_network_readiness_scroll_checklist", { page_location: pageUrl })}
                  className="rounded-xl border border-white/30 px-5 py-3 font-semibold text-white hover:bg-white/10"
                >
                  Jump to Checklist
                </a>
              </div>

              <p className="mt-4 text-sm text-slate-300">
                We’ll connect you to the official Verkada Network Tester and can review results if requested.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-5 md:w-[360px]">
              <p className="text-sm text-slate-200">Best for:</p>
              <ul className="mt-2 space-y-2 text-slate-100">
                <li>• Municipal IT & Public Safety</li>
                <li>• School District Technology Teams</li>
                <li>• Manufacturing / Warehousing</li>
                <li>• Cloud migration planning</li>
              </ul>

              <div className="mt-4 rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-200">Want an engineer review?</p>
                <p className="mt-1 text-sm text-slate-100">
                  We’ll help document readiness and avoid install-day firewall surprises.
                </p>
                <button
                  type="button"
                  onClick={() => openGate("sidebar")}
                  className="mt-3 inline-block rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
                >
                  Start Test + Request Review
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Gate */}
        <Modal open={gateOpen} title="Start the Network Readiness Test" onClose={closeGate}>
          <form onSubmit={submitGate} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Name</span>
                <input
                  value={gateForm.name}
                  onChange={(e) => setGateForm((p) => ({ ...p, name: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="First Last"
                  required
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Work Email</span>
                <input
                  value={gateForm.email}
                  onChange={(e) => setGateForm((p) => ({ ...p, email: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="name@org.gov"
                  type="email"
                  required
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-sm font-semibold text-slate-900">Organization</span>
              <input
                value={gateForm.org}
                onChange={(e) => setGateForm((p) => ({ ...p, org: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="Village of ____ / ____ Manufacturing"
              />
            </label>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Project Type</span>
                <select
                  value={gateForm.projectType}
                  onChange={(e) => setGateForm((p) => ({ ...p, projectType: e.target.value }))}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option>Cameras</option>
                  <option>Access Control</option>
                  <option>Intercom</option>
                  <option>Hybrid / Full System</option>
                  <option>Unsure</option>
                </select>
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                <input
                  type="checkbox"
                  checked={gateForm.wantReview}
                  onChange={(e) => setGateForm((p) => ({ ...p, wantReview: e.target.checked }))}
                  className="h-4 w-4"
                />
                <span className="text-sm text-slate-800">
                  I’d like Griffon to review results
                </span>
              </label>
            </div>

            {gateError ? (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                {gateError}
              </div>
            ) : null}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={gateSubmitting}
                className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {gateSubmitting ? "Opening Tester…" : "Continue to Official Network Tester"}
              </button>

              <button
                type="button"
                onClick={() => {
                  track("verkada_network_gate_skip", { page_location: pageUrl })
                  window.open(TOOL_URL, "_blank", "noopener,noreferrer")
                  setGateOpen(false)
                }}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50"
              >
                Skip & Open Tester
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              We do not sell or share your info. This is for deployment guidance and follow-up only.
            </p>
          </form>
        </Modal>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Section title="What the Network Tester Validates">
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Connectivity:</span> outbound access to required cloud endpoints</li>
              <li><span className="font-semibold">DNS resolution:</span> catches split-DNS / filtering issues</li>
              <li><span className="font-semibold">Latency & stability:</span> helps spot routing or packet-loss issues</li>
              <li><span className="font-semibold">Readiness signals:</span> predicts smoother install day outcomes</li>
            </ul>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                Tip: Run it from the <span className="font-semibold">same network/VLAN</span> your Verkada devices will use.
              </p>
            </div>
          </Section>

          <Section title="When You Should Run It">
            <ul className="list-disc pl-5 space-y-2">
              <li>Before ordering hardware for a new site</li>
              <li>Before cutover from on-prem to cloud</li>
              <li>When IT needs validation for firewall/security review</li>
              <li>When using proxies, SSL inspection, or strict egress filtering</li>
              <li>Before enabling cellular backup / remote deployments</li>
            </ul>
            <div className="mt-4">
              <button
                onClick={() => openGate("body")}
                className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
              >
                Run Network Readiness Test
              </button>
            </div>
          </Section>
        </div>

        <div id="checklist" className="mt-8">
          <Section title="Pre-Deployment Network Checklist">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Bandwidth & Design</h3>
                <ul className="mt-2 space-y-2">
                  <li>☐ Confirm WAN bandwidth during peak hours</li>
                  <li>☐ Confirm VLAN / PoE design for devices</li>
                  <li>☐ Validate DHCP scope sizing (including growth)</li>
                  <li>☐ Confirm QoS policies won’t throttle cloud traffic</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Security / Egress</h3>
                <ul className="mt-2 space-y-2">
                  <li>☐ Confirm outbound internet access from device VLAN(s)</li>
                  <li>☐ Confirm DNS resolution using approved resolvers</li>
                  <li>☐ Check proxy/SSL inspection behaviors</li>
                  <li>☐ Document firewall change-control requirements</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-700">
                If your environment is strict, Griffon can help document the network plan and exceptions ahead of install
                day to reduce downtime and surprises.
              </p>
            </div>
          </Section>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">
                Want Griffon to validate your site and deployment plan?
              </p>
              <p className="text-slate-700">
                We deploy enterprise-grade Verkada + hybrid systems across Chicagoland.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                className="rounded-xl bg-slate-900 px-5 py-3 text-center font-semibold text-white hover:bg-slate-800"
                href="/contact"
                onClick={() => track("verkada_network_readiness_contact_click", { page_location: pageUrl })}
              >
                Contact Griffon
              </a>
              <a
                className="rounded-xl border border-slate-300 px-5 py-3 text-center font-semibold text-slate-900 hover:bg-white"
                href="tel:+16306070346"
                onClick={() => track("verkada_network_readiness_call_click", { page_location: pageUrl })}
              >
                Call 630-607-0346
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
