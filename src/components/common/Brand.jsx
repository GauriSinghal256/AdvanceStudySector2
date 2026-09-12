export function Brand({ compact = false }) {
  return <div className={`brand ${compact ? 'brand-compact' : ''}`}><img className="brand-logo" src="/logo.jpeg" alt="Advance Study Sector" /></div>
}
