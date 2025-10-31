import React from 'react'
import { Link, NavLink } from 'react-router-dom'

/** Griffon logo, tries SVG then PNG as fallback */
function GriffonLogo({ className = 'h-9 md:h-10 w-auto' }) {
  const [src, setSrc] = React.useState('/logos/griffon_logo.svg')
  return (
    <img
      src={src}
      onError={() => setSrc('/logos/griffon-256.png')}
      alt="Griffon Systems"
      className={className}
      width={160}
      height={40}
      loading="eager"
      decoding="sync"
    />
  )
}

export default function Nav() {
  const [open, setOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  // Add shadow on scroll
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route changes
  React.useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    window.addEventListener('popstate', close)
    return () => {
      window.removeEventListener('hashchange', close)
      window.removeEventListener('popstate', close)
    }
  }, [])

  const base = 'px-3 py-2 rounded-lg text-sm font-medium'
  const active = ({ isActive }) =>
    isActive ? `${base} bg-black text-white` : `${base} hover:bg-gray-100`

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur transition-shadow ${
          scrolled ? 'shadow-sm border-b border-gray-200' : ''
        }`}
        role="banner"
      >
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" aria-label="Go home">
            <GriffonLogo />
            <span className="sr-only">Griffon Systems</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            <NavLink to="/solutions" className={active}>Solutions</NavLink>
            <NavLink to="/brands/verkada" className={active}>Verkada</NavLink>
            <NavLink to="/brands/avigilon" className={active}>Avigilon</NavLink>
            <NavLink to="/industries" className={active}>Industries</NavLink>
            <NavLink to="/from-the-field" className={active}>From the Field</NavLink>
            <NavLink to="/about" className={active}>About</NavLink>
            <NavLink to="/contact" className={active}>Contact</NavLink>

            {/* ✅ New “Service” button */}
            <Link
              to="/service"
              className="ml-3 px-3 py-2 rounded-lg text-sm font-semibold bg-black text-white hover:bg-gray-800 transition"
            >
              Service
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-menu"
          className={`md:hidden bg-white border-t border-gray-200 shadow-lg transition-[max-height] overflow-hidden ${
            open ? 'max-h-[480px]' : 'max-h-0'
          }`}
        >
          <nav className="container flex flex-col py-3" aria-label="Mobile">
            <NavLink to="/solutions" className={active} onClick={() => setOpen(false)}>Solutions</NavLink>
            <NavLink to="/brands/verkada" className={active} onClick={() => setOpen(false)}>Verkada</NavLink>
            <NavLink to="/brands/avigilon" className={active} onClick={() => setOpen(false)}>Avigilon</NavLink>
            <NavLink to="/industries" className={active} onClick={() => setOpen(false)}>Industries</NavLink>
            <NavLink to="/from-the-field" className={active} onClick={() => setOpen(false)}>From the Field</NavLink>
            <NavLink to="/about" className={active} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={active} onClick={() => setOpen(false)}>Contact</NavLink>

            {/* ✅ “Service” link in mobile menu */}
            <NavLink
              to="/service"
              className={active}
              onClick={() => setOpen(false)}
            >
              Service
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Spacer so content doesn’t sit under fixed header */}
      <div className="h-16" aria-hidden="true" />
    </>
  )
}
