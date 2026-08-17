import NetworkFigure from './NetworkFigure.jsx'
import {
  contact, intro, experience, results, research, projects, education, skills,
} from './data.js'

const NAV = [
  ['work', '#work', 'voice'],
  ['results', '#results', 'models'],
  ['research', '#research', 'autonomy'],
  ['projects', '#projects', 'product'],
  ['contact', '#contact', 'voice'],
]

function Hl({ domain, children }) {
  return <mark className={`hl hl-${domain}`}>{children}</mark>
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

function SectionHead({ index, kind, title, note }) {
  return (
    <header className="sec-head">
      <h2>
        <span className="sec-kind">{kind} {index}</span>
        <span className="sec-title">{title}</span>
      </h2>
      {note && <p className="sec-note">{note}</p>}
    </header>
  )
}

export default function App() {
  return (
    <div className="page">
      <a className="skip" href="#work">skip to content</a>

      <nav className="nav" aria-label="site">
        <span className="nav-name">kanav singla — models &amp; inference</span>
        <div className="nav-links">
          {NAV.map(([label, href, domain]) => (
            <a key={label} href={href} className={`nav-link hl-h-${domain}`}>{label}</a>
          ))}
          <a href={contact.resume} className="nav-link nav-resume" target="_blank" rel="noreferrer">resume ↗</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">abstract</p>
            <p className="intro">
              {intro.map((seg, i) =>
                seg.hl ? <Hl key={i} domain={seg.hl}>{seg.t}</Hl> : <span key={i}>{seg.t}</span>,
              )}
            </p>
            <p className="hero-meta">
              {contact.location.toLowerCase()} · open to startup roles
            </p>
            <p className="hero-links">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={contact.github} target="_blank" rel="noreferrer">github</a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">linkedin</a>
            </p>
          </div>
          <NetworkFigure />
        </section>

        <section id="work" className="sec">
          <SectionHead
            index="01" kind="table" title="deployment history"
            note="every model here ran in production, in front of paying customers."
          />
          <div className="xp-list">
            {experience.map((xp) => (
              <article className="xp" key={xp.id}>
                <div className="xp-meta">
                  <p className="xp-when">{xp.when}</p>
                  <p className="xp-where">{xp.where}</p>
                  <Tag domain={xp.domain} />
                </div>
                <div className="xp-body">
                  <h3>{xp.role} <span className="xp-org">@ {xp.org}</span></h3>
                  {xp.sub && <p className="xp-sub">{xp.sub}</p>}
                  <ul>
                    {xp.points.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="results" className="sec">
          <SectionHead
            index="02" kind="fig." title="measured results"
            note="numbers from production systems, each with a measurement method behind it."
          />
          <ul className="results">
            {results.map((r, i) => (
              <li key={i} className="result">
                <span className={`result-value hl-${r.domain}`}>{r.value}</span>
                <span className="result-label">{r.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="research" className="sec">
          <SectionHead index="03" kind="table" title="research" />
          <div className="xp-list">
            {research.map((r, i) => (
              <article className="xp" key={i}>
                <div className="xp-meta">
                  <p className="xp-when">{r.when}</p>
                  <Tag domain={r.domain} />
                </div>
                <div className="xp-body">
                  <h3>{r.title}</h3>
                  <p className="xp-sub">{r.org}</p>
                  <ul>
                    {r.points.map((pt, j) => <li key={j}>{pt}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="sec">
          <SectionHead index="04" kind="table" title="instrumentation" />
          <div className="skills">
            {skills.map((g) => (
              <div className="skill-group" key={g.group}>
                <h3 className={`skill-name hl-${g.domain}`}>{g.group}</h3>
                <p className="skill-items">{g.items.join(' · ')}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="sec">
          <SectionHead index="05" kind="table" title="early work" />
          <div className="projects">
            {projects.map((p, i) => (
              <article className="project" key={i}>
                <h3>{p.title}</h3>
                <p className="project-org">{p.org}</p>
                <p className="project-text">{p.text}</p>
              </article>
            ))}
          </div>
          <p className="edu">
            {education.degree.toLowerCase()} · {education.school} · {education.detail}
          </p>
        </section>
      </main>

      <footer id="contact" className="footer">
        <p className="eyebrow">appendix a — contact</p>
        <a className="footer-email" href={`mailto:${contact.email}`}>{contact.email}</a>
        <p className="footer-sig">Kanav Singla</p>
        <div className="footer-links">
          <a href={contact.github} target="_blank" rel="noreferrer">github</a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">linkedin</a>
          <a href={contact.resume} target="_blank" rel="noreferrer">resume (pdf)</a>
        </div>
        <p className="colophon">
          set in ibm plex mono &amp; stix two text · fig. 01 is hand-rolled canvas, no charting library · vite + react · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  )
}
