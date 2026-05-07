import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { MapPin, Mail, Phone, Instagram, Facebook, Twitter, ChevronDown, Clock, Sparkles, Star } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import './Contact.css'

const _imgs = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true })
const getImg = (name) => _imgs[`../assets/images/${name}`]?.default ?? null
const heroBg = getImg('hero.jpg')


const faqs = [
  {
    q: 'Do you offer both massage and nail services?',
    a: 'Yes. Restore luxury spa and beauty offers premium massage chair therapy as well as professional pedicure and manicure services.',
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
function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`} style={{ animationDelay: `${index * 0.08}s` }}>
      <button className="faq-item__question" onClick={() => setOpen(o => !o)}>
        <span className="faq-item__num">0{index + 1}</span>
        <span className="faq-item__text">{item.q}</span>
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
  const [services, setServices] = useState([])
  const [servicesLoading, setServicesLoading] = useState(false)
  const [servicesError, setServicesError] = useState(null)

  useEffect(() => {
    setServicesLoading(true)
    fetch('https://haven-spa-apis-rhy5.onrender.com/api/packages')
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : (data.data ?? data.services ?? data.result ?? [])
        setServices(list)
      })
      .catch(() => setServicesError('Could not load services'))
      .finally(() => setServicesLoading(false))
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const plan = params.get('plan')
    if (plan && services.length) {
      const found = services.find(
        s => (s.name ?? s.serviceName ?? s.title ?? '') === plan
      )
      if (found) setForm(f => ({ ...f, service: found.id }))
    }
  }, [location.search, services])

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [conflictModal, setConflictModal] = useState({ show: false, message: '' })
  const [bookedSlots, setBookedSlots] = useState([])
  const [checkingAvailability, setCheckingAvailability] = useState(false)

  const update = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    if (form.name.trim().length > 100) errs.name = 'Name must be 100 characters or fewer'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required'
    if (!form.service) errs.service = 'Please select a service'
    if (!form.date) errs.date = 'Please select a date'
    if (!form.time) errs.time = 'Please select a time'
    if (form.requests.length > 500) errs.requests = 'Notes must be 500 characters or fewer'
    return errs
  }

  const parseTimeSlot = (timeStr) => {
    const [time, meridiem] = timeStr.split(' ')
    let [hours, minutes] = time.split(':').map(Number)
    if (meridiem === 'PM' && hours !== 12) hours += 12
    if (meridiem === 'AM' && hours === 12) hours = 0
    return { hours, minutes }
  }

  // Fetch booked slots when date changes
  useEffect(() => {
    if (form.date) {
      fetchBookedSlots(form.date)
    }
  }, [form.date])

  const fetchBookedSlots = async (date) => {
    try {
      setCheckingAvailability(true)
      const res = await fetch(`https://haven-spa-apis-rhy5.onrender.com/api/Bookings/date/${date}`)
      if (res.ok) {
        const data = await res.json()
        const bookings = Array.isArray(data) ? data : (data.data ?? data.bookings ?? [])
        
        // Extract time slots from bookings
        const slots = bookings.map(booking => {
          const dateObj = new Date(booking.appointmentDate)
          const hours = dateObj.getHours()
          const minutes = dateObj.getMinutes()
          const meridiem = hours >= 12 ? 'PM' : 'AM'
          const displayHours = hours % 12 || 12
          return `${displayHours}:${String(minutes).padStart(2, '0')} ${meridiem}`
        })
        
        setBookedSlots(slots)
      }
    } catch (err) {
      console.error('Failed to fetch booked slots:', err)
    } finally {
      setCheckingAvailability(false)
    }
  }

  const checkAvailability = async (date, time) => {
    try {
      const { hours, minutes } = parseTimeSlot(time)
      const pad = n => String(n).padStart(2, '0')
      const appointmentDate = new Date(`${date}T${pad(hours)}:${pad(minutes)}:00`)

      const res = await fetch('https://haven-spa-apis-rhy5.onrender.com/api/Bookings/check-availability', {
        method: 'POST',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentDate: appointmentDate.toISOString()
        })
      })
      
      if (res.ok) {
        const data = await res.json()
        return data.available ?? true
      }
      
      // Fallback: check against local bookedSlots if API endpoint doesn't exist
      return !bookedSlots.includes(time)
    } catch {
      // If endpoint doesn't exist, check against local bookedSlots
      return !bookedSlots.includes(time)
    }
  }

  const handleWaitlist = async () => {
    setConflictModal({ show: false, message: '' })
    setLoading(true)
    
    try {
      const { hours, minutes } = parseTimeSlot(form.time)
      const pad = n => String(n).padStart(2, '0')
      const appointmentDate = new Date(`${form.date}T${pad(hours)}:${pad(minutes)}:00`)

      const res = await fetch('https://haven-spa-apis-rhy5.onrender.com/api/Bookings/waitlist', {
        method: 'POST',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          packageId: form.service,
          appointmentDate: appointmentDate.toISOString(),
          notes: form.requests,
        })
      })
      
      const data = await res.json()
      
      if (!res.ok || (data.responseCode !== undefined && data.responseCode !== '0000')) {
        throw new Error(data.message || 'Failed to join waitlist')
      }
      
      setSuccess(true)
      setErrors({ submit: '' })
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to join waitlist. Please try again.' })
    } finally {
      setLoading(false)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    
    // Check availability first
    setLoading(true)
    const isAvailable = await checkAvailability(form.date, form.time)
    
    if (!isAvailable) {
      setLoading(false)
      setConflictModal({
        show: true,
        message: `The time slot ${form.time} on ${new Date(form.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} is already booked. Would you like to choose another time or join the waitlist?`
      })
      return
    }
    
    // Proceed with booking if available
    try {
      const { hours, minutes } = parseTimeSlot(form.time)
      const pad = n => String(n).padStart(2, '0')
      // Construct as a local datetime string so timezone does not shift the date
      const appointmentDate = new Date(`${form.date}T${pad(hours)}:${pad(minutes)}:00`)

      const res = await fetch('https://haven-spa-apis-rhy5.onrender.com/api/Bookings', {
        method: 'POST',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          packageId: form.service,
          appointmentDate: appointmentDate.toISOString(),
          notes: form.requests,
        }),
      })
      const data = await res.json()
      if (!res.ok || (data.responseCode !== undefined && data.responseCode !== '0000')) {
        throw new Error(data.message || 'Booking request failed')
      }
      setSuccess(true)
    } catch (err) {
      setErrors({ submit: err.message || 'Booking failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
  ]

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="page-hero">
        {heroBg
          ? <img src={heroBg} alt="Book a Session" className="page-hero-img" />
          : <div className="page-hero-img" style={{ background: 'linear-gradient(135deg, var(--espresso), var(--terracotta))' }} />}
        <div className="page-hero-content">
          <h1>Book Your Session</h1>
          <p><a href="/">Home</a> / Contact</p>
        </div>
      </section>

      {/* ── Trust Bar ────────────────────────────────── */}
      <div className="contact-trust-bar">
        <div className="container-wide contact-trust-bar__inner">
          {[
            { icon: <Star size={15} />, text: 'Premium experience guaranteed' },
            { icon: <Clock size={15} />, text: 'Confirmed within 1 hour' },
            { icon: <Sparkles size={15} />, text: 'Luxury spa environment' },
            { icon: <MapPin size={15} />, text: 'Somanya, Eastern Region' },
          ].map(({ icon, text }) => (
            <div key={text} className="contact-trust-bar__item">
              <span className="contact-trust-bar__icon">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main ─────────────────────────────────────── */}
      <section className="contact-main" ref={formRef}>
        <div className="container-wide contact-main__inner">

          {/* LEFT — Info panel */}
          <div className={`contact-info hidden-anim-right${formVis ? ' visible' : ''}`}>
            <div className="contact-info__brand">
              <span className="contact-info__brand-star">✦</span>
              <div>
                <span className="section-label">Get In Touch</span>
                <h2 className="section-title">We'd love to<br />hear from you</h2>
              </div>
            </div>
            <p className="contact-info__body">
              Ready to begin your wellness journey? Reach out to our team or fill out the
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

            {/* Hours badge */}
            <div className="contact-info__hours">
              <Clock size={15} />
              <span><strong>Open Daily:</strong> 9:00 AM – 6:00 PM</span>
            </div>

            {/* Map */}
            <div className="contact-info__map">
              <iframe
                src="https://maps.google.com/maps?q=Somanya+Ghana&t=&z=14&ie=UTF8&iwloc=&output=embed"
                title="Restore luxury spa and beauty Location"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Socials */}
            <div className="contact-info__socials-row">
              <span className="contact-info__socials-label">Follow Us</span>
              <div className="contact-info__socials">
                <a href="https://www.instagram.com/havenspaglobal?igsh=MW1iZGhpZmRlZ2tzYg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={16} /></a>
                <a href="https://www.facebook.com/share/1GGJFFSkKm/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={16} /></a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter size={16} /></a>
              </div>
            </div>
          </div>

          {/* RIGHT — Booking Form */}
          <div className={`contact-form-wrap hidden-anim${formVis ? ' visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <div className="contact-form-card">
              <div className="contact-form-card__header">
                <div className="contact-form-card__header-accent" />
                <div className="contact-form-card__header-text">
                  <span className="section-label" style={{ color: 'var(--gold)' }}>Booking Form</span>
                  <h3>Reserve Your Appointment</h3>
                  <p>Complete the form below and we'll confirm your slot within 1 hour.</p>
                </div>
              </div>

              {success ? (
                <div className="contact-form__success">
                  <div className="contact-form__success-ring">
                    <span className="contact-form__success-icon">✦</span>
                  </div>
                  <h4>Booking Confirmed!</h4>
                  <p>Thank you, <strong>{form.name || 'dear guest'}</strong>! Your appointment request has been received. We will confirm within 1 hour.</p>
                  <p className="contact-form__success-tagline">Restore luxury spa and beauty, Your Safe Place.</p>
                  <button className="btn btn-dark" onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', service: '', date: '', time: '', requests: '' }) }}>
                    Make Another Booking
                  </button>
                </div>
              ) : (
                <>
                  <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Customer Name *</label>
                      <input id="name" name="name" type="text" placeholder="Jane Doe" value={form.name} onChange={update} className={errors.name ? 'error' : ''} maxLength={100} />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Customer Email *</label>
                      <input id="email" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={update} className={errors.email ? 'error' : ''} maxLength={100} />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Customer Phone</label>
                      <input id="phone" name="phone" type="tel" placeholder="+233 XX XXX XXXX" value={form.phone} onChange={update} maxLength={20} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="service">Service *</label>
                      <select id="service" name="service" value={form.service} onChange={update} className={errors.service ? 'error' : ''} disabled={servicesLoading}>
                        <option value="">
                          {servicesLoading ? 'Loading services…' : 'Select a service'}
                        </option>
                        {servicesError && (
                          <option value="" disabled>{servicesError}</option>
                        )}
                        {services.map(s => {
                          const name = s.name ?? s.serviceName ?? s.title ?? s.id
                          const duration = s.duration ?? s.durationMinutes ?? s.time ?? s.minutes
                          const price = s.price ?? s.amount ?? s.cost
                          const durationLabel = duration ? ` — ${typeof duration === 'number' ? duration + ' min' : duration}` : ''
                          const priceLabel = price != null ? ` · GHS ${price}` : ''
                          return (
                            <option key={s.id} value={s.id}>
                              {name}{durationLabel}{priceLabel}
                            </option>
                          )
                        })}
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
                      <select id="time" name="time" value={form.time} onChange={update} className={errors.time ? 'error' : ''} disabled={!form.date || checkingAvailability}>
                        <option value="">
                          {!form.date ? 'Select a date first' : checkingAvailability ? 'Checking availability...' : 'Select time slot'}
                        </option>
                        {timeSlots.map(t => {
                          const isBooked = bookedSlots.includes(t)
                          return (
                            <option key={t} value={t} disabled={isBooked}>
                              {t} {isBooked ? '(Booked)' : '(Available)'}
                            </option>
                          )
                        })}
                      </select>
                      {errors.time && <span className="form-error">{errors.time}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="requests">Special Notes</label>
                    <textarea id="requests" name="requests" rows={4} placeholder="Any allergies, preferences or special requirements…" value={form.requests} onChange={update} maxLength={500} />
                    <div className="form-char-count">{form.requests.length}/500</div>
                    {errors.requests && <span className="form-error">{errors.requests}</span>}
                  </div>
                  {errors.submit && <span className="form-error form-error--submit">{errors.submit}</span>}
                  <button type="submit" className="btn btn-dark btn-submit" disabled={loading}>
                    {loading ? <><span className="btn-spinner" />Processing…</> : <><Sparkles size={15} />Confirm Booking</>}
                  </button>
                </form>

                {/* Conflict Modal */}
                {conflictModal.show && (
                  <div className="booking-conflict-modal">
                    <div className="booking-conflict-modal__overlay" onClick={() => setConflictModal({ show: false, message: '' })} />
                    <div className="booking-conflict-modal__content">
                      <div className="booking-conflict-modal__header">
                        <Clock size={24} />
                        <h3>Time Slot Unavailable</h3>
                      </div>
                      <p className="booking-conflict-modal__message">{conflictModal.message}</p>
                      <div className="booking-conflict-modal__actions">
                        <button 
                          className="btn btn-outline" 
                          onClick={() => setConflictModal({ show: false, message: '' })}
                        >
                          Choose Another Time
                        </button>
                        <button 
                          className="btn btn-dark" 
                          onClick={handleWaitlist}
                          disabled={loading}
                        >
                          {loading ? 'Joining Waitlist...' : 'Join Waitlist'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="faq-section" ref={faqRef}>
        <div className="faq-section__bg-deco" aria-hidden="true">
          <span>✦</span><span>—  ❧  —</span><span>✦</span>
        </div>
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
