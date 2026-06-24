import { useState, useEffect, useCallback } from 'react'
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'
import useIntersectionObserver from '../hooks/useIntersectionObserver'
import './Gallery.css'

/* ─── Dynamically import gallery images ─────────────────── */
const imageModules = import.meta.glob('../assets/images/gallery-*.{jpg,jpeg,png,webp}', { eager: true })
const importedImages = Object.values(imageModules).map(m => m.default)

const _allImgs = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true })
const getImg = (name) => _allImgs[`../assets/images/${name}`]?.default ?? null

/* ─── Gallery data ──────────────────────────────────────── */
const categories = ['All', 'Services', 'Interiors', 'Team']
const categoryMap = ['Services', 'Interiors', 'Team']

const galleryItems = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: importedImages[i] || null,
  label: `Gallery ${String(i + 1).padStart(2, '0')}`,
  category: categoryMap[i % 3],
}))

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const [galleryRef, galleryVis] = useIntersectionObserver()

  const heroBg = getImg('about-main.jpg')

  const filtered = active === 'All' ? galleryItems : galleryItems.filter(g => g.category === active)

  const openLightbox = (realIndex) => setLightboxIdx(realIndex)
  const closeLightbox = () => setLightboxIdx(null)

  const prev = useCallback(() => {
    setLightboxIdx(i => (i - 1 + filtered.length) % filtered.length)
  }, [filtered.length])

  const next = useCallback(() => {
    setLightboxIdx(i => (i + 1) % filtered.length)
  }, [filtered.length])

  useEffect(() => {
    if (lightboxIdx === null) return
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIdx, prev, next])

  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIdx])

  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        {heroBg
          ? <img src={heroBg} alt="Gallery" className="page-hero-img" />
          : <div className="page-hero-img" style={{ background: 'linear-gradient(135deg, var(--espresso), var(--stone))' }} />}
        <div className="page-hero-content">
          <p><a href="/">Home</a> / Gallery</p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="gallery-section" ref={galleryRef}>
        <div className="container-wide">
          {/* Filter tabs */}
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`gallery-filter-btn${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid">
            {filtered.map((item, i) => (
              <div
                key={`${item.id}-${active}`}
                className={`gallery-item hidden-anim${galleryVis ? ' visible' : ''}`}
                style={{ transitionDelay: `${(i % 9) * 0.06}s` }}
                onClick={() => openLightbox(i)}
              >
                {item.src
                  ? <img src={item.src} alt={item.label} loading="lazy" />
                  : (
                    <div className="gallery-item__placeholder">
                      {item.label}
                    </div>
                  )}
                <div className="gallery-item__overlay">
                  <ZoomIn size={28} />
                  <span>{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">
            <X size={24} />
          </button>
          <button className="lightbox__prev" onClick={e => { e.stopPropagation(); prev() }} aria-label="Previous">
            <ChevronLeft size={32} />
          </button>
          <div className="lightbox__img-wrap" onClick={e => e.stopPropagation()}>
            {filtered[lightboxIdx]?.src
              ? <img src={filtered[lightboxIdx].src} alt={filtered[lightboxIdx].label} />
              : <div className="lightbox__placeholder">{filtered[lightboxIdx]?.label}</div>}
            <p className="lightbox__caption">
              {filtered[lightboxIdx]?.category} — {lightboxIdx + 1} / {filtered.length}
            </p>
          </div>
          <button className="lightbox__next" onClick={e => { e.stopPropagation(); next() }} aria-label="Next">
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  )
}
