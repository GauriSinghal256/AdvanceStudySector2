import { useEffect, useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Counter({ target, suffix = '' }) {
  const [ref, visible] = useScrollReveal()
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!visible) return
    const duration = 1600
    const start = performance.now()
    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [visible, target])
  return <strong ref={ref}>{count}<span>{suffix}</span></strong>
}
