import React, { useState } from "react"
import { Link } from "react-router-dom"
import TetrisModal from "./TetrisModal"

export default function Footer() {
  const [tetrisOpen, setTetrisOpen] = useState(false)

  return (
    <>
      <footer className="bg-gray-700 text-gray-200 mt-20">
        <div className="container py-12 grid md:grid-cols-4 gap-10">

          {/* ---- Column 1: Logo + Info ---- */}
          <div>
            <img
              src="/logos/griffon_logo.svg"
              alt="Griffon Systems"
              className="h-10 mb-4 opacity-95"
              style={{ filter: "none" }}
            />

            <p className="text-gray-300 text-sm leading-relaxed">
              Enterprise video surveillance and access control for Illinois
              manufacturing, municipal, education, and commercial facilities.
            </p>

            <p className="text-gray-300 text-sm mt-4">
              Elmhurst, IL • (630) 607-0346
            </p>
          </div>

          {/* ---- Column 2: Quick Links ---- */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/solutions" className="hover:text-white">Solutions</Link></li>
              <li><Link to="/brands/verkada" className="hover:text-white">Verkada</Link></li>
              <li><Link to="/brands/avigilon" className="hover:text-white">Avigilon</Link></li>
              <li><Link to="/industries" className="hover:text-white">Industries</Link></li>
              <li><Link to="/from-the-field" className="hover:text-white">From the Field</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/service" className="hover:text-white font-semibold">Service Request</Link></li>
            </ul>
          </div>

          {/* ---- Column 3: Service Areas ---- */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Service Areas</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/locations/elmhurst/security-integrator" className="hover:text-white">Elmhurst</Link></li>
              <li><Link to="/locations/oak-brook/security-integrator" className="hover:text-white">Oak Brook</Link></li>
              <li><Link to="/locations/chicago/security-integrator" className="hover:text-white">Chicago</Link></li>
              <li><Link to="/locations/downers-grove/security-integrator" className="hover:text-white">Downers Grove</Link></li>
              <li><Link to="/locations/naperville/security-integrator" className="hover:text-white">Naperville</Link></li>
              <li><Link to="/locations/hinsdale/security-integrator" className="hover:text-white">Hinsdale</Link></li>
              <li><Link to="/locations/wheaton/security-integrator" className="hover:text-white">Wheaton</Link></li>
              <li><Link to="/locations/schaumburg/security-integrator" className="hover:text-white">Schaumburg</Link></li>
            </ul>

            <Link
              to="/ServiceAreas"
              className="inline-block mt-3 text-blue-300 hover:text-blue-200 text-xs underline"
            >
              View all service areas →
            </Link>
          </div>

          {/* ---- Column 4: Social + Tetris ---- */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-white">Connect</h3>

            <div className="flex items-center gap-4 mb-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=100077685937256"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/logos/facebook.svg"
                  alt="Facebook"
                  className="h-6 w-6 opacity-90 hover:opacity-100"
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/griffon-systems"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/logos/linkedin.svg"
                  alt="LinkedIn"
                  className="h-6 w-6 opacity-90 hover:opacity-100"
                />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@paulgref"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/logos/youtube.svg"
                  alt="YouTube"
                  className="h-6 w-6 opacity-90 hover:opacity-100"
                />
              </a>
            </div>

            <button
              onClick={() => setTetrisOpen(true)}
              className="text-blue-300 hover:text-blue-200 underline text-sm"
            >
              Play Tetris
            </button>

            <p className="text-sm text-gray-300 leading-relaxed mt-6">
              © {new Date().getFullYear()} Griffon Systems, Inc.<br />
              All rights reserved.
            </p>

            <p className="text-xs text-gray-300 mt-2">
              Security • Technology • Integration
            </p>
          </div>
        </div>
      </footer>

      <TetrisModal open={tetrisOpen} onClose={() => setTetrisOpen(false)} />
    </>
  )
}
