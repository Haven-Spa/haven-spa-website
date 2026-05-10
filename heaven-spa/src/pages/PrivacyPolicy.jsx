import { Link } from 'react-router-dom'
import './PrivacyPolicy.css'

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      {/* Hero */}
      <section className="privacy-hero">
        <div className="privacy-hero__overlay" />
        <div className="privacy-hero__content">
          <h1>Privacy Policy</h1>
          <p><Link to="/">Home</Link> / Privacy Policy</p>
        </div>
      </section>

      {/* Content */}
      <section className="privacy-content">
        <div className="privacy-content__inner container-wide">
          <p className="privacy-intro">
            At <strong>Restore Luxury Spa & Beauty</strong>, we value your privacy and are committed to protecting your personal information.
          </p>

          <div className="privacy-section">
            <h2>Information We Collect</h2>
            <p>When you use our website or book an appointment, we may collect:</p>
            <ul>
              <li>Customer name</li>
              <li>Phone number</li>
              <li>Appointment details</li>
              <li>Special notes or preferences submitted through our booking form</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Schedule and manage appointments</li>
              <li>Contact you regarding bookings or inquiries</li>
              <li>Improve our services and customer experience</li>
              <li>Maintain internal business records</li>
            </ul>
          </div>

          <div className="privacy-section">
            <h2>Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties.</p>
            <p>Your information may only be shared when required by law or when necessary to operate our services securely.</p>
          </div>

          <div className="privacy-section">
            <h2>Data Security</h2>
            <p>We take reasonable steps to protect your personal information from unauthorized access, misuse, or disclosure.</p>
          </div>

          <div className="privacy-section">
            <h2>Cookies &amp; Analytics</h2>
            <p>Our website may use cookies or basic analytics tools to improve website functionality and user experience.</p>
          </div>

          <div className="privacy-section">
            <h2>Third-Party Services</h2>
            <p>Our website may contain links or integrations with third-party services such as payment providers, maps, or social media platforms. We are not responsible for the privacy practices of those third parties.</p>
          </div>

          <div className="privacy-section">
            <h2>Your Rights</h2>
            <p>You may request access, correction, or deletion of your personal information by contacting us directly.</p>
          </div>

          <div className="privacy-section">
            <h2>Contact Us</h2>
            <p>If you have questions regarding this Privacy Policy, please contact us through the contact information provided on our website.</p>
            <Link to="/contact" className="btn btn-gold" style={{ marginTop: '1rem', display: 'inline-block' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
