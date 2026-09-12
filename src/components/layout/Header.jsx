import { Brand } from '../common/Brand'
import { ArrowIcon } from '../common/ArrowIcon'

const navPages = ['home', 'about', 'courses', 'contact']
const navLabels = { home: 'Home', about: 'About us', courses: 'Courses', contact: 'Contact us' }

export function Header({ activePage, scrolled, menuOpen, onToggleMenu, onNavigate }) {
  return <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
    <div className="header-inner">
      <button className="brand-button" onClick={() => onNavigate('home')} aria-label="Go to home"><Brand /></button>
      <button className="menu-toggle" onClick={onToggleMenu} aria-label="Toggle menu"><span /><span /></button>
      <nav className={menuOpen ? 'nav-open' : ''}>
        {navPages.map((page) => <button key={page} className={activePage === page || (page === 'courses' && activePage === 'course-detail') ? 'active' : ''} onClick={() => onNavigate(page)}>{navLabels[page]}</button>)}
        <button className="nav-cta" onClick={() => onNavigate('contact')}>Start learning <ArrowIcon /></button>
      </nav>
    </div>
  </header>
}
