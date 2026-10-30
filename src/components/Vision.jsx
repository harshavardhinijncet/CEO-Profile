import { useEffect, useRef, useState } from 'react'
import { opening } from '../data/vision.js'

// tiny inline markup for the quote: **bold**, _italic gold_, [highlight]
const rich = text => text.split(/(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\])/).map((p, i) =>
  p.startsWith('**') ? <b key={i}>{p.slice(2, -2)}</b>
    : p.startsWith('_') ? <em key={i}>{p.slice(1, -1)}</em>
    : p.startsWith('[') ? <mark key={i}>{p.slice(1, -1)}</mark>
    : p)

// the quote, word by word: each word rises in turn; **bold** stands out, [mark] a sweeping highlight
function quoteWords(lines) {
  let d = 0
  const word = (node, key, cls = '') => <span key={key} className={`qw ${cls}`} style={{ '--d': d++ }}><span>{node}</span></span>
  return lines.map((line, li) => (
    <span key={li} className="ql">
      {line.split(/(\*\*[^*]+\*\*|_[^_]+_|\[[^\]]+\])/).filter(Boolean).flatMap((p, pi) => {
        if (p.startsWith('**')) return [word(<b>{p.slice(2, -2)}</b>, pi, 'is-bold')]
        if (p.startsWith('_')) return [word(<em>{p.slice(1, -1)}</em>, pi)]
        if (p.startsWith('[')) return [word(<mark>{p.slice(1, -1)}</mark>, pi, 'is-mark')]
        return p.split(/(\s+)/).filter(Boolean).map((t, ti) => (/^\s+$/.test(t) ? ' ' : word(t, `${pi}-${ti}`)))
      })}
    </span>
  ))
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
            <p>{rich(opening.text)}</p>
          </div>
          <figure className={`vw-photo${openKey ? ' live' : ''}`} key={`p${openKey}`}>
            <img src="/assets/babji-speaking.webp" alt="Babji Neelam speaking" />
          </figure>
        </div>
      </div>
    </section>
  )
}
