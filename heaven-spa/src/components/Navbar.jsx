import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/images/LogoIcon.png'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)

  // keep ref in sync so scroll handler can read it
  useEffect(() => { openRef.current = open }, [open])

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      // hide on scroll-down, show on scroll-up (mobile only via CSS)
      if (y > lastY && y > 120 && !openRef.current) setHidden(true)
      else setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}${hidden ? ' navbar--hidden' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <img src={logoImg} alt="Restore Luxury Spa & Beauty" className="navbar__logo-img" />
          <div className="navbar__logo-text">
            <span className="navbar__logo-text-top">Restore</span>
            <div className="navbar__logo-text-row">
              <span className="navbar__logo-text-main">Luxury</span>
              <span className="navbar__logo-text-sub">Spa &amp; Beauty</span>
            </div>
          </div>
        </Link>

        <div className="navbar__right">
          {/* Desktop nav */}
          <nav className="navbar__links">
            {['/', '/about', '/gallery', '/careers', '/contact'].map((path, i) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
              >
                {['Home', 'About', 'Gallery', 'Careers', 'Contact'][i]}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <Link to="/contact" className="navbar__cta btn btn-outline-gold">Book Now</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer${open ? ' navbar__drawer--open' : ''}`}>
        {['/', '/about', '/gallery', '/careers', '/contact'].map((path, i) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => `navbar__drawer-link${isActive ? ' active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {['Home', 'About', 'Gallery', 'Careers', 'Contact'][i]}
          </NavLink>
        ))}
        <Link to="/contact" className="btn btn-gold" onClick={() => setOpen(false)} style={{ marginTop: '1rem', textAlign: 'center' }}>
          Book Now
        </Link>
      </div>
    </header>
  )
}
