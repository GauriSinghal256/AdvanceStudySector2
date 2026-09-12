import { useParams, Link, Navigate } from 'react-router-dom'
import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'
import { courses } from '../../data/courses'
import { featureImages } from '../../data/featureImages'
import { OverlayHero } from '../common/OverlayHero'

export function CourseDetailPage() {
  const { slug } = useParams()
  const course = courses.find((c) => c.slug === slug)

  if (!course) return <Navigate to="/courses" replace />

  return <section className="page-section course-detail-page section-wrap">
    <OverlayHero className="course-overlay-hero" label={`Course ${course.icon}`} title={<>{course.title}<br /><em>starts here.</em></>} intro={`${course.detail} Get a supportive, practical learning experience designed around your goals.`} image={featureImages[Number(course.icon) - 1].src} imageAlt="Students learning together">
      <Link className="back-button" to="/courses">← Back to all courses</Link>
      <Link className="button button-primary" to="/contact">Enquire now <ArrowIcon /></Link>
    </OverlayHero>
    <Reveal delay={200}><div className="detail-content"><div><span className="section-kicker">What you will explore</span><h2>A focused path<br /><em>with room to grow.</em></h2></div><div><p className="lead">Every course is built to give you clarity, confidence and a useful next step.</p><ul>{course.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}</ul><div className="detail-meta"><div><small>Duration</small><strong>{course.duration}</strong></div><div><small>Level</small><strong>{course.level}</strong></div><div><small>Batch size</small><strong>{course.seats}</strong></div></div></div></div></Reveal>
    <Reveal delay={250}><div className="detail-cta"><h3>Ready to join this course?</h3><Link className="button button-primary" to="/contact">Enquire now <ArrowIcon /></Link></div></Reveal>
  </section>
}
