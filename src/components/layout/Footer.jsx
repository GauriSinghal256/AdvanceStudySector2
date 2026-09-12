import { Brand } from '../common/Brand'
import { courses } from '../../data/courses'

export function Footer({ onNavigate, onSelectCourse }) {
  return <footer className="site-footer">
    <div className="section-wrap footer-inner">
      <div className="footer-brand"><Brand compact /><p>Helping ambitious people<br />find their direction.</p></div>
      <div className="footer-links"><small>Quick links</small><button onClick={() => onNavigate('home')}>Home</button><button onClick={() => onNavigate('about')}>About us</button><button onClick={() => onNavigate('courses')}>Courses</button><button onClick={() => onNavigate('contact')}>Contact us</button></div>
      <div className="footer-courses"><small>Our courses</small>{courses.map((c) => <button key={c.title} onClick={() => onSelectCourse(c)}>{c.title}</button>)}</div>
      <div className="footer-bottom"><small>© 2024 Advance Study Sector</small><small>Made for meaningful progress</small></div>
    </div>
  </footer>
}
