import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/images/logo.png'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo + Brand */}
        <Link to="/" className="navbar__logo">
          <img src={logoImg} alt="Restore Luxury Spa And Beauty" className="navbar__logo-img" />
          <span className="navbar__brand">
            <span className="navbar__brand-main">Restore</span>
            <span className="navbar__brand-sub">Luxury Spa &amp; Beauty</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links">
          {['/', '/about', '/gallery', '/contact'].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
            >
              {['Home', 'About', 'Gallery', 'Contact'][i]}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <Link to="/contact" className="navbar__cta btn btn-outline-gold">Book Now</Link>

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
        {['/', '/about', '/gallery', '/contact'].map((path, i) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) => `navbar__drawer-link${isActive ? ' active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {['Home', 'About', 'Gallery', 'Contact'][i]}
          </NavLink>
        ))}
        <Link to="/contact" className="btn btn-gold" onClick={() => setOpen(false)} style={{ marginTop: '1rem', textAlign: 'center' }}>
          Book Now
        </Link>
      </div>
    </header>
  )
}
