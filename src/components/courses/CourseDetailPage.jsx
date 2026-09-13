import { useParams, Link, Navigate } from 'react-router-dom'
import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'
import { courses } from '../../data/courses'
import { OverlayHero } from '../common/OverlayHero'

export function CourseDetailPage() {
  const { slug } = useParams()
  const course = courses.find((c) => c.slug === slug)

  if (!course) return <Navigate to="/courses" replace />

  return <section className="page-section course-detail-page section-wrap">
    <OverlayHero className="course-overlay-hero" label={`Course ${course.icon} · ${course.subtitle}`} title={<>{course.title}<br /><em>starts here.</em></>} intro={course.detail} image={course.image} imageAlt={course.title}>
      <Link className="back-button" to="/courses">← Back to all courses</Link>
      <Link className="button button-primary" to="/contact">Enquire now <ArrowIcon /></Link>
    </OverlayHero>

    <Reveal delay={150}><div className="detail-content">
      <div><span className="section-kicker">What you will explore</span><h2>A focused path<br /><em>with room to grow.</em></h2></div>
      <div>
        <p className="lead">Every course is built to give you clarity, confidence and a useful next step.</p>
        <ul>{course.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}</ul>
        <div className="detail-meta">
          <div><small>Duration</small><strong>{course.duration}</strong></div>
          <div><small>Level</small><strong>{course.level}</strong></div>
          <div><small>Batch size</small><strong>{course.seats}</strong></div>
        </div>
      </div>
    </div></Reveal>

    {course.subjects && <Reveal delay={200}><div className="subjects-block">
      <span className="section-kicker">Subjects covered</span>
      <h3>Everything included<br /><em>in this course.</em></h3>
      <div className="subject-chips">{course.subjects.map((s) => <span className="subject-chip" key={s}>{s}</span>)}</div>
    </div></Reveal>}

    {course.streams && <Reveal delay={220}><div className="stream-block">
      <span className="section-kicker">Choose your stream</span>
      <h3>Four streams,<br /><em>every subject covered.</em></h3>
      <div className="stream-grid">{course.streams.map((stream, i) => <div className="stream-card" key={stream.name}><span className="stream-index">{String(i + 1).padStart(2, '0')}</span><h4>{stream.name}</h4><div className="subject-chips">{stream.subjects.map((s) => <span className="subject-chip" key={s}>{s}</span>)}</div></div>)}</div>
    </div></Reveal>}

    {course.levels && <Reveal delay={220}><div className="level-block">
      <span className="section-kicker">Structured levels</span>
      <h3>Prepare level by level,<br /><em>at your own pace.</em></h3>
      <div className="level-grid">{course.levels.map((level, i) => <div className="level-card" key={level.name}><span className="level-index">{String(i + 1).padStart(2, '0')}</span><h4>{level.name}</h4><p>{level.desc}</p></div>)}</div>
    </div></Reveal>}

    {course.tracks && <Reveal delay={220}><div className="level-block">
      <span className="section-kicker">Training & placement</span>
      <h3>From training<br /><em>to a real job.</em></h3>
      <div className="level-grid">{course.tracks.map((track, i) => <div className="level-card" key={track.name}><span className="level-index">{String(i + 1).padStart(2, '0')}</span><h4>{track.name}</h4><p>{track.desc}</p></div>)}</div>
    </div></Reveal>}

    <Reveal delay={260}><div className="detail-cta"><h3>Ready to join this course?</h3><Link className="button button-primary" to="/contact">Enquire now <ArrowIcon /></Link></div></Reveal>
  </section>
}
