import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Wind, Wifi, Star, Coffee, ChevronDown, ChevronLeft, ChevronRight, Play, Check, X } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import './Home.css'

/* ─── Image lookup via glob ───────────────────────────── */
const _imgs = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true })
const getImg = (name) => _imgs[`../assets/images/${name}`]?.default ?? null

const aboutMainImg   = getImg('about-main.png')
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

/* ─── Hero slides data ────────────────────────────────── */
const heroSlides = [
  {
    img: () => getImg('hero.jpg'),
    label: 'Restore Luxury Spa & Beauty',
    title: 'We give the best\nmassage for you',
    sub: 'Experience premium massage therapy in a serene ash and gold environment designed for total comfort and wellness.',
    cta1: { label: 'Learn More', to: '/about' },
    cta2: { label: 'Book a Session', to: '/contact' },
  },
  {
    img: () => getImg('hero1.jpg'),
    label: 'Luxury Pedicure',
    title: 'Pamper your feet,\nrejuvenate your soul',
    sub: 'Professional foot care in our advanced massage pedicure chairs — nail care and full-body relaxation in one session.',
    cta1: { label: 'Book Now', to: '/contact?plan=Luxury%20Pedicure' },
    cta2: { label: 'Our Services', to: '#services', hash: true },
  },
  {
    img: () => getImg('hero2.jpg'),
    label: 'Manicure & More',
    title: 'Beautiful hands,\nserene experience',
    sub: 'Classic and Deluxe Manicure treatments in a calm, luxurious environment designed for your total comfort.',
    cta1: { label: 'Book Now', to: '/contact?plan=Classic%20%26%20Deluxe%20Manicure' },
    cta2: { label: 'View Pricing', to: '#pricing', hash: true },
  },
]

