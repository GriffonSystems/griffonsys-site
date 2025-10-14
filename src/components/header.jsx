import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function GriffonLogo({ className = 'h-8 md:h-10 w-auto' }) {
  // Try SVG, then PNG fallback
  const [src, setSrc] = React.useState('/logos/griffon_logo.svg')
  return (
    <img
      src={src}
      onError={() => setSrc('/logos/griffon-256.png')}
      alt="Griffon Systems"
      className={className}
      loading="eager"
      decoding="sync"
      width={160}
      height={40}
    />
  )
}

export default function Header() {
  const [open, setOpen] = React.useState(false)

  // Optional: close on route change (if you use this header across routes)
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
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16">
        {/* Logo (clickable) */}
        <Link to="/" className="flex items-center gap-3">
          <GriffonLogo className="h-8 md:h-10 w-auto" />
          {/* Hide the text label since you have a logo */}
          <span className="sr-only">Griffon Systems</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/solutions" className={active}>Solutions</NavLink>
          <NavLink to="/vendors/verkada" className={active}>Verkada</NavLink>
          <NavLink to="/vendors/avigilon" className={active}>Avigilon</NavLink>
          <NavLink to="/industries" className={active}>Industries</NavLink>
          <NavLink to="/about" className={active}>About</NavLink>
          <NavLink to="/contact" className={active}>Contact</NavLink>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(!open)}
          aria-expanded={open ? 'true' : 'false'}
          aria-label="Toggle menu"
        >
          {/* Hamburger / X icons (inline SVG, no extra deps) */}
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="container flex flex-col py-3">
            <NavLink to="/solutions" className={active} onClick={() => setOpen(false)}>Solutions</NavLink>
            <NavLink to="/vendors/verkada" className={active} onClick={() => setOpen(false)}>Verkada</NavLink>
            <NavLink to="/vendors/avigilon" className={active} onClick={() => setOpen(false)}>Avigilon</NavLink>
            <NavLink to="/industries" className={active} onClick={() => setOpen(false)}>Industries</NavLink>
            <NavLink to="/about" className={active} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={active} onClick={() => setOpen(false)}>Contact</NavLink>
          </nav>
        </div>
      )}
    </header>
  )
}
