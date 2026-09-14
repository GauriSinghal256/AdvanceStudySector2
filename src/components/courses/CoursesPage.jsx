import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'
import { FAQItem } from '../common/FAQItem'
import { courses } from '../../data/courses'
import { faqs } from '../../data/faqs'
import { OverlayHero } from '../common/OverlayHero'
import './CoursesPage.css'

export function CoursesPage() {
  const [openFaq, setOpenFaq] = useState(0)

  return <section className="page-section courses-page section-wrap">
    <OverlayHero label="07 / What we teach" title={<>Courses built for<br /><em>your next move.</em></>} intro="From junior wing to banking exam coaching — choose a focused path, learn from mentors who care and leave with skills that make a difference." image="/cource.jpg" imageAlt="Advance Study Sector course information" />
    <div className="course-grid">{courses.map((course, i) => <Reveal key={course.slug} delay={i * 80}><Link className="course-card-img" to={`/courses/${course.slug}`}>
      <div className="course-card-img-wrap"><img src={course.image} alt={course.title} /><span className="course-number">{course.icon}</span></div>
      <div className="course-card-img-body">
        <span className="course-card-subtitle">{course.subtitle}</span>
        <h3>{course.title}</h3>
        <p>{course.tagline}</p>
        <span className="course-card-cta">View course <ArrowIcon /></span>
      </div>
    </Link></Reveal>)}</div>
    <div className="course-footer"><span>Not sure where to begin?</span><Link className="text-button" to="/contact">Talk to an advisor <ArrowIcon /></Link></div>
    <section className="faq-section">
      <Reveal><div className="section-kicker">Frequently asked</div></Reveal>
      <Reveal delay={80}><h2 className="section-heading">Questions<br /><em>you might have.</em></h2></Reveal>
      <div className="faq-list">{faqs.map((item, i) => <Reveal key={i} delay={i * 60}><FAQItem item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} /></Reveal>)}</div>
    </section>
  </section>
}
