import { useEffect, useState } from 'react'
import pageTo from '../hooks/pageTo.js'

// thin line icons for the nav bar
const icons = {
  top: ['M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5Z'],
  journey: ['M6 16.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z', 'M18 2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z', 'M8.5 19h8a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7h8'],
  vision: ['M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z'],
  expertise: ['M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z'],
  programs: ['M4 5h16v11H4z', 'M9 20h6', 'M12 16v4', 'M10 8.5v4l3.5-2-3.5-2Z'],
  achievements: ['M8 4h8v5a4 4 0 0 1-8 0V4Z', 'M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4', 'M12 13v4', 'M8.5 20h7'],
  pdf: ['M12 4v11', 'M7 10.5l5 5 5-5', 'M5 20h14'],
  contact: ['M21 3 10 14', 'M21 3l-7 18-4-7-7-4 18-7Z'],
}
const Icon = ({ name }) => <svg viewBox="0 0 24 24" aria-hidden="true">{icons[name].map(d => <path key={d} d={d} />)}</svg>

const links = [
  { id: 'top', label: 'Home' },
  { id: 'journey', label: 'Journey' },
  { id: 'vision', label: 'Vision' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'programs', label: 'Programmes' },
  { id: 'achievements', label: 'Frames of Impact' },
  { id: 'contact', label: 'Contact' },
]

// a pill bar fixed at the top-left on every page (desktop): icons only, the page in view opens into icon + name
export default function Header() {
  const [active, setActive] = useState('top')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      let cur = 'top'
      for (const { id } of links) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= innerHeight * .5) cur = id
      }
      setActive(cur)
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // page titles sit centred on the nav's row (desktop); whenever the bar (or a pill opening in it)
  // would reach a title, that title slides right just far enough to keep a clear gap
  useEffect(() => {
    const nav = document.querySelector('.site-nav')
    const desktop = window.matchMedia('(min-width: 1025px)')
    const fit = () => {
      const edge = nav.getBoundingClientRect().right + 28
      document.querySelectorAll('.journey-head').forEach(head => {
        const title = head.querySelector('.journey-kicker')
        if (!title) return
        if (!desktop.matches) { head.style.translate = ''; return }
        const shift = parseFloat(head.style.translate) || 0
        const left = title.getBoundingClientRect().left - shift
        head.style.translate = `${Math.max(0, Math.ceil(edge - left))}px 0`
      })
    }
    const ro = new ResizeObserver(fit)
    ro.observe(nav)
    addEventListener('resize', fit)
    document.fonts?.ready.then(fit)
    fit()
    return () => { ro.disconnect(); removeEventListener('resize', fit) }
  }, [])

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  // nav click → the same calm page change as the wheel; the pill moves once, to where you're going
  const goTo = (e, id) => {
    handleLinkClick()
    const el = document.getElementById(id)
    if (!el || !window.matchMedia('(min-width: 1025px)').matches) return
    e.preventDefault()
    history.replaceState(null, '', `#${id}`)
    const from = links.findIndex(l => l.id === active), to = links.findIndex(l => l.id === id)
    if (pageTo(el, to - from)) setActive(id)
  }

  return (
    <header className={`header${active === 'top' ? '' : ' is-away'}${menuOpen ? ' is-open' : ''}`}>
      <a href="#top" className="mobile-brand" onClick={handleLinkClick}>
        Babji Neelam
      </a>
      <nav className="site-nav" aria-label="Main">
        {links.map(l => (
          <a
            key={l.id}
            href={`#${l.id}`}
            title={l.label}
            className={l.id === active ? 'is-active' : ''}
            aria-current={l.id === active ? 'page' : undefined}
            onClick={e => goTo(e, l.id)}
          >
            <Icon name={l.id} /><span>{l.label}</span>
          </a>
        ))}
        <a href="/Babji-Neelam-Profile.pdf" download="Babji-Neelam-Profile.pdf" title="Download profile (PDF)" className="nav-pdf" onClick={handleLinkClick}>
          <Icon name="pdf" /><span>Profile PDF</span>
        </a>
      </nav>
      <button
        className={`circle menu${menuOpen ? ' is-open' : ''}`}
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(o => !o)}
      >
        <span /><span /><span /><span />
      </button>
    </header>
  )
}
