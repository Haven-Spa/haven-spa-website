import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, UserRound, BookOpenText, Search, RefreshCw, ArrowRight, X } from 'lucide-react'
import DOMPurify from 'dompurify'
import './Blogs.css'

const API_URL = 'https://api.restoreluxuryspa.com/api/blogs'

const _imgs = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true })
const getImg = (name) => _imgs[`../assets/images/${name}`]?.default ?? null
const heroBg = getImg('hero1.jpg') || getImg('hero.jpg') || null

const normalizeResponse = (payload) => {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  return payload.data ?? payload.result ?? payload.blogs ?? payload.items ?? []
}

const normalizeBlog = (blog, idx) => {
  const title = blog.title ?? blog.name ?? `Blog Post ${idx + 1}`
  const excerpt = blog.excerpt ?? blog.summary ?? blog.shortDescription ?? ''
  const content = blog.content ?? blog.description ?? blog.body ?? ''
  const category = blog.category ?? blog.blogCategory ?? 'Wellness'
  const image = blog.coverImageUrl ?? blog.imageUrl ?? blog.image ?? blog.coverImage ?? blog.thumbnail ?? ''
  const author = blog.author ?? blog.createdBy ?? 'Restore Luxury Spa'
  const publishedAt = blog.publishedAt ?? blog.createdAt ?? blog.date ?? ''

  const rawTags = blog.tags ?? blog.keywords ?? []
  const tags = Array.isArray(rawTags)
    ? rawTags
    : String(rawTags)
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

  return {
    id: blog.id ?? blog._id ?? blog.slug ?? `${idx}-${title}`,
    title,
    excerpt,
    content,
    category,
    image,
    author,
    publishedAt,
    tags,
  }
}

const formatDate = (dateValue) => {
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

const toPlainText = (value) => String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

const sanitizeHtml = (value) => {
  return DOMPurify.sanitize(String(value || ''), {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'script', 'iframe', 'object', 'embed', 'form', 'input', 'button'],
  })
}

const readingTime = (text) => {
  const words = toPlainText(text).split(/\s+/).filter(Boolean).length
  if (!words) return '2 min read'
  return `${Math.max(2, Math.ceil(words / 200))} min read`
}

const HARDCODED_BLOG = {
  id: 'grand-opening-2026',
  title: '✨ GRAND OPENING ALERT! ✨',
  excerpt: 'Join us for the official opening of Restore Luxury Spa & Beauty on Saturday, July 18, 2026!',
  content: `
    <div style="line-height: 1.8;">
      <p><strong>The wait is over! 🎉</strong></p>
      <p>Join us for the official opening of <strong>Restore Luxury Spa & Beauty</strong> on <strong>Saturday, July 18, 2026</strong>, from <strong>8:00 AM</strong> at Ogome, Somanya, Eastern Region.</p>
      
      <p><strong>💆 FREE Massage Chair Therapy from 9:00 AM – 12:00 PM!</strong></p>
      
      <p>Come and discover a new level of relaxation and wellness. Whether you're looking to relieve stress, ease body aches, or simply treat yourself, Restore Luxury Spa & Beauty is the place to be.</p>
      
      <p>Bring your family and friends and experience luxury, comfort, and care—all in one place.</p>
      
      <p><strong>📞 For enquiries:</strong><br/>
      020 473 6880<br/>
      055 223 7572</p>
      
      <p><em>Restore Luxury Spa & Beauty – Relax. Refresh. Restore.</em></p>
    </div>
  `,
  category: 'Events',
  image: getImg('opening.jpeg') || '',
  author: 'Restore Luxury Spa',
  publishedAt: '2026-07-08',
  tags: ['Grand Opening', 'Events', 'Massage', 'Free Therapy'],
}

