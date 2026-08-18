import { useEffect, useRef, useState } from 'react'

// fig. 01: career rendered as a neural network.
// Four layers, read left to right: the signals Kanav works from, the models he
// builds with, the practice that makes them trustworthy, and what shipped.
// Every edge is a real path through his work, not decoration.

// deterministic pseudo-random so the layout is stable across loads
function rand(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const LAYERS = [
  {
    x: -1.75,
    caption: 'signals in',
    nodes: [
      ['live call audio', 'voice', '#xp-sadie'],
      ['production call logs', 'voice', '#xp-sadie'],
      ['m&a documents', 'models', '#xp-valsoft'],
      ['aerial & camera imagery', 'models', '#projects'],
      ['hotel demand & rates', 'product', '#xp-ampliphi'],
      ['driving scenes', 'autonomy', '#xp-huawei'],
    ],
  },
  {
    x: -0.58,
    caption: 'models',
    nodes: [
      ['streaming stt / tts', 'voice', '#skills'],
      ['int8 onnx classifier', 'voice', '#xp-sadie'],
      ['lora fine-tunes', 'models', '#xp-sadie'],
      ['llm extraction & rag', 'models', '#xp-valsoft'],
      ['detection & vision', 'models', '#projects'],
      ['demand forecasting', 'product', '#xp-ampliphi'],
      ['learned planning', 'autonomy', '#xp-huawei'],
    ],
  },
  {
    x: 0.58,
    caption: 'practice',
    nodes: [
      ['latency & ttft profiling', 'voice', '#contributions'],
      ['gold eval sets', 'models', '#skills'],
      ['dataset curation', 'models', '#skills'],
      ['inference cost modeling', 'product', '#contributions'],
      ['production a/b tests', 'product', '#skills'],
      ['distributed gpu training', 'autonomy', '#xp-huawei'],
    ],
  },
  {
    x: 1.75,
    caption: 'results out',
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

// Each pair is a claim: this input fed that model, this model demanded that
// practice, this practice produced that result.
const EDGES = [
  // signals → models
  ['live call audio', 'streaming stt / tts'],
  ['live call audio', 'int8 onnx classifier'],
  ['production call logs', 'lora fine-tunes'],
  ['production call logs', 'int8 onnx classifier'],
  ['hotel demand & rates', 'demand forecasting'],
  ['hotel demand & rates', 'llm extraction & rag'],
  ['m&a documents', 'llm extraction & rag'],
  ['driving scenes', 'learned planning'],
  ['driving scenes', 'detection & vision'],
  ['aerial & camera imagery', 'detection & vision'],

  // models → practice
  ['streaming stt / tts', 'latency & ttft profiling'],
  ['streaming stt / tts', 'gold eval sets'],
  ['int8 onnx classifier', 'latency & ttft profiling'],
  ['int8 onnx classifier', 'inference cost modeling'],
  ['lora fine-tunes', 'dataset curation'],
  ['lora fine-tunes', 'gold eval sets'],
  ['llm extraction & rag', 'gold eval sets'],
  ['llm extraction & rag', 'inference cost modeling'],
  ['demand forecasting', 'production a/b tests'],
  ['demand forecasting', 'gold eval sets'],
  ['learned planning', 'distributed gpu training'],
  ['learned planning', 'gold eval sets'],
  ['detection & vision', 'distributed gpu training'],
  ['detection & vision', 'dataset curation'],

  // practice → results
  ['latency & ttft profiling', '22 ms first sentence'],
  ['latency & ttft profiling', '1,500+ venues live'],
  ['inference cost modeling', '−55% llm spend'],
  ['dataset curation', '−55% llm spend'],
  ['dataset curation', '94% recall @ incheon'],
  ['gold eval sets', '1,500+ venues live'],
  ['gold eval sets', '$500k arr'],
  ['gold eval sets', 'self-driving planner'],
  ['production a/b tests', '$500k arr'],
  ['production a/b tests', '150+ hotels priced'],
  ['distributed gpu training', 'self-driving planner'],
  ['distributed gpu training', '94% recall @ incheon'],
]

function buildGraph() {
  const nodes = []
  const byLabel = new Map()
  LAYERS.forEach((layer, li) => {
    const n = layer.nodes.length
    layer.nodes.forEach(([label, domain, href], i) => {
      const fy = n === 1 ? 0.5 : i / (n - 1)
      const node = {
        label,
        domain,
        href,
        layer: li,
        x: layer.x + (rand(li * 10 + i) - 0.5) * 0.12,
        y: (fy - 0.5) * 2.05 + (rand(li * 31 + i * 7) - 0.5) * 0.08,
        z: (rand(li * 53 + i * 13) - 0.5) * 0.8,
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
const PASS_MS = 5200

export default function NetworkFigure({ children }) {
  const canvasRef = useRef(null)
  const overlayRef = useRef(null)
  const stageRef = useRef(null)
  const wrapRef = useRef(null)
  const stateRef = useRef({
    yaw: -0.32,
    yawCenter: -0.32,
    driftT: 0,
    pitch: 0.28,
    autoRotate: true,
    dragging: false,
    lastX: 0,
    lastY: 0,
    idleAt: 0,
    hover: null,
    pointer: null,
    passStart: -1,
    passDone: false,
    reduced: false,
  })
  const [ms, setMs] = useState(null)

  const runPass = () => {
    const s = stateRef.current
    if (s.reduced) {
      s.passStart = performance.now() - PASS_MS // jump to finished state
    } else {
      s.passStart = performance.now()
    }
    s.passDone = false
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const overlay = overlayRef.current
    const stage = stageRef.current
    const ctx = canvas.getContext('2d')
    // the field sits behind the abstract; the overlay paints labels on top of it
    const octx = overlay.getContext('2d')
    const s = stateRef.current
    // live computed style: reads reflect the active theme every frame
    const rootStyle = getComputedStyle(document.documentElement)
    const cvar = (name) => rootStyle.getPropertyValue(name).trim()
    s.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (s.reduced) s.autoRotate = false

    let w = 0
    let h = 0
    let raf = 0

    const resize = () => {
      const rect = stage.getBoundingClientRect()
      w = rect.width
      h = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      overlay.width = w * dpr
      overlay.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      octx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(stage)

    const project = (p) => {
      const cy = Math.cos(s.yaw)
      const sy = Math.sin(s.yaw)
      const cp = Math.cos(s.pitch)
      const sp = Math.sin(s.pitch)
      const xr = p.x * cy - p.z * sy
      let zr = p.x * sy + p.z * cy
      const yr = p.y * cp - zr * sp
      zr = p.y * sp + zr * cp
      const f = 4.2
      const scale = f / (f + zr)
      const unitX = w / (w < 620 ? 4.4 : 5)
      const unitY = h / 2.85
      return {
        x: w * (w < 920 ? 0.5 : 0.54) + xr * scale * unitX,
        y: h / 2 - yr * scale * unitY,
        s: scale,
        depth: zr,
      }
    }

    const chip = (x, y, text, domain) => {
      octx.font = '11px "IBM Plex Mono", monospace'
      const tw = octx.measureText(text).width
      const pad = 5
      const bx = Math.min(Math.max(x + 10, 4), w - tw - pad * 2 - 4)
      const by = Math.min(Math.max(y - 26, 4), h - 22)
      octx.fillStyle = cvar(`--hl-${domain}`)
      octx.fillRect(bx, by, tw + pad * 2, 18)
      octx.fillStyle = cvar('--ink')
      octx.fillText(text, bx + pad, by + 13)
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h)
      octx.clearRect(0, 0, w, h)

      // idle motion sways around the last framing instead of spinning past it,
      // so the layers always read left to right
      if (s.autoRotate && !s.dragging && now - s.idleAt > 2600) {
        s.driftT += 0.0035
        s.yaw = s.yawCenter + Math.sin(s.driftT) * 0.3
      }

      // layer headers sit along the base of the plate and track the rotation,
      // so the four stages stay named without a grid cluttering the field
      octx.font = '10px "IBM Plex Mono", monospace'
      octx.textAlign = 'center'
      LAYERS.forEach((layer) => {
        const lp = project({ x: layer.x, y: 0, z: 0 })
        const half = octx.measureText(layer.caption).width / 2 + 6
        const cx = Math.min(Math.max(lp.x, half), w - half)
        octx.fillStyle = cvar('--faint')
        octx.fillText(layer.caption, cx, h - 6)
        octx.strokeStyle = cvar('--line')
        octx.lineWidth = 1
        octx.beginPath()
        octx.moveTo(cx - half + 6, h - 20)
        octx.lineTo(cx + half - 6, h - 20)
        octx.stroke()
      })
      octx.textAlign = 'left'

      // forward-pass wavefront in graph-x space
      let front = -Infinity
      if (s.passStart >= 0) {
        const t = Math.min((now - s.passStart) / PASS_MS, 1)
        const eased = t * t * (3 - 2 * t) // smoothstep: even pace across the layers
        front = -1.9 + eased * 3.8
        const shownMs = Math.round(22 * eased)
        setMs((prev) => (prev === shownMs ? prev : shownMs))
        if (t >= 1 && !s.passDone) s.passDone = true
      }

      // edges
      const projected = GRAPH.nodes.map((n) => ({ n, p: project(n) }))
      const pmap = new Map(projected.map((o) => [o.n, o.p]))

      // resolve hover first: it decides how the edges below are drawn
      let hover = null
      if (s.pointer) {
        let bestD = 18
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
      GRAPH.edges.forEach(([a, b]) => {
        const pa = pmap.get(a)
        const pb = pmap.get(b)
        const mid = (a.x + b.x) / 2
        const active = mid < front
        const depthAlpha = 0.5 + 0.5 * Math.min(pa.s, pb.s)
        const onPath = hover && (a === hover || b === hover)
        if (onPath) {
          ctx.strokeStyle = cvar(`--dot-${hover.domain}`)
          ctx.globalAlpha = 0.95
          ctx.lineWidth = 1.6
        } else {
          ctx.strokeStyle = active ? cvar('--ink') : cvar('--line')
          ctx.globalAlpha = (active ? 0.75 : 0.55 * depthAlpha) * (hover ? 0.3 : 1)
          ctx.lineWidth = active ? 1.2 : 1
        }
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke()
        ctx.globalAlpha = 1
      })

      // flashlight: how strongly the cursor lights a point, 0 outside the beam
      const beam = Math.min(190, Math.max(110, Math.min(w, h) * 0.3))
      const lit = (p) => {
        if (!s.pointer) return 0
        const d = Math.hypot(p.x - s.pointer.x, p.y - s.pointer.y)
        if (d > beam) return 0
        const t = 1 - d / beam
        return t * t
      }

      // nodes, far to near
      projected
        .slice()
        .sort((a, b) => b.p.depth - a.p.depth)
        .forEach(({ n, p }) => {
          const active = n.x < front
          const g = lit(p)
          const r = (n.layer === 3 ? 7 : 5.6) * p.s * (1 + 0.3 * g)
          ctx.beginPath()
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
          ctx.fillStyle = cvar(`--dot-${n.domain}`)
          const focus = !hover || n === hover || neighbors.has(n)
          ctx.globalAlpha =
            Math.min(1, 0.3 + 0.6 * Math.min(p.s, 1) + 0.5 * g) * (focus ? 1 : 0.35)
          ctx.fill()
          ctx.globalAlpha = 1
          if (g > 0.12) {
            ctx.beginPath()
            ctx.arc(p.x, p.y, r + 4, 0, Math.PI * 2)
            ctx.strokeStyle = cvar(`--dot-${n.domain}`)
            ctx.globalAlpha = 0.5 * g
            ctx.lineWidth = 1
            ctx.stroke()
            ctx.globalAlpha = 1
          }
          if (active) {
            ctx.beginPath()
            ctx.arc(p.x, p.y, r + 3, 0, Math.PI * 2)
            ctx.strokeStyle = cvar('--ink')
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

      // chips: hover beats everything; during the pass the wavefront lights
      // nodes up as it reaches them; afterwards the outputs stay labeled
      const chipped = new Set()

      if (hover) {
        const hp = pmap.get(hover)
        chipped.add(hover)
        chip(hp.x, hp.y, hover.label, hover.domain)
      }

      if (s.passStart >= 0 && !s.passDone) {
        projected.forEach(({ n, p }) => {
          const since = front - n.x
          if (since > 0 && since < 0.55 && !chipped.has(n)) {
            chipped.add(n)
            chip(p.x, p.y, n.label, n.domain)
          }
        })
      }

      if (s.passDone && !s.hover) {
        let lastY = -Infinity
        projected
          .filter(({ n }) => n.layer === 3)
          .sort((a, b) => a.p.y - b.p.y)
          .forEach(({ n, p }) => {
            const y = Math.max(p.y, lastY + 24)
            lastY = y
            chipped.add(n)
            chip(p.x, y, n.label, n.domain)
          })
      }

      // labels inside the flashlight beam, fading out toward its edge
      octx.font = '10px "IBM Plex Mono", monospace'
      octx.textAlign = 'center'
      octx.fillStyle = cvar('--ink')
      projected.forEach(({ n, p }) => {
        if (chipped.has(n)) return
        const g = lit(p)
        const alpha = neighbors.has(n) ? 1 : Math.min(1, g * 1.6)
        if (alpha < 0.06) return
        const r = (n.layer === 3 ? 7 : 5.6) * p.s
        const lx = Math.min(Math.max(p.x, 40), w - 40)
        const ly = p.y + r + 13
        // a paper backing keeps labels legible where they fall over the abstract
        const tw = octx.measureText(n.label).width
        octx.globalAlpha = alpha * 0.88
        octx.fillStyle = cvar('--paper')
        octx.fillRect(lx - tw / 2 - 4, ly - 10, tw + 8, 14)
        octx.globalAlpha = alpha
        octx.fillStyle = cvar('--ink')
        octx.fillText(n.label, lx, ly)
      })
      octx.globalAlpha = 1
      octx.textAlign = 'left'

      s.projected = projected

      canvas.style.cursor = s.hover ? 'pointer' : s.dragging ? 'grabbing' : 'grab'
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const pos = (e) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const down = (e) => {
      s.dragging = true
      const p = pos(e)
      s.lastX = p.x
      s.lastY = p.y
      s.pressX = p.x
      s.pressY = p.y
      s.pointer = p
      canvas.setPointerCapture(e.pointerId)
    }
    const move = (e) => {
      const p = pos(e)
      s.pointer = p
      if (s.dragging) {
        s.yaw += (p.x - s.lastX) * 0.008
        s.pitch = Math.min(0.9, Math.max(-0.1, s.pitch + (p.y - s.lastY) * 0.006))
        s.lastX = p.x
        s.lastY = p.y
        s.idleAt = performance.now()
      }
    }
    const up = (e) => {
      s.dragging = false
      s.idleAt = performance.now()
      // resume the sway from wherever the viewer left the graph
      s.yawCenter = s.yaw
      s.driftT = 0
      // a press that never turned into a drag is a click: open the node's section
      const p = pos(e)
      const wasDrag = Math.hypot(p.x - s.pressX, p.y - s.pressY) > 6
      if (!wasDrag && s.projected) {
        let best = null
        let bestD = 18
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

    canvas.addEventListener('pointerdown', down)
    stage.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    stage.addEventListener('pointerleave', leave)

    // run one pass automatically once the figure scrolls into view
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && s.passStart < 0) {
          setTimeout(runPass, 700)
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointerdown', down)
      stage.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      stage.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <figure className="netfig" ref={wrapRef}>
      <div className="netfig-stage" ref={stageRef}>
        <canvas
          className="netfig-field"
          ref={canvasRef}
          aria-label="interactive neural network of skills and shipped results"
        />
        <div className="netfig-copy">{children}</div>
        <canvas className="netfig-overlay" ref={overlayRef} aria-hidden="true" />
      </div>
      <figcaption>
        <span className="netfig-cap">
          fig. 01. a career as a forward pass: signals in, skills through the hidden layers, results out. sweep the cursor to read the nodes, drag to rotate, click to visit a section.
        </span>
        <span className="netfig-controls">
          <button type="button" className="netfig-btn" onClick={runPass}>
            ▷ run forward pass
          </button>
          <span className="netfig-ms" aria-live="polite">
            {ms === null ? 'ttft: idle' : `ttft: ${ms} ms`}
            {ms === 22 && <s> 218 ms</s>}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
