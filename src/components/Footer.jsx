import React, { useState } from "react"
import { Link } from "react-router-dom"
import TetrisModal from "./TetrisModal" // ← make sure this file exists exactly here

export default function Footer() {
  const [tetrisOpen, setTetrisOpen] = useState(false)

  return (
    <>
      {/* ---- FOOTER ---- */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="container py-10 grid md:grid-cols-3 gap-10">

          {/* ---- Column 1: Logo + Basic Info ---- */}
          <div>
            <img
              src="/logos/griffon_logo.svg"
              alt="Griffon Systems"
              className="h-10 mb-4"
            />

            <p className="text-gray-600 text-sm leading-relaxed">
              Enterprise video surveillance and access control solutions for
              Illinois manufacturing, municipal, education, and commercial facilities.
            </p>

            <p className="text-gray-500 text-sm mt-4">
              Elmhurst, IL • (630) 607-0346
            </p>
          </div>

          {/* ---- Column 2: Quick Links ---- */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/solutions" className="hover:text-black">Solutions</Link></li>
              <li><Link to="/brands/verkada" className="hover:text-black">Verkada</Link></li>
              <li><Link to="/brands/avigilon" className="hover:text-black">Avigilon</Link></li>
              <li><Link to="/industries" className="hover:text-black">Industries</Link></li>
              <li><Link to="/from-the-field" className="hover:text-black">From the Field</Link></li>
              <li><Link to="/contact" className="hover:text-black">Contact</Link></li>
              <li><Link to="/service" className="hover:text-black font-semibold">Service Request</Link></li>

              {/* ---- NEW: Play Tetris ---- */}
              <li>
                <button
                  onClick={() => setTetrisOpen(true)}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Play Tetris
                </button>
              </li>
            </ul>
          </div>

          {/* ---- Column 3: Social + Terms ---- */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>

            <div className="flex items-center gap-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black"
              >
                Facebook
              </a>
              <a
                href="https://linkedin.com/company/griffon-systems"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black"
              >
                LinkedIn
              </a>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed">
              © {new Date().getFullYear()} Griffon Systems, Inc.<br />
              All rights reserved.
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Security • Technology • Integration
            </p>
          </div>
        </div>
      </footer>

      {/* ---- TETRIS MODAL ---- */}
      <TetrisModal open={tetrisOpen} onClose={() => setTetrisOpen(false)} />
    </>
  )
}
