import { useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

type NavItem = {
  path: string
  title: string
  index: string
  note: string
  className: string
}

type PageRow = {
  label: string
  meta: string
  href?: string
  details?: {
    role: string
    period: string
    location: string
    achievements: string[]
    skills: string[]
  }
}

type PageDetails = {
  eyebrow: string
  title: string
  intro: string
  rows: PageRow[]
}

const navItems: NavItem[] = [
  { path: '/projects', title: 'Projects.', index: '01', note: 'Selected work · Coming next', className: 'projects' },
  { path: '/about', title: 'About.', index: '02', note: 'Experience, education & focus', className: 'about' },
  { path: '/services', title: 'Services.', index: '03', note: 'Android apps & websites', className: 'services' },
  { path: '/contact', title: 'Contact.', index: '04', note: 'Connect on LinkedIn', className: 'contact' },
]

function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      R<span>.</span>
    </span>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className={`menu-icon ${open ? 'is-open' : ''}`} aria-hidden="true">
      <span />
      <span />
    </span>
  )
}

function SiteHeader({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  return (
    <header className="site-header">
      <Link className="brand" to="/" onClick={() => setMenuOpen(false)} aria-label="Portfolio home">
        <Mark />
        <span className="brand-copy">Joshua Orlina<br />Android & web developer</span>
      </Link>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-menu">
        <span>{menuOpen ? 'Close' : 'Menu'}</span>
        <MenuIcon open={menuOpen} />
      </button>
    </header>
  )
}

function TileMenu({ open, close }: { open: boolean; close: () => void }) {
  return (
    <div id="site-menu" className={`tile-menu ${open ? 'is-visible' : ''}`} aria-hidden={!open}>
      <div className="tile-grid">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={`nav-tile ${item.className}`} onClick={close} tabIndex={open ? 0 : -1}>
            <span className="tile-index">{item.index}</span>
            <h2>{item.title}</h2>
            <span className="tile-note">{item.note}</span>
            <span className="tile-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
      <footer className="menu-footer">
        <span>Available for opportunities</span>
        <span>Calabarzon, Philippines · GMT+8</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}

const pageContent: Record<'projects' | 'about' | 'services' | 'contact', PageDetails> = {
  projects: {
    eyebrow: 'Selected work · Coming soon',
    title: 'Projects',
    intro: 'I’m preparing a focused selection of my Android, web, and application-development work.',
    rows: [
      { label: 'Android applications', meta: 'Projects coming soon' },
      { label: 'Web applications', meta: 'Projects coming soon' },
      { label: 'Technical experiments', meta: 'Projects coming soon' },
    ],
  },
  about: {
    eyebrow: 'Joshua Orlina · Developer',
    title: 'About',
    intro: 'I’m a junior Android engineer and web developer from Calabarzon, Philippines. I enjoy turning practical problems into clear, reliable digital products.',
    rows: [
      {
        label: 'Megaworld Corporation',
        meta: 'Junior Developer Intern · Feb—Jun 2025',
        details: {
          role: 'Junior Developer Intern · Internship',
          period: 'February 2025 — June 2025 · 5 months',
          location: 'Quezon City, Metro Manila · On-site',
          achievements: [
            'Developed and deployed a custom internal company portal with Laravel, improving internal workflows and access to company data.',
            'Configured and maintained the Ubuntu LTS development environment for a stable, secure application lifecycle.',
            'Designed efficient Microsoft SQL Server schemas in SSMS and maintained data integrity across the system.',
            'Connected the Laravel backend to Microsoft SQL Server through relational database logic built with Eloquent ORM.',
            'Implemented secure authentication and role-based access control to protect company data.',
            'Used Git for team collaboration, code reviews, and troubleshooting to maintain code quality.',
          ],
          skills: ['Laravel', 'Ubuntu LTS', 'Microsoft SQL Server', 'Eloquent ORM', 'RBAC', 'Git'],
        },
      },
      {
        label: 'JIMAC Incorporated',
        meta: 'Android Developer · Feb 2026—Present',
        details: {
          role: 'Android Developer · Full-time',
          period: 'February 2026 — Present · 8 months',
          location: 'Quezon City, Metro Manila · On-site',
          achievements: [
            'Develop and maintain Android applications that support JIMAC’s retail and business management solutions.',
            'Collaborate with cross-functional teams to design, implement, and optimize scalable mobile features.',
            'Ensure high performance, reliability, and a seamless user experience across POS and enterprise systems.',
          ],
          skills: ['Android Development', 'Mobile Features', 'POS Systems', 'Enterprise Systems', 'Performance & Reliability'],
        },
      },
      { label: 'Pamantasan ng Lungsod ng San Pablo', meta: 'Education' },
      { label: 'Android & web development', meta: 'Primary technical focus' },
      { label: 'August 08, 2002', meta: '24 years old' },
    ],
  },
  services: {
    eyebrow: 'Capabilities · What I build',
    title: 'Services',
    intro: 'I primarily develop Android applications and also create responsive websites for individuals, organizations, and businesses.',
    rows: [
      { label: 'Android app development', meta: 'My primary specialization' },
      { label: 'Website development', meta: 'Responsive websites for different needs' },
      { label: 'API & database integration', meta: 'Connecting applications to real services' },
    ],
  },
  contact: {
    eyebrow: 'Opportunities · Collaborations',
    title: 'Contact',
    intro: 'Need an Android application, a website, or a junior engineer for your team? Send me an email or connect with me online.',
    rows: [
      { label: 'Email', meta: 'joshuaorlina08@gmail.com', href: 'mailto:joshuaorlina08@gmail.com' },
      { label: 'LinkedIn', meta: 'Connect with Joshua', href: 'https://www.linkedin.com/in/joshua-orlina-549862363/' },
      { label: 'GitHub', meta: 'View my code', href: 'https://github.com/jrofuoco' },
      { label: 'Instagram', meta: '@jrofuoco', href: 'https://www.instagram.com/jrofuoco/' },
      { label: 'Facebook', meta: 'FuocoW', href: 'https://www.facebook.com/FuocoW' },
      { label: 'Calabarzon, Philippines', meta: 'Open to Android and web opportunities' },
    ],
  },
}

function Home({ openMenu }: { openMenu: () => void }) {
  const today = new Date()
  const birthdayPassed = today.getMonth() > 7 || (today.getMonth() === 7 && today.getDate() >= 8)
  const age = today.getFullYear() - 2002 - (birthdayPassed ? 0 : 1)

  return (
    <main className="landing-page">
      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="hero-meta">
          <span className="availability"><i aria-hidden="true" />Available for opportunities</span>
          <span>Calabarzon, Philippines · GMT+8</span>
        </div>

        <div className="hero-heading">
          <p>Junior Android engineer<br />& web developer</p>
          <h1 id="hero-title">Joshua<br />Orlina<span>.</span></h1>
        </div>

        <div className="hero-bottom">
          <p>I build reliable Android applications and responsive websites that turn practical needs into clear digital experiences.</p>
          <div className="hero-actions">
            <button onClick={openMenu} className="primary-action">Explore my work <span aria-hidden="true">↗</span></button>
            <a className="text-action" href="mailto:joshuaorlina08@gmail.com">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <a className="scroll-cue" href="#about-home"><span>Scroll to know me</span><span aria-hidden="true">↓</span></a>
      </section>

      <section className="landing-intro" id="about-home">
        <div className="section-label"><span>01</span><span>About</span></div>
        <div className="intro-content">
          <p className="intro-statement">I’m an early-career engineer interested in making technology feel useful, dependable, and easy to understand.</p>
          <div className="intro-details">
            <p>My primary focus is Android development. I also design and develop websites for individuals, organizations, and businesses.</p>
            <Link to="/about" className="inline-link">More about me <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <dl className="fact-grid">
          <div><dt>Based in</dt><dd>Calabarzon, PH</dd></div>
          <div><dt>Age</dt><dd>{age}</dd></div>
          <div><dt>Focus</dt><dd>Android first</dd></div>
          <div><dt>Also building</dt><dd>Web experiences</dd></div>
        </dl>
      </section>

      <section className="landing-services" aria-labelledby="services-title">
        <div className="section-label"><span>02</span><span>What I do</span></div>
        <div className="section-heading">
          <h2 id="services-title">From pocket-sized apps<br />to full-scale websites<span>.</span></h2>
          <Link to="/services" className="inline-link light-link">View services <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="service-grid">
          <article>
            <span className="service-number">01</span>
            <h3>Android<br />applications</h3>
            <p>Native mobile experiences built around clear workflows, dependable behavior, and practical use.</p>
          </article>
          <article>
            <span className="service-number">02</span>
            <h3>Website<br />development</h3>
            <p>Responsive websites for people and organizations that need a polished, credible digital presence.</p>
          </article>
          <article>
            <span className="service-number">03</span>
            <h3>Connected<br />systems</h3>
            <p>Applications connected to APIs, databases, and the services that make a product useful in the real world.</p>
          </article>
        </div>
      </section>

      <section className="landing-resume" aria-labelledby="background-title">
        <div className="section-label"><span>03</span><span>Background</span></div>
        <h2 id="background-title">Experience built through<br />real environments<span>.</span></h2>
        <div className="resume-list">
          <div className="resume-row">
            <span>Internship</span>
            <strong>Megaworld Corporation</strong>
            <span>Feb—Jun 2025 · Quezon City</span>
          </div>
          <div className="resume-row">
            <span>Current role</span>
            <strong>JIMAC Incorporated</strong>
            <span>Android Developer · Feb 2026—Present</span>
          </div>
          <div className="resume-row">
            <span>Education</span>
            <strong>Pamantasan ng Lungsod ng San Pablo</strong>
            <span>San Pablo City</span>
          </div>
          <div className="resume-row">
            <span>Direction</span>
            <strong>Junior Android Engineer</strong>
            <span>Open to opportunities</span>
          </div>
        </div>
      </section>

      <section className="landing-cta" aria-labelledby="contact-title">
        <div className="section-label"><span>04</span><span>Let’s work together</span></div>
        <h2 id="contact-title">Have something<br />to build<span>?</span></h2>
        <a className="email-link" href="mailto:joshuaorlina08@gmail.com">joshuaorlina08@gmail.com <span aria-hidden="true">↗</span></a>
        <div className="social-row" aria-label="Social profiles">
          <a href="https://www.linkedin.com/in/joshua-orlina-549862363/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/jrofuoco" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://www.instagram.com/jrofuoco/" target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href="https://www.facebook.com/FuocoW" target="_blank" rel="noreferrer">Facebook ↗</a>
        </div>
      </section>

      <footer className="landing-footer">
        <span>Joshua Orlina · Android & web developer</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  )
}

function ContentPage({ page }: { page: keyof typeof pageContent }) {
  const content = pageContent[page]
  const [pinnedRow, setPinnedRow] = useState<number | null>(null)
  const [previewRow, setPreviewRow] = useState<number | null>(null)
  const detailTriggerRefs = useRef<Record<number, HTMLButtonElement | null>>({})
  const suppressNextHoverRef = useRef(false)

  const closeDetails = (index: number, suppressNextHover = false) => {
    suppressNextHoverRef.current = suppressNextHover
    setPinnedRow(null)
    setPreviewRow(null)
    requestAnimationFrame(() => detailTriggerRefs.current[index]?.focus())
  }

  return (
    <main className={`content-page page-${page}`}>
      <p className="eyebrow">{content.eyebrow}</p>
      <h1>{content.title}<span>.</span></h1>
      <div className="page-layout">
        <p className="page-intro">{content.intro}</p>
        <ol className="page-list">
          {content.rows.map((row, index) => {
            const activeRow = previewRow ?? pinnedRow
            const isExpanded = Boolean(row.details) && activeRow === index
            const detailsId = `row-details-${page}-${index}`

            return (
            <li
              key={row.label}
              className={`${row.details ? 'is-expandable' : ''} ${isExpanded ? 'is-expanded' : ''}`}
              onMouseEnter={() => {
                if (!row.details) return
                if (suppressNextHoverRef.current) {
                  suppressNextHoverRef.current = false
                  return
                }
                setPreviewRow(index)
              }}
              onMouseLeave={() => row.details && setPreviewRow(null)}
            >
              <span className="page-list-index">0{index + 1}</span>
              {row.details ? (
                <>
                  <button
                    ref={(node) => { detailTriggerRefs.current[index] = node }}
                    type="button"
                    className="page-list-trigger"
                    aria-expanded={isExpanded}
                    aria-controls={detailsId}
                    onClick={() => {
                      const shouldClose = pinnedRow === index
                      setPinnedRow(shouldClose ? null : index)
                      if (shouldClose) setPreviewRow(null)
                    }}
                  >
                    <span className="page-list-copy">
                      <strong>{row.label}</strong>
                      <small>{row.meta}</small>
                    </span>
                    <span className="page-list-toggle" aria-hidden="true">+</span>
                  </button>
                  <div
                    id={detailsId}
                    className="page-row-details"
                    role="region"
                    aria-label={`${row.label} role details`}
                    onKeyDown={(event) => event.key === 'Escape' && closeDetails(index)}
                  >
                    <div className="page-row-details-inner">
                      <button type="button" className="details-close" onClick={() => closeDetails(index, true)} aria-label={`Close ${row.label} details`}>
                        <span aria-hidden="true">×</span>
                      </button>
                      <div className="experience-meta">
                        <strong>{row.details.role}</strong>
                        <span>{row.details.period}</span>
                        <span>{row.details.location}</span>
                      </div>
                      <ul className="experience-points">
                        {row.details.achievements.map((achievement) => (
                          <li key={achievement}>{achievement}</li>
                        ))}
                      </ul>
                      <div className="skill-list" aria-label="Skills used">
                        {row.details.skills.map((skill) => <span key={skill}>{skill}</span>)}
                      </div>
                    </div>
                  </div>
                </>
              ) : row.href ? (
                <a className="page-list-link" href={row.href} target="_blank" rel="noreferrer">
                  <strong>{row.label}</strong>
                  <small>{row.meta}</small>
                </a>
              ) : (
                <span className="page-list-copy">
                  <strong>{row.label}</strong>
                  <small>{row.meta}</small>
                </span>
              )}
              {!row.details && <span aria-hidden="true">{row.href ? '↗' : '—'}</span>}
            </li>
            )
          })}
        </ol>
      </div>
    </main>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <div className="app-shell">
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <TileMenu open={menuOpen} close={() => setMenuOpen(false)} />
      <Routes>
        <Route path="/" element={<Home openMenu={() => setMenuOpen(true)} />} />
        <Route path="/projects" element={<ContentPage page="projects" />} />
        <Route path="/about" element={<ContentPage page="about" />} />
        <Route path="/services" element={<ContentPage page="services" />} />
        <Route path="/contact" element={<ContentPage page="contact" />} />
      </Routes>
    </div>
  )
}

export default App
