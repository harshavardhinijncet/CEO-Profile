import { useCallback, useEffect, useRef, useState } from 'react'
import { programmes, programs } from '../data/programs.js'
import useInView from '../hooks/useInView.js'
import MediaViewer from './MediaViewer.jsx'

// the square on each card: a silent film loop while the page is in view, or the photos in turn
function Square({ p, live, onOpen }) {
  const vid = useRef(null)
  const [k, setK] = useState(0)

  useEffect(() => {
    const v = vid.current
    if (v) { if (live) v.play().catch(() => {}); else v.pause() }
  }, [live])

  useEffect(() => {
    if (p.loop || !live) return
    const t = setInterval(() => setK(n => (n + 1) % p.photos.length), 2600)
    return () => clearInterval(t)
  }, [p, live])

  return (
    <button className={`pg-square${p.loop ? ' is-film' : ''}`} onClick={onOpen}
      aria-label={p.loop ? `Play the ${p.name} film` : `View ${p.name} photos`}>
      {p.loop
        ? <video ref={vid} src={p.loop} poster={p.poster} muted loop playsInline preload="metadata" />
        : p.photos.map((s, n) => <img key={s} src={s} alt="" className={n === k ? 'on' : ''} loading="lazy" />)}
      <span className="pg-play" aria-hidden="true">
        {p.loop ? <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5-11-6.5Z" /></svg> : <svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>}
        <em>{p.loop ? 'Watch' : 'View'}</em>
      </span>
    </button>
  )
}

// one page: the flagship programmes side by side
export default function Programs() {
  const ref = useRef(null)
  const { inView, key } = useInView(ref)
  const [view, setView] = useState(null)

  const close = useCallback(() => setView(null), [])
  const step = useCallback(d => setView(v => ({ ...v, i: (v.i + d + v.items.length) % v.items.length })), [])

  const media = p => [
    ...(p.video ? [{ type: 'video', src: p.video, poster: p.poster }] : []),
    ...p.photos.map(src => ({ type: 'img', src })),
  ]
  const open = (p, i) => setView({ items: media(p), i, caption: p.name })

  return (
    <section className="programs" id="programs" ref={ref}>
      <div className="journey-bar">
        <header className="journey-head">
          <h2 className="journey-kicker">{programmes.kicker}</h2>
          <p>{programmes.standfirst}</p>
        </header>
      </div>

      <ul className={`pg-grid${inView ? ' live' : ''}`} key={key}>
        {programs.map((p, n) => (
          <li key={p.id} className="pg-card" style={{ '--hue': p.hue, '--n': n }}>
            <Square p={p} live={inView && !view} onOpen={() => open(p, 0)} />
            <div className="pg-body">
              <span className="pg-logo"><img src={p.logo} alt={p.name} loading="lazy" /></span>
              <span className="pg-tag">{p.tag}</span>
              <p className="pg-stat"><b>{p.stat}</b> <small>{p.statLabel}</small></p>
              <p className="pg-text">{p.text}</p>
              <span className="pg-thumbs">
                {p.photos.slice(0, 4).map((s, k) => (
                  <img key={s} src={s} alt={`${p.name}, photo ${k + 1}`} loading="lazy" role="button" tabIndex={0} title="View larger"
                    onClick={() => open(p, k + (p.video ? 1 : 0))}
                    onKeyDown={e => { if (e.key === 'Enter') open(p, k + (p.video ? 1 : 0)) }} />
                ))}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {view && <MediaViewer view={view} onClose={close} onStep={step} />}
    </section>
  )
}
