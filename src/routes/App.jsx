// src/routes/App.jsx
import { Routes, Route } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Analytics } from '@vercel/analytics/react'

import Home from './Home'
import Solutions from './Solutions'
import Contact from './Contact'
import About from './About'
import Industries from './Industries'
import VendorVerkada from './VendorVerkada'
import VendorAvigilon from './VendorAvigilon'
import AvigilonCloud from './AvigilonCloud'
import VendorAlta from './VendorAlta'
import NotFound from './NotFound'

// ✅ New pages
import FromTheField from './FromTheField'
import WirelessLink from './WirelessLink'
import ComingSoon from './ComingSoon'   // ← add this import

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Vendors */}
        <Route path="/vendors/verkada" element={<VendorVerkada />} />
        <Route path="/vendors/avigilon" element={<VendorAvigilon />} />
        <Route path="/vendors/avigilon-cloud" element={<AvigilonCloud />} />
        <Route path="/vendors/alta" element={<VendorAlta />} />

        {/* ✅ From the Field section */}
        <Route path="/from-the-field" element={<FromTheField />} />
        <Route path="/from-the-field/wireless-link" element={<WirelessLink />} />

        {/* ✅ Coming soon placeholders */}
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
