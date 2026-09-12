export function Brand({ compact = false }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}><span className="brand-mark">A<span>↗</span></span><span className="brand-name">ADVANCE<small>STUDY SECTOR</small></span></div>
}
