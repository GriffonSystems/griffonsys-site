import { Routes, Route } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

import Home from './Home'
import Solutions from './Solutions'
import Contact from './Contact'
import About from './About'
import Industries from './Industries'
import VendorVerkada from './VendorVerkada'
import VendorAvigilon from './VendorAvigilon'
import VendorOpenpath from './VendorOpenpath'
import AvigilonCloud from './AvigilonCloud'
import VendorAlta from './VendorAlta'
import NotFound from './NotFound'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/vendors/verkada" element={<VendorVerkada />} />
        <Route path="/ve
