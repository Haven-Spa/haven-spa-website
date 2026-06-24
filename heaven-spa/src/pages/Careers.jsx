import { useState } from 'react'
import { Briefcase, MapPin, ChevronDown } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import './Careers.css'

const _imgs = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true })
const getImg = (name) => _imgs[`../assets/images/${name}`]?.default ?? null
const heroBg = getImg('careers-hero.jpg')

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

const openings = [
  {
    id: 'pedicure-manicure-technician',
    title: 'Pedicure and Manicure Technician',
    type: 'Full-time',
    location: 'Somanya, Ghana',
    description: 'Join our team to deliver luxury pedicure and manicure services in our serene spa environment.',
    responsibilities: [
      'Provide luxury pedicure and manicure treatments',
      'Use advanced massage pedicure chairs',
      'Maintain hygiene and sanitation standards',
      'Recommend suitable beauty packages'
    ],
    requirements: [
      'Experience in pedicure and/or manicure',
      'Good service skills',
      'Professional and positive attitude'
    ]
  }
]

function JobItem({ job, index, visible }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`job-item hidden-anim${visible ? ' visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <button className="job-item__header" onClick={() => setOpen(o => !o)}>
        <div className="job-item__title-wrap">
          <h3 className="job-item__title">{job.title}</h3>
          <div className="job-item__meta">
            <span className="job-item__meta-item"><Briefcase size={14} />{job.type}</span>
            <span className="job-item__meta-item"><MapPin size={14} />{job.location}</span>
          </div>
        </div>
        <ChevronDown size={20} className={`job-item__icon${open ? ' rotated' : ''}`} />
      </button>
      <div className={`job-item__content${open ? ' open' : ''}`}>
        <p className="job-item__desc">{job.description}</p>
        <div className="job-item__lists">
          <div className="job-item__col">
            <h4>Responsibilities</h4>
            <ul>
              {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
          <div className="job-item__col">
            <h4>Requirements</h4>
            <ul>
              {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>
        <a
          href="https://wa.me/233204736880?text=Hello%2C%20I%20would%20like%20to%20apply%20for%20the%20Pedicure%20and%20Manicure%20Technician%20position"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-gold job-item__apply"
        >Apply Now</a>
      </div>
    </div>
  )
}

export default function Careers() {
  const [heroRef, heroVis] = useIntersectionObserver()
  const [contentRef, contentVis] = useIntersectionObserver()

  return (
    <>
      <section className="page-hero">
        {heroBg
          ? <img src={heroBg} alt="Careers at Restore Luxury Spa" className="page-hero-img" />
          : <div className="page-hero-img" style={{ background: 'linear-gradient(135deg, var(--espresso), var(--terracotta))' }} />}
        <div className="page-hero-content">
          <p><a href="/">Home</a> / Careers</p>
        </div>
      </section>

      <section className="careers-intro" ref={heroRef}>
        <BotanicalLeaf className="careers-intro__leaf" style={{ width: 140, top: 40, right: -30 }} />
        <div className="container-wide careers-intro__inner">
          <div className={`careers-intro__text hidden-anim-right${heroVis ? ' visible' : ''}`}>
            <span className="section-label">We're Hiring</span>
            <h2 className="section-title">Build Your Career in Wellness</h2>
            <p className="careers-intro__body">
              Restore Luxury Spa & Beauty offers more than just jobs — we provide an opportunity to grow in a space dedicated to relaxation,
              self-care, and exceptional service. Join our team and help us create memorable wellness experiences for our community.
            </p>
          </div>
        </div>
      </section>

      <section className="careers-openings" ref={contentRef}>
        <div className="container-wide">
          <div className="careers-openings__header">
            <span className="section-label" style={{ color: 'var(--gold)' }}>Open Positions</span>
            <h2 className="section-title">Current Opportunities</h2>
            <div className="floral-divider"><span>✦</span><span>— ❧ —</span><span>✦</span></div>
          </div>
          <div className="jobs-list">
            {openings.map((job, i) => (
              <JobItem key={job.id} job={job} index={i} visible={contentVis} />
            ))}
          </div>
        </div>
      </section>

      <section className="careers-benefits">
        <div className="container-wide careers-benefits__inner">
          <div className="careers-benefits__header">
            <span className="section-label" style={{ color: 'var(--gold)' }}>Why Join Us</span>
            <h2 className="section-title" style={{ color: 'var(--warm-white)' }}>Employee Benefits</h2>
            <div className="floral-divider" style={{ color: 'var(--gold)' }}><span>✦</span><span>— ❧ —</span><span>✦</span></div>
          </div>
          <div className="benefits-grid">
            {[
              { title: 'Competitive Pay', desc: 'Attractive compensation with performance bonuses.' },
              { title: 'Free Massage Treatments', desc: 'Regular staff massage sessions for relaxation and wellness.' },
              { title: 'Free Pedicure & Manicure', desc: 'Monthly complimentary nail care services.' },
              { title: 'Growth Opportunities', desc: 'Career advancement and training in beauty and wellness.' },
            ].map((b, i) => (
              <div key={b.title} className="benefit-card-careers">
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}