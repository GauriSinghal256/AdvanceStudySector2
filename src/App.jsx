import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { ScrollTopButton } from './components/layout/ScrollTopButton'
import { Preloader } from './components/common/Preloader'
import { HomePage } from './components/home/HomePage'
import { AboutPage } from './components/about/AboutPage'
import { CoursesPage } from './components/courses/CoursesPage'
import { CourseDetailPage } from './components/courses/CourseDetailPage'
import { ContactPage } from './components/contact/ContactPage'
import { TestimonialsResultsPage } from './components/results/TestimonialsResultsPage'
import { AuthProvider } from './context/AuthContext'
import { BlogListPage } from './components/blog/BlogListPage'
import { BlogDetailPage } from './components/blog/BlogDetailPage'
import { AdminBlogEditor } from './components/blog/AdminBlogEditor'
import { LoginPage } from './components/blog/LoginPage'
import { RequireAdmin } from './components/blog/RouteGuards'

function App() {
  const [showTop, setShowTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400)
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return <AuthProvider><div className="site-shell">
    <Preloader />
    <Header scrolled={scrolled} menuOpen={menuOpen} onToggleMenu={() => setMenuOpen(!menuOpen)} />

    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />
        <Route path="/results" element={<TestimonialsResultsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/new" element={<RequireAdmin><AdminBlogEditor /></RequireAdmin>} />
        <Route path="/blog/edit/:id" element={<RequireAdmin><AdminBlogEditor /></RequireAdmin>} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </main>

    <Footer />
    <ScrollTopButton visible={showTop} />
  </div></AuthProvider>
}

export default App
