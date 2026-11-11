import { useEffect } from 'react'
import { createPortal } from 'react-dom'

// the big screen: a film plays with sound and controls, photos step left / right; Esc or a click outside closes
export default function MediaViewer({ view, onClose, onStep }) {
  const { items, i, caption } = view
  const it = items[i]
  const many = items.length > 1

  // while open, keys and the wheel belong to the viewer, not to the page behind it
  useEffect(() => {
    const onKey = e => {
      const k = e.key
      if (!['Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '].includes(k)) return
      if (k === ' ' && it.type === 'video') return            // space still pauses the film
      e.preventDefault()
      e.stopImmediatePropagation()
      if (k === 'Escape') onClose()
      if (k === 'ArrowRight' && many) onStep(1)
      if (k === 'ArrowLeft' && many) onStep(-1)
    }
    const block = e => { e.preventDefault(); e.stopImmediatePropagation() }
    addEventListener('keydown', onKey, true)
    addEventListener('wheel', block, { capture: true, passive: false })
    return () => { removeEventListener('keydown', onKey, true); removeEventListener('wheel', block, true) }
  }, [onClose, onStep, many, it.type])

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={caption} onClick={onClose}>
      <figure className="lb-stage" onClick={e => e.stopPropagation()}>
        {it.type === 'video'
          ? <video key={it.src} className="lb-video" src={it.src} poster={it.poster} controls autoPlay playsInline />
          : <img key={it.src} src={it.src} alt={`${caption}, photo ${i + 1}`} />}
        <figcaption>{caption}</figcaption>
      </figure>
      {many && <>
        <button className="lb-btn lb-prev" onClick={e => { e.stopPropagation(); onStep(-1) }} aria-label="Previous">←</button>
        <button className="lb-btn lb-next" onClick={e => { e.stopPropagation(); onStep(1) }} aria-label="Next">→</button>
        {items.length > 15
          ? <span className="lb-count"><b>{i + 1}</b> / {items.length}</span>
          : <div className="lb-dots" onClick={e => e.stopPropagation()}>
              {items.map((m, k) => <i key={m.src} className={k === i ? 'on' : ''} />)}
            </div>}
      </>}
      <button className="lb-close" onClick={onClose} aria-label="Close">×</button>
    </div>,
    document.body,
  )
}
