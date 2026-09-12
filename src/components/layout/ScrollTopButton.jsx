export function ScrollTopButton({ visible }) {
  if (!visible) return null
  return <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">↑</button>
}
