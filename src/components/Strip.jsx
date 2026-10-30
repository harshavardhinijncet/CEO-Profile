import { useEffect, useRef } from 'react'
import { stats } from '../data/profile.js'
import StatCard from './StatCard.jsx'

// The strip is see-through: stats over the blurred photo get light text, the rest dark text.
function useToneByPhoto(railRef, ready) {
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const update = () => {
      const photo = document.querySelector('.photo')
      if (!photo) return
      const p = photo.getBoundingClientRect()
      // ignore the faded side edges of the photo (see .person mask)
      const left = p.left + p.width * 0.08
      const right = p.right - p.width * 0.08
      // the dark area continues below the photo via its ::after reflection
      const bottom = p.bottom + (parseFloat(getComputedStyle(photo, '::after').height) || 0)
      rail.querySelectorAll('[data-tone]').forEach(el => {
        const r = el.getBoundingClientRect()
        const mid = r.left + r.width / 2
        const overlapsY = r.top < bottom && r.bottom > p.top
        el.classList.toggle('on-dark', overlapsY && mid > left && mid < right)
      })
    }
    // re-check whenever layout can shift: resize, fonts arriving, the intro finishing
    update()
    const ro = new ResizeObserver(update)
    ro.observe(rail)
    window.addEventListener('resize', update)
    document.fonts?.ready.then(update)
    const late = setTimeout(update, 2600)
    return () => { ro.disconnect(); window.removeEventListener('resize', update); clearTimeout(late) }
  }, [railRef, ready])
}

export default function Strip({ ready }) {
  const railRef = useRef(null)
  useToneByPhoto(railRef, ready)

  return (
    <section className="strip" id="impact" aria-labelledby="strip-title">
      <div className="strip-head">
        <span className="strip-kicker">Since 2016</span>
        <h2 className="strip-title" id="strip-title">Impact at a glance</h2>
      </div>
      <div className="strip-rail" ref={railRef}>
        <ul className="stats">
          {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} ready={ready} />)}
        </ul>
      </div>
    </section>
  )
}
