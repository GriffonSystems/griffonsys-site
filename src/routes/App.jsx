// src/routes/App.jsx
import { Routes, Route } from "react-router-dom"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { Analytics } from "@vercel/analytics/react"

// Canonical
import Canonical from "../components/Canonical"

// Main pages
import Home from "./Home"
import Solutions from "./Solutions"
import Contact from "./Contact"
import About from "./About"
import Industries from "./Industries"

// Brand pages
import BrandVerkada from "./BrandVerkada"
import BrandAvigilon from "./BrandAvigilon"
import AvigilonCloud from "./AvigilonCloud"
import VendorAlta from "./VendorAlta"
import BrandSiklu from "./BrandSiklu"

// Resources
import ResourcesVerkadaVsAvigilon from "./ResourcesVerkadaVsAvigilon"
import Training from "./Training" // ✅ NEW

// Utility pages
import NotFound from "./NotFound"
import ServiceRequest from "./ServiceRequest"

// From The Field
import FromTheField from "./FromTheField"
import WirelessLink from "./WirelessLink"
import ComingSoon from "./ComingSoon"

// Landing Pages
import Manufacturing from "./Manufacturing"
import Municipal from "./Municipal"
import Commercial from "./Commercial"
import Education from "./Education"
import LPR from "./LPR"

// ✅ Event Page
import EventMobileStreetCamera from "./EventMobileStreetCamera"

// Dynamic SEO Local Pages
import LocationSEO from "./LocationSEO"

// Service Areas Hub Page
import ServiceAreas from "./ServiceAreas"

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />

      <Canonical />

      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Landing Pages */}
        <Route path="/manufacturing" element={<Manufacturing />} />
        <Route path="/municipal" element={<Municipal />} />
        <Route path="/commercial" element={<Commercial />} />
        <Route path="/education" element={<Education />} />
        <Route path="/lpr" element={<LPR />} />

        {/* Event Pages */}
        <Route
          path="/events/mobile-street-camera-lunch"
          element={<EventMobileStreetCamera />}
        />

        {/* Service */}
        <Route path="/service" element={<ServiceRequest />} />

        {/* Service Areas */}
        <Route path="/serviceareas" element={<ServiceAreas />} />

        {/* Resources */}
        <Route
          path="/resources/verkada-vs-avigilon"
          element={<ResourcesVerkadaVsAvigilon />}
        />
        <Route path="/resources/training" element={<Training />} />

        {/* Brand pages */}
        <Route path="/brands/verkada" element={<BrandVerkada />} />
        <Route path="/brands/avigilon" element={<BrandAvigilon />} />
        <Route path="/brands/avigilon-cloud" element={<AvigilonCloud />} />
        <Route path="/brands/alta" element={<VendorAlta />} />
        <Route path="/brands/siklu" element={<BrandSiklu />} />

        {/* From the Field */}
        <Route path="/from-the-field" element={<FromTheField />} />
        <Route path="/from-the-field/wireless-link" element={<WirelessLink />} />
        <Route path="/from-the-field/avigilon-factory" element={<ComingSoon />} />

        {/* ✅ Municipal case coming soon (prevents 404) */}
        <Route path="/from-the-field/municipal" element={<ComingSoon />} />

        {/* Dynamic SEO location pages */}
        <Route path="/locations/:city/:service" element={<LocationSEO />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <Analytics />
    </div>
  )
}
