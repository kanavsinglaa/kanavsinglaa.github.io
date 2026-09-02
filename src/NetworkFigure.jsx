import { useEffect, useRef, useState } from 'react'

// fig. 01: a career drawn as a feed-forward network.
// Input layer: the raw signals Kanav's systems ingest. First hidden layer: the
// models those signals train. Second hidden layer: the practice and tooling that
// make a model shippable. Output layer: what actually shipped.
// Nodes sit in fixed horizontal lanes by domain, so a path through one domain
// runs straight across and every edge below is a real claim about the work.

const DOMAIN_LANE = { voice: 1.02, models: 0.3, product: -0.42, autonomy: -1.04 }
const Y_MID = 0.04 // midpoint of the occupied lane range, keeps the plate balanced
const LANE_STEP = 0.21

const LAYERS = [
  {
    x: -1.62,
    caption: 'signals',
    nodes: [
      ['live call audio', 'voice', '#xp-sadie'],
      ['production call logs', 'voice', '#xp-sadie'],
      ['m&a documents', 'models', '#xp-valsoft'],
      ['satellite & camera imagery', 'models', '#projects'],
      ['hotel demand & rates', 'product', '#xp-ampliphi'],
      ['market & event signals', 'product', '#xp-ampliphi'],
      ['driving scenes', 'autonomy', '#xp-huawei'],
    ],
  },
  {
    x: -0.54,
    caption: 'models',
    nodes: [
      ['streaming stt / tts', 'voice', '#skills'],
      ['turn-taking classifier', 'voice', '#xp-sadie'],
      ['lora fine-tunes', 'models', '#xp-sadie'],
      ['llm extraction & rag', 'models', '#xp-valsoft'],
      ['detection & vision', 'models', '#projects'],
      ['demand forecasting', 'product', '#xp-ampliphi'],
      ['learned planning', 'autonomy', '#xp-huawei'],
    ],
  },
  {
    x: 0.54,
    caption: 'practice',
    nodes: [
      ['latency & ttft profiling', 'voice', '#contributions'],
      ['int8 quantization', 'voice', '#skills'],
      ['gold eval sets', 'models', '#skills'],
      ['dataset curation', 'models', '#skills'],
      ['production a/b tests', 'product', '#skills'],
      ['inference cost modeling', 'product', '#contributions'],
      ['distributed gpu training', 'autonomy', '#xp-huawei'],
      ['closed-loop simulation', 'autonomy', '#xp-huawei'],
    ],
  },
  {
    x: 1.62,
    caption: 'shipped',
    nodes: [
      ['22 ms first sentence', 'voice', '#xp-sadie'],
      ['1,500+ venues live', 'voice', '#xp-sadie'],
      ['−55% llm spend', 'voice', '#xp-sadie'],
      ['94% recall @ incheon', 'models', '#research'],
      ['$500k arr', 'product', '#xp-ampliphi'],
      ['150+ hotels priced', 'product', '#xp-ampliphi'],
      ['self-driving planner', 'autonomy', '#xp-huawei'],
    ],
  },
]

// Every edge is a claim: this signal trained that model, that model demanded
// this practice, this practice produced that result.
const EDGES = [
  // signals → models
  ['live call audio', 'streaming stt / tts'],
  ['live call audio', 'turn-taking classifier'],
  ['production call logs', 'lora fine-tunes'],
  ['production call logs', 'turn-taking classifier'],
  ['m&a documents', 'llm extraction & rag'],
  ['satellite & camera imagery', 'detection & vision'],
  ['hotel demand & rates', 'demand forecasting'],
  ['market & event signals', 'llm extraction & rag'],
  ['market & event signals', 'demand forecasting'],
  ['driving scenes', 'learned planning'],
  ['driving scenes', 'detection & vision'],

  // models → practice
  ['streaming stt / tts', 'latency & ttft profiling'],
  ['streaming stt / tts', 'gold eval sets'],
  ['turn-taking classifier', 'int8 quantization'],
  ['turn-taking classifier', 'production a/b tests'],
  ['lora fine-tunes', 'dataset curation'],
  ['lora fine-tunes', 'gold eval sets'],
  ['llm extraction & rag', 'gold eval sets'],
  ['llm extraction & rag', 'inference cost modeling'],
  ['detection & vision', 'dataset curation'],
  ['detection & vision', 'distributed gpu training'],
  ['demand forecasting', 'production a/b tests'],
  ['demand forecasting', 'gold eval sets'],
  ['learned planning', 'distributed gpu training'],
  ['learned planning', 'closed-loop simulation'],

  // practice → results
  ['latency & ttft profiling', '22 ms first sentence'],
  ['latency & ttft profiling', '1,500+ venues live'],
  ['int8 quantization', '22 ms first sentence'],
  ['int8 quantization', '−55% llm spend'],
  ['inference cost modeling', '−55% llm spend'],
  ['gold eval sets', '1,500+ venues live'],
  ['gold eval sets', '$500k arr'],
  ['gold eval sets', 'self-driving planner'],
  ['dataset curation', '94% recall @ incheon'],
  ['production a/b tests', '$500k arr'],
  ['production a/b tests', '150+ hotels priced'],
  ['distributed gpu training', '94% recall @ incheon'],
  ['distributed gpu training', 'self-driving planner'],
  ['closed-loop simulation', 'self-driving planner'],
]

