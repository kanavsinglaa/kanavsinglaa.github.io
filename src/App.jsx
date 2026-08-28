import { useEffect, useRef, useState } from 'react'
import NetworkFigure from './NetworkFigure.jsx'
import {
  contact, intro, updated, discussion, experience, contributions,
  openQuestions, research, projects, education, skills, coursework,
} from './data.js'

const NAV = [
  ['work', '#work', 'voice'],
  ['research', '#research', 'autonomy'],
  ['open questions', '#open', 'models'],
  ['instrumentation', '#skills', 'product'],
  ['contact', '#contact', 'voice'],
]

function Hl({ domain, children }) {
  return <mark className={`hl hl-${domain}`}>{children}</mark>
}

function IntroSeg({ seg }) {
  const inner = seg.hl ? <Hl domain={seg.hl}>{seg.t}</Hl> : seg.t
  if (seg.url && seg.chip) {
    return (
      <a className={`org-chip hl-${seg.chip}`} href={seg.url} target="_blank" rel="noreferrer">
        {seg.t}
        <span className="org-chip-arrow" aria-hidden="true">↗</span>
      </a>
    )
  }
  if (seg.url) {
    return (
      <a className="intro-link" href={seg.url} target="_blank" rel="noreferrer">
        {seg.icon && <img className="link-icon" src={seg.icon} alt="" loading="lazy" />}
        {seg.emoji && (
          <span className="link-emoji" aria-hidden="true">{seg.emoji}</span>
        )}
        {inner}
      </a>
    )
  }
  return <span>{inner}</span>
}

function Segs({ segs }) {
  return segs.map((seg, i) => <IntroSeg key={i} seg={seg} />)
}

function resolvedTheme() {
  return document.documentElement.dataset.theme || 'dark'
}

/* A window with a blind: pull it down and the page goes dark, raise it and the
   day comes back. Dragging is the fun path; click and keyboard do the same job. */
function ThemeWindow() {
  const [dark, setDark] = useState(() => resolvedTheme() === 'dark')
  const [p, setP] = useState(() => (resolvedTheme() === 'dark' ? 1 : 0)) // blind coverage
  const [dragging, setDragging] = useState(false)
  const ref = useRef(null)
  const drag = useRef(null)

  const apply = (isDark) => {
    setDark(isDark)
    const root = document.documentElement
    if (isDark) root.dataset.theme = 'dark'
    else root.dataset.theme = 'light'
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light') } catch (e) { /* private mode */ }
  }

  const settle = (next) => {
    setP(next ? 1 : 0)
    if (next !== dark) apply(next)
  }

  const onPointerDown = (e) => {
    const el = ref.current
    if (!el) return
    el.setPointerCapture(e.pointerId)
    drag.current = { y: e.clientY, p, moved: false, range: el.getBoundingClientRect().height * 0.7 }
    setDragging(true)
  }

  const onPointerMove = (e) => {
    const d = drag.current
    if (!d) return
    const dy = e.clientY - d.y
    if (Math.abs(dy) > 3) d.moved = true
    const next = Math.min(1, Math.max(0, d.p + dy / d.range))
    setP(next)
    // the page recolours as the blind crosses the halfway mark
    const shouldBeDark = next > 0.5
    if (shouldBeDark !== dark) apply(shouldBeDark)
  }

  const onPointerUp = () => {
    const d = drag.current
    drag.current = null
    setDragging(false)
    if (!d) return
    if (!d.moved) settle(!dark)      // a click, not a drag
    else settle(p > 0.5)             // snap to whichever end is closer
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); settle(!dark) }
    if (e.key === 'ArrowDown') { e.preventDefault(); settle(true) }
    if (e.key === 'ArrowUp') { e.preventDefault(); settle(false) }
  }

  return (
    <button
      type="button"
      ref={ref}
      className={`theme-window${dragging ? ' is-dragging' : ''}`}
      style={{ '--p': p }}
      role="switch"
      aria-checked={dark}
      aria-label={dark ? 'raise the blind for light mode' : 'lower the blind for dark mode'}
      title={dark ? 'raise the blind' : 'pull the blind down'}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
    >
      <span className="tw-glass" aria-hidden="true">
        <span className="tw-sky" />
        <span className="tw-disc" />
        <span className="tw-stars" />
      </span>
      <span className="tw-blind" aria-hidden="true" />
      <span className="tw-cord" aria-hidden="true" />
      <span className="tw-frame" aria-hidden="true" />
    </button>
  )
}

