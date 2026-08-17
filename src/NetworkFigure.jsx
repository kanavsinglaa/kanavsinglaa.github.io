import { useEffect, useRef, useState } from 'react'

// fig. 01 — career rendered as a neural network.
// Input layer: signals Kanav works from. Hidden layers: skills.
// Output layer: shipped, measured results. Drag to rotate; hover for labels;
// "run forward pass" pulses activation input → output.

const DOT = {
  voice: '#D98E1B',
  models: '#3B9E56',
  product: '#8A63C9',
  autonomy: '#3E7BD0',
}
const HL = {
  voice: '#FFDFAE',
  models: '#CBEFCB',
  product: '#E4D6F7',
  autonomy: '#CFE4FD',
}

// deterministic pseudo-random so the layout is stable across loads
function rand(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function buildGraph() {
  const layers = [
    // x, nodes
    [-1.7, [
      ['audio stream', 'voice'],
      ['market data', 'product'],
      ['camera feed', 'autonomy'],
      ['raw documents', 'models'],
    ]],
    [-0.57, [
      ['pytorch', 'models'],
      ['onnx int8', 'voice'],
      ['lora fine-tunes', 'models'],
      ['rag retrieval', 'models'],
      ['demand forecasting', 'product'],
      ['learned planning', 'autonomy'],
    ]],
    [0.57, [
      ['latency profiling', 'voice'],
      ['eval harnesses', 'models'],
      ['production a/b', 'product'],
      ['quantization', 'voice'],
      ['distributed training', 'autonomy'],
    ]],
    [1.7, [
      ['22 ms reply', 'voice'],
      ['−55% llm spend', 'voice'],
      ['$500k arr', 'product'],
      ['94% recall @ incheon', 'models'],
    ]],
  ]

  const nodes = []
  layers.forEach(([x, defs], li) => {
    const n = defs.length
    defs.forEach(([label, domain], i) => {
      const fy = n === 1 ? 0.5 : i / (n - 1)
      nodes.push({
        label,
        domain,
        layer: li,
        x: x + (rand(li * 10 + i) - 0.5) * 0.2,
        y: (fy - 0.5) * 1.9 + (rand(li * 31 + i * 7) - 0.5) * 0.24,
        z: (rand(li * 53 + i * 13) - 0.5) * 1.1,
      })
    })
  })

  const edges = []
  const byLayer = [0, 1, 2, 3].map((l) => nodes.filter((nd) => nd.layer === l))
  for (let l = 0; l < 3; l++) {
    byLayer[l].forEach((a, i) => {
      const next = byLayer[l + 1]
      const picks = new Set()
      const k = 2 + Math.floor(rand(l * 97 + i * 17) * 2) // 2–3 edges each
      for (let j = 0; j < k; j++) {
        picks.add(Math.floor(rand(l * 7 + i * 29 + j * 71) * next.length))
      }
      // guarantee same-domain linkage when available
      const same = next.findIndex((b) => b.domain === a.domain)
      if (same >= 0) picks.add(same)
      picks.forEach((pi) => edges.push([a, next[pi]]))
    })
  }
  return { nodes, edges }
}

const GRAPH = buildGraph()
const PASS_MS = 2200

export default function NetworkFigure() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const stateRef = useRef({
    yaw: -0.32,
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
    const wrap = wrapRef.current
    const ctx = canvas.getContext('2d')
    const s = stateRef.current
    s.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (s.reduced) s.autoRotate = false

    let w = 0
    let h = 0
    let raf = 0

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      w = rect.width
      h = Math.max(340, Math.min(520, rect.width * 0.62))
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
      const yr = p.y * cp - zr * sp
      zr = p.y * sp + zr * cp
      const f = 4.2
      const scale = f / (f + zr)
      const unit = Math.min(w, h) / (w < 520 ? 4.6 : 3.7)
      return {
        x: w / 2 + xr * scale * unit,
        y: h / 2 - yr * scale * unit,
        s: scale,
        depth: zr,
      }
    }

    const chip = (x, y, text, domain) => {
      ctx.font = '11px "IBM Plex Mono", monospace'
      const tw = ctx.measureText(text).width
      const pad = 5
      const bx = Math.min(Math.max(x + 10, 4), w - tw - pad * 2 - 4)
      const by = Math.max(y - 26, 4)
      ctx.fillStyle = HL[domain]
      ctx.fillRect(bx, by, tw + pad * 2, 18)
      ctx.fillStyle = '#181818'
      ctx.fillText(text, bx + pad, by + 13)
    }

    const draw = (now) => {
      ctx.clearRect(0, 0, w, h)

      if (s.autoRotate && !s.dragging && now - s.idleAt > 2600) {
        s.yaw += 0.0016
      }

      // floor grid, y = -1.45
      ctx.strokeStyle = '#E2E1D8'
      ctx.lineWidth = 1
      const gy = -1.3
      for (let gx = -1.9; gx <= 1.91; gx += 0.475) {
        const a = project({ x: gx, y: gy, z: -1.2 })
        const b = project({ x: gx, y: gy, z: 1.2 })
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
      }
      for (let gz = -1.2; gz <= 1.21; gz += 0.4) {
        const a = project({ x: -1.9, y: gy, z: gz })
        const b = project({ x: 1.9, y: gy, z: gz })
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
      }

      // axis labels, pinned in 3d at the floor's x extremes
      ctx.font = '10px "IBM Plex Mono", monospace'
      ctx.fillStyle = '#9A9A90'
      const lIn = project({ x: -1.9, y: gy - 0.16, z: 0 })
      const lOut = project({ x: 1.9, y: gy - 0.16, z: 0 })
      ctx.textAlign = 'center'
      ctx.fillText('signals in', Math.max(lIn.x, 34), lIn.y)
      ctx.fillText('results out', Math.min(lOut.x, w - 38), lOut.y)
      ctx.textAlign = 'left'

      // forward-pass wavefront in graph-x space
      let front = -Infinity
      if (s.passStart >= 0) {
        const t = Math.min((now - s.passStart) / PASS_MS, 1)
        const eased = 1 - Math.pow(1 - t, 3)
        front = -1.9 + eased * 3.8
        const shownMs = Math.round(22 * eased)
        setMs((prev) => (prev === shownMs ? prev : shownMs))
        if (t >= 1 && !s.passDone) s.passDone = true
      }

      // edges
      const projected = GRAPH.nodes.map((n) => ({ n, p: project(n) }))
      const pmap = new Map(projected.map((o) => [o.n, o.p]))
      GRAPH.edges.forEach(([a, b]) => {
        const pa = pmap.get(a)
        const pb = pmap.get(b)
        const mid = (a.x + b.x) / 2
        const active = mid < front
        const depthAlpha = 0.5 + 0.5 * Math.min(pa.s, pb.s)
        ctx.strokeStyle = active ? '#181818' : '#C9C8BD'
        ctx.globalAlpha = active ? 0.75 : 0.55 * depthAlpha
        ctx.lineWidth = active ? 1.2 : 1
        ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.lineTo(pb.x, pb.y); ctx.stroke()
        ctx.globalAlpha = 1
      })

      // nodes, far to near
      projected
        .slice()
        .sort((a, b) => b.p.depth - a.p.depth)
        .forEach(({ n, p }) => {
          const active = n.x < front
          const r = (n.layer === 3 ? 6.5 : 5) * p.s
          ctx.beginPath()
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
          ctx.fillStyle = DOT[n.domain]
          ctx.globalAlpha = 0.35 + 0.65 * Math.min(p.s, 1)
          ctx.fill()
          ctx.globalAlpha = 1
          if (active) {
            ctx.beginPath()
            ctx.arc(p.x, p.y, r + 3, 0, Math.PI * 2)
            ctx.strokeStyle = '#181818'
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })

      // hover chip
      s.hover = null
      if (s.pointer) {
        let best = null
        let bestD = 18
        projected.forEach(({ n, p }) => {
          const d = Math.hypot(p.x - s.pointer.x, p.y - s.pointer.y)
          if (d < bestD) { bestD = d; best = { n, p } }
        })
        if (best) {
          s.hover = best.n
          chip(best.p.x, best.p.y, best.n.label, best.n.domain)
        }
      }

      // after a completed pass, label the outputs (staggered so chips never overlap)
      if (s.passDone && !s.hover) {
        let lastY = -Infinity
        projected
          .filter(({ n }) => n.layer === 3)
          .sort((a, b) => a.p.y - b.p.y)
          .forEach(({ n, p }) => {
            const y = Math.max(p.y, lastY + 24)
            lastY = y
            chip(p.x, y, n.label, n.domain)
          })
      }

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
    const up = () => { s.dragging = false; s.idleAt = performance.now() }
    const leave = () => { s.pointer = null }

    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointerleave', leave)

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
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <figure className="netfig" ref={wrapRef}>
      <canvas ref={canvasRef} aria-label="interactive neural network of skills and shipped results" />
      <figcaption>
        <span className="netfig-cap">
          fig. 01 — a career as a forward pass: signals in, skills in the hidden layers, shipped results out. drag to rotate.
        </span>
        <span className="netfig-controls">
          <button type="button" className="netfig-btn" onClick={runPass}>
            ▷ run forward pass
          </button>
          <span className="netfig-ms" aria-live="polite">
            {ms === null ? 'ttft: — ms' : `ttft: ${ms} ms`}
            {ms === 22 && <s> 218 ms</s>}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
