import { profile, intro, socials } from '../data/profile.js'
import Icon from './Icons.jsx'

// signal type: each letter flickers between a hollow outline and solid ink, out of order, like a
// sign switching on — then the name holds solid, with a rare flicker on a couple of letters
let seed = 7
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
const signal = (word, from) => [...word].map((ch, k) => (
  <i key={k} className={`sg sg-${(from + k) % 3}${[2, 8].includes(from + k) ? ' sg-idle' : ''}`}
    style={{ '--sd': `${Math.round(rand() * 900)}ms` }}>{ch}</i>
))

export default function Hero() {
  const { name } = profile

  return (
    <section className="hero-text">
      <h1 className="name" aria-label={`${name.first} ${name.last}`}>
        <span className="w" aria-hidden="true"><span style={{ '--i': 0 }}>{signal(name.first, 0)}</span></span>{' '}
        <span className="w" aria-hidden="true"><span style={{ '--i': 1 }}>{signal(name.last, name.first.length)}</span></span>
      </h1>

      <p className="subtitle">{intro.subtitle}</p>

      <ul className="socials">
        {socials.map((s, i) => (
          <li key={s.id} style={{ '--i': i }}>
            <a
              className={`social s-${s.id}`}
              href={s.href || '#top'}
              target={s.href ? '_blank' : undefined}
              rel="noopener"
              aria-label={s.label}
              title={s.label}
            >
              <Icon id={s.id} />
            </a>
          </li>
        ))}
      </ul>

      <a className="pdf-btn" href="/Babji-Neelam-Profile.pdf" download="Babji-Neelam-Profile.pdf">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" /></svg>
        <span>Download Profile</span><em>PDF</em>
      </a>
      <a className="pdf-alt" href="/Babji-Neelam-Profile-Text.pdf" download="Babji-Neelam-Profile-Text.pdf">or the text-only profile</a>
    </section>
  )
}
