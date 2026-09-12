import { useState } from 'react'
import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'
import { FAQItem } from '../common/FAQItem'
import { courses } from '../../data/courses'
import { faqs } from '../../data/faqs'

export function CoursesPage({ onSelectCourse, onNavigate }) {
  const [openFaq, setOpenFaq] = useState(0)

  return <section className="page-section courses-page section-wrap">
    <Reveal><div className="page-heading"><div><p className="eyebrow"><span /> 07 / What we teach</p><h1>Courses built for<br /><em>your next move.</em></h1></div><p>Choose a focused path, learn from people who care and leave with skills that make a difference.</p></div></Reveal>
    <div className="course-list">{courses.map((course, i) => <Reveal key={course.title} delay={i * 80}><article className="course-card" onClick={() => onSelectCourse(course)}><span className="course-number">{course.icon}</span><div><h3>{course.title}</h3><p>{course.detail}</p></div><span className="course-duration">{course.duration}</span><button className="course-arrow" aria-label={`View details for ${course.title}`}><ArrowIcon /></button></article></Reveal>)}</div>
    <div className="course-footer"><span>Not sure where to begin?</span><button className="text-button" onClick={() => onNavigate('contact')}>Talk to an advisor <ArrowIcon /></button></div>
    <section className="faq-section">
      <Reveal><div className="section-kicker">Frequently asked</div></Reveal>
      <Reveal delay={80}><h2 className="section-heading">Questions<br /><em>you might have.</em></h2></Reveal>
      <div className="faq-list">{faqs.map((item, i) => <Reveal key={i} delay={i * 60}><FAQItem item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} /></Reveal>)}</div>
    </section>
  </section>
}