/* ═══════════════════════════════════════════════════════ */
export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const [heroPaused, setHeroPaused] = useState(false)

  const heroNext = useCallback(() => setHeroIdx(i => (i + 1) % heroSlides.length), [])
  const heroPrev = useCallback(() => setHeroIdx(i => (i - 1 + heroSlides.length) % heroSlides.length), [])

  useEffect(() => {
    if (heroPaused) return
    const t = setInterval(heroNext, 5000)
    return () => clearInterval(t)
  }, [heroPaused, heroNext])
  const [aboutRef, aboutVis] = useIntersectionObserver()
  const [whyRef, whyVis] = useIntersectionObserver()
  const [servicesRef, servicesVis] = useIntersectionObserver()
  const [pricingRef, pricingVis] = useIntersectionObserver()

  return (
    <>
      {/* ═══ HERO CAROUSEL ══════════════════════════════ */}
      <section
        className="hero"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        {/* Slides */}
        {heroSlides.map((slide, i) => {
          const img = slide.img()
          return (
            <div key={i} className={`hero__slide${i === heroIdx ? ' hero__slide--active' : ''}`}>
              {img
                ? <img src={img} alt={slide.label} className="hero__bg" />
                : <div className="hero__bg hero__bg--placeholder" />}
            </div>
          )
        })}

        <div className="hero__overlay" />

        {/* Content */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`hero__content${i === heroIdx ? ' hero__content--active' : ''}`}
          >
            <span className="section-label" style={{ color: 'var(--gold)' }}>{slide.label}</span>
            <h1 className="hero__title">{slide.title.split('\n').map((line, j) => (
              <span key={j}>{line}{j === 0 && <br />}</span>
            ))}</h1>
            <p className="hero__sub">{slide.sub}</p>
            <div className="hero__actions">
              <Link to={slide.cta1.to} className="btn btn-gold">{slide.cta1.label}</Link>
              {slide.cta2.hash
                ? <a href={slide.cta2.to} className="btn btn-outline-gold">{slide.cta2.label}</a>
                : <Link to={slide.cta2.to} className="btn btn-outline-gold">{slide.cta2.label}</Link>}
            </div>
          </div>
        ))}

        {/* Arrows */}
        <button className="hero__arrow hero__arrow--prev" onClick={heroPrev} aria-label="Previous slide">
          <ChevronLeft size={24} />
        </button>
        <button className="hero__arrow hero__arrow--next" onClick={heroNext} aria-label="Next slide">
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="hero__dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero__dot${i === heroIdx ? ' hero__dot--active' : ''}`}
              onClick={() => setHeroIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
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
            <h2 className="section-title">Modern Wellness &amp;<br />Beauty Lounge</h2>
            <p className="about-teaser__body">
              Restore Luxury Spa & Beauty is a modern wellness and beauty destination located
              Opposite G-Unit Hotel, Ogome (Brigade), Somanya. We specialise in premium massage
              chair therapy, luxury pedicure, and manicure services, all delivered in a serene
              ash and gold environment designed for comfort, elegance, and total relaxation.
            </p>
            <blockquote className="about-teaser__quote">
              "Relax, Renew, Restore."
            </blockquote>
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
            <span className="section-label" style={{ color: 'var(--gold)' }}>Why Restore</span>
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
            <h2 className="section-title">What We Offer</h2>
            <div className="floral-divider">
              <span>✦</span><span>— ❧ —</span><span>✦</span>
            </div>
          </div>
          <div className="services__cards">
            {[
              { img: serviceHydroImg, imgPos: 'center center', title: 'Massage Chair Therapy', desc: 'Full-body relaxation using our state-of-the-art massage chairs. Relieve back and neck tension, improve blood circulation, reduce stress and fatigue, and ease muscle stiffness.', sessions: ['10 min', '20 min', '30 min'] },
              { img: serviceAromaImg, imgPos: 'center top', title: 'Luxury Pedicure', desc: 'Professional foot care while relaxing in our advanced massage pedicure chairs. Includes foot soak, nail shaping, exfoliation and scrub, callus treatment, moisturising massage, and back and shoulder massage throughout.' },
              { img: serviceStoneImg, imgPos: 'center top', title: 'Classic & Deluxe Manicure', desc: 'Enhance the beauty of your hands in our relaxing spa atmosphere. Includes nail trimming and shaping, cuticle care, hand scrub, hand massage, and polish application. Deluxe option includes extended massage and premium treatments.' },
            ].map((s, i) => (
              <div
                key={s.title}
                className={`service-card hidden-anim${servicesVis ? ' visible' : ''}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="service-card__img">
                  {s.img
                    ? <img src={s.img} alt={s.title} style={{ objectPosition: s.imgPos }} />
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
                  <Link to={`/contact?plan=${encodeURIComponent(s.title)}`} className="btn btn-dark">Book Now</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HEALTH BENEFITS ═══════════════════════════ */}
      <section className="benefits">
        <div className="container-wide benefits__inner">
          <div className="benefits__header">
            <span className="section-label">Why It Works</span>
            <h2 className="section-title">Health Benefits of the<br />Luxury Massage</h2>
            <div className="floral-divider"><span>✦</span><span>— ❧ —</span><span>✦</span></div>
          </div>
          <div className="benefits__grid">
            {[
              { title: 'Complete Body Calm',      desc: 'Relaxes every muscle from your neck down to your feet.' },
              { title: 'Full Stress Reset',       desc: 'Calms your whole body, not just one spot.' },
              { title: 'Total Pain Relief',       desc: 'Eases aches from shoulders down to calves.' },
              { title: 'Whole Body Blood Flow',   desc: 'Boosts circulation everywhere you sit tight.' },
              { title: 'All-Over Relaxation',     desc: 'Helps your entire body unwind for better sleep.' },
              { title: 'Complete Mood Boost',     desc: 'Releases feel-good endorphins from top to bottom.' },
            ].map((b, i) => (
              <div key={b.title} className="benefit-card">
                <span className="benefit-card__num">0{i + 1}</span>
                <h3 className="benefit-card__title">{b.title}</h3>
                <p className="benefit-card__desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SESSION RATES ═════════════════════════════ */}
      <section className="session-rates">
        <div className="container-wide session-rates__inner">
          <div className="session-rates__header">
            <span className="section-label" style={{ color: 'var(--gold)' }}>Transparent Pricing</span>
            <h2 className="section-title" style={{ color: 'var(--warm-white)' }}>Massage Chair Session Rates</h2>
            <div className="floral-divider" style={{ color: 'var(--gold)' }}><span>✦</span><span>— ❧ —</span><span>✦</span></div>
            <p className="session-rates__sub">Pay only for the time you need — every minute counts at Restore Luxury Spa & Beauty.</p>
          </div>
          <div className="session-rates__table-wrap">
            <table className="session-rates__table">
              <thead>
                <tr>
                  <th>Duration</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {[
                  { mins: 10, price: 'GHS 30' },
                  { mins: 20, price: 'GHS 50' },
                  { mins: 30, price: 'GHS 70' },
                ].map(row => (
                  <tr key={row.mins}>
                    <td><span className="session-rates__mins">{row.mins} min</span></td>
                    <td><span className="session-rates__price">{row.price}</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <Link to={`/contact?plan=${encodeURIComponent(`Massage Chair Therapy — ${row.mins} min`)}`} className="btn btn-outline-gold session-rates__btn">Book</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              src="https://www.youtube.com/embed/XjzmHE8hqjU?autoplay=1"
              title="Massage Chair Therapy"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ═══ PRICING ═══════════════════════════════════ */}
      <section className="pricing" id="pricing" ref={pricingRef}>
        <div className="pricing__inner container-wide">
          <div className="pricing__header">
            <span className="section-label">Membership Plans</span>
            <h2 className="section-title">Choose Your Wellness Plan</h2>

            <div className="floral-divider"><span>✦</span><span>— ❧ —</span><span>✦</span></div>
          </div>
          <div className="pricing__cards">
            {[
              {
                name: 'Silver',
                price: 'GHS 180',
                period: '/mo',
                features: ['4 Luxury Massage Sessions', '30 Min Max per Session'],
                highlight: false,
              },
              {
                name: 'Gold',
                price: 'GHS 400',
                period: '/mo',
                features: ['6 Luxury Massage Sessions', '30 Min Max per Session', '1 Beauty Session (Pedicure or Manicure) + Massage Combo', 'More Discount', 'Complimentary Refreshment'],
                highlight: true,
              },
              {
                name: 'Platinum Luxe',
                price: 'GHS 600',
                period: '/mo',
                features: ['8 Luxury Massage Sessions', '30 Min Max per Session', '2 Beauty Sessions (Pedicure and/or Manicure) + Massage Combo', 'Complimentary Refreshment', 'A Wellness Product of Your Choice'],
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={plan.name}
                className={`pricing-card${plan.highlight ? ' pricing-card--highlight' : ''} hidden-anim${pricingVis ? ' visible' : ''}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
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
                <Link to={`/contact?plan=${encodeURIComponent(plan.name)}`} className={`btn ${plan.highlight ? 'btn-gold' : 'btn-dark'}`}>Select Plan</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
