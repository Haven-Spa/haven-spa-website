import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contact = lazy(() => import('./pages/Contact'))
const Careers = lazy(() => import('./pages/Careers'))
const Blogs = lazy(() => import('./pages/Blogs'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const CancellationPolicy = lazy(() => import('./pages/CancellationPolicy'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppRoutes() {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="page-transition">
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<div style={{ minHeight: '40vh' }} />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cancellation" element={<CancellationPolicy />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  useEffect(() => {
    const blockImageContextMenu = (event) => {
      if (event.target instanceof HTMLImageElement) {
        event.preventDefault()
      }
    }

    const blockImageDrag = (event) => {
      if (event.target instanceof HTMLImageElement) {
        event.preventDefault()
      }
    }

    document.addEventListener('contextmenu', blockImageContextMenu)
    document.addEventListener('dragstart', blockImageDrag)

    return () => {
      document.removeEventListener('contextmenu', blockImageContextMenu)
      document.removeEventListener('dragstart', blockImageDrag)
    }
  }, [])

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

