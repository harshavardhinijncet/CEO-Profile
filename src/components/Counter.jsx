import { useEffect, useState } from 'react'

// Counts up from 0 once `run` turns true.
export default function Counter({ to, suffix = '', run, delay = 0, duration = 1600 }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(to); return }
    let raf = 0
    const t = setTimeout(() => {
      let t0 = null // start on the first frame's timestamp, so progress never goes negative
      const tick = now => {
        if (t0 === null) t0 = now
        const p = Math.min(Math.max((now - t0) / duration, 0), 1)
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => { clearTimeout(t); cancelAnimationFrame(raf) }
  }, [run, to, delay, duration])

  return <>{value}{suffix}</>
}
