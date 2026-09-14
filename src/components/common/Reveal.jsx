import './Reveal.css'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useScrollReveal()
  return <div ref={ref} className={`reveal ${visible ? 'reveal-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}