function SectionHead({ title, note }) {
  return (
    <header className="sec-head" data-reveal>
      <h2 className="sec-title">{title}</h2>
      {note && <p className="sec-note">{note}</p>}
    </header>
  )
}

function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  const flash = () => {
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1800)
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      flash()
      return
    } catch (e) { /* no clipboard permission: try the old way */ }
    try {
      const ta = document.createElement('textarea')
      ta.value = email
      ta.setAttribute('readonly', '')
      ta.style.cssText = 'position:fixed;top:0;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      if (ok) flash()
    } catch (e) { /* the address is on screen beside this button anyway */ }
  }
  useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <button type="button" className="copy-btn" onClick={copy}>
      {copied ? '✓ copied' : 'copy address'}
    </button>
  )
}

export default function App() {
  const [active, setActive] = useState(null)

  // reveal each block as it comes into view, once
  useEffect(() => {
    const targets = document.querySelectorAll('[data-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )
    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // mark the section the reader is in, so the nav says where they are
  useEffect(() => {
    const sections = [...document.querySelectorAll('main section[id], footer[id]')]
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (seen) setActive(seen.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="page" id="top">
      <a className="skip" href="#work">skip to content</a>

      <nav className="nav" aria-label="site">
        <span className="nav-brand">
          <img className="nav-avatar" src="/avatar.png" alt="cartoon avatar of kanav" />
          <span className="nav-name">kanav singla · toronto</span>
        </span>
        <div className="nav-links">
          {NAV.map(([label, href, domain]) => (
            <a
              key={label}
              href={href}
              className={`nav-link hl-h-${domain}${active === href.slice(1) ? ` is-active hl-${domain}` : ''}`}
              aria-current={active === href.slice(1) ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
          <a href={contact.resume} className="nav-link nav-resume" target="_blank" rel="noreferrer">resume ↗</a>
          <ThemeWindow />
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="intro">
              {intro.map((seg, i) => <IntroSeg key={i} seg={seg} />)}
            </p>
            <p className="hero-meta">
              {contact.location.toLowerCase()}
            </p>
            <p className="hero-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.github} target="_blank" rel="noreferrer">github</a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">linkedin</a>
            </p>
          </div>
          <div className="hero-right">
            <NetworkFigure />
            <aside className="edu-card" data-reveal>
              <p className="edu-label">education</p>
              <p className="edu-line">
                <a href={education.programUrl} target="_blank" rel="noreferrer">
                  {education.degree.toLowerCase()}
                </a>
              </p>
              <p className="edu-line edu-school">
                <a href={education.schoolUrl} target="_blank" rel="noreferrer">
                  {education.school}
                </a>
              </p>
              <p className="edu-meta">{education.detail}</p>
            </aside>
          </div>
        </section>

        <section id="work" className="sec">
          <SectionHead title="deployment history"
            note="intelligence is abundant and cheap now. leveraging it into a harness people love using is not. every harness here ran in production, in front of paying customers."
          />
          <div className="xp-list">
            {experience.map((xp) => (
              <article
                className={`xp dom-${xp.domains[0]}`}
                key={xp.id}
                id={`xp-${xp.id}`}
                data-reveal
              >
                <div className="xp-meta">
                  <p className="xp-when">{xp.when}</p>
                  <p className="xp-where">{xp.where}</p>
                </div>
                <div className="xp-body">
                  <h3>
                    {xp.role}{' '}
                    <span className="xp-org">
                      @{' '}
                      {xp.icon && (
                        <img className="org-icon" src={xp.icon} alt="" loading="lazy" />
                      )}
                      {xp.url
                        ? <a href={xp.url} target="_blank" rel="noreferrer">{xp.org}</a>
                        : xp.org}
                    </span>
                  </h3>
                  {xp.sub && <p className="xp-sub">{xp.sub}</p>}
                  {xp.lede && <p className="xp-lede">{xp.lede}</p>}
                  <ul>
                    {xp.points.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="sec">
          <SectionHead title="research, put into production"
            note="the art is knowing which research survives production, then engineering it until it does."
          />
          <div className="xp-list">
            {research.map((r, i) => (
              <article className={`xp dom-${r.domain}`} key={i} data-reveal>
                <div className="xp-meta">
                  <p className="xp-when">{r.when}</p>
                </div>
                <div className="xp-body">
                  {r.kicker && <p className="rx-kicker">{r.kicker}</p>}
                  <h3 className="rx-title">
                    {r.titleUrl ? (
                      <a className="rx-title-link" href={r.titleUrl} target="_blank" rel="noreferrer">
                        {r.titleEmoji && (
                          <span className="link-emoji" aria-hidden="true">{r.titleEmoji}</span>
                        )}
                        {r.title}
                        <span className="rx-title-arrow" aria-hidden="true">↗</span>
                      </a>
                    ) : r.title}
                  </h3>
                  <p className="xp-sub"><Segs segs={r.orgSegs} /></p>
                  {r.spec && (
                    <dl className="spec">
                      {r.spec.map(([k, lines]) => (
                        <div className="spec-row" key={k}>
                          <dt>{k}</dt>
                          <dd>
                            <ul className="spec-lines">
                              {lines.map((line, li) => <li key={li}>{line}</li>)}
                            </ul>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="sec">
          <SectionHead title="instrumentation" />
          <div className="skills">
            {skills.map((g) => (
              <div className={`skill-group dom-${g.domain}`} key={g.group} data-reveal>
                <h3 className={`skill-name hl-${g.domain}`}>{g.group}</h3>
                <ul className="skill-items">
                  {g.items.map((item) => (
                    <li className="skill-item" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contributions" className="sec">
          <SectionHead title="contributions"
            note="where i have made a sizable impact."
          />
          <ol className="contribs">
            {contributions.map((c) => (
              <li key={c.n} className={`contrib dom-${c.domain}`} data-reveal>
                <span className="contrib-n">{c.n}</span>
                <div className="contrib-body">
                  <h3 className="contrib-title"><span className={`hl hl-${c.domain}`}>{c.title}</span></h3>
                  <p className="contrib-text">{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="discussion" className="sec">
          <SectionHead title="discussion"
            note="why this profile compounds."
          />
          <div className="disc">
            {discussion.map((d) => (
              <div className={`disc-item dom-${d.domain}`} key={d.title} data-reveal>
                <h3 className={`disc-title hl-${d.domain}`}>{d.title}</h3>
                <p className="disc-text">{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="open" className="sec">
          <SectionHead title="open questions"
            note="what i am chewing on, stated as questions rather than positions."
          />
          <ul className="opens">
            {openQuestions.map((o, i) => (
              <li className={`open-q dom-${o.domain}`} key={i} data-reveal>
                <span className={`open-dot hl-${o.domain}`} aria-hidden="true" />
                {o.q}
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className="sec">
          <div className="split">
            <div className="split-col">
              <SectionHead title="early work" />
          <div className="projects projects-stack">
            {projects.map((p, i) => (
              <article className={`project dom-${p.domain}`} key={i} data-reveal>
                <h3>{p.title}</h3>
                <p className="project-org">
                  {p.url
                    ? <a href={p.url} target="_blank" rel="noreferrer">{p.org}</a>
                    : p.org}
                  {' · '}{p.when}
                </p>
                <p className="project-text">
                  {p.textSegs ? <Segs segs={p.textSegs} /> : p.text}
                </p>
              </article>
            ))}
          </div>
            </div>
            <div className="split-col" id="coursework">
              <SectionHead title="coursework & honours" />
          <div className="course-wrap" data-reveal>
            <ul className="courses">
              {coursework.courses.map((c) => (
                <li className={`course${c.star ? ' is-star' : ''}`} key={c.t}>
                  <span className="course-name">{c.t}</span>
                  {c.meta && <span className="course-meta">{c.meta}</span>}
                </li>
              ))}
            </ul>
            <p className="course-note">{coursework.footnote}</p>
            <ul className="honours">
              {coursework.honours.map((h) => (
                <li className="honour" key={h}>{h}</li>
              ))}
            </ul>
          </div>
            </div>
          </div>
          <p className="edu-foot" data-reveal>
            more in the <a href={contact.resume} target="_blank" rel="noreferrer">resume</a>.
          </p>
        </section>

      </main>

      <footer id="contact" className="footer">
        <p className="eyebrow">get in touch</p>
        <div className="footer-reach">
          <a className="footer-email" href={`mailto:${contact.email}`}>{contact.email}</a>
          <CopyEmail email={contact.email} />
        </div>
        <p className="footer-sig">
          <img className="footer-avatar" src="/avatar.png" alt="" />
          Kanav Singla
        </p>
        <div className="footer-links">
          <a href={contact.github} target="_blank" rel="noreferrer">github</a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">linkedin</a>
          <a href={contact.resume} target="_blank" rel="noreferrer">resume (pdf)</a>
          <a className="footer-top" href="#top">↑ back to the abstract</a>
        </div>
        <p className="colophon">
          last revised {updated} · set in ibm plex mono &amp; stix two text · fig. 01 is hand-rolled canvas, no charting library · vite + react · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
