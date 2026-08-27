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
const PASS_MS = 7000

export default function NetworkFigure() {
  const canvasRef = useRef(null)
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
  })
  const [touched, setTouched] = useState(false)

  const runPass = () => {
    const s = stateRef.current
    s.passStart = s.reduced ? performance.now() - PASS_MS : performance.now()
    s.passDone = false
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const ctx = canvas.getContext('2d')
    const s = stateRef.current
    const rootStyle = getComputedStyle(document.documentElement)
    const cvar = (name) => rootStyle.getPropertyValue(name).trim()
    s.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (s.reduced) s.autoRotate = false

    let w = 0
    let h = 0
    let raf = 0

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      w = rect.width
      const base = w < 560 ? Math.max(420, w * 1.16) : Math.max(430, Math.min(540, w * 0.86))
      h = Math.round(base * s.zoom)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

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

    // a node's position plus however far it has been pulled from its lane
    const at = (n) => {
      const off = s.offsets.get(n)
      return off ? { x: n.x + off.dx, y: n.y + off.dy, z: n.z } : n
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
        s.offsets.clear()
        s.yaw = -0.16
        s.yawCenter = -0.16
        s.pitch = 0.16
        s.driftT = 0
        setTouched(false)
      },
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
      ctx.globalAlpha = 1
    }

    const chip = (x, y, text, domain) => {
      ctx.font = '11px "IBM Plex Mono", monospace'
      const tw = ctx.measureText(text).width
      const pad = 5
      const bx = Math.min(Math.max(x - tw / 2 - pad, 3), w - tw - pad * 2 - 3)
      const by = Math.min(Math.max(y - 26, 3), h - 22)
      ctx.fillStyle = cvar(`--hl-${domain}`)
      ctx.fillRect(bx, by, tw + pad * 2, 18)
      ctx.fillStyle = cvar('--ink')
      ctx.fillText(text, bx + pad, by + 13)
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h)

      if (s.autoRotate && !s.dragging && now - s.idleAt > 2600) {
        s.driftT += 0.0022
        s.yaw = s.yawCenter + Math.sin(s.driftT) * 0.12
      }

      const projected = GRAPH.nodes.map((n) => ({ n, p: project(at(n)) }))
      const pmap = new Map(projected.map((o) => [o.n, o.p]))

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

      // edges as flat S-curves: they leave and enter their nodes horizontally,
      // which is what makes a layered graph followable
      GRAPH.edges.forEach(([a, b]) => {
        const pa = pmap.get(a)
        const pb = pmap.get(b)
        const onPath = hover && (a === hover || b === hover)
        const active = (a.x + b.x) / 2 < front // lane x: the pass follows topology
        const bend = (pb.x - pa.x) * 0.42

        if (onPath) {
          ctx.strokeStyle = cvar(`--dot-${hover.domain}`)
          ctx.globalAlpha = 1
          ctx.lineWidth = 1.9
        } else if (active) {
          ctx.strokeStyle = cvar('--ink')
          ctx.globalAlpha = 0.7
          ctx.lineWidth = 1.3
        } else {
          ctx.strokeStyle = cvar('--muted')
          ctx.globalAlpha = (hover ? 0.1 : 0.36) * (0.72 + 0.28 * Math.min(pa.s, pb.s))
          ctx.lineWidth = 1
        }
        ctx.beginPath()
        ctx.moveTo(pa.x, pa.y)
        ctx.bezierCurveTo(pa.x + bend, pa.y, pb.x - bend, pb.y, pb.x, pb.y)
        ctx.stroke()
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
        .slice()
        .sort((a, b) => b.p.depth - a.p.depth)
        .forEach(({ n, p }) => {
          const g = lit(p)
          const focus = !hover || n === hover || neighbors.has(n)
          const active = n.x < front
          const r = (n.layer === 3 ? 6.4 : 5.4) * p.s * (1 + 0.26 * g)

          ctx.beginPath()
          ctx.arc(p.x, p.y, r + 2.6, 0, Math.PI * 2)
          ctx.fillStyle = cvar('--paper')
          ctx.globalAlpha = focus ? 1 : 0.6
          ctx.fill()

          ctx.beginPath()
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
          ctx.fillStyle = cvar(`--dot-${n.domain}`)
          ctx.globalAlpha = Math.min(1, (0.62 + 0.3 * g) * (focus ? 1 : 0.3))
          ctx.fill()
          ctx.globalAlpha = 1

          if (active || n === hover) {
            ctx.beginPath()
            ctx.arc(p.x, p.y, r + 3.4, 0, Math.PI * 2)
            ctx.strokeStyle = cvar('--ink')
            ctx.lineWidth = 1
            ctx.globalAlpha = n === hover ? 1 : 0.7
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        })

      // names: the hovered node, whatever the wavefront is passing through, and
      // the results once it lands. chips are de-collided column by column.
      const named = new Set()
      const queue = []
      const enqueue = (n, p) => { if (!named.has(n)) { named.add(n); queue.push({ n, p }) } }

      if (hover) enqueue(hover, pmap.get(hover))
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
      queue.forEach((q) => chip(q.p.x, q.y, q.n.label, q.n.domain))

      projected.forEach(({ n, p }) => {
        if (named.has(n)) return
        const alpha = neighbors.has(n) ? 1 : Math.min(1, lit(p) * 1.7)
        if (alpha < 0.06) return
        const r = (n.layer === 3 ? 6.4 : 5.4) * p.s
        label(p.x, p.y + r + 14, n.label, alpha)
      })

      canvas.style.cursor = s.pulling || s.dragging ? 'grabbing' : 'grab'
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
    const down = (e) => {
      s.dragging = true
      const p = pos(e)
      s.lastX = p.x
      s.lastY = p.y
      s.pressX = p.x
      s.pressY = p.y
      s.pointer = p
      const grabbed = nodeAt(p)
      s.pulling = grabbed ? grabbed.n : null
      canvas.setPointerCapture(e.pointerId)
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
        if (best && best.href) {
          const el = document.querySelector(best.href)
          if (el) {
            el.scrollIntoView({ behavior: s.reduced ? 'auto' : 'smooth' })
            window.history.replaceState(null, '', best.href)
          }
        }
      }
    }
    const leave = () => { s.pointer = null }

    const wheel = (e) => {
      if (!(e.ctrlKey || e.metaKey)) return // plain scroll still scrolls the page
      e.preventDefault()
      setZoom(s.zoom * Math.exp(-e.deltaY * 0.0022))
    }

    canvas.addEventListener('wheel', wheel, { passive: false })
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointerleave', leave)

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
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <figure className="netfig" ref={wrapRef}>
      <canvas
        ref={canvasRef}
        aria-label="interactive network of the signals, models, practice and results in Kanav's work"
      />
      <figcaption>
        <span className="netfig-cap">
          my career as a forward pass. hover to trace a path, drag a node loose, click to jump.
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
