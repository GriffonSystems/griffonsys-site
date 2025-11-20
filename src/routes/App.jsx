// src/routes/App.jsx
import { Routes, Route } from "react-router-dom"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { Analytics } from "@vercel/analytics/react"

import Home from "./Home"
import Solutions from "./Solutions"
import Contact from "./Contact"
import About from "./About"
import Industries from "./Industries"
import BrandVerkada from "./BrandVerkada"
import BrandAvigilon from "./BrandAvigilon"
import AvigilonCloud from "./AvigilonCloud"
import VendorAlta from "./VendorAlta"
import NotFound from "./NotFound"

import FromTheField from "./FromTheField"
import WirelessLink from "./WirelessLink"
import ComingSoon from "./ComingSoon"

import ServiceRequest from "./ServiceRequest"

// ✅ NEW: Import Manufacturing Page
import Manufacturing from "./Manufacturing"

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* NEW: Manufacturing Landing Page */}
        <Route path="/manufacturing" element={<Manufacturing />} />

        {/* Service / Maintenance */}
        <Route path="/service" element={<ServiceRequest />} />

        {/* Brand pages */}
        <Route path="/brands/verkada" element={<BrandVerkada />} />
        <Route path="/brands/avigilon" element={<BrandAvigilon />} />
        <Route path="/brands/avigilon-cloud" element={<AvigilonCloud />} />
        <Route path="/brands/alta" element={<VendorAlta />} />

        {/* From the Field */}
        <Route path="/from-the-field" element={<FromTheField />} />
        <Route path="/from-the-field/wireless-link" element={<WirelessLink />} />

        {/* Coming Soon placeholders */}
        <Route path="/from-the-field/avigilon-factory" element={<ComingSoon />} />
        <Route path="/from-the-field/municipal" element={<ComingSoon />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <Analytics />
    </div>
  )
}
