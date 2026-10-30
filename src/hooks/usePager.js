import { useEffect } from 'react'
import pageTo from './pageTo.js'

// One wheel / swipe / key press = one page. Pages are every element matching `selector`
// (the full-screen sections, plus the Vision's per-frame markers).
// CSS scroll-snap is not used: with a mouse wheel it snaps small scrolls straight back.
// Each page change is a calm cover-and-reveal (pageTo), never a visible scroll.
export default function usePager(selector) {
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)')
    let locked = false, unlockTimer = 0, touchY = null

    const targets = () => [...document.querySelectorAll(selector)]
      .map(el => ({ el, top: Math.round(el.getBoundingClientRect().top + scrollY) }))
      .sort((a, b) => a.top - b.top)

    const page = dir => {
      const list = targets(), y = scrollY
      const next = dir > 0 ? list.find(t => t.top > y + 4) : [...list].reverse().find(t => t.top < y - 4)
      if (!next || !pageTo(next.el, dir)) return
      locked = true
      clearTimeout(unlockTimer)
      unlockTimer = setTimeout(() => { locked = false }, 900)
    }

    const onWheel = e => {
      if (!desktop.matches || e.ctrlKey) return            // let pinch-zoom through
      e.preventDefault()
      if (locked || Math.abs(e.deltaY) < 6) return
      page(Math.sign(e.deltaY))
    }
    const onKey = e => {
      if (!desktop.matches || e.target.closest?.('input,textarea')) return
      const dir = { ArrowDown: 1, PageDown: 1, ' ': e.shiftKey ? -1 : 1, ArrowUp: -1, PageUp: -1 }[e.key]
      if (!dir) return
      e.preventDefault()
      if (!locked) page(dir)
    }
    const onTouchStart = e => { touchY = e.touches[0].clientY }
    const onTouchMove = e => { if (desktop.matches) e.preventDefault() }
    const onTouchEnd = e => {
      if (!desktop.matches || touchY === null) return
      const dy = touchY - e.changedTouches[0].clientY
      if (Math.abs(dy) > 40 && !locked) page(Math.sign(dy))
      touchY = null
    }

    addEventListener('wheel', onWheel, { passive: false })
    addEventListener('keydown', onKey)
    addEventListener('touchstart', onTouchStart, { passive: true })
    addEventListener('touchmove', onTouchMove, { passive: false })
    addEventListener('touchend', onTouchEnd)
    return () => {
      removeEventListener('wheel', onWheel)
      removeEventListener('keydown', onKey)
      removeEventListener('touchstart', onTouchStart)
      removeEventListener('touchmove', onTouchMove)
      removeEventListener('touchend', onTouchEnd)
      clearTimeout(unlockTimer)
    }
  }, [selector])
}
