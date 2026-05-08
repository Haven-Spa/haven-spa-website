import './PrivacyPolicy.css'

export default function CancellationPolicy() {
  return (
    <div className="privacy-page">
      {/* Hero */}
      <section className="privacy-hero">
        <div className="privacy-hero__overlay" />
        <div className="privacy-hero__content">
          <h1>Cancellation &amp; Refund Policy</h1>
          <p><a href="/">Home</a> / Cancellation &amp; Refund Policy</p>
        </div>
      </section>

      {/* Content */}
      <section className="privacy-content">
        <div className="privacy-content__inner container-wide">
          <p className="privacy-intro">
            At <strong>Restore Luxury Spa &amp; Beauty</strong>, we value our clients and strive to provide a smooth and relaxing experience for everyone.
          </p>

          <div className="privacy-section">
            <ul>
              <li>Clients must call to cancel at least <strong>1 hour</strong> before the scheduled appointment time to receive a full refund.</li>
              <li>Appointments may also be rescheduled by calling at least <strong>1 hour</strong> before the scheduled appointment time.</li>
              <li>Late cancellations or missed appointments may not qualify for a refund.</li>
            </ul>
          </div>

          <div className="privacy-section">
            <p>Thank you for choosing <strong>Restore Luxury Spa &amp; Beauty</strong>.</p>
            <a href="/contact" className="btn btn-gold" style={{ marginTop: '1.2rem', display: 'inline-block' }}>Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  )
}

