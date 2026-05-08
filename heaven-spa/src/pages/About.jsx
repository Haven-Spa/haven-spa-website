import { useEffect, useState } from 'react'
import { Target, Eye, Heart } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import './About.css'

const _imgs = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true })
const getImg = (name) => _imgs[`../assets/images/${name}`]?.default ?? null

const aboutHeroBg  = getImg('about-main.jpg')
const ownerImg     = getImg('owner.png')

const BotanicalLeaf = ({ style = {} }) => (
  <svg className="botanical-leaf" style={style} viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60 195 C60 195 10 130 10 80 C10 30 60 5 60 5 C60 5 110 30 110 80 C110 130 60 195 60 195Z" fill="var(--bark)" />
    <line x1="60" y1="5" x2="60" y2="195" stroke="var(--cream)" strokeWidth="1.5" />
    <line x1="60" y1="60" x2="30" y2="80" stroke="var(--cream)" strokeWidth="1" />
    <line x1="60" y1="80" x2="90" y2="100" stroke="var(--cream)" strokeWidth="1" />
    <line x1="60" y1="100" x2="30" y2="120" stroke="var(--cream)" strokeWidth="1" />
    <line x1="60" y1="120" x2="90" y2="140" stroke="var(--cream)" strokeWidth="1" />
  </svg>
)

/* ─── Animated Counter ─────────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, visible] = useIntersectionObserver()

  useEffect(() => {
    if (!visible) return
    let start = 0
    const num = parseInt(target)
    const duration = 1800
    const step = duration / num
    const timer = setInterval(() => {
      start += Math.ceil(num / 60)
      if (start >= num) { setCount(num); clearInterval(timer) }
      else setCount(start)
    }, step > 16 ? step : 16)
    return () => clearInterval(timer)
  }, [visible, target])

  return <span ref={ref}>{count}{suffix}</span>
}

const team = [
  { name: 'John Tetteh Awaitey', role: 'Founder & Managing Director', init: 'J' },
  { name: 'Kofi Monday', role: 'Operator', init: 'K' },
  { name: 'Esi Sunday', role: 'Operator', init: 'E' },
]

export default function About() {
  const [storyRef, storyVis] = useIntersectionObserver()
  const [mvRef, mvVis] = useIntersectionObserver()
  const [teamRef, teamVis] = useIntersectionObserver()

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        {aboutHeroBg
          ? <img src={aboutHeroBg} alt="About Restore Luxury Spa And Beauty" className="page-hero-img" />
          : <div className="page-hero-img" style={{ background: 'linear-gradient(135deg, var(--espresso), var(--bark))' }} />}
        <div className="page-hero-content">
          <h1>About Us</h1>
          <p><a href="/">Home</a> / About Us</p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story" ref={storyRef}>
        <BotanicalLeaf style={{ width: 180, left: -50, top: 60 }} />
        <div className="about-story__inner container-wide">
          <div className={`about-story__text hidden-anim-right${storyVis ? ' visible' : ''}`}>
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">A Modern Wellness Destination<br />Founded in 2026</h2>
            <p>
              Founded in 2026, Restore Luxury Spa And Beauty is a modern wellness and beauty destination located
              Opposite G-Unit Hotel, Ogome (Brigade), Somanya, Eastern Region, Ghana.
            </p>
            <p>
              We specialise in premium massage chair therapy, luxury pedicure, and manicure services
              — all delivered in a serene ash and gold environment designed for comfort, elegance,
              and total relaxation. Our advanced spa chairs combine therapeutic massage technology
              with beauty treatment functionality, allowing clients to enjoy deep body relaxation
              while receiving professional nail care.
            </p>
            <p>
              At Restore Luxury Spa And Beauty, we believe self-care should be effortless, peaceful, and rejuvenating.
              Whether you are here to relieve stress, refresh your feet, or treat yourself to a
              beauty session, we provide a calm and safe environment where wellness meets luxury.
              Restore Luxury Spa And Beauty, Your Safe Place.
            </p>
          </div>
          <div className={`about-story__portrait hidden-anim${storyVis ? ' visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <div className="about-story__img-wrap">
              {ownerImg
                ? <img src={ownerImg} alt="John Tetteh Awaitey" />
                : (
                  <div className="img-placeholder" style={{ height: '100%', fontSize: '1.2rem' }}>
                    Portrait
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="mission-values" ref={mvRef}>
        <div className="container-wide">
          <div className="mission-values__header">
            <span className="section-label">What Drives Us</span>
            <h2 className="section-title">Mission, Vision &amp; Values</h2>
            <div className="floral-divider"><span>✦</span><span>— ❧ —</span><span>✦</span></div>
          </div>
          <div className="mv-cards">
            {[
              { icon: <Target size={26} />, title: 'Our Mission', text: 'To provide a refined and innovative wellness experience that combines therapeutic massage with professional beauty care in a serene and welcoming environment.' },
              { icon: <Eye size={26} />, title: 'Our Vision', text: 'To become the leading modern spa and beauty lounge in Ghana, known for excellence, comfort, and outstanding client care.' },
              { icon: <Heart size={26} />, title: 'Our Values', text: 'Excellence, comfort, and a genuine commitment to every client’s well-being, ensuring every visit is peaceful, rejuvenating, and truly memorable.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`mv-card hidden-anim${mvVis ? ' visible' : ''}`}
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="mv-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team" id="team" ref={teamRef}>
        <div className="container-wide">
          <div className="about-team__header">
            <span className="section-label">The People</span>
            <h2 className="section-title">Meet Our Team</h2>
            <div className="floral-divider"><span>✦</span><span>— ❧ —</span><span>✦</span></div>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`team-card hidden-anim${teamVis ? ' visible' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="team-card__photo">
                  <span>{member.init}</span>
                </div>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="stats-bar__inner container-wide">
          {[
            { value: '5', suffix: '+', label: 'Services Offered' },
            { value: '3', suffix: '', label: 'Beauty Packages' },
            { value: '10', suffix: '+', label: 'Sessions (Platinum/mo)' },
            { value: '4', suffix: '.9 ★', label: 'Client Satisfaction' },
          ].map(stat => (
            <div key={stat.label} className="stat-item">
              <div className="stat-item__number">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="stat-item__label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
