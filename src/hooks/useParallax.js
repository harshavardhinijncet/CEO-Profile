import { useEffect } from 'react'

// Moves every [data-depth] element inside `ref` with the mouse.
// Uses the CSS `translate` property so it never fights the intro `transform` animations.
export default function useParallax(ref) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches
    if (reduced || !finePointer || !ref.current) return

    const layers = [...ref.current.querySelectorAll('[data-depth]')]
    let raf = 0
    const onMove = e => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() =>
        layers.forEach(el => {
          const d = +el.dataset.depth
          el.style.translate = `${(x * d).toFixed(1)}px ${(y * d).toFixed(1)}px`
        }),
      )
    }
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}
