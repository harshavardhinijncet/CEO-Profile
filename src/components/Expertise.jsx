import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { expertise, pillars, panels } from '../data/expertise.js'

const N = panels.length
const X = '/assets/expertise/'

// three chevrons that light up in turn, pointing on along the wall
const Chev = () => (
  <svg className="x-chev" viewBox="0 0 66 24" aria-hidden="true">
    {[0, 1, 2].map(k => <path key={k} d={`M${4 + k * 20} 3l10 9-10 9`} style={{ '--k': k }} />)}
  </svg>
)

const Logos = ({ logos }) => logos?.length ? (
  <span className="x-logos">{logos.map(l => <span key={l.src}><img src={l.src} alt={l.alt} loading="lazy" /></span>)}</span>
) : null

// a stem that drops (or rises) from the item to a dot on the rail
const Stem = () => <span className="x-stem" aria-hidden="true"><i /></span>

// clicking a photo opens it large; the viewer steps through the rest of that photo group
const ViewerContext = createContext(() => {})

function Lightbox({ view, onClose, onStep }) {
  const { srcs, i, caption } = view
  const many = srcs.length > 1

  // while open, keys and the wheel belong to the viewer, not to the page or the panels behind it
  useEffect(() => {
    const onKey = e => {
      const k = e.key
      if (!['Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '].includes(k)) return
      e.preventDefault()
      e.stopImmediatePropagation()
      if (k === 'Escape') onClose()
      if (k === 'ArrowRight' && many) onStep(1)
      if (k === 'ArrowLeft' && many) onStep(-1)
    }
    const block = e => { e.preventDefault(); e.stopImmediatePropagation() }
    addEventListener('keydown', onKey, true)
    addEventListener('wheel', block, { capture: true, passive: false })
    return () => { removeEventListener('keydown', onKey, true); removeEventListener('wheel', block, true) }
  }, [onClose, onStep, many])

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={caption} onClick={onClose}>
      <figure className="lb-stage" onClick={e => e.stopPropagation()}>
        <img key={srcs[i]} src={X + srcs[i]} alt={`${caption} — photo ${i + 1}`} />
        <figcaption>{caption}</figcaption>
      </figure>
      {many && <>
        <button className="lb-btn lb-prev" onClick={e => { e.stopPropagation(); onStep(-1) }} aria-label="Previous photo">←</button>
        <button className="lb-btn lb-next" onClick={e => { e.stopPropagation(); onStep(1) }} aria-label="Next photo">→</button>
        <div className="lb-dots" onClick={e => e.stopPropagation()}>
          {srcs.map((s, k) => <i key={s} className={k === i ? 'on' : ''} />)}
        </div>
      </>}
      <button className="lb-close" onClick={onClose} aria-label="Close">×</button>
    </div>,
    document.body,
  )
}

// one even strip: every photo shares a height, widths follow each photo's own shape (never cropped)
function Photos({ it }) {
  const open = useContext(ViewerContext)
  const [ar, setAr] = useState({})
  const sum = it.srcs.reduce((a, s) => a + (ar[s] || 1.4), 0)
  return (
    <figure className="x-photos" data-n={it.srcs.length} style={{ '--sum': sum }}>
      <span className="x-strip">
        {it.srcs.map((s, k) => (
          <img key={s} src={X + s} alt={`${it.caption} — photo ${k + 1}`} loading="lazy"
            style={{ '--k': k, '--ar': ar[s] || 1.4 }} role="button" tabIndex={0} title="View larger"
            onClick={() => open(it, k)} onKeyDown={e => { if (e.key === 'Enter') open(it, k) }}
            onLoad={e => { const r = e.target.naturalWidth / e.target.naturalHeight; setAr(a => (a[s] === r ? a : { ...a, [s]: r })) }} />
        ))}
      </span>
      <figcaption>{it.caption}</figcaption>
    </figure>
  )
}

function Item({ it }) {
  switch (it.t) {
    case 'year':
      return <><Stem /><span className="x-year">{it.text}{it.chev && <Chev />}</span></>
    case 'pin':
      return (
        <>
          <Stem />
          <div className="x-pin">
            <Logos logos={it.logos} />
            <span className="x-role">{it.role}</span>
            <h4>{it.org}</h4>
            {it.head && <b className="x-head">{it.head}</b>}
            {it.stat && <strong className="x-pinstat">{it.stat}</strong>}
            {it.text && <p>{it.text}</p>}
          </div>
        </>
      )
    case 'lead':
      return (
        <div className="x-lead">
          <span className="x-kick">{it.kicker}</span>
          <h3>{it.text}</h3>
          {it.sub && <p>{it.sub}</p>}
          <Logos logos={it.logos} />
        </div>
      )
    case 'stat':
      return (
        <div className={`x-stat${it.outline ? ' is-outline' : ''}`}>
          <strong>{it.value}</strong>
          <span>{it.label}</span>
          {it.sub && <small>{it.sub}</small>}
        </div>
      )
    case 'photos':
      return <Photos it={it} />
    case 'places':
      return (
        <ul className="x-places">
          {it.items.map(p => <li key={p.place}><span><strong>{p.place}</strong>{p.cities}</span></li>)}
        </ul>
      )
    case 'logowall':
      return <ul className="x-wall">{it.logos.map((l, k) => <li key={l.src} style={{ '--k': k }}><img src={l.src} alt={l.alt} loading="lazy" /></li>)}</ul>
    case 'partners':
      return (
        <ul className="x-partners">
          {it.items.map((p, k) => (
            <li key={p.name} style={{ '--k': k }} className={p.star ? 'is-star' : ''}>
              <Stem />
              <span className="x-plogo">{p.logo ? <img src={p.logo} alt={p.name} loading="lazy" /> : <em>{p.word}</em>}</span>
              <b>{p.name}</b>
              <p>{p.text}</p>
            </li>
          ))}
        </ul>
      )
    case 'apps':
      return (
        <ul className="x-apps">
          {it.apps.map((a, k) => (
            <li key={a.name} style={{ '--k': k }}>
              <span className="x-alogo"><img src={a.logo} alt="" loading="lazy" /></span>
              <b>{a.name}</b>
              <p>{a.text}</p>
            </li>
          ))}
        </ul>
      )
    default:
      return null
  }
}

