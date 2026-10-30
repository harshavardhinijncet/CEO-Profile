import { useEffect, useState } from 'react'
import { profile } from '../data/profile.js'
import pageTo from '../hooks/pageTo.js'

// thin line icons for the nav bar
const icons = {
  top: ['M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5Z'],
  journey: ['M6 16.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z', 'M18 2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z', 'M8.5 19h8a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7h8'],
  vision: ['M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z', 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z'],
  expertise: ['M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z'],
  connect: ['M21 3 10 14', 'M21 3l-7 18-4-7-7-4 18-7Z'],
}
const Icon = ({ name }) => <svg viewBox="0 0 24 24" aria-hidden="true">{icons[name].map(d => <path key={d} d={d} />)}</svg>

const links = [
  { id: 'top', label: 'Home' },
  { id: 'journey', label: 'Journey' },
  { id: 'vision', label: 'Vision' },
  { id: 'expertise', label: 'Expertise' },
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
      if (window.innerWidth > 760) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  // nav click → the same calm page change as the wheel; the pill moves once, to where you're going
  const goTo = (e, id) => {
    handleLinkClick()
    const el = document.getElementById(id)
    if (!el || !window.matchMedia('(min-width: 761px)').matches) return
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
        <a href={profile.contact} target="_blank" rel="noopener" title="Connect" className="nav-connect" onClick={handleLinkClick}>
          <Icon name="connect" /><span>Connect</span>
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
