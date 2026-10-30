import { useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Portrait from './components/Portrait.jsx'
import Strip from './components/Strip.jsx'
import Journey from './components/Journey.jsx'
import Vision from './components/Vision.jsx'
import Expertise from './components/Expertise.jsx'
import { profile } from './data/profile.js'
import useParallax from './hooks/useParallax.js'
import usePager from './hooks/usePager.js'

export default function App() {
  const appRef = useRef(null)
  const [ready, setReady] = useState(false)

  useParallax(appRef)
  usePager('.app, .journey, .vision, .expertise')

  // intro starts once the portrait has loaded (safety timeout in case it never fires)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <div ref={appRef} className={`app${ready ? ' ready' : ''}`} id="top">
        {/* SVG so the faded name stretches exactly edge to edge at any screen width */}
        <svg className="ghost" viewBox="0 0 1000 190" aria-hidden="true" data-depth="-14">
          <text x="0" y="140" textLength="1000" lengthAdjust="spacingAndGlyphs">
            {profile.name.first} {profile.name.last}
          </text>
        </svg>

        <Portrait onLoad={() => setReady(true)} />
        <Header />

        <main className="hero">
          <Hero />
        </main>

        <Strip ready={ready} />
      </div>

      <Journey />
      <Vision />
      <Expertise />

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <b>{profile.name.first} {profile.name.last}</b>
            <span>Founder &amp; CEO · Technical Hub &amp; Torii Minds</span>
          </div>
          <div className="footer-links">
            <a href="#top" className="footer-top">Back to top ↑</a>
            <a href={profile.contact} target="_blank" rel="noopener" className="footer-connect">Connect</a>
          </div>
        </div>
      </footer>
    </>
  )
}
