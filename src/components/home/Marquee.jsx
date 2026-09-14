import { marqueeWords } from '../../data/marqueeWords'
import './Marquee.css'

export function Marquee() {
  return <div className="marquee" aria-label="Advance Study Sector values"><div className="marquee-track">{[...marqueeWords, ...marqueeWords].map((word, i) => <span key={i}>{word}</span>)}</div></div>
}
