// A picture that forms from particles. Every few pixels of the photo becomes a fine dot that streams
// in from a short way off and lands on its own spot, in a soft sweep from his head down. Wherever a
// dot lands, the real photo shows through under it — so the picture forms sharp, patch by patch,
// with no blocky stage — and it ends as exactly the photo itself. Returns a cancel function.
export default function assemble(img, canvas, onDone) {
  let raf = 0, dead = false
  const ease = t => 1 - Math.pow(1 - t, 3)

  const start = () => {
    if (dead) return
    const w = img.clientWidth, h = img.clientHeight
    if (!w || !h) { onDone(); return }
    const dpr = Math.min(devicePixelRatio || 1, 2)
    const W = Math.round(w * dpr), H = Math.round(h * dpr)
    // the canvas reaches a little past the photo so dots can stream in from the open page
    const pl = Math.round(w * .3), pr = Math.round(w * .15)
    const CW = Math.round((w + pl + pr) * dpr), CH = H, ox = Math.round(pl * dpr)
    Object.assign(canvas.style, { left: `${img.offsetLeft - pl}px`, top: `${img.offsetTop}px`, width: `${w + pl + pr}px`, height: `${h}px` })
    canvas.width = CW; canvas.height = CH
    const layer = () => { const c = document.createElement('canvas'); c.width = CW; c.height = CH; return c }

    // the photo, at the size it is shown
    const photo = document.createElement('canvas')
    photo.width = W; photo.height = H
    const pctx = photo.getContext('2d', { willReadFrequently: true })
    pctx.drawImage(img, 0, 0, W, H)
    const src = pctx.getImageData(0, 0, W, H).data

    const step = Math.max(5, Math.round(W / 120))
    const ps = []
    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const i = (y * W + x) * 4
        if (src[i + 3] < 50) continue
        const a = Math.PI * (0.75 + Math.random() * 0.5), r = (0.12 + Math.random() * 0.4) * W   // mostly from the left
        const tx = x + ox + (Math.random() * step | 0), ty = y + (Math.random() * step | 0)
        ps.push({
          tx, ty, sx: tx + Math.cos(a) * r, sy: ty + Math.sin(a) * r * 0.6 - 30 * dpr * Math.random(),
          d: (y / H) * 1.05 + (x / W) * 0.25 + Math.random() * 0.35,                            // a sweep, head first
          c: (255 << 24) | (src[i + 2] << 16) | (src[i + 1] << 8) | src[i], landed: false,
        })
      }
    }

    // a soft round mark: where a dot lands, this much of the real photo shows
    const R = Math.round(step * 1.9)
    const sprite = document.createElement('canvas'); sprite.width = sprite.height = R * 2
    const sctx = sprite.getContext('2d'), g = sctx.createRadialGradient(R, R, 0, R, R, R)
    g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(.55, 'rgba(0,0,0,.85)'); g.addColorStop(1, 'rgba(0,0,0,0)')
    sctx.fillStyle = g; sctx.fillRect(0, 0, R * 2, R * 2)

    const mask = layer(), mctx = mask.getContext('2d')
    const shown = layer(), rctx = shown.getContext('2d')
    const fly = layer(), fctx = fly.getContext('2d')
    const frame = fctx.createImageData(CW, CH), buf = new Uint32Array(frame.data.buffer)
    const ctx = canvas.getContext('2d')
    const FLY = 0.9, LAST = 1.65 + FLY, FILL = 0.45
    const dot = Math.max(3, Math.round(step * .8))
    let t0 = 0

    const draw = now => {
      if (dead) return
      if (!t0) t0 = now
      const t = (now - t0) / 1000
      buf.fill(0)
      for (const p of ps) {
        if (p.landed) continue
        const k = (t - p.d) / FLY
        if (k <= 0) continue
        if (k >= 1) { p.landed = true; mctx.drawImage(sprite, p.tx - R, p.ty - R); continue }
        const e = ease(k)
        const x = Math.round(p.sx + (p.tx - p.sx) * e), y = Math.round(p.sy + (p.ty - p.sy) * e)
        if (x < 0 || y < 0 || x + dot > CW || y + dot > CH) continue
        for (let yy = y; yy < y + dot; yy++) buf.fill(p.c, yy * CW + x, yy * CW + x + dot)
      }
      fctx.putImageData(frame, 0, 0)

      // the real photo, wherever dots have landed
      rctx.globalCompositeOperation = 'source-over'
      rctx.clearRect(0, 0, CW, CH)
      rctx.drawImage(photo, ox, 0)
      rctx.globalCompositeOperation = 'destination-in'
      rctx.drawImage(mask, 0, 0)

      ctx.clearRect(0, 0, CW, CH)
      ctx.drawImage(shown, 0, 0)
      if (t > LAST) {                                           // close the last gaps between the marks
        ctx.globalAlpha = Math.min(1, (t - LAST) / FILL)
        ctx.drawImage(photo, ox, 0)
        ctx.globalAlpha = 1
      }
      ctx.drawImage(fly, 0, 0)
      if (t < LAST + FILL) raf = requestAnimationFrame(draw)
      else onDone()
    }
    raf = requestAnimationFrame(draw)
  }

  if (img.complete && img.naturalWidth) requestAnimationFrame(start)
  else img.addEventListener('load', () => requestAnimationFrame(start), { once: true })
  return () => { dead = true; cancelAnimationFrame(raf) }
}
