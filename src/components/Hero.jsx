import { profile, intro, socials } from '../data/profile.js'
import Icon from './Icons.jsx'

export default function Hero() {
  const { name } = profile

  return (
    <section className="hero-text">
      <h1 className="name">
        <span className="w"><span style={{ '--i': 0 }}>{name.first}</span></span>{' '}
        <span className="w"><span style={{ '--i': 1 }}>{name.last}</span></span>
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
    </section>
  )
}
