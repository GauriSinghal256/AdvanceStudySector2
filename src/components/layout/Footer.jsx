import './Footer.css'
import { Link } from 'react-router-dom'
import { courses } from '../../data/courses'
import { contactInfo } from '../../data/contactInfo'
import { InstagramIcon, FacebookIcon, ChatIcon, PhoneIcon } from '../common/UtilityIcons'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand & Socials */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="footer-brand-link" aria-label="Advance Study Sector Home">
              <img src="/logo2.png" alt="Advance Study Sector" className="footer-logo" />
            </Link>
            <p className="footer-tagline">
              Empowering students in Kurukshetra with small batches, dedicated mentors, and concept-first learning for board and competitive exam success.
            </p>
            <div className="footer-social-links" aria-label="Social media links">
              <a
                href={contactInfo.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Instagram"
                className="footer-social-btn"
              >
                <InstagramIcon />
              </a>
              <a
                href={contactInfo.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Facebook"
                className="footer-social-btn"
              >
                <FacebookIcon />
              </a>
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className="footer-social-btn"
              >
                <ChatIcon />
              </a>
              <a
                href={contactInfo.phoneHref}
                aria-label="Call Advance Study Sector"
                className="footer-social-btn"
              >
                <PhoneIcon />
              </a>
            </div>
          </div>

          {/* Nav Subgrid: Navigation & Popular Courses */}
          <div className="footer-nav-subgrid">
            {/* Column 2: Navigation Links */}
            <div className="footer-col footer-col-links">
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-link-list">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/courses">All Courses</Link></li>
                <li><Link to="/results">Results & Awards</Link></li>
                <li><Link to="/blog">Blog & Updates</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Academic Programs */}
            <div className="footer-col footer-col-courses">
              <h4 className="footer-col-title">Top Programs</h4>
              <ul className="footer-link-list">
                {courses.slice(0, 5).map((c) => (
                  <li key={c.slug}>
                    <Link to={`/courses/${c.slug}`}>{c.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Campus & Reach Us */}
          <div className="footer-col footer-col-contact">
            <h4 className="footer-col-title">Visit Campus</h4>
            <div className="footer-contact-items">
              <a
                href={contactInfo.mapLink}
                target="_blank"
                rel="noreferrer"
                className="footer-contact-link"
              >
                <span className="footer-contact-icon" aria-hidden="true">📍</span>
                <span className="footer-contact-text">{contactInfo.addressLines.join(', ')}</span>
              </a>
              <a
                href={contactInfo.phoneHref}
                className="footer-contact-link"
              >
                <span className="footer-contact-icon" aria-hidden="true">📞</span>
                <span className="footer-contact-text">{contactInfo.phone}</span>
              </a>
              <a
                href={contactInfo.emailHref}
                className="footer-contact-link"
              >
                <span className="footer-contact-icon" aria-hidden="true">✉️</span>
                <span className="footer-contact-text">{contactInfo.email}</span>
              </a>
              <div className="footer-contact-timing">
                <span className="footer-contact-icon" aria-hidden="true">🕒</span>
                <span className="footer-contact-text">{contactInfo.hours.weekdays}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider" />

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Advance Study Sector. All rights reserved.
          </p>
          <p className="footer-developer">
            Crafted with precision by{' '}
            <a
              className="footer-credit"
              href="https://www.yritsolutions.com/"
              target="_blank"
              rel="noreferrer"
            >
              YR IT Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
