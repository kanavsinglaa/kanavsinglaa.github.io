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

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.4" />
    <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.2 14.6A8.6 8.6 0 1 1 9.4 3.8a6.9 6.9 0 0 0 10.8 10.8Z" />
  </svg>
)

function ThemeToggle() {
  const [theme, setTheme] = useState(resolvedTheme)
  const flip = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch (e) { /* private mode */ }
    setTheme(next)
  }
  const toLight = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={flip}
      aria-label={toLight ? 'switch to light mode' : 'switch to dark mode'}
      title={toLight ? 'switch to light mode' : 'switch to dark mode'}
    >
      {toLight ? <SunIcon /> : <MoonIcon />}
      <span className="theme-word">{toLight ? 'light' : 'dark'}</span>
    </button>
  )
}

function Tag({ domain }) {
  const names = {
    voice: 'voice & inference',
    models: 'models & training',
    product: 'product & business',
    autonomy: 'autonomy & robotics',
  }
  return <span className={`tag hl-${domain}`}>{names[domain]}</span>
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
          <ThemeToggle />
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
                className={`xp dom-${xp.domain}`}
                key={xp.id}
                id={`xp-${xp.id}`}
                data-reveal
              >
                <div className="xp-meta">
                  <p className="xp-when">{xp.when}</p>
                  <p className="xp-where">{xp.where}</p>
                  <Tag domain={xp.domain} />
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
                  <Tag domain={r.domain} />
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
            note="what i keep coming back to."
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
