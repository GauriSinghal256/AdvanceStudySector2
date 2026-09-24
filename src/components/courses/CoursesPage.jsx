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
  const [openFaq, setOpenFaq] = useState(-1)

  return <section className="page-section courses-page section-wrap">
    <OverlayHero
      label="07 / What we teach"
      title={<>Courses built for<br /><em>your next move.</em></>}
      intro="From junior wing to banking exam coaching — choose a focused path, learn from mentors who care and leave with skills that make a difference."
      video="https://player.cloudinary.com/embed/?cloud_name=ekmijnj9&public_id=C4142-compressed"
      poster="/cources/cources.jpg"
      image="/cources/cources.jpg"
      imageAlt="Advance Study Sector courses preview"
    />
    <div className="course-grid">{courses.map((course, i) => <Reveal key={course.slug} delay={i * 80}><Link className="course-card-img" to={`/courses/${course.slug}`}>
      <div className="course-card-img-wrap"><img src={course.image} alt={course.title} /><span className="course-number">{course.icon}</span></div>
      <div className="course-card-img-body">
        <span className="course-card-subtitle">{course.subtitle}</span>
        <h3>{course.title}</h3>
        <p>{course.tagline}</p>
        <p className="course-card-detail">{course.detail}</p>
        <span className="course-card-cta">View course <ArrowIcon /></span>
      </div>
    </Link></Reveal>)}</div>
    <div className="course-footer"><span>Not sure where to begin?</span><Link className="text-button" to="/contact">Talk to an advisor <ArrowIcon /></Link></div>
    
    <section className="faq-section">
      <div className="faq-header-side">
        <Reveal><div className="section-kicker">Got questions? We're here to help</div></Reveal>
        <Reveal delay={80}><h2 className="section-heading">Questions<br /><em>you might have.</em></h2></Reveal>
        <Reveal delay={140}><p className="faq-header-desc">Find answers about admissions, batch sizes, faculty guidance, and career pathways at Advance Study Sector Kurukshetra.</p></Reveal>
        <Reveal delay={180}>
          <div className="faq-help-card">
            <div className="faq-help-badge">💬 Direct Guidance</div>
            <h4>Still have doubts?</h4>
            <p>Our academic counsellors can help you choose the right course and batch schedule.</p>
            <Link className="button button-primary" to="/contact">Talk to an advisor <ArrowIcon /></Link>
          </div>
        </Reveal>
      </div>

      <div className="faq-list">
        {faqs.map((item, i) => (
          <Reveal key={i} delay={i * 50}>
            <FAQItem item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
          </Reveal>
        ))}
      </div>
    </section>
  </section>
}
