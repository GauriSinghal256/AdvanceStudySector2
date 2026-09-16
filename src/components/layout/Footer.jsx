import './Footer.css'
import { Link } from 'react-router-dom'
import { Brand } from '../common/Brand'
import { courses } from '../../data/courses'
import { contactInfo } from '../../data/contactInfo'
import { InstagramIcon, FacebookIcon } from '../common/UtilityIcons'

export function Footer() {
  return <footer className="site-footer">
    <div className="section-wrap footer-inner">
      <div className="footer-brand">
        <Brand compact />
        <p>Helping ambitious people<br />find their direction.</p>
        <div className="footer-social">
          <a href={contactInfo.social.instagram} target="_blank" rel="noreferrer" aria-label="Follow us on Instagram"><InstagramIcon /></a>
          <a href={contactInfo.social.facebook} target="_blank" rel="noreferrer" aria-label="Follow us on Facebook"><FacebookIcon /></a>
        </div>
      </div>
      <div className="footer-links"><small>Quick links</small><Link to="/">Home</Link><Link to="/about">About us</Link><Link to="/courses">Courses</Link><Link to="/results">Results</Link><Link to="/contact">Contact us</Link></div>
      <div className="footer-courses"><small>Our courses</small>{courses.map((c) => <Link key={c.slug} to={`/courses/${c.slug}`}>{c.title}</Link>)}</div>
      <div className="footer-bottom"><small>© 2026 Advance Study Sector</small><small>Made by <a className="footer-credit" href="https://www.yritsolutions.com/" target="_blank" rel="noreferrer">YR IT Solutions</a></small></div>
    </div>
  </footer>
}
