import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { ScrollTopButton } from './components/layout/ScrollTopButton'
import { HomePage } from './components/home/HomePage'
import { AboutPage } from './components/about/AboutPage'
import { CoursesPage } from './components/courses/CoursesPage'
import { CourseDetailPage } from './components/courses/CourseDetailPage'
import { ContactPage } from './components/contact/ContactPage'

function App() {
  const [activePage, setActivePage] = useState('home')
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showTop, setShowTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400)
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const goTo = (page) => {
    setActivePage(page)
    setSelectedCourse(null)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToCourse = (course) => {
    setSelectedCourse(course)
    setActivePage('course-detail')
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <div className="site-shell">
    <Header
      activePage={activePage}
      scrolled={scrolled}
      menuOpen={menuOpen}
      onToggleMenu={() => setMenuOpen(!menuOpen)}
      onNavigate={goTo}
    />

    <main>
      {activePage === 'home' && <HomePage onNavigate={goTo} />}
      {activePage === 'about' && <AboutPage />}
      {activePage === 'courses' && <CoursesPage onSelectCourse={goToCourse} onNavigate={goTo} />}
      {activePage === 'course-detail' && selectedCourse && (
        <CourseDetailPage course={selectedCourse} onBack={() => goTo('courses')} onNavigate={goTo} />
      )}
      {activePage === 'contact' && <ContactPage />}
    </main>

    <Footer onNavigate={goTo} onSelectCourse={goToCourse} />
    <ScrollTopButton visible={showTop} />
  </div>
}

export default App
