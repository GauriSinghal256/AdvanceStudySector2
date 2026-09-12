import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'

export function CourseDetailPage({ course, onBack, onNavigate }) {
  return <section className="page-section course-detail-page section-wrap">
    <Reveal><button className="back-button" onClick={onBack}>← Back to all courses</button></Reveal>
    <Reveal delay={100}><div className="detail-hero"><div><p className="eyebrow"><span /> Course {course.icon}</p><h1>{course.title}<br /><em>starts here.</em></h1><p>{course.detail} Get a supportive, practical learning experience designed around your goals.</p><button className="button button-primary" onClick={() => onNavigate('contact')}>Enquire now <ArrowIcon /></button></div><div className="detail-number">{course.icon}</div></div></Reveal>
    <Reveal delay={200}><div className="detail-content"><div><span className="section-kicker">What you will explore</span><h2>A focused path<br /><em>with room to grow.</em></h2></div><div><p className="lead">Every course is built to give you clarity, confidence and a useful next step.</p><ul>{course.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}</ul><div className="detail-meta"><div><small>Duration</small><strong>{course.duration}</strong></div><div><small>Level</small><strong>{course.level}</strong></div><div><small>Batch size</small><strong>{course.seats}</strong></div></div></div></div></Reveal>
    <Reveal delay={250}><div className="detail-cta"><h3>Ready to join this course?</h3><button className="button button-primary" onClick={() => onNavigate('contact')}>Enquire now <ArrowIcon /></button></div></Reveal>
  </section>
}
