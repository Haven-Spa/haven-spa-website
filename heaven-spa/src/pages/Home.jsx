import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wind, Wifi, Star, Coffee, ChevronDown, Play, Check, X } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import './Home.css'

/* ─── Image lookup via glob ───────────────────────────── */
const _imgs = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true })
const getImg = (name) => _imgs[`../assets/images/${name}`]?.default ?? null

const heroImg        = getImg('hero.jpg')
const aboutMainImg   = getImg('about-main.jpg')
const aboutThumbImg  = getImg('about-thumb.jpg')
const serviceHydroImg = getImg('service-hydro.jpg')
const serviceAromaImg = getImg('service-aroma.jpg')
const serviceStoneImg = getImg('service-stone.jpg')
const videoBgImg     = getImg('video-thumb.jpg')

/* ─── Placeholder helper ──────────────────────────────── */
const Placeholder = ({ label, style = {} }) => (
  <div className="img-placeholder" style={style}>{label}</div>
)

/* ─── Botanical leaf SVG ──────────────────────────────── */
const BotanicalLeaf = ({ className = '' }) => (
  <svg className={`botanical-leaf ${className}`} viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 195 C60 195 10 130 10 80 C10 30 60 5 60 5 C60 5 110 30 110 80 C110 130 60 195 60 195Z" fill="var(--bark)" />
    <line x1="60" y1="5" x2="60" y2="195" stroke="var(--cream)" strokeWidth="1.5" />
    <line x1="60" y1="60" x2="30" y2="80" stroke="var(--cream)" strokeWidth="1" />
    <line x1="60" y1="80" x2="90" y2="100" stroke="var(--cream)" strokeWidth="1" />
    <line x1="60" y1="100" x2="30" y2="120" stroke="var(--cream)" strokeWidth="1" />
    <line x1="60" y1="120" x2="90" y2="140" stroke="var(--cream)" strokeWidth="1" />
  </svg>
)

