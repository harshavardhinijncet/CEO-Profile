// Prints the two profiles to PDF with headless Edge (or Chrome):
//   pdf/profile.print.html      → public/Babji-Neelam-Profile.pdf       (image brochure, portrait A4)
//   pdf/profile-text.print.html → public/Babji-Neelam-Profile-Text.pdf  (text profile, landscape A4)
// Run the dev server first (npm run dev), then: python pdf/prep.py && node pdf/build.mjs [--shots <dir>] [--only image|text]
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

const browsers = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
]
const exe = browsers.find(existsSync)
const base = process.env.PDF_URL || 'http://localhost:5173/pdf/'
const arg = k => (process.argv.includes(k) ? process.argv[process.argv.indexOf(k) + 1] : null)
const shots = arg('--shots'), only = arg('--only')
const jobs = [
  { key: 'image', page: 'profile.print.html', out: 'Babji-Neelam-Profile.pdf' },
  { key: 'text', page: 'profile-text.print.html', out: 'Babji-Neelam-Profile-Text.pdf' },
].filter(j => !only || j.key === only)
const port = 9500 + Math.floor(Math.random() * 300)

const proc = spawn(exe, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${process.env.TEMP || '/tmp'}/pdf-${port}`, 'about:blank'], { stdio: 'ignore' })
const sleep = ms => new Promise(r => setTimeout(r, ms))
let ws_url
for (let i = 0; i < 60 && !ws_url; i++) {
  try { ws_url = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(t => t.type === 'page')?.webSocketDebuggerUrl } catch {}
  if (!ws_url) await sleep(200)
}
const ws = new WebSocket(ws_url)
await new Promise(r => ws.addEventListener('open', r, { once: true }))
let id = 0
const pending = new Map()
ws.addEventListener('message', e => { const m = JSON.parse(e.data); pending.get(m.id)?.(m.result); pending.delete(m.id) })
const send = (method, params = {}) => new Promise(r => { const n = ++id; pending.set(n, r); ws.send(JSON.stringify({ id: n, method, params })) })
const evaluate = async expression => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value

for (const job of jobs) {
  await send('Emulation.clearDeviceMetricsOverride')
  await send('Page.navigate', { url: base + job.page })
  await sleep(1500)
  // wait for every font and image before printing
  await evaluate(`Promise.all([document.fonts.ready, ...[...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r }))]).then(() => 1)`)
  await sleep(800)

  // any page whose content runs past its bottom edge is reported, so nothing is ever silently cut off
  // (only the page's flowing content counts: absolutely placed pieces such as the running head and foot, and the
  //  text profile's full-height portrait side, are skipped)
  const over = await evaluate(`[...document.querySelectorAll('.page:not(.cover)')].map(p => {
    const inFlow = e => { for (let x = e; x && x !== p; x = x.parentElement) if (getComputedStyle(x).position === 'absolute') return false; return true }
    const limit = p.getBoundingClientRect().bottom - 18 * 96 / 25.4      // stop 18 mm above the page edge
    const worst = Math.max(0, ...[...p.querySelectorAll(':not(.side, .side *, .main)')].filter(inFlow).map(e => e.getBoundingClientRect().bottom))
    return worst > limit ? [...document.querySelectorAll('.page')].indexOf(p) + 1 : 0
  }).filter(Boolean)`)
  if (over.length) console.warn(`${job.key}: content reaches the footer on page(s) ${over.join(', ')}`)

  const pdf = await send('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 })
  writeFileSync(new URL(`../public/${job.out}`, import.meta.url), Buffer.from(pdf.data, 'base64'))
  console.log(`wrote public/${job.out}`)

  // optional: one image per page, for checking the layout
  if (shots) {
    mkdirSync(shots, { recursive: true })
    const [w, h, n] = await evaluate(`(() => { const p = document.querySelector('.page'); return [p.offsetWidth, p.offsetHeight, document.querySelectorAll('.page').length] })()`)
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1.5, mobile: false })
    await evaluate(`document.querySelectorAll('.page').forEach(p => p.style.marginBottom = '0'); document.head.insertAdjacentHTML('beforeend', '<style>::-webkit-scrollbar{display:none}</style>'); 1`)
    for (let k = 0; k < n; k++) {
      await evaluate(`window.scrollTo(0, document.querySelectorAll('.page')[${k}].offsetTop); 1`)
      await sleep(200)
      const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 75 })
      writeFileSync(`${shots}/${job.key}-${k + 1}.jpg`, Buffer.from(s.data, 'base64'))
    }
  }
}
proc.kill()
process.exit(0)