export default function Blogs() {
  const [blogs, setBlogs] = useState([HARDCODED_BLOG])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const [selectedBlog, setSelectedBlog] = useState(null)

  const fetchBlogs = async () => {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error('Could not load blog posts')

      const payload = await res.json()
      const list = normalizeResponse(payload)
      const apiBlogs = list.map(normalizeBlog)
      
      // Combine hardcoded blog with API blogs
      setBlogs([HARDCODED_BLOG, ...apiBlogs])
    } catch (err) {
      setError(err.message || 'Could not load blog posts')
      // Keep the hardcoded blog even if API fails
      setBlogs([HARDCODED_BLOG])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    if (!selectedBlog) return undefined

    const onEsc = (e) => {
      if (e.key === 'Escape') setSelectedBlog(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onEsc)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEsc)
    }
  }, [selectedBlog])

  const tags = useMemo(() => {
    const fromPosts = blogs.flatMap(blog => [blog.category, ...blog.tags])
      .map(t => String(t || '').trim())
      .filter(Boolean)

    return ['All', ...Array.from(new Set(fromPosts))]
  }, [blogs])

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase()

    return blogs.filter(blog => {
      const matchesTag = activeTag === 'All' || blog.category === activeTag || blog.tags.includes(activeTag)
      const haystack = `${blog.title} ${blog.excerpt} ${blog.content} ${blog.author}`.toLowerCase()
      const matchesSearch = !query || haystack.includes(query)
      return matchesTag && matchesSearch
    })
  }, [blogs, activeTag, search])

  const [featured, ...rest] = filteredBlogs

  return (
    <>
      <section className="page-hero">
        {heroBg
          ? <img src={heroBg} alt="Restore Luxury Spa blog" className="page-hero-img" />
          : <div className="page-hero-img" style={{ background: 'linear-gradient(135deg, var(--espresso), var(--bark))' }} />}
        <div className="page-hero-content">
          <h1>Blogs</h1>
          <p><Link to="/">Home</Link> / Blogs</p>
        </div>
      </section>

      <section className="blogs">
        <div className="container-wide blogs__inner">
          <div className="blogs__intro">
            <span className="section-label">From The Spa</span>
            <h2 className="section-title">Insights on relaxation, beauty, and self-care</h2>
            <p className="blogs__lead">
              Explore practical wellness ideas, skincare notes, and spa guidance from Restore Luxury Spa.
            </p>
          </div>

          <div className="blogs__toolbar">
            <div className="blogs__search-wrap">
              <Search size={16} aria-hidden="true" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search blog posts"
                className="blogs__search"
                aria-label="Search blog posts"
              />
            </div>

            <button className="btn btn-outline-gold blogs__refresh" onClick={fetchBlogs} disabled={loading}>
              <RefreshCw size={15} className={loading ? 'blogs__spin' : ''} />
              Refresh
            </button>
          </div>

          {tags.length > 1 && (
            <div className="blogs__tags" role="tablist" aria-label="Blog filters">
              {tags.map(tag => (
                <button
                  key={tag}
                  role="tab"
                  aria-selected={activeTag === tag}
                  className={`blogs__tag${activeTag === tag ? ' blogs__tag--active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {loading && (
            <div className="blogs__state" aria-live="polite">
              <div className="blogs__loader" />
              <p>Loading blog posts...</p>
            </div>
          )}

          {!loading && error && (
            <div className="blogs__state blogs__state--error" role="alert">
              <p>{error}</p>
              <button className="btn btn-dark" onClick={fetchBlogs}>Try Again</button>
            </div>
          )}

          {!loading && !error && filteredBlogs.length === 0 && (
            <div className="blogs__state" aria-live="polite">
              <BookOpenText size={30} />
              <h3>No posts yet</h3>
              <p>
                Blog posts are being prepared. Check back soon for stories and wellness tips.
              </p>
            </div>
          )}

          {!loading && !error && featured && (
            <article className="blogs-featured">
              <div className="blogs-featured__media">
                {featured.image
                  ? <img src={featured.image} alt={featured.title} loading="lazy" />
                  : <div className="blogs-featured__placeholder" />}
              </div>
              <div className="blogs-featured__body">
                <span className="blogs-featured__badge">Featured Post</span>
                <h3>{featured.title}</h3>
                <p>{toPlainText(featured.excerpt || featured.content).slice(0, 180) || 'Read the latest update from Restore Luxury Spa.'}</p>
                <div className="blogs-meta">
                  <span><CalendarDays size={15} /> {formatDate(featured.publishedAt)}</span>
                  <span><UserRound size={15} /> {featured.author}</span>
                  <span><BookOpenText size={15} /> {readingTime(featured.content || featured.excerpt)}</span>
                </div>
                <button className="blog-card__read-more" type="button" onClick={() => setSelectedBlog(featured)}>
                  View Full Blog <ArrowRight size={15} />
                </button>
              </div>
            </article>
          )}

          {!loading && !error && rest.length > 0 && (
            <div className="blogs-grid">
              {rest.map(blog => (
                <article key={blog.id} className="blog-card">
                  <div className="blog-card__media">
                    {blog.image
                      ? <img src={blog.image} alt={blog.title} loading="lazy" />
                      : <div className="blog-card__placeholder" />}
                  </div>
                  <div className="blog-card__body">
                    <div className="blog-card__category">{blog.category}</div>
                    <h3>{blog.title}</h3>
                    <p>{toPlainText(blog.excerpt || blog.content).slice(0, 130) || 'Wellness and beauty insights from our spa team.'}</p>
                    <div className="blogs-meta blogs-meta--small">
                      <span><CalendarDays size={14} /> {formatDate(blog.publishedAt)}</span>
                      <span><BookOpenText size={14} /> {readingTime(blog.content || blog.excerpt)}</span>
                    </div>
                    <button
                      className="blog-card__read-more"
                      type="button"
                      aria-label={`Read more about ${blog.title}`}
                      onClick={() => setSelectedBlog(blog)}
                    >
                      Read More <ArrowRight size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {selectedBlog && (
            <div className="blog-viewer" role="dialog" aria-modal="true" aria-label="Full blog post">
              <button
                className="blog-viewer__backdrop"
                type="button"
                aria-label="Close full blog view"
                onClick={() => setSelectedBlog(null)}
              />

              <article className="blog-viewer__card">
                <button
                  type="button"
                  className="blog-viewer__close"
                  aria-label="Close blog post"
                  onClick={() => setSelectedBlog(null)}
                >
                  <X size={18} />
                </button>

                <div className="blog-viewer__media">
                  {selectedBlog.image
                    ? <img src={selectedBlog.image} alt={selectedBlog.title} loading="lazy" />
                    : <div className="blog-card__placeholder" />}
                </div>

                <div className="blog-viewer__content">
                  <div className="blog-card__category">{selectedBlog.category}</div>
                  <h3>{selectedBlog.title}</h3>
                  <div className="blogs-meta">
                    <span><CalendarDays size={15} /> {formatDate(selectedBlog.publishedAt)}</span>
                    <span><UserRound size={15} /> {selectedBlog.author}</span>
                    <span><BookOpenText size={15} /> {readingTime(selectedBlog.content || selectedBlog.excerpt)}</span>
                  </div>

                  <div
                    className="blog-viewer__text"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(selectedBlog.content || selectedBlog.excerpt || '<p>Full blog content will be available soon.</p>'),
                    }}
                  />
                </div>
              </article>
            </div>
          )}
        </div>
      </section>
    </>
  )
}