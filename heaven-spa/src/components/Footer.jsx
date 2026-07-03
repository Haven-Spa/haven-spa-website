import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'
import logoImg from '../assets/images/LogoIcon.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        {/* Col 1 */}
        <div className="footer__col footer__col--brand">
          <Link to="/" className="footer__logo">
            <img src={logoImg} alt="Restore Luxury Spa & Beauty" className="footer__logo-img" />
            <div className="footer__logo-text">
              <span className="footer__logo-text-top">Restore</span>
              <div className="footer__logo-text-row">
                <span className="footer__logo-text-main">Luxury</span>
                <span className="footer__logo-text-sub">Spa &amp; Beauty</span>
              </div>
            </div>
          </Link>
          <p className="footer__tagline">
            Relax, Renew, Restore.
          </p>
          <div className="footer__socials">
            <a href="https://www.instagram.com/restoreluxuryspabeauty?igsh=MTYzN2E1eXk0a2VhNg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://www.facebook.com/share/1GGJFFSkKm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube"><Youtube size={18} /></a>
          </div>
        </div>

        <div className="footer__right">
          {/* Col 2 */}
          <div className="footer__col">
            <h4 className="footer__heading">Get In Touch</h4>
            <ul className="footer__contact">
              <li><MapPin size={14} /><span>Opposite G-Unit Hotel, Ogome (Brigade), Somanya, Eastern Region, Ghana</span></li>
              <li><Mail size={14} /><a href="mailto:restoreluxuryspa@gmail.com">restoreluxuryspa@gmail.com</a></li>
              <li><Phone size={14} /><a href="tel:+233204736880">+233 20 473 6880</a></li>
              <li><span style={{ fontSize: '0.78rem', color: 'rgba(250,248,245,0.6)' }}>Open Daily: 10:00 AM – 10:00 PM</span></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="footer__col">
            <h4 className="footer__heading">Our Spa</h4>
            <ul className="footer__links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/#services">Services</Link></li>
              <li><Link to="/about#team">Our Team</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Col 4 removed (newsletter) */}
      </div>

      <div className="footer__bottom">
        <p>© Restore Luxury Spa & Beauty, 2026. All rights reserved. Relax, Renew, Restore.</p>
        <p style={{ marginTop: '0.5rem' }}><Link to="/privacy" style={{ color: 'var(--gold)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>Privacy Policy</Link><span style={{ color: 'rgba(250,248,245,0.3)', margin: '0 0.6rem' }}>|</span><Link to="/cancellation" style={{ color: 'var(--gold)', fontSize: '0.78rem', letterSpacing: '0.1em' }}>Cancellation &amp; Refund Policy</Link></p>
      </div>
    </footer>
  )
}
