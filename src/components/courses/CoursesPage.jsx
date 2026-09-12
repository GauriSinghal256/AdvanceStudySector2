import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'
import { FAQItem } from '../common/FAQItem'
import { courses } from '../../data/courses'
import { faqs } from '../../data/faqs'
import { OverlayHero } from '../common/OverlayHero'

export function CoursesPage() {
  const [openFaq, setOpenFaq] = useState(0)

  return <section className="page-section courses-page section-wrap">
    <OverlayHero label="07 / What we teach" title={<>Courses built for<br /><em>your next move.</em></>} intro="Choose a focused path, learn from people who care and leave with skills that make a difference." image="https://images.pexels.com/photos/5427860/pexels-photo-5427860.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400" imageAlt="Students focused on a course" />
    <div className="course-list">{courses.map((course, i) => <Reveal key={course.slug} delay={i * 80}><Link className="course-card" to={`/courses/${course.slug}`}><span className="course-number">{course.icon}</span><div><h3>{course.title}</h3><p>{course.detail}</p></div><span className="course-duration">{course.duration}</span><span className="course-arrow" aria-label={`View details for ${course.title}`}><ArrowIcon /></span></Link></Reveal>)}</div>
    <div className="course-footer"><span>Not sure where to begin?</span><Link className="text-button" to="/contact">Talk to an advisor <ArrowIcon /></Link></div>
    <section className="faq-section">
      <Reveal><div className="section-kicker">Frequently asked</div></Reveal>
      <Reveal delay={80}><h2 className="section-heading">Questions<br /><em>you might have.</em></h2></Reveal>
      <div className="faq-list">{faqs.map((item, i) => <Reveal key={i} delay={i * 60}><FAQItem item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} /></Reveal>)}</div>
    </section>
  </section>
}
