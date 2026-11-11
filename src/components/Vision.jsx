import { useEffect, useRef, useState } from 'react'
import { opening } from '../data/vision.js'
import assemble from '../hooks/assemble.js'
import { edge } from '../data/visionEdge.js'

// the quote, domino lettering: letter after letter tips up from lying flat and settles upright,
// like a row of dominoes righting itself; words never break, **bold** / _em_ / [mark] keep their style
function quoteWords(lines) {
  let c = 0
  const letters = text => [...text].map((ch, i) => <i key={i} className="dl" style={{ '--c': c++ }}>{ch}</i>)
  // a styled run may hold several words: real spaces stay between them, each word holds together
  const run = text => text.split(/(\s+)/).filter(Boolean).map((t, ti) => (/^\s+$/.test(t) ? ' ' : <span key={ti} className="dw">{letters(t)}</span>))
  const word = (node, key, cls = '') => <span key={key} className={`qw ${cls}`}><span>{node}</span></span>
  return lines.map((line, li) => (
    <span key={li} className="ql">
      {line.split(/(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\])/).filter(Boolean).flatMap((p, pi) => {
        if (p.startsWith('**')) return [word(<b>{run(p.slice(2, -2))}</b>, pi, 'is-bold')]
        if (p.startsWith('_')) return [word(<em>{run(p.slice(1, -1))}</em>, pi)]
        if (p.startsWith('[')) return [word(<mark>{run(p.slice(1, -1))}</mark>, pi, 'is-mark')]
        return p.split(/(\s+)/).filter(Boolean).map((t, ti) => (/^\s+$/.test(t) ? ' ' : word(letters(t), `${pi}-${ti}`)))
      })}
    </span>
  ))
}

// the paragraph, blur text: once the quote has settled, word after word comes into focus as it
// rises; the **bold** phrases then get a yellow underline drawn beneath them
function blurWords(text) {
  let w = 0
  const words = t => t.split(/(\s+)/).filter(Boolean).map((s, i) => (/^\s+$/.test(s) ? ' ' : <i key={i} className="bw" style={{ '--w': w++ }}>{s}</i>))
  return text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((p, k) => (p.startsWith('**')
    ? <b key={k} style={{ '--u': w + p.slice(2, -2).split(/\s+/).length }}>{words(p.slice(2, -2))}</b>
    : <span key={k}>{words(p)}</span>))
}

// his photo, built from particles each time the page comes into view; the real image takes over at the end
function Photo({ live }) {
  const imgRef = useRef(null)
  const canvasRef = useRef(null)
  const [stage, setStage] = useState('wait')     // wait → build → done

  useEffect(() => {
    if (!live) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setStage('done'); return }
    setStage('build')
    return assemble(imgRef.current, canvasRef.current, () => setStage('done'))
  }, [live])

  return (
    <figure className={`vw-photo${live ? ' live' : ''} is-${stage}`}>
      <span className="vw-frame">
        <img ref={imgRef} src="/assets/babji-speaking.webp" alt="Babji Neelam speaking" />
        {/* yellow light on parts of his outline: drawn in once the photo has formed, then a spark runs along now and then */}
        <svg className="vw-edge" viewBox={`0 0 ${edge.w} ${edge.h}`} aria-hidden="true">
          <defs>
            <linearGradient id="vwEdgeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f5b301" stopOpacity="0" />
              <stop offset=".3" stopColor="#f5b301" />
              <stop offset=".7" stopColor="#ffd25a" />
              <stop offset="1" stopColor="#f5b301" stopOpacity="0" />
            </linearGradient>
            <filter id="vwGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          {edge.paths.map((d, k) => (
            <g key={k} style={{ '--k': k }}>
              <path className="vw-edge-line" d={d} pathLength="1" />
              {/* moving light: a soft glowing tail with a bright head, gliding along the line */}
              <path className="vw-edge-tail" d={d} pathLength="1" filter="url(#vwGlow)" />
              <path className="vw-edge-head" d={d} pathLength="1" />
            </g>
          ))}
        </svg>
        <canvas ref={canvasRef} className="vw-particles" aria-hidden="true" />
      </span>
    </figure>
  )
}

// one page: his vision, in one thought
export default function Vision() {
  const ref = useRef(null)
  const [openKey, setOpenKey] = useState(0)     // bumps each time the page scrolls into view → animations replay
  const openSeen = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      const top = ref.current.getBoundingClientRect().top
      const showing = top < window.innerHeight * .55 && top > -window.innerHeight * .5
      if (showing && !openSeen.current) setOpenKey(k => k + 1)
      openSeen.current = showing
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll)
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll) }
  }, [])

  return (
    <section className="vision in-words" id="vision" ref={ref} style={{ '--frames': 1 }}>
      <div className="vsticky">
        <div className="journey-bar">
          <header className="journey-head">
            <h2 className="journey-kicker">{opening.kicker}</h2>
          </header>
        </div>

        <div className="vwords vopen">
          <span className="vw-ghost" aria-hidden="true">Vision</span>
          <div className={`vo-copy${openKey ? ' live' : ''}`} key={openKey}>
            <span className="vo-kicker">{opening.kicker}</span>
            <blockquote><span className="vo-qmark" aria-hidden="true">“</span>{quoteWords(opening.quote)}</blockquote>
            <p className="vo-text">{blurWords(opening.text)}</p>
          </div>
          <Photo key={`p${openKey}`} live={openKey > 0} />
        </div>
      </div>
    </section>
  )
}
