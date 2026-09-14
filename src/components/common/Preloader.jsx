import { useEffect, useState } from 'react'
import './Preloader.css'

// Full-screen splash shown once when the site first loads, before the
// home page is visible. Fades the logo in, holds briefly, then wipes
// away to reveal the page underneath.
export function Preloader() {
  const [phase, setPhase] = useState('show') // 'show' -> 'hide' -> 'done'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const hideTimer = window.setTimeout(() => setPhase('hide'), 1500)
    const doneTimer = window.setTimeout(() => {
      setPhase('done')
      document.body.style.overflow = ''
    }, 2250)
    return () => {
      window.clearTimeout(hideTimer)
      window.clearTimeout(doneTimer)
      document.body.style.overflow = ''
    }
  }, [])

  if (phase === 'done') return null

  return <div className={`site-preloader ${phase === 'hide' ? 'preloader-hide' : ''}`} aria-hidden="true">
    <div className="preloader-glow" />
    <div className="preloader-logo-wrap">
      <span className="preloader-ring" />
      <img src="/logo.jpeg" alt="" className="preloader-logo" />
    </div>
    <div className="preloader-bar"><span /></div>
  </div>
}
