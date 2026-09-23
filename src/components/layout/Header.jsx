import './Header.css'
import { NavLink, Link } from 'react-router-dom'
import { Brand } from '../common/Brand'
import { contactInfo } from '../../data/contactInfo'
import { InstagramIcon, FacebookIcon, ChatIcon, PhoneIcon } from '../common/UtilityIcons'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/courses', label: 'Courses' },
  { to: '/results', label: 'Results' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact us' },
]

export function Header({ scrolled, menuOpen, onToggleMenu }) {
  const { user, isAdmin, logout } = useAuth()

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
          {user && isAdmin && <Link className="button button-ghost" to="/admin" style={{ marginBottom: '8px', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>Admin Panel</Link>}
          {user && <button className="button button-primary" onClick={logout}>Log out</button>}
        </div>
      </nav>
      <div className="header-actions">
        <a className="icon-pill" href={contactInfo.social.instagram} target="_blank" rel="noreferrer" aria-label="Follow us on Instagram"><InstagramIcon /></a>
        <a className="icon-pill" href={contactInfo.social.facebook} target="_blank" rel="noreferrer" aria-label="Follow us on Facebook"><FacebookIcon /></a>
        <a className="text-pill" href={contactInfo.whatsappHref} target="_blank" rel="noreferrer"><ChatIcon /><span className="pill-label">Chat with us</span></a>
        <a className="text-pill" href={contactInfo.phoneHref}><PhoneIcon /><span className="pill-label">Call now</span></a>
        {user && isAdmin && (
          <Link
            className="book-pill"
            to="/admin"
            style={{
              background: 'var(--navy)',
              color: '#fff',
              marginRight: '6px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            Admin
          </Link>
        )}
        {user && <button className="book-pill" onClick={logout}>Log out</button>}
      </div>
    </div>
  </header>
}
