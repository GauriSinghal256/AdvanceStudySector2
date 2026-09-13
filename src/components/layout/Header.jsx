import { NavLink, Link } from 'react-router-dom'
import { Brand } from '../common/Brand'
import { contactInfo } from '../../data/contactInfo'
import { InstagramIcon, FacebookIcon, ChatIcon, PhoneIcon } from '../common/UtilityIcons'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/courses', label: 'Courses' },
  { to: '/results', label: 'Results' },
  { to: '/contact', label: 'Contact us' },
]

export function Header({ scrolled, menuOpen, onToggleMenu }) {
  return <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
    <div className="header-inner">
      <Link className="brand-button" to="/" aria-label="Go to home"><Brand large /></Link>
      <button className="menu-toggle" onClick={onToggleMenu} aria-label="Toggle menu"><span /><span /></button>
      <nav className={menuOpen ? 'nav-open' : ''}>
        {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>{item.label}</NavLink>)}
        <div className="nav-utility-mobile">
          <a href={contactInfo.social.instagram} target="_blank" rel="noreferrer" aria-label="Follow us on Instagram"><InstagramIcon /> Instagram</a>
          <a href={contactInfo.social.facebook} target="_blank" rel="noreferrer" aria-label="Follow us on Facebook"><FacebookIcon /> Facebook</a>
          <a href={contactInfo.phoneHref}><PhoneIcon /> Call now</a>
          <Link className="button button-primary" to="/contact">Book a demo</Link>
        </div>
      </nav>
      <div className="header-actions">
        <a className="icon-pill" href={contactInfo.social.instagram} target="_blank" rel="noreferrer" aria-label="Follow us on Instagram"><InstagramIcon /></a>
        <a className="icon-pill" href={contactInfo.social.facebook} target="_blank" rel="noreferrer" aria-label="Follow us on Facebook"><FacebookIcon /></a>
        <Link className="text-pill" to="/contact"><ChatIcon /><span className="pill-label">Chat with us</span></Link>
        <a className="text-pill" href={contactInfo.phoneHref}><PhoneIcon /><span className="pill-label">Call now</span></a>
        <Link className="book-pill" to="/contact">Book a demo</Link>
      </div>
    </div>
  </header>
}
