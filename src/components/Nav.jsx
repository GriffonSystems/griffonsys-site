// src/components/Nav.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white z-50 shadow-sm">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="font-semibold text-lg">Griffon Systems</Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-700"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/vendors/verkada">Verkada</Link>
          <Link to="/vendors/avigilon">Avigilon</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 flex flex-col space-y-2 p-4">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/vendors/verkada" onClick={() => setOpen(false)}>Verkada</Link>
          <Link to="/vendors/avigilon" onClick={() => setOpen(false)}>Avigilon</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  )
}
