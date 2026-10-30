import { useCallback, useEffect, useRef, useState } from 'react'
import { journey, chapters } from '../data/journey.js'

// white line icons inside the coloured nodes
const icons = {
  board: ['M3 4h18v12H3z', 'M7 20l2-4M17 20l-2-4', 'M7 9h6M7 12h4'],
  globe: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M3 12h18', 'M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18'],
  bulb: ['M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z', 'M9.5 18.5h5M10.5 21h3'],
  layers: ['M12 3 3 8l9 5 9-5-9-5Z', 'M3 12.5l9 5 9-5', 'M3 16.5l9 5 9-5'],
  badge: ['M12 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z', 'M8.5 13.8 7 21l5-3 5 3-1.5-7.2'],
  spark: ['M12 3v4M12 17v4M3 12h4M17 12h4', 'M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6'],
  chip: ['M7 7h10v10H7z', 'M10 10h4v4h-4z', 'M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4'],
  // emblems for steps with no partner logos
  book: ['M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z', 'M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5A2.5 2.5 0 0 1 4 20.5Z'],
  cap: ['M2 9l10-5 10 5-10 5L2 9Z', 'M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5', 'M22 9v6'],
  code: ['M8 7l-5 5 5 5', 'M16 7l5 5-5 5', 'M14 4l-4 16'],
  app: ['M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z', 'M11 18.5h2'],
  office: ['M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16', 'M15 10h4a1 1 0 0 1 1 1v10', 'M2 21h20', 'M8 8h3M8 12h3M8 16h3'],
}
// black nodes as on the landing page; each step keeps one accent hue for its icon and end dot
const hues = ['#f5b301', '#ff8a65', '#34d17e', '#4fb3ff', '#b388ff', '#ff6fa8', '#2ee6c4']
// wrap month names so narrower screens can drop them and keep the range on one line
const yearLabel = y => y.split(/([A-Z][a-z]{2} )/).map((p, i) => i % 2 ? <span key={i} className="m">{p}</span> : p)

export default function Journey() {
  const ref = useRef(null)
  const tlRef = useRef(null)
  const [step, setStep] = useState(0)      // furthest revealed step
  const [started, setStarted] = useState(false)
  const last = chapters.length - 1

  const go = useCallback(n => setStep(Math.max(0, Math.min(last, n))), [last])

  // first step animates in when the section scrolls into view
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect() } }, { threshold: 0.35 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  // Size the timeline from its real content (fonts and zoom differ between screens):
  // every upper title shares one line, every lower title another, and nothing can overlap.
  useEffect(() => {
    const tl = tlRef.current, section = ref.current
    if (!tl || !section) return
    const mobile = window.matchMedia('(max-width: 760px)')
    const max = (sel, prop = 'offsetHeight') => Math.max(0, ...[...tl.querySelectorAll(sel)].map(el => el[prop]))
    const fit = () => {
      tl.classList.remove('compact')
      tl.style.height = ''
      tl.style.marginTop = ''
      if (mobile.matches) return
      const measure = (pad = 0) => {
        const yearGap = max('.step-year') + 34 + pad
        const upo = max('.is-above .step-copy') + yearGap
        const dno = yearGap + 6
        const dnh = max('.is-below .step-copy')
        const half = Math.max(upo + 6, dno + dnh + 10)
        return { upo, dno, dnh, half }
      }
      const avail = section.clientHeight - tl.offsetTop - 16
      let m = measure()
      if (m.half * 2 > avail) { tl.classList.add('compact'); m = measure() }   // drop the pills before anything overlaps
      else { const pad = Math.min(44, (avail - m.half * 2) / 8); m = measure(pad) }   // room to spare: open up the gaps
      tl.style.setProperty('--upo', `${m.upo}px`)
      tl.style.setProperty('--dno', `${m.dno}px`)
      tl.style.setProperty('--dnh', `${m.dnh}px`)
      tl.style.height = `${m.half * 2}px`
      // centre the timeline: equal space above and below
      tl.style.marginTop = `${Math.max(12, (avail - m.half * 2) / 2)}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(section)
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [])

  // ← → step through while the section is on screen
  useEffect(() => {
    const onKey = e => {
      const r = ref.current?.getBoundingClientRect()
      if (!r || r.top > innerHeight * 0.5 || r.bottom < innerHeight * 0.5) return
      if (e.key === 'ArrowRight') go(step + 1)
      if (e.key === 'ArrowLeft') go(step - 1)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [go, step])

  return (
    <section className={`journey${started ? ' started' : ''}`} id="journey" ref={ref}
      style={{ '--n': chapters.length, '--fp': last ? step / last : 0 }}>
      <div className="journey-bar">
        <div className="journey-nav" aria-label="Journey steps">
          <button className="jn-btn" onClick={() => go(step - 1)} disabled={step === 0} aria-label="Previous step">←</button>
          <button className="jn-btn is-next" onClick={() => go(step + 1)} disabled={step === last} aria-label="Next step">→</button>
          <button className="jn-reset" onClick={() => go(step === last ? 0 : last)}>{step === last ? 'Replay' : 'Show all'}</button>
        </div>
        <header className="journey-head">
          <h2 className="journey-kicker">{journey.kicker}</h2>
          <p>{journey.standfirst}</p>
        </header>
      </div>

      <ol className="timeline" ref={tlRef}>
        <span className="tl-line" aria-hidden="true"
          // the travelled line blends from each step's colour into the next
          style={{ '--seg': `linear-gradient(90deg,${chapters.map((_, i) => `${hues[i % hues.length]} ${last ? i / last * 100 : 0}%`).join(',')})` }}><i /></span>
        {chapters.map((c, i) => {
          const state = i < step ? 'is-done' : i === step ? 'is-current' : 'is-next'
          // logos sit under each step's text box; a step with none shows line emblems in the same circles
          const logos = c.logos.length > 0 ? (
            <div className="step-logos">
              {c.logos.map((l, k) => [
                l.via && <em key={l.via} className="logo-via">{l.via}</em>,      // Torii · backed by · NCC
                <span key={l.src} style={{ '--k': k }}><img src={l.src} alt={l.alt} /></span>,
              ])}
            </div>
          ) : c.marks?.length > 0 && (
            <div className="step-logos is-marks" aria-hidden="true">
              {c.marks.map((m, k) => (
                <span key={m} style={{ '--k': k }}><svg viewBox="0 0 24 24">{icons[m].map((d, j) => <path key={j} d={d} />)}</svg></span>
              ))}
            </div>
          )
          return (
            <li key={c.years} className={`step ${i % 2 ? 'is-below' : 'is-above'} ${state}`}
              style={{ '--c': '#0d0d0d', '--hue': hues[i % hues.length] }}>
              <div className="step-copy">
                <span className="step-phase">{c.phase}</span>
                <h3>{c.title}</h3>
                <ul className="step-points">{c.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
                <ul className="step-roles">{c.roles.map(r => <li key={r}>{r}</li>)}</ul>
                {logos}
              </div>
              <span className="step-year">{yearLabel(c.years)}</span>
              <button className="step-node" onClick={() => go(i)} aria-label={`${c.years}: ${c.title}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">{icons[c.icon].map((d, k) => <path key={k} d={d} />)}</svg>
              </button>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