function buildGraph() {
  const nodes = []
  const byLabel = new Map()

  LAYERS.forEach((layer, li) => {
    // group by lane, then spread each lane's members around its centre line
    const lanes = new Map()
    layer.nodes.forEach(([label, domain]) => {
      if (!lanes.has(domain)) lanes.set(domain, [])
      lanes.get(domain).push(label)
    })
    const slot = new Map()
    lanes.forEach((members, domain) => {
      members.forEach((label, i) => {
        slot.set(label, DOMAIN_LANE[domain] + (i - (members.length - 1) / 2) * LANE_STEP)
      })
    })

    layer.nodes.forEach(([label, domain, href], i) => {
      const node = {
        label,
        domain,
        href,
        layer: li,
        // its own phase in the breath, so the web undulates instead of pulsing
        ph: (li * 1.9 + i * 2.4) % (Math.PI * 2),
        x: layer.x,
        y: slot.get(label),
        // a whisper of depth so rotation reads, never enough to tangle the lanes
        z: ((i % 3) - 1) * 0.19,
      }
      nodes.push(node)
      byLabel.set(label, node)
    })
  })

  const edges = EDGES.map(([a, b]) => [byLabel.get(a), byLabel.get(b)]).filter(
    ([a, b]) => a && b,
  )
  return { nodes, edges }
}

const GRAPH = buildGraph()
// the output column keeps its chips at rest, so the tour visits the rest
const WANDER_POOL = GRAPH.nodes.filter((n) => n.layer < 3)
const PASS_MS = 7000

// the figure is never still. each node drifts on its own slow cycle, and under
// that the whole body inhales and exhales together, dots included: one pulse
// through the whole thing rather than a diagram that happens to rotate.
const BREATH = {
  x: 0.024, // per-node drift, graph units (~3.6px across the plate)
  y: 0.036, // ~5.9px
  sx: 0.62, // 10.1s
  sy: 0.93, // 6.8s
  lung: 0.028, // the lanes spread and gather, ~5px at the outer lanes
  beat: 1.1, // 5.7s, and the dots swell on the same phase
  r: 0.07,
}

// at rest the figure names one of its own parts at a time, so a first-time
// visitor is told what a node is and where it goes without any of them shouting
const WANDER = { fade: 420, hold: 2100, gap: 900 }

