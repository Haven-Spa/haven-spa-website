import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter, ChevronDown } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import './Contact.css'

const _imgs = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true })
const getImg = (name) => _imgs[`../assets/images/${name}`]?.default ?? null
const heroBg = getImg('hero.jpg')

const faqs = [
  {
    q: 'Do you offer both massage and nail services?',
    a: 'Yes. Haven Spa offers premium massage chair therapy as well as professional pedicure and manicure services.',
  },
  {
    q: 'Are your pedicure chairs massage chairs?',
    a: 'Yes. Our advanced pedicure chairs provide therapeutic back and leg massage while you receive your nail treatment, so you get a full relaxation experience at the same time.',
  },
  {
    q: 'Do you offer services for men?',
    a: 'Absolutely. Our services are available for both men and women.',
  },
  {
    q: 'How long does a pedicure take?',
    a: 'Approximately 15–60 minutes depending on the package selected.',
  },
  {
    q: 'What should I expect during a massage chair session?',
    a: 'Our state-of-the-art chairs deliver full-body relaxation targeting back, neck, and legs. Sessions are available in 15, 30, 45, or 60 minute durations. After your session, enjoy a complimentary refreshment.',
  },
]

/* ─── FAQ Item ──────────────────────────────────────────── */
function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`}>
      <button className="faq-item__question" onClick={() => setOpen(o => !o)}>
        <span>{item.q}</span>
        <ChevronDown size={18} className="faq-item__icon" />
      </button>
      <div className="faq-item__answer">
        <p>{item.a}</p>
      </div>
    </div>
  )
}

export default function Contact() {
  const [formRef, formVis] = useIntersectionObserver()
  const [faqRef, faqVis] = useIntersectionObserver()
  const location = useLocation()

  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', date: '', time: '', requests: '',
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const plan = params.get('plan')
    if (plan) setForm(f => ({ ...f, service: plan }))
  }, [location.search])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})

  const update = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required'
    if (!form.service) errs.service = 'Please select a service'
    if (!form.date) errs.date = 'Please select a date'
    if (!form.time) errs.time = 'Please select a time'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setTimeout(() => { setLoading(false); setSuccess(true) }, 1800)
  }

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
  ]

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        {heroBg
          ? <img src={heroBg} alt="Book a Session" className="page-hero-img" />
          : <div className="page-hero-img" style={{ background: 'linear-gradient(135deg, var(--espresso), var(--terracotta))' }} />}
        <div className="page-hero-content">
          <h1>Book Your Session</h1>
          <p><a href="/">Home</a> / Contact</p>
        </div>
      </section>

      {/* Main content */}
      <section className="contact-main" ref={formRef}>
        <div className="container-wide contact-main__inner">
          {/* LEFT — Info */}
          <div className={`contact-info hidden-anim-right${formVis ? ' visible' : ''}`}>
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">We'd love to<br />hear from you</h2>
            <p className="contact-info__body">
              Ready to begin your wellness journey? Reach out to our team or use our
              booking form. We're here to help you find the perfect treatment.
            </p>

            <ul className="contact-info__details">
              <li>
                <div className="contact-info__icon"><MapPin size={18} /></div>
                <div>
                  <strong>Our Location</strong>
                  <span>Somanya–Accra Road, Ogome (Brigade)<br />Opposite the Washing Bay / G-Unit Hotel<br />Somanya, Eastern Region, Ghana</span>
                </div>
              </li>
              <li>
                <div className="contact-info__icon"><Mail size={18} /></div>
                <div>
                  <strong>Email</strong>
                  <a href="mailto:havenspaglobal@gmail.com">havenspaglobal@gmail.com</a>
                </div>
              </li>
              <li>
                <div className="contact-info__icon"><Phone size={18} /></div>
                <div>
                  <strong>Phone / WhatsApp</strong>
                  <a href="tel:+233204736880">+233 20 473 6880</a>
                </div>
              </li>
            </ul>

            {/* Map placeholder */}
            <div className="contact-info__map">
              <iframe
                src="https://maps.google.com/maps?q=Somanya+Ghana&t=&z=14&ie=UTF8&iwloc=&output=embed"
                title="Haven Spa Location"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Socials */}
            <div className="contact-info__socials">
              <a href="https://www.instagram.com/havenspaglobal?igsh=MW1iZGhpZmRlZ2tzYg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://www.facebook.com/share/1GGJFFSkKm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={18} /></a>
            </div>
          </div>

          {/* RIGHT — Booking Form */}
          <div className={`contact-form-wrap hidden-anim${formVis ? ' visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <div className="contact-form-card">
              <h3>Reserve Your Appointment</h3>
              {success ? (
                <div className="contact-form__success">
                  <div className="contact-form__success-icon">✦</div>
                  <h4>Booking Confirmed!</h4>
                  <p>Thank you, {form.name || 'dear guest'}! Your appointment request has been received. We will confirm within 2 hours.<br /><strong>Haven Spa, Your Safe Place.</strong></p>
                  <button className="btn btn-dark" onClick={() => { setSuccess(false); setForm({ name:'',email:'',phone:'',service:'',date:'',time:'',requests:'' }) }}>
                    Make Another Booking
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Customer Name *</label>
                      <input id="name" name="name" type="text" placeholder="Jane Doe" value={form.name} onChange={update} className={errors.name ? 'error' : ''} />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Customer Email *</label>
                      <input id="email" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={update} className={errors.email ? 'error' : ''} />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Customer Phone</label>
                      <input id="phone" name="phone" type="tel" placeholder="+233 XX XXX XXXX" value={form.phone} onChange={update} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service">Service Type *</label>
                      <select id="service" name="service" value={form.service} onChange={update} className={errors.service ? 'error' : ''}>
                        <option value="">Select a treatment</option>
                        <optgroup label="Membership Plans">
                          <option>Silver Wellness</option>
                          <option>Gold Glow</option>
                          <option>Platinum Luxe</option>
                        </optgroup>
                        <optgroup label="Individual Treatments">
                          <option>Massage Chair Therapy — 5 min</option>
                          <option>Massage Chair Therapy — 10 min</option>
                          <option>Massage Chair Therapy — 15 min</option>
                          <option>Massage Chair Therapy — 20 min</option>
                          <option>Massage Chair Therapy — 25 min</option>
                          <option>Massage Chair Therapy — 30 min</option>
                          <option>Massage Chair Therapy — 45 min</option>
                          <option>Massage Chair Therapy — 60 min</option>
                          <option>Massage Chair Therapy</option>
                          <option>Luxury Pedicure</option>
                          <option>Classic &amp; Deluxe Manicure</option>
                          <option>Classic Manicure</option>
                          <option>Deluxe Manicure</option>
                          <option>Couples Relax &amp; Glow Session</option>
                          <option>Haven Royal Retreat Package</option>
                          <option>Golden Glow Package</option>
                          <option>Classic Care Package</option>
                        </optgroup>
                      </select>
                      {errors.service && <span className="form-error">{errors.service}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date">Appointment Date *</label>
                      <input id="date" name="date" type="date" value={form.date} onChange={update} className={errors.date ? 'error' : ''} min={new Date().toISOString().split('T')[0]} />
                      {errors.date && <span className="form-error">{errors.date}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="time">Preferred Time *</label>
                      <select id="time" name="time" value={form.time} onChange={update} className={errors.time ? 'error' : ''}>
                        <option value="">Select time slot</option>
                        {timeSlots.map(t => <option key={t}>{t}</option>)}
                      </select>
                      {errors.time && <span className="form-error">{errors.time}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="requests">Notes</label>
                    <textarea id="requests" name="requests" rows={4} placeholder="Any allergies, preferences or special requirements..." value={form.requests} onChange={update} />
                  </div>
                  <button type="submit" className="btn btn-dark btn-submit" disabled={loading}>
                    {loading ? <><span className="btn-spinner" />Processing…</> : 'Confirm Booking'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" ref={faqRef}>
        <div className="container-wide">
          <div className="faq-section__header">
            <span className="section-label">Got Questions?</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="floral-divider"><span>✦</span><span>— ❧ —</span><span>✦</span></div>
          </div>
          <div className={`faq-list hidden-anim${faqVis ? ' visible' : ''}`}>
            {faqs.map((item, i) => <FAQItem key={i} item={item} index={i} />)}
          </div>
        </div>
      </section>
    </>
  )
}