export default function Expertise() {
  const ref = useRef(null)
  const wallRef = useRef(null)
  const [frame, setFrame] = useState(0)
  const [seen, setSeen] = useState(() => new Set())     // panels that have played their entrance

  // one page: the wall slides sideways with ← →, the buttons and the pillar index (the wheel only moves between pages)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.55 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  useEffect(() => { if (active) setSeen(s => (s.has(frame) ? s : new Set(s).add(frame))) }, [active, frame])

  const [view, setView] = useState(null)       // the photo open in the viewer: { srcs, i, caption }
  const openPhoto = useCallback((it, i) => setView({ srcs: it.srcs, caption: it.caption, i }), [])
  const closePhoto = useCallback(() => setView(null), [])
  const stepPhoto = useCallback(d => setView(v => v && { ...v, i: (v.i + d + v.srcs.length) % v.srcs.length }), [])

  const go = useCallback(i => setFrame(Math.max(0, Math.min(N - 1, i))), [])
  const move = useCallback(d => setFrame(f => Math.max(0, Math.min(N - 1, f + d))), [])

  useEffect(() => {
    const onKey = e => {
      if (!active || Math.abs(ref.current.getBoundingClientRect().top) > 10) return
      if (e.key === 'ArrowRight') { e.preventDefault(); move(1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) }
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [active, move])

  const current = panels[frame].pillar
  const first = id => panels.findIndex(p => p.pillar === id)

  const handlePillarClick = pId => {
    const idx = first(pId)
    go(idx)
    if (window.matchMedia('(max-width: 760px)').matches) {
      const el = document.getElementById(`pillar-${pId}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <ViewerContext.Provider value={openPhoto}>
    <section className="expertise" id="expertise" ref={ref} style={{ '--n': N }}>

      <div className="xsticky">
        <div className="journey-bar x-bar">
          <div className="journey-nav" aria-label="Expertise panels">
            <button className="jn-btn" onClick={() => move(-1)} disabled={frame === 0} aria-label="Previous panel">←</button>
            <button className="jn-btn is-next" onClick={() => move(1)} disabled={frame === N - 1} aria-label="Next panel">→</button>
          </div>
          <header className="journey-head">
            <h2 className="journey-kicker">{expertise.kicker}</h2>
            <p>{expertise.standfirst}</p>
          </header>
        </div>

        <div className="xwall" ref={wallRef} style={{ '--p': frame }}>
          {panels.map((pn, i) => (
            <article key={i} id={i === first(pn.pillar) ? `pillar-${pn.pillar}` : undefined} data-pillar={pn.pillar} className={`xp${seen.has(i) ? ' on' : ''}${i === frame ? ' is-current' : ''}`}
              style={{ '--c': pn.tone, '--hue': pn.hue, '--i': i }} aria-label={pn.title}>
              {pn.deco?.map((d, k) => (
                <span key={k} className={`x-deco x-${d.k}`} aria-hidden="true"
                  style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s }} />
              ))}
              <h3 className="x-title"><span>{pn.title}</span></h3>
              <span className="x-rail" aria-hidden="true" />
              {pn.items.map((it, k) => (
                <div key={k} className={`xi xi-${it.t} is-${it.z}`}
                  style={{ gridColumn: `${it.c[0] + 1} / span ${it.c[1]}`, '--n': k }}>
                  <Item it={it} />
                </div>
              ))}
              {i < N - 1 && <span className="x-next" aria-hidden="true"><Chev /></span>}
            </article>
          ))}
        </div>

        <nav className="x-pillars" aria-label="Expertise pillars">
          {pillars.map(p => {
            const own = panels.map((pn, i) => (pn.pillar === p.id ? i : -1)).filter(i => i >= 0)
            const fill = own.filter(i => i <= frame).length / own.length
            return (
              <button key={p.id} className={p.id === current ? 'on' : ''} onClick={() => handlePillarClick(p.id)}
                style={{ '--fill': fill }}>
                {p.label}<i />
              </button>
            )
          })}
        </nav>
      </div>
    </section>
    {view && <Lightbox view={view} onClose={closePhoto} onStep={stepPhoto} />}
    </ViewerContext.Provider>
  )
}