/* ═══════════════════════════════════════════════════════ */
export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false)
  const [aboutRef, aboutVis] = useIntersectionObserver()
  const [whyRef, whyVis] = useIntersectionObserver()
  const [servicesRef, servicesVis] = useIntersectionObserver()
  const [pricingRef, pricingVis] = useIntersectionObserver()

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════ */}
      <section className="hero">
        {heroImg
          ? <img src={heroImg} alt="Haven Spa" className="hero__bg" />
          : <div className="hero__bg hero__bg--placeholder" />}
        <div className="hero__overlay" />
        <div className="hero__content animate-fadeUp">
          <span className="section-label" style={{ color: 'var(--gold)' }}>Est. January 2026</span>
          <h1 className="hero__title">We give the best<br />massage for you</h1>
          <p className="hero__sub">
            Experience premium massage therapy in a serene ash and gold environment designed
            for total comfort and wellness.
          </p>
          <div className="hero__actions">
            <Link to="/about" className="btn btn-gold">Learn More</Link>
            <Link to="/contact" className="btn btn-outline-gold">Book a Session</Link>
          </div>
        </div>
        <a href="#about" className="hero__scroll-hint">
          <ChevronDown size={20} />
        </a>
      </section>

      {/* ═══ ABOUT TEASER ══════════════════════════════ */}
      <section id="about" className="about-teaser" ref={aboutRef}>
        <BotanicalLeaf className="about-teaser__leaf-left" style={{ width: 160, left: -40, top: 40 }} />
        <div className="about-teaser__inner container-wide">
          {/* Left */}
          <div className={`about-teaser__text hidden-anim-right${aboutVis ? ' visible' : ''}`}>
            <span className="section-label">Est. 2026</span>
            <h2 className="section-title">Modern Wellness &amp;<br />Beauty Lounge</h2>
            <p className="about-teaser__body">
              Haven Spa is a modern wellness and beauty destination located along the
              Somanya–Accra Road in Ogome (Brigade), Somanya. We specialise in premium massage
              chair therapy, luxury pedicure, and manicure services, all delivered in a serene
              ash and gold environment designed for comfort, elegance, and total relaxation.
            </p>
            <blockquote className="about-teaser__quote">
              "Haven Spa, Your Safe Place."
            </blockquote>
            <div className="about-teaser__owner">
              <div className="about-teaser__avatar">
                <span>J</span>
              </div>
              <div>
                <strong>John Tetteh Awaitey</strong>
                <span>Founder &amp; Managing Director</span>
              </div>
            </div>
            <Link to="/about" className="btn btn-dark" style={{ marginTop: '2rem' }}>Discover Our Story</Link>
          </div>

          {/* Right — image collage */}
          <div className={`about-teaser__images hidden-anim${aboutVis ? ' visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <div className="about-teaser__img-main">
              {aboutMainImg
                ? <img src={aboutMainImg} alt="Spa interior" />
                : <Placeholder label="Spa Interior" />}
            </div>
            <div className="about-teaser__img-thumb">
              {aboutThumbImg
                ? <img src={aboutThumbImg} alt="Therapist" />
                : <Placeholder label="Therapist" />}
            </div>
            <BotanicalLeaf className="about-teaser__leaf-collage" style={{ width: 100, bottom: -20, right: -20 }} />
          </div>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═════════════════════════════ */}
      <section className="why-us" ref={whyRef}>
        <div className="why-us__inner container-wide">
          <div className="why-us__header">
            <span className="section-label" style={{ color: 'var(--gold)' }}>Why Heaven</span>
            <h2 className="section-title" style={{ color: 'var(--warm-white)' }}>Crafted for your comfort</h2>
          </div>
          <div className="why-us__cards">
            {[
              { icon: <Wind size={28} />, title: 'Massage Chair Therapy', desc: 'State-of-the-art massage chairs that relieve tension, improve circulation, and promote deep relaxation.' },
              { icon: <Star size={28} />, title: 'Luxury Pedicure', desc: 'Professional foot care in advanced massage pedicure chairs,nail care and full-body relaxation at once.' },
              { icon: <Wifi size={28} />, title: 'Serene Environment', desc: 'A calm ash and gold space designed for total comfort, elegance, and peaceful wellness.' },
              { icon: <Coffee size={28} />, title: 'After-Spa Refreshments', desc: 'Enjoy complimentary Sobolo, Lemon Tea, or Herbal Infusion after every session to restore and rehydrate.' },
            ].map((f, i) => (
              <div
                key={f.title}
                className={`why-card hidden-anim${whyVis ? ' visible' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="why-card__icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ══════════════════════════════════ */}
      <section className="services" id="services" ref={servicesRef}>
        <BotanicalLeaf className="services__leaf-right" style={{ width: 140, right: -30, top: 60 }} />
        <div className="services__inner container-wide">
          <div className="services__header">
            <span className="section-label">Treatments</span>
            <h2 className="section-title">What We Offer</h2>
            <div className="floral-divider">
              <span>✦</span><span>— ❧ —</span><span>✦</span>
            </div>
          </div>
          <div className="services__cards">
            {[
              { img: serviceHydroImg, title: 'Massage Chair Therapy', desc: 'Full-body relaxation using our state-of-the-art massage chairs. Relieve back and neck tension, improve blood circulation, reduce stress and fatigue, and ease muscle stiffness.', sessions: ['15 min', '30 min', '45 min', '60 min'] },
              { img: serviceAromaImg, title: 'Luxury Pedicure', desc: 'Professional foot care while relaxing in our advanced massage pedicure chairs. Includes foot soak, nail shaping, exfoliation and scrub, callus treatment, moisturising massage, and back and shoulder massage throughout.' },
              { img: serviceStoneImg, title: 'Classic & Deluxe Manicure', desc: 'Enhance the beauty of your hands in our relaxing spa atmosphere. Includes nail trimming and shaping, cuticle care, hand scrub, hand massage, and polish application. Deluxe option includes extended massage and premium treatments.' },
            ].map((s, i) => (
              <div
                key={s.title}
                className={`service-card hidden-anim${servicesVis ? ' visible' : ''}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="service-card__img">
                  {s.img
                    ? <img src={s.img} alt={s.title} />
                    : <Placeholder label={s.title} style={{ height: '100%' }} />}
                </div>
                <div className="service-card__body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  {s.sessions && (
                    <div className="session-tags">
                      <span className="session-tags__label">Sessions:</span>
                      {s.sessions.map(t => (
                        <span key={t} className="session-tag">{t}</span>
                      ))}
                    </div>
                  )}
                  <Link to="/contact" className="btn btn-dark">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO BANNER ══════════════════════════════ */}
      <section className="video-banner">
        {videoBgImg
          ? <img src={videoBgImg} alt="" className="video-banner__bg" />
          : <div className="video-banner__bg video-banner__bg--placeholder" />}
        <div className="video-banner__overlay" />
        <div className="video-banner__content">
          <p className="video-banner__quote">Feel comfortable like home.</p>
          <button
            className="video-banner__play"
            onClick={() => setVideoOpen(true)}
            aria-label="Play video"
          >
            <Play size={28} fill="currentColor" />
          </button>
        </div>
      </section>

      {/* Video modal */}
      {videoOpen && (
        <div className="video-modal" onClick={() => setVideoOpen(false)}>
          <div className="video-modal__inner" onClick={e => e.stopPropagation()}>
            <button className="video-modal__close" onClick={() => setVideoOpen(false)}>
              <X size={22} />
            </button>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Haven Spa Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ═══ PRICING ═══════════════════════════════════ */}
      <section className="pricing" ref={pricingRef}>
        <div className="pricing__inner container-wide">
          <div className="pricing__header">
            <span className="section-label">Membership Plans</span>
            <h2 className="section-title">Choose Your Wellness Plan</h2>

            <div className="floral-divider"><span>✦</span><span>— ❧ —</span><span>✦</span></div>
          </div>
          <div className="pricing__cards">
            {[
              {
                name: 'Silver Wellness',
                price: 'GHS 250',
                period: '/mo',
                features: ['4 Sessions / Month', '60 Min Max per Session', 'Discounted Rates', 'Priority Booking'],
                highlight: false,
              },
              {
                name: 'Gold Glow',
                price: 'GHS 400',
                period: '/mo',
                features: ['8 Sessions / Month', 'Pedicure + Massage Combo', 'Larger Discount', 'Complimentary Refreshment'],
                highlight: true,
              },
              {
                name: 'Platinum Luxe',
                price: 'GHS 600',
                period: '/mo',
                features: ['10 Sessions / Month', 'VIP Priority Booking', 'Monthly Couples Session', 'Exclusive Member Perks'],
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={plan.name}
                className={`pricing-card${plan.highlight ? ' pricing-card--highlight' : ''} hidden-anim${pricingVis ? ' visible' : ''}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                {plan.highlight && <span className="pricing-card__badge">Most Popular</span>}
                <h3 className="pricing-card__name">{plan.name}</h3>
                <div className="pricing-card__price">
                  <span className="pricing-card__amount">{plan.price}</span>
                  <span className="pricing-card__period">{plan.period}</span>
                </div>
                <ul className="pricing-card__features">
                  {plan.features.map(f => (
                    <li key={f}><Check size={15} />{f}</li>
                  ))}
                </ul>
                <Link to="/contact" className={`btn ${plan.highlight ? 'btn-gold' : 'btn-dark'}`}>Select Plan</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROMO BANNER ══════════════════════════════ */}
      <section className="promo-banner">
        <div className="promo-banner__overlay" />
        <div className="promo-banner__content">
          <span className="section-label" style={{ color: 'var(--gold)' }}>Special Package</span>
          <h2>The Haven Royal<br />Retreat — GHS 300</h2>
          <p>Our premium all-in-one experience: Luxury Pedicure + Classic Manicure + Full Massage Chair Therapy + Aromatherapy + PureGlow Facial Veil + Golden Refresh.</p>
          <Link to="/contact" className="btn btn-gold">Make an Appointment</Link>
        </div>
      </section>
    </>
  )
}
