// A calm page change (desktop): a cover in the page colour fades in, the page jumps beneath it,
// then the cover lifts while the new page slides gently into place — down from above when going
// back, up from below when going on. Nothing is ever seen scrolling past the nav.
// Returns false when it can't start (already on that page, or a change is still running).
let busy = false

export default function pageTo(el, dir = 1) {
  if (busy || !el) return false
  const y = Math.round(el.getBoundingClientRect().top + scrollY)
  if (Math.abs(y - scrollY) < 4) return false
  busy = true

  let veil = document.querySelector('.page-veil')
  if (!veil) {
    veil = document.createElement('div')
    veil.className = 'page-veil'
    veil.setAttribute('aria-hidden', 'true')
    document.body.append(veil)
  }
  veil.classList.add('on')

  setTimeout(() => {
    scrollTo({ top: y, behavior: 'instant' })
    el.style.setProperty('--page-from', `${Math.sign(dir) * 26}px`)
    el.classList.add('page-pre')
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.classList.replace('page-pre', 'page-in')
      veil.classList.remove('on')
      setTimeout(() => { busy = false }, 300)                      // ready for the next page once the cover is lifting
      setTimeout(() => el.classList.remove('page-in'), 800)
    }))
  }, 340)
  return true
}
