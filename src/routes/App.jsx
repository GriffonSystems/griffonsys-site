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

// ✅ New pages
import FromTheField from "./FromTheField"
import WirelessLink from "./WirelessLink"
import ComingSoon from "./ComingSoon"

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

        {/* ✅ Brands (formerly Vendors) */}
        <Route path="/brands/verkada" element={<BrandVerkada />} />
        <Route path="/brands/avigilon" element={<BrandAvigilon />} />
        <Route path="/brands/avigilon-cloud" element={<AvigilonCloud />} />
        <Route path="/brands/alta" element={<VendorAlta />} />

        {/* ✅ From the Field section */}
        <Route path="/from-the-field" element={<FromTheField />} />
        <Route
          path="/from-the-field/wireless-link"
          element={<WirelessLink />}
        />

        {/* ✅ Coming soon placeholders */}
        <Route
          path="/from-the-field/avigilon-factory"
          element={<ComingSoon />}
        />
        <Route path="/from-the-field/municipal" element={<ComingSoon />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <Analytics />
    </div>
  )
}
