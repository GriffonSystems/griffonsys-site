// src/components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Linkedin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        
        {/* ---------- Column 1: Brand ---------- */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">
            Griffon Systems, Inc.
          </h3>
          <p className="text-sm leading-relaxed mb-4">
            Providing integrated video surveillance, access control, and wireless
            networking solutions across Illinois since 2002.
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} Griffon Systems, Inc. All rights reserved.
          </p>
        </div>

        {/* ---------- Column 2: Quick Links ---------- */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/solutions" className="hover:text-white">Solutions</Link></li>
            <li><Link to="/industries" className="hover:text-white">Industries</Link></li>
            <li><Link to="/from-the-field" className="hover:text-white">From the Field</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* ---------- Column 3: Contact + Social ---------- */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Connect</h4>
          <ul className="space-y-2 text-sm mb-4">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <a href="tel:+16306070346" className="hover:text-white">(630) 607-0346</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <a href="mailto:info@griffonsys.com" className="hover:text-white">
                info@griffonsys.com
              </a>
            </li>
          </ul>

          {/* ✅ Updated LinkedIn link */}
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/paul-grefenstette-0667211"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
