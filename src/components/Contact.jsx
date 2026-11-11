import { useRef, useState } from 'react'
import Icon from './Icons.jsx'
import { contact } from '../data/contact.js'
import { socials } from '../data/profile.js'
import useInView from '../hooks/useInView.js'

const fields = [
  { id: 'name', label: 'Name', type: 'text', auto: 'name' },
  { id: 'email', label: 'Email', type: 'email', auto: 'email' },
  { id: 'phone', label: 'Phone', type: 'tel', auto: 'tel' },
]

// the last page: the site's off-white page over a faint dotted world map, the form on the left, his details on the right.
// There is no mail server — Send opens the visitor's mail app with the message already written.
export default function Contact() {
  const ref = useRef(null)
  const { inView } = useInView(ref, 0.4)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const send = e => {
    e.preventDefault()
    const body = `${form.message}\n\n— ${form.name}\n${form.email}${form.phone ? `\n${form.phone}` : ''}`
    location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Message from ${form.name || 'your website'}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className={`contact${inView ? ' live' : ''}`} id="contact" ref={ref}>
      <div className="ct-map" aria-hidden="true">
        <img src="/assets/world-dots.svg" alt="" />
        {contact.pins.map((p, k) => (
          <i key={p.name} className={`ct-pin${k ? '' : ' is-home'}`} style={{ '--x': `${p.x}%`, '--y': `${p.y}%`, '--k': k }} title={p.name} />
        ))}
      </div>

      <div className="ct-grid">
        <form className="ct-form" onSubmit={send}>
          <h2 className="ct-title"><span>Contact</span> <span>us</span></h2>
          <p className="ct-lead">{contact.lead}</p>
          {fields.map((f, k) => (
            <label key={f.id} className="ct-field" style={{ '--k': k }}>
              <input name={f.id} type={f.type} autoComplete={f.auto} placeholder=" " required={f.id !== 'phone'}
                value={form[f.id]} onChange={set} />
              <span>{f.label}</span>
            </label>
          ))}
          <label className="ct-field is-area" style={{ '--k': 3 }}>
            <textarea name="message" rows="3" placeholder=" " required value={form.message} onChange={set} />
            <span>Your message</span>
          </label>
          <button className="ct-send" type="submit">Send <i aria-hidden="true">→</i></button>
        </form>

        <aside className="ct-info">
          <span className="ct-mark" aria-hidden="true"><i /></span>
          <h3>Contact information</h3>
          <p className="ct-who"><b>{contact.name}</b>{contact.role}</p>
          <ul className="ct-lines">
            <li style={{ '--k': 0 }}><em>Mobile</em><a href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</a></li>
            <li style={{ '--k': 1 }}><em>Email</em><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li style={{ '--k': 2 }}><em>LinkedIn</em><a href={contact.linkedin} target="_blank" rel="noopener">{contact.linkedin.replace(/^https:\/\/www\./, '').replace(/\/$/, '')}</a></li>
          </ul>
          <h4>Follow</h4>
          <ul className="ct-socials">
            {socials.map((s, k) => (
              <li key={s.id} style={{ '--k': k }}>
                <a className={`s-${s.id}`} href={s.href} target="_blank" rel="noopener" aria-label={s.label} title={s.label}><Icon id={s.id} /></a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
