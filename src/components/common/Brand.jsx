export function Brand({ compact = false, large = false }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''} ${large ? 'brand-large' : ''}`}><img className="brand-logo" src="/logo.jpeg" alt="Advance Study Sector" /></div>
}
