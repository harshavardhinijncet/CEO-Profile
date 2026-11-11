import { useCallback, useEffect, useRef, useState } from 'react'
import DomeGallery from './dome/DomeGallery.jsx'
import MediaViewer from './MediaViewer.jsx'
import { achievements, gallery, domeColumns } from '../data/gallery.js'
import useInView from '../hooks/useInView.js'

// where each pill starts, in the frame's 400×500 box: Train, Build (just by his ear), Brand, Innovate, Inspire
const spots = [[34, 118], [256, 74], [16, 248], [338, 150], [356, 268]]

const items = gallery.map(g => ({ type: 'img', src: g.full, alt: g.alt }))

// one page: him on the left, a dome wall of achievements on the right that you can spin and open
export default function Achievements() {
  const ref = useRef(null)
  const { inView, key } = useInView(ref, 0.3)
  const [seen, setSeen] = useState(false)          // mount the dome the first time the page arrives
  const [view, setView] = useState(null)
  useEffect(() => { if (inView) setSeen(true) }, [inView])

  // a tile opens the big viewer at that photo; the arrows walk through the whole wall
  const open = useCallback(src => {
    const i = gallery.findIndex(g => g.src === src)
    if (i >= 0) setView({ items, i, caption: items[i].alt })
  }, [])
  const close = useCallback(() => setView(null), [])
  const step = useCallback(d => setView(v => {
    const i = (v.i + d + items.length) % items.length
    return { ...v, i, caption: items[i].alt }
  }), [])

  return (
    <section className="achievements" id="achievements" ref={ref}>
      <div className="ac-dome">
        {seen && (
          <DomeGallery images={gallery} grayscale={false} overlayBlurColor="#f3f1ee" fit={0.95} minRadius={460}
            maxVerticalRotationDeg={6} segments={domeColumns} imageBorderRadius="14px" autoRotate={view ? 0 : 0.03}
            onOpen={open} />
        )}
        <span className="ac-hint">{achievements.hint}</span>
      </div>

      <div className="journey-bar">
        <header className="journey-head">
          <h2 className="journey-kicker">{achievements.kicker}</h2>
          <p>{achievements.standfirst}</p>
        </header>
      </div>

      <div className={`ac-left${inView ? ' live' : ''}`} key={key}>
        <div className="acf">
          <img className="acf-photo" src="/assets/babji-seated.webp" alt="Babji Neelam" />
          <ul className="acf-pills">
            {achievements.pills.map((p, k) => (
              <li key={p} style={{ '--k': k, '--x': `${spots[k][0] / 4}%`, '--y': `${spots[k][1] / 5}%` }}><i aria-hidden="true" />{p}</li>
            ))}
          </ul>
          <p className="acf-name"><span>Hello,</span><b>welcome to my journey</b></p>
          <p className="acf-tag">Founder &amp; CEO · Technical Hub &amp; Torii Minds <i aria-hidden="true">→</i></p>
        </div>
      </div>

      {view && <MediaViewer view={view} onClose={close} onStep={step} />}
    </section>
  )
}