export default function NetworkFigure() {
  const canvasRef = useRef(null)
  const looseRef = useRef(null)
  const wrapRef = useRef(null)
  const zoomApi = useRef(null)
  const stateRef = useRef({
    yaw: -0.16,
    yawCenter: -0.16,
    driftT: 0,
    pitch: 0.16,
    autoRotate: true,
    dragging: false,
    lastX: 0,
    lastY: 0,
    pressX: 0,
    pressY: 0,
    idleAt: 0,
    hover: null,
    pointer: null,
    projected: null,
    passStart: -1,
    passDone: false,
    reduced: false,
    zoom: 1, // vertical spread: 1 fits the plate, higher gives the lanes more room
    offsets: new Map(), // node -> {dx, dy} once a viewer pulls it out of place
    pulling: null,
    pulse: 1,
    wanderAt: 0,
    wanderI: 0,
    loose: new Set(), // nodes currently living outside the plate, on the page
    looseOn: false,
    grabCursor: false,
    excursion: null, // a clicked node, out visiting the section it came from
    homing: new Set(), // nodes easing back into their lane on their own
    breath: 1, // amplitude of the idle float, zeroed for reduced motion
    bt: 0,
  })
  const [touched, setTouched] = useState(false)

  const runPass = () => {
    const s = stateRef.current
    s.passStart = s.reduced ? performance.now() - PASS_MS : performance.now()
    s.passDone = false
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const overlay = looseRef.current
    const wrap = wrapRef.current
    const ctx = canvas.getContext('2d')
    const octx = overlay.getContext('2d')
    const s = stateRef.current
    const rootStyle = getComputedStyle(document.documentElement)
    const cvar = (name) => rootStyle.getPropertyValue(name).trim()
    s.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (s.reduced) {
      s.autoRotate = false
      s.breath = 0
    }

    let w = 0
    let h = 0
    let vw = 0
    let vh = 0
    let raf = 0

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      w = rect.width
      const base = w < 560 ? Math.max(420, w * 1.16) : Math.max(430, Math.min(540, w * 0.86))
      h = Math.round(base * s.zoom)
      const d = dpr()
      canvas.width = w * d
      canvas.height = h * d
      canvas.style.height = `${h}px`
      ctx.setTransform(d, 0, 0, d, 0, 0)
    }

    // the loose layer is the whole viewport: a node pulled off the plate has to
    // be able to sit anywhere on the page, over the abstract included
    const resizeOverlay = () => {
      vw = window.innerWidth
      vh = window.innerHeight
      const d = dpr()
      overlay.width = Math.round(vw * d)
      overlay.height = Math.round(vh * d)
      overlay.style.width = `${vw}px`
      overlay.style.height = `${vh}px`
      octx.setTransform(d, 0, 0, d, 0, 0)
    }
    resize()
    resizeOverlay()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    window.addEventListener('resize', resizeOverlay)

    const project = (p) => {
      const cy = Math.cos(s.yaw)
      const sy = Math.sin(s.yaw)
      const cp = Math.cos(s.pitch)
      const sp = Math.sin(s.pitch)
      const xr = p.x * cy - p.z * sy
      let zr = p.x * sy + p.z * cy
      const yr = (p.y - Y_MID) * cp - zr * sp
      zr = p.y * sp + zr * cp
      const f = 6.5
      const scale = f / (f + zr)
      const unitX = w / 3.9
      const unitY = (h - 58) / 2.67
      return {
        x: w / 2 + xr * scale * unitX,
        y: (h - 34) / 2 - yr * scale * unitY,
        s: scale,
        depth: zr,
        ux: unitX,
        uy: unitY,
      }
    }

    // a node's position: its lane, however far it has been pulled from it, and
    // the breath. whatever is under the hand holds still.
    const at = (n) => {
      const off = s.offsets.get(n)
      const b = n === s.pulling ? 0 : s.breath
      if (!off && !b) return n
      const dx = off ? off.dx : 0
      const dy = off ? off.dy : 0
      // the lung scales the lane, never the distance a viewer has pulled it
      const lung = 1 + b * BREATH.lung * Math.sin(s.bt * BREATH.beat)
      return {
        x: n.x + dx + b * BREATH.x * Math.sin(s.bt * BREATH.sx + n.ph),
        y:
          Y_MID +
          (n.y - Y_MID) * lung +
          dy +
          b * BREATH.y * Math.sin(s.bt * BREATH.sy + n.ph * 1.6),
        z: n.z,
      }
    }

    const setZoom = (next) => {
      const z = Math.min(1.7, Math.max(1, Math.round(next * 100) / 100))
      if (z === s.zoom) return
      s.zoom = z
      resize() // the plate grows, so the lanes gain room without leaving the frame
      setTouched(true)
    }
    zoomApi.current = {
      by: (f) => setZoom(s.zoom * f),
      reset: () => {
        s.zoom = 1
        resize()
        if (s.excursion) { unmark(s.excursion.el); s.excursion = null }
        s.homing.clear()
        s.offsets.clear()
        s.yaw = -0.16
        s.yawCenter = -0.16
        s.pitch = 0.16
        s.driftT = 0
        setTouched(false)
      },
    }

    // click a node and it goes and stands on the work it came from: it reaches
    // across the page, waits there while you read, then finds its way back
    const EX = {
      reach: 0.085, // per-frame approach to the target, so it eases in
      graceMs: 520, // how long its block can be out of sight before it lets go
      upRelease: 110, // scrolling back up this far means they are done with it
      decay: 0.983, // the slow walk home, roughly four seconds of it
      kin: 0.055,
      kinShare: 0.24, // neighbours lean after it, a quarter of the way
      kinCap: 0.62, // but never far enough to litter the page
    }

    const neighborsOf = (n) => {
      const list = []
      GRAPH.edges.forEach(([a, b]) => {
        if (a === n) list.push(b)
        else if (b === n) list.push(a)
      })
      return list
    }

    const mark = (el, domain) => {
      el.classList.add('is-pointed')
      el.style.setProperty('--dom', `var(--dot-${domain})`)
    }
    const unmark = (el) => {
      if (!el) return
      el.classList.remove('is-pointed')
      el.style.removeProperty('--dom')
    }

    const retire = (ex) => {
      if (!ex) return
      unmark(ex.el)
      s.homing.add(ex.n)
      ex.kin.forEach((m) => s.homing.add(m))
    }

    const sendTo = (n) => {
      // the node that brought you here is the way back: same gesture, other way
      if (s.excursion && s.excursion.n === n) {
        retire(s.excursion)
        s.excursion = null
        wrap.scrollIntoView({ behavior: s.reduced ? 'auto' : 'smooth', block: 'center' })
        window.history.replaceState(null, '', location.pathname)
        return
      }
      if (!n.href) return
      const el = document.querySelector(n.href)
      if (!el) return
      // the destination arrives before the node does
      if (el.matches('[data-reveal]')) el.classList.add('in')
      el.querySelectorAll('[data-reveal]').forEach((x) => x.classList.add('in'))
      el.scrollIntoView({ behavior: s.reduced ? 'auto' : 'smooth' })
      window.history.replaceState(null, '', n.href)
      if (s.reduced) return // no journey when motion is unwelcome: just arrive
      retire(s.excursion)
      const kin = neighborsOf(n)
      s.homing.delete(n)
      kin.forEach((m) => s.homing.delete(m))
      mark(el, n.domain)
      s.excursion = {
        n,
        el,
        anchor: el.querySelector('.xp-body h3, .sec-title') || el,
        kin,
        phase: 'reach',
        at: performance.now(),
      }
    }

    // run before the frame is projected, so the positions drawn are the new ones
    const drive = (now) => {
      if (!s.projected) return
      const pos = new Map(s.projected.map((o) => [o.n, o.p]))
      const rect = canvas.getBoundingClientRect()

      const ex = s.excursion
      if (ex && !ex.el.isConnected) {
        unmark(ex.el)
        s.homing.add(ex.n)
        ex.kin.forEach((m) => s.homing.add(m))
        s.excursion = null
      }

      const cur = s.excursion
      if (cur && pos.has(cur.n)) {
        const p = pos.get(cur.n)
        const ar = cur.anchor.getBoundingClientRect()
        // stand at the head of the line, then ride the margin for as long as the
        // reader stays in that block: it marks where they are, not just where they landed
        const wx = Math.max(ar.left - 12, 16) - rect.left
        const wy = Math.min(Math.max(ar.top + 13, 58), vh - 44) - rect.top
        const dx = wx - p.x
        const dy = wy - p.y

        const off = s.offsets.get(cur.n) || { dx: 0, dy: 0 }
        off.dx += (dx / (p.s * p.ux)) * EX.reach
        off.dy -= (dy / (p.s * p.uy)) * EX.reach
        s.offsets.set(cur.n, off)

        cur.kin.forEach((m) => {
          if (s.pulling === m) return
          let sx = off.dx * EX.kinShare
          let sy = off.dy * EX.kinShare
          const len = Math.hypot(sx, sy)
          if (len > EX.kinCap) { sx *= EX.kinCap / len; sy *= EX.kinCap / len }
          const mo = s.offsets.get(m) || { dx: 0, dy: 0 }
          mo.dx += (sx - mo.dx) * EX.kin
          mo.dy += (sy - mo.dy) * EX.kin
          s.offsets.set(m, mo)
        })

        if (cur.phase === 'reach' && Math.hypot(dx, dy) < 8) {
          cur.phase = 'parked'
          cur.gone = 0
          cur.up = 0
          cur.lastY = window.scrollY
        }
        if (cur.phase === 'parked') {
          // heading back up the page means they are done reading: the blocks here
          // are tall enough to stay on screen the whole way, so watch the scroll
          // itself rather than waiting for the block to leave
          const y = window.scrollY
          if (y < cur.lastY) cur.up += cur.lastY - y // only movement counts, either way
          else if (y > cur.lastY) cur.up = 0
          cur.lastY = y
          const tr = cur.el.getBoundingClientRect()
          const near = tr.bottom > 48 && tr.top < vh - 48
          if (cur.up > EX.upRelease) {
            retire(cur) // it goes home ahead of them
            s.excursion = null
          } else if (near) cur.gone = 0
          else if (!cur.gone) cur.gone = now
          else if (now - cur.gone > EX.graceMs) {
            retire(cur)
            s.excursion = null
          }
        }
      }

      s.homing.forEach((n) => {
        const off = s.offsets.get(n)
        if (s.pulling === n || !off) { s.homing.delete(n); return }
        off.dx *= EX.decay
        off.dy *= EX.decay
        if (Math.hypot(off.dx, off.dy) < 0.004) {
          s.offsets.delete(n)
          s.homing.delete(n)
        }
      })
    }

    const label = (x, y, text, alpha) => {
      ctx.font = '10px "IBM Plex Mono", monospace'
      const tw = ctx.measureText(text).width
      const cx = Math.min(Math.max(x, tw / 2 + 4), w - tw / 2 - 4)
      ctx.globalAlpha = alpha * 0.9
      ctx.fillStyle = cvar('--paper')
      ctx.fillRect(cx - tw / 2 - 4, y - 10, tw + 8, 14)
      ctx.globalAlpha = alpha
      ctx.fillStyle = cvar('--ink')
      ctx.textAlign = 'center'
      ctx.fillText(text, cx, y)
      ctx.textAlign = 'left'
      ctx.globalAlpha = alpha * 0.55
      ctx.fillRect(cx - tw / 2, y + 2, tw, 1)
      ctx.globalAlpha = 1
    }

    // chips are clamped to whatever frame they live in: the plate, or the viewport.
    // `aside` puts the label in the margin instead of above, so a node standing on
    // a heading marks the line without covering it
    const chip = (c, x, y, text, domain, box, aside, strong, alpha) => {
      c.font = '11px "IBM Plex Mono", monospace'
      const cw = c.measureText(text).width + 10
      // no room in the margin (a section title sits at the page edge): go above,
      // never to the right, where the words it is pointing at are
      const side = aside && x - 14 - cw > box.x0 + 3
      let bx = side ? x - 14 - cw : x - cw / 2
      let by = side ? y - 9 : y - 26
      bx = Math.min(Math.max(bx, box.x0 + 3), box.x1 - cw - 3)
      by = Math.min(Math.max(by, box.y0 + 3), box.y1 - 22)
      const a = alpha === undefined ? 1 : alpha
      c.globalAlpha = a
      c.fillStyle = cvar(`--hl-${domain}`)
      c.fillRect(bx, by, cw, 18)
      c.fillStyle = cvar('--ink')
      c.fillText(text, bx + 5, by + 13)
      // a name you can read here is a name you can click, so it carries the same
      // underline as every link on the page, thickening under the cursor
      c.globalAlpha = a * (strong ? 0.9 : 0.5)
      c.fillRect(bx + 5, by + 15, cw - 10, strong ? 2 : 1)
      c.globalAlpha = 1
    }

    // inside the plate, edges leave and enter their nodes horizontally: that is
    // what makes a layered graph followable. once an endpoint has left the frame
    // that swing becomes a detour across the page, so `taut` slides the control
    // points onto the chord and the tether goes straight there, with just enough
    // sag to read as a thread rather than a laser
    const edgePath = (c, pa, pb, taut) => {
      const dx = pb.x - pa.x
      const dy = pb.y - pa.y
      const t = taut || 0
      if (t < 0.001) {
        const bend = dx * 0.42
        c.beginPath()
        c.moveTo(pa.x, pa.y)
        c.bezierCurveTo(pa.x + bend, pa.y, pb.x - bend, pb.y, pb.x, pb.y)
        c.stroke()
        return
      }
      const len = Math.hypot(dx, dy) || 1
      const sag = Math.min(len * 0.055, 24)
      const nx = (-dy / len) * sag
      const ny = (dx / len) * sag
      const bend = dx * 0.42 * (1 - t)
      c.beginPath()
      c.moveTo(pa.x, pa.y)
      c.bezierCurveTo(
        pa.x + bend + t * (dx / 3 + nx),
        pa.y + t * (dy / 3 + ny),
        pb.x - bend + t * (-dx / 3 + nx),
        pb.y + t * (-dy / 3 + ny),
        pb.x,
        pb.y,
      )
      c.stroke()
    }

    const edgeStyle = (c, a, b, pa, pb, hover, front, lead) => {
      const onPath = hover && (a === hover || b === hover)
      const onLead = lead && (a === lead || b === lead)
      const active = (a.x + b.x) / 2 < front // lane x: the pass follows topology
      if (onPath) {
        c.strokeStyle = cvar(`--dot-${hover.domain}`)
        c.globalAlpha = 1
        c.lineWidth = 1.9
      } else if (onLead) {
        // the thread it trails while it is out pointing at something
        c.strokeStyle = cvar(`--dot-${lead.domain}`)
        c.globalAlpha = 0.82
        c.lineWidth = 1.6
      } else if (active) {
        c.strokeStyle = cvar('--ink')
        c.globalAlpha = 0.7
        c.lineWidth = 1.3
      } else {
        c.strokeStyle = cvar('--muted')
        c.globalAlpha = (hover ? 0.1 : 0.36) * (0.72 + 0.28 * Math.min(pa.s, pb.s))
        c.lineWidth = 1
      }
    }

    const drawNode = (c, n, p, g, focus, active, hover) => {
      const r = (n.layer === 3 ? 6.4 : 5.4) * p.s * s.pulse * (1 + 0.26 * g)

      c.beginPath()
      c.arc(p.x, p.y, r + 2.6, 0, Math.PI * 2)
      c.fillStyle = cvar('--paper')
      c.globalAlpha = focus ? 1 : 0.6
      c.fill()

      c.beginPath()
      c.arc(p.x, p.y, r, 0, Math.PI * 2)
      c.fillStyle = cvar(`--dot-${n.domain}`)
      c.globalAlpha = Math.min(1, (0.62 + 0.3 * g) * (focus ? 1 : 0.3))
      c.fill()
      c.globalAlpha = 1

      // the ring is the "you can take this" cue: strongest under the cursor,
      // faint on whatever the beam is currently touching
      const ring = n === hover ? 1 : active ? 0.7 : g > 0.1 ? g * 0.62 : 0
      if (ring > 0) {
        c.beginPath()
        c.arc(p.x, p.y, r + 3.4, 0, Math.PI * 2)
        c.strokeStyle = cvar('--ink')
        c.lineWidth = 1
        c.globalAlpha = ring * (focus ? 1 : 0.35)
        c.stroke()
        c.globalAlpha = 1
      }
    }

    const draw = (now) => {
      s.bt = now / 1000
      s.pulse = 1 + s.breath * BREATH.r * Math.sin(s.bt * BREATH.beat)
      drive(now)
      ctx.clearRect(0, 0, w, h)

      if (s.autoRotate && !s.dragging && now - s.idleAt > 2600) {
        s.driftT += 0.0022
        s.yaw = s.yawCenter + Math.sin(s.driftT) * 0.12
      }

      const projected = GRAPH.nodes.map((n) => ({ n, p: project(at(n)) }))
      const pmap = new Map(projected.map((o) => [o.n, o.p]))

      // anything past the frame stops belonging to the plate and gets redrawn on
      // the loose layer instead, whole and unclipped. the margin is hysteretic so
      // a node breathing right on the edge cannot flicker between the two
      const wasLoose = s.loose
      const out = (n, p) => {
        const m = wasLoose.has(n) ? 1 : 9
        return p.x < m || p.y < m || p.x > w - m || p.y > h - m
      }
      const looseList = projected.filter(({ n, p }) => out(n, p))
      const loose = new Set(looseList.map((o) => o.n))
      s.loose = loose

      // how far clear of the frame a node has got, 0 to 1 over 140px
      const escape = new Map()
      projected.forEach(({ n, p }) => {
        const d = Math.max(-p.x, p.x - w, -p.y, p.y - h, 0)
        escape.set(n, Math.min(1, d / 140))
      })
      const taut = (a, b) => Math.max(escape.get(a) || 0, escape.get(b) || 0)

      // hover first: it decides how the edges are drawn
      let hover = null
      if (s.pointer) {
        let bestD = 20
        projected.forEach(({ n, p }) => {
          const d = Math.hypot(p.x - s.pointer.x, p.y - s.pointer.y)
          if (d < bestD) { bestD = d; hover = n }
        })
      }
      s.hover = hover
      const neighbors = new Set()
      if (hover) {
        GRAPH.edges.forEach(([a, b]) => {
          if (a === hover) neighbors.add(b)
          if (b === hover) neighbors.add(a)
        })
      }

      // the activation wavefront, in graph-x
      let front = -Infinity
      if (s.passStart >= 0) {
        const t = Math.min((now - s.passStart) / PASS_MS, 1)
        const eased = t * t * (3 - 2 * t)
        front = -1.85 + eased * 3.7
        if (t >= 1) s.passDone = true
      }

      // layer captions along the base
      ctx.font = '10px "IBM Plex Mono", monospace'
      ctx.textAlign = 'center'
      LAYERS.forEach((layer) => {
        const lp = project({ x: layer.x, y: 0, z: 0 })
        const half = ctx.measureText(layer.caption).width / 2
        const cx = Math.min(Math.max(lp.x, half + 6), w - half - 6)
        ctx.fillStyle = cvar('--faint')
        ctx.fillText(layer.caption, cx, h - 6)
        ctx.strokeStyle = cvar('--line')
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(cx - half, h - 19)
        ctx.lineTo(cx + half, h - 19)
        ctx.stroke()
      })
      ctx.textAlign = 'left'

      // edges as flat S-curves. an edge running off the plate is drawn here too:
      // the canvas keeps the half inside the frame, the loose layer picks up the rest
      const lead = s.excursion && s.excursion.n
      GRAPH.edges.forEach(([a, b]) => {
        const pa = pmap.get(a)
        const pb = pmap.get(b)
        edgeStyle(ctx, a, b, pa, pb, hover, front, lead)
        edgePath(ctx, pa, pb, taut(a, b))
        ctx.globalAlpha = 1
      })

      // flashlight: how strongly the cursor lights a point
      const beam = Math.min(180, Math.max(110, Math.min(w, h) * 0.34))
      const lit = (p) => {
        if (!s.pointer) return 0
        const d = Math.hypot(p.x - s.pointer.x, p.y - s.pointer.y)
        if (d > beam) return 0
        const t = 1 - d / beam
        return t * t
      }

      // nodes, far to near, each ringed in paper so edges pass behind them
      projected
        .filter(({ n }) => !loose.has(n))
        .sort((a, b) => b.p.depth - a.p.depth)
        .forEach(({ n, p }) => {
          drawNode(
            ctx,
            n,
            p,
            lit(p),
            !hover || n === hover || neighbors.has(n),
            n.x < front,
            hover,
          )
        })

      // names: the hovered node, whatever the wavefront is passing through, and
      // the results once it lands. chips are de-collided column by column.
      const named = new Set()
      const queue = []
      const enqueue = (n, p, text, alpha) => {
        if (named.has(n) || loose.has(n)) return // loose nodes carry their name with them
        named.add(n)
        queue.push({ n, p, text: text || n.label, alpha })
      }

      if (hover) enqueue(hover, pmap.get(hover))

      // nobody is touching it: the figure names one of its own parts, then
      // another, so no column ever looks anonymous
      const resting =
        !s.reduced && s.passDone && !s.pointer && !s.excursion && !loose.size && !s.dragging
      if (!resting) s.wanderAt = 0
      else {
        const span = WANDER.fade * 2 + WANDER.hold + WANDER.gap
        if (!s.wanderAt || now - s.wanderAt > span) {
          s.wanderAt = now
          s.wanderI = (s.wanderI + 7) % WANDER_POOL.length // a full tour, no repeats
        }
        const t = now - s.wanderAt
        const a =
          t < WANDER.fade
            ? t / WANDER.fade
            : t < WANDER.fade + WANDER.hold
              ? 1
              : Math.max(0, 1 - (t - WANDER.fade - WANDER.hold) / WANDER.fade)
        const n = WANDER_POOL[s.wanderI]
        if (a > 0.02 && pmap.has(n)) enqueue(n, pmap.get(n), null, a * 0.92)
      }
      if (s.passStart >= 0 && !s.passDone) {
        projected.forEach(({ n, p }) => {
          const since = front - n.x
          if (since > 0 && since < 0.5) enqueue(n, p)
        })
      }
      if (s.passDone && !hover) {
        projected.filter(({ n }) => n.layer === 3).forEach(({ n, p }) => enqueue(n, p))
      }

      const columns = new Map()
      queue.forEach((q) => {
        if (!columns.has(q.n.layer)) columns.set(q.n.layer, [])
        columns.get(q.n.layer).push(q)
      })
      columns.forEach((list) => {
        list.sort((a, b) => a.p.y - b.p.y)
        let lastY = -Infinity
        list.forEach((q) => {
          q.y = Math.max(q.p.y, lastY + 22)
          lastY = q.y
        })
      })
      const plateBox = { x0: 0, y0: 0, x1: w, y1: h }
      queue.forEach((q) =>
        chip(ctx, q.p.x, q.y, q.text, q.n.domain, plateBox, false, q.n === hover, q.alpha),
      )

      projected.forEach(({ n, p }) => {
        if (named.has(n) || loose.has(n)) return
        const alpha = neighbors.has(n) ? 1 : Math.min(1, lit(p) * 1.7)
        if (alpha < 0.06) return
        const r = (n.layer === 3 ? 6.4 : 5.4) * p.s
        label(p.x, p.y + r + 14, n.label, alpha)
      })

      // the loose layer: whatever has been pulled clear of the plate goes on
      // living out on the page, still wired to everything it came from
      if (looseList.length || s.looseOn) {
        octx.clearRect(0, 0, vw, vh)
        if (s.looseOn !== (looseList.length > 0)) {
          s.looseOn = looseList.length > 0
          overlay.style.visibility = s.looseOn ? 'visible' : 'hidden'
        }
      }
      if (looseList.length) {
        const rect = canvas.getBoundingClientRect()
        const box = { x0: -rect.left, y0: -rect.top, x1: vw - rect.left, y1: vh - rect.top }

        octx.save()
        octx.translate(rect.left, rect.top) // page space, still measured off the plate
        octx.beginPath()
        octx.rect(box.x0, box.y0, vw, vh)
        octx.rect(0, 0, w, h)
        octx.clip('evenodd') // the plate already drew its own half of these edges
        GRAPH.edges.forEach(([a, b]) => {
          if (!loose.has(a) && !loose.has(b)) return
          const pa = pmap.get(a)
          const pb = pmap.get(b)
          edgeStyle(octx, a, b, pa, pb, hover, front, lead)
          // out here the leash crosses body text, so it reads as a thread laid
          // over the page: a little firmer than in the plate, and never a band
          // of paper wiped through the words
          octx.globalAlpha = Math.max(octx.globalAlpha, 0.62)
          edgePath(octx, pa, pb, taut(a, b))
          octx.globalAlpha = 1
        })
        octx.restore()

        octx.save()
        octx.translate(rect.left, rect.top)
        looseList
          .slice()
          .sort((a, b) => b.p.depth - a.p.depth)
          .forEach(({ n, p }) => {
            // the one out pointing at something breathes, so it reads as alive
            const alive = n === lead ? 0.45 + 0.45 * Math.sin(now / 620) : 0
            drawNode(octx, n, p, Math.max(lit(p), alive), true, n.x < front, hover)
            const back = n === lead && n === hover
            chip(
              octx,
              p.x,
              p.y,
              back ? '↑ back to the network' : n.label,
              n.domain,
              box,
              n === lead,
              n === hover,
            )
          })
        octx.restore()
      }

      canvas.style.cursor = s.pulling || s.dragging ? 'grabbing' : hover ? 'pointer' : 'grab'
      s.projected = projected
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const pos = (e) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const nodeAt = (p) => {
      if (!s.projected) return null
      let best = null
      let bestD = 20
      s.projected.forEach(({ n, p: q }) => {
        const d = Math.hypot(q.x - p.x, q.y - p.y)
        if (d < bestD) { bestD = d; best = { n, p: q } }
      })
      return best
    }
    const begin = (p, node, pointerId) => {
      s.dragging = true
      s.lastX = p.x
      s.lastY = p.y
      s.pressX = p.x
      s.pressY = p.y
      s.pointer = p
      s.pulling = node
      if (node) document.body.classList.add('is-pulling')
      try {
        canvas.setPointerCapture(pointerId)
      } catch (err) {
        /* no capture: the window listeners below carry the drag */
      }
    }
    const down = (e) => {
      const p = pos(e)
      const grabbed = nodeAt(p)
      begin(p, grabbed ? grabbed.n : null, e.pointerId)
    }
    const move = (e) => {
      const p = pos(e)
      s.pointer = p
      if (s.dragging) {
        const dx = p.x - s.lastX
        const dy = p.y - s.lastY
        if (s.pulling) {
          // drag a node out of its lane; its edges follow
          const q = s.projected && s.projected.find((o) => o.n === s.pulling)
          const sc = q ? q.p.s : 1
          const ux = (q ? q.p.ux : w / 3.9) * sc
          const uy = (q ? q.p.uy : (h - 58) / 2.67) * sc
          const off = s.offsets.get(s.pulling) || { dx: 0, dy: 0 }
          off.dx += dx / ux
          off.dy -= dy / uy
          s.offsets.set(s.pulling, off)
          setTouched(true)
          // dragging it off an errand hands it over: a hand beats any script,
          // but a press on its own still counts as a click
          const ex = s.excursion
          if (ex && ex.n === s.pulling && Math.hypot(p.x - s.pressX, p.y - s.pressY) > 6) {
            unmark(ex.el)
            ex.kin.forEach((m) => s.homing.add(m))
            s.excursion = null
          }
        } else {
          s.yaw += dx * 0.007
          s.pitch = Math.min(0.6, Math.max(-0.15, s.pitch + dy * 0.004))
        }
        s.lastX = p.x
        s.lastY = p.y
        s.idleAt = performance.now()
      }
    }
    const up = (e) => {
      s.dragging = false
      s.pulling = null
      document.body.classList.remove('is-pulling')
      s.idleAt = performance.now()
      s.yawCenter = s.yaw
      s.driftT = 0
      const p = pos(e)
      if (Math.hypot(p.x - s.pressX, p.y - s.pressY) <= 6 && s.projected) {
        let best = null
        let bestD = 20
        s.projected.forEach(({ n, p: q }) => {
          const d = Math.hypot(q.x - p.x, q.y - p.y)
          if (d < bestD) { bestD = d; best = n }
        })
        if (best) sendTo(best)
      }
    }
    const leave = () => { if (!s.dragging) s.pointer = null }

    // a node out on the page is still a node: it can be caught again, dragged
    // further, dropped back on the plate, or clicked to jump
    const loosePos = (e) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const looseAt = (p) => {
      if (!s.projected || !s.loose.size) return null
      let best = null
      let bestD = 22
      s.projected.forEach(({ n, p: q }) => {
        if (!s.loose.has(n)) return
        const d = Math.hypot(q.x - p.x, q.y - p.y)
        if (d < bestD) { bestD = d; best = n }
      })
      return best
    }
    const setGrabCursor = (on) => {
      if (on === s.grabCursor) return
      s.grabCursor = on
      document.documentElement.style.cursor = on ? 'pointer' : ''
    }
    const winMove = (e) => {
      if (e.target === canvas) return // captured or hovering: the canvas handler has it
      if (s.dragging) { move(e); return }
      if (!s.loose.size) { setGrabCursor(false); return }
      const p = loosePos(e)
      const hit = looseAt(p)
      s.pointer = hit ? p : null
      setGrabCursor(!!hit)
    }
    // a loose node may be lying on top of a link: catching it must not follow it
    const swallow = (e) => { e.preventDefault(); e.stopPropagation() }
    const winDown = (e) => {
      if (e.target === canvas || !s.loose.size) return
      const p = loosePos(e)
      const hit = looseAt(p)
      if (!hit) return
      e.preventDefault()
      window.addEventListener('click', swallow, { capture: true, once: true })
      begin(p, hit, e.pointerId)
    }
    // on a touch screen the page pans unless we say otherwise, so a finger
    // landing on a loose node has to claim the gesture before it becomes a scroll
    const touchGuard = (e) => {
      if (!s.loose.size || e.target === canvas) return
      const t = e.touches[0]
      if (!t) return
      const r = canvas.getBoundingClientRect()
      if (looseAt({ x: t.clientX - r.left, y: t.clientY - r.top })) e.preventDefault()
    }
    const winUp = (e) => {
      if (s.dragging && e.target !== canvas) up(e)
      setGrabCursor(false)
      // the click has been dispatched by now, whether or not it was swallowed
      setTimeout(() => window.removeEventListener('click', swallow, { capture: true }), 0)
    }

    const wheel = (e) => {
      if (!(e.ctrlKey || e.metaKey)) return // plain scroll still scrolls the page
      e.preventDefault()
      setZoom(s.zoom * Math.exp(-e.deltaY * 0.0022))
    }

    canvas.addEventListener('wheel', wheel, { passive: false })
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up) // a cancelled drag must still let go
    canvas.addEventListener('pointerleave', leave)
    const key = (e) => {
      if (e.key === 'Escape' && s.excursion) {
        retire(s.excursion)
        s.excursion = null
      }
    }
    window.addEventListener('keydown', key)
    window.addEventListener('touchstart', touchGuard, { passive: false })
    window.addEventListener('pointerdown', winDown)
    window.addEventListener('pointermove', winMove)
    window.addEventListener('pointerup', winUp)
    window.addEventListener('pointercancel', winUp)

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && s.passStart < 0) {
          setTimeout(runPass, 900)
          io.disconnect()
        }
      },
      { threshold: 0.45 },
    )
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('wheel', wheel)
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
      canvas.removeEventListener('pointerleave', leave)
      window.removeEventListener('resize', resizeOverlay)
      window.removeEventListener('keydown', key)
      window.removeEventListener('touchstart', touchGuard)
      window.removeEventListener('pointerdown', winDown)
      window.removeEventListener('pointermove', winMove)
      window.removeEventListener('pointerup', winUp)
      window.removeEventListener('pointercancel', winUp)
      window.removeEventListener('click', swallow, { capture: true })
      document.documentElement.style.cursor = ''
      document.body.classList.remove('is-pulling')
      if (s.excursion) { unmark(s.excursion.el); s.excursion = null }
    }
  }, [])

  return (
    <figure className="netfig" ref={wrapRef}>
      <canvas
        ref={canvasRef}
        className="netfig-plate"
        aria-label="interactive network of the signals, models, practice and results in Kanav's work"
      />
      <canvas ref={looseRef} className="netfig-loose" aria-hidden="true" />
      <figcaption>
        <span className="netfig-cap">
          my career as a forward pass.{' '}
          <span className="hl hl-voice">click any node to go where it came from</span>. drag one
          loose to keep it.
        </span>
        <span className="netfig-controls">
          <button type="button" className="netfig-btn" onClick={runPass}>
            ▷ run forward pass
          </button>
          <span className="netfig-zoom">
            <button
              type="button"
              className="netfig-step"
              onClick={() => zoomApi.current && zoomApi.current.by(1 / 1.22)}
              aria-label="contract the figure"
            >
              −
            </button>
            <span className="netfig-step-label">expand</span>
            <button
              type="button"
              className="netfig-step"
              onClick={() => zoomApi.current && zoomApi.current.by(1.22)}
              aria-label="expand the figure"
            >
              +
            </button>
          </span>
          {touched && (
            <button
              type="button"
              className="netfig-btn netfig-reset"
              onClick={() => zoomApi.current && zoomApi.current.reset()}
            >
              ⟲ reset layout
            </button>
          )}
        </span>
      </figcaption>
    </figure>
  )
}
