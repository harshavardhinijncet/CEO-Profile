import { useEffect, useState } from 'react'

const steps = Array.from({ length: 21 }, (_, i) => i / 20)

// true while at least `amount` of the element is on screen — or, for a section taller than the screen
// (phones), while it fills a third of the screen (the last section can never scroll higher than that); `key` bumps on every fresh arrival
export default function useInView(ref, amount = 0.45) {
  const [state, setState] = useState({ inView: false, key: 0 })
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      const e = entries[entries.length - 1]          // the newest reading; several can arrive at once
      const on = e.isIntersecting && (e.intersectionRatio >= amount || e.intersectionRect.height >= innerHeight * .3)
      setState(s => (on === s.inView ? s : { inView: on, key: s.key + (on ? 1 : 0) }))
    }, { threshold: steps })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref, amount])
  return state
}
