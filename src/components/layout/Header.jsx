import { NavLink, Link } from 'react-router-dom'
import { Brand } from '../common/Brand'
import { ArrowIcon } from '../common/ArrowIcon'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About us' },
  { to: '/courses', label: 'Courses' },
  { to: '/contact', label: 'Contact us' },
]

export function Header({ scrolled, menuOpen, onToggleMenu }) {
  return <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
    <div className="header-inner">
      <Link className="brand-button" to="/" aria-label="Go to home"><Brand /></Link>
      <button className="menu-toggle" onClick={onToggleMenu} aria-label="Toggle menu"><span /><span /></button>
      <nav className={menuOpen ? 'nav-open' : ''}>
        {navItems.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>{item.label}</NavLink>)}
        <Link className="nav-cta" to="/contact">Start learning <ArrowIcon /></Link>
      </nav>
    </div>
  </header>
}
