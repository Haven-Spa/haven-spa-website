import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer className="footer">
      <div className="footer__top container">
        {/* Col 1 */}
        <div className="footer__col footer__col--brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-star">✦</span> Restore Luxury Spa And Beauty
          </Link>
          <p className="footer__tagline">
            Your Safe Place. Relax. Recharge. Rejuvenate.
          </p>
          <div className="footer__socials">
            <a href="https://www.instagram.com/havenspaglobal?igsh=MW1iZGhpZmRlZ2tzYg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="https://www.facebook.com/share/1GGJFFSkKm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube"><Youtube size={18} /></a>
          </div>
        </div>

        {/* Col 2 */}
        <div className="footer__col">
          <h4 className="footer__heading">Get In Touch</h4>
          <ul className="footer__contact">
            <li><MapPin size={14} /><span>Opposite G-Unit Hotel, Ogome (Brigade), Somanya, Eastern Region, Ghana</span></li>
            <li><Mail size={14} /><a href="mailto:havenspaglobal@gmail.com">havenspaglobal@gmail.com</a></li>
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
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="footer__col">
          <h4 className="footer__heading">Newsletter</h4>
          <p className="footer__newsletter-text">Subscribe for exclusive offers and wellness tips.</p>
          {subscribed ? (
            <p className="footer__subscribed">Thank you for subscribing! ✦</p>
          ) : (
            <form className="footer__newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>

      <div className="footer__bottom">
        <p>© Restore Luxury Spa And Beauty, 2026. All rights reserved. Your Safe Place.</p>
      </div>
    </footer>
  )
}
