import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP)

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
  { path: '/projects', title: 'Projects.', index: '01', note: 'Selected work · 4 visual case studies', className: 'projects' },
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

type ProjectImage = {
  src: string
  alt: string
}

type ProjectGallerySection = {
  label: string
  images: ProjectImage[]
}

type Project = {
  title: string
  type: string
  description: string
  stack: string[]
  repo: string
  sections: ProjectGallerySection[]
}

const projects: Project[] = [
  {
    title: 'Water Meter Management System',
    type: 'Desktop, mobile & web system',
    description: 'A connected platform for recording monthly meter readings, calculating consumption, managing accounts, and producing billing information for administrators, field readers, and consumers.',
    stack: ['Java', 'JavaFX', 'PostgreSQL', 'Supabase', 'Machine Vision'],
    repo: 'https://github.com/jrofuoco/Water-Billing-App-ADMIN',
    sections: [
      {
        label: 'Admin panel',
        images: [
          { src: '/img/Water-Works/admin/login.jpg', alt: 'Water Meter admin login screen' },
          { src: '/img/Water-Works/admin/consumer_list.jpg', alt: 'Water Meter consumer list' },
          { src: '/img/Water-Works/admin/consumer_info.jpg', alt: 'Water Meter consumer information form' },
          { src: '/img/Water-Works/admin/meter_connection.jpg', alt: 'Water Meter connection management screen' },
          { src: '/img/Water-Works/admin/reading.jpg', alt: 'Water Meter reading screen' },
          { src: '/img/Water-Works/admin/charges.jpg', alt: 'Water Meter charges screen' },
          { src: '/img/Water-Works/admin/posting.jpg', alt: 'Water Meter posting screen' },
          { src: '/img/Water-Works/admin/bills_and_payment.jpg', alt: 'Water Meter bills and payment screen' },
          { src: '/img/Water-Works/admin/billing_summary.jpg', alt: 'Water Meter billing summary' },
          { src: '/img/Water-Works/admin/analytics.jpg', alt: 'Water Meter analytics dashboard' },
          { src: '/img/Water-Works/admin/user_management.jpg', alt: 'Water Meter user management screen' },
          { src: '/img/Water-Works/admin/brgy_list.jpg', alt: 'Water Meter barangay list' },
        ],
      },
      {
        label: 'Reader portal',
        images: [
          { src: '/img/Water-Works/reader/homepage.jpg', alt: 'Water Meter reader homepage on mobile' },
          { src: '/img/Water-Works/reader/dashboard.jpg', alt: 'Water Meter reader dashboard on mobile' },
          { src: '/img/Water-Works/reader/list_of_consumers.jpg', alt: 'Water Meter reader consumer list on mobile' },
          { src: '/img/Water-Works/reader/readingpage.jpg', alt: 'Water Meter reader entry page on mobile' },
        ],
      },
      {
        label: 'Consumer portal',
        images: [
          { src: '/img/Water-Works/consumer/login.jpg', alt: 'Water Meter consumer login on mobile' },
          { src: '/img/Water-Works/consumer/homepage.jpg', alt: 'Water Meter consumer homepage on mobile' },
        ],
      },
    ],
  },
  {
    title: 'Audit Portal',
    type: 'Internal web application',
    description: 'A web portal that streamlines audit workflows through real-time submissions, review tracking, meetings, leaderboards, and focused user profiles.',
    stack: ['PHP', 'Laravel', 'MySQL'],
    repo: 'https://github.com/jrofuoco/Audit-Portal',
    sections: [
      {
        label: 'System screens',
        images: [
          { src: '/img/audit-portal/homepage.jpg', alt: 'Audit Portal homepage' },
          { src: '/img/audit-portal/fyp.jpg', alt: 'Audit Portal FYP screen' },
          { src: '/img/audit-portal/fyp1.jpg', alt: 'Audit Portal FYP detail screen' },
          { src: '/img/audit-portal/meeting.jpg', alt: 'Audit Portal meeting screen on mobile' },
          { src: '/img/audit-portal/meeting1.jpg', alt: 'Audit Portal meeting detail screen' },
          { src: '/img/audit-portal/leaderboard.jpg', alt: 'Audit Portal leaderboard' },
          { src: '/img/audit-portal/proffilepage.jpg', alt: 'Audit Portal profile page' },
        ],
      },
    ],
  },
  {
    title: 'PLSPCart',
    type: 'E-commerce platform',
    description: 'An online marketplace with separate administration and buyer experiences for product discovery, cart management, checkout, orders, and platform operations.',
    stack: ['PHP', 'MySQL', 'JavaScript'],
    repo: 'https://github.com/jrofuoco/PLSPCart',
    sections: [
      {
        label: 'Admin dashboard',
        images: [
          { src: '/img/plspcart/admin/Screenshot 2026-02-07 000636.png', alt: 'PLSPCart admin screen 1' },
          { src: '/img/plspcart/admin/Screenshot 2026-02-07 000640.png', alt: 'PLSPCart admin screen 2' },
          { src: '/img/plspcart/admin/Screenshot 2026-02-07 000643.png', alt: 'PLSPCart admin screen 3' },
          { src: '/img/plspcart/admin/Screenshot 2026-02-07 000647.png', alt: 'PLSPCart admin screen 4' },
          { src: '/img/plspcart/admin/Screenshot 2026-02-07 000651.png', alt: 'PLSPCart admin screen 5' },
          { src: '/img/plspcart/admin/Screenshot 2026-02-07 000700.png', alt: 'PLSPCart admin screen 6' },
          { src: '/img/plspcart/admin/Screenshot 2026-02-07 000704.png', alt: 'PLSPCart admin screen 7' },
        ],
      },
      {
        label: 'Buyer platform',
        images: [
          { src: '/img/plspcart/buyer/Screenshot 2026-02-07 000006.png', alt: 'PLSPCart buyer screen 1' },
          { src: '/img/plspcart/buyer/Screenshot 2026-02-07 000011.png', alt: 'PLSPCart buyer screen 2' },
          { src: '/img/plspcart/buyer/Screenshot 2026-02-07 000017.png', alt: 'PLSPCart buyer screen 3' },
          { src: '/img/plspcart/buyer/Screenshot 2026-02-07 000023.png', alt: 'PLSPCart buyer screen 4' },
          { src: '/img/plspcart/buyer/Screenshot 2026-02-07 000032.png', alt: 'PLSPCart buyer screen 5' },
          { src: '/img/plspcart/buyer/Screenshot 2026-02-07 000035.png', alt: 'PLSPCart buyer screen 6' },
          { src: '/img/plspcart/buyer/Screenshot 2026-02-07 000342.png', alt: 'PLSPCart buyer screen 7' },
          { src: '/img/plspcart/buyer/Screenshot 2026-02-07 000346.png', alt: 'PLSPCart buyer screen 8' },
          { src: '/img/plspcart/buyer/Screenshot 2026-02-07 000356.png', alt: 'PLSPCart buyer screen 9' },
          { src: '/img/plspcart/buyer/Screenshot 2026-02-07 000414.png', alt: 'PLSPCart buyer screen 10' },
        ],
      },
    ],
  },
  {
    title: 'SciLab Reservation System',
    type: 'Laboratory operations platform',
    description: 'A multi-role science laboratory system for reservations, inventory, approvals, room monitoring, and accountability across administrators, professors, and students.',
    stack: ['PHP', 'MySQL', 'Bootstrap'],
    repo: 'https://github.com/jrofuoco/scilab3.0',
    sections: [
      {
        label: 'Admin dashboard',
        images: [
          { src: '/img/SciLab/admin/dashboard.png', alt: 'SciLab administrator dashboard' },
          { src: '/img/SciLab/admin/inventory_admin.png', alt: 'SciLab administrator inventory' },
          { src: '/img/SciLab/admin/manage_professor_admin.png', alt: 'SciLab professor management' },
          { src: '/img/SciLab/admin/ongoing_reservation_admin.png', alt: 'SciLab ongoing reservations' },
          { src: '/img/SciLab/admin/professor_approval_admin.png', alt: 'SciLab professor approvals' },
          { src: '/img/SciLab/admin/reserve_history_admin.png', alt: 'SciLab reservation history' },
          { src: '/img/SciLab/admin/room_monitor_admin.png', alt: 'SciLab room monitor' },
          { src: '/img/SciLab/admin/student_approval_admin.png', alt: 'SciLab student approvals' },
          { src: '/img/SciLab/admin/unreturned_item_admin.png', alt: 'SciLab unreturned items' },
        ],
      },
      {
        label: 'Professor portal',
        images: [
          { src: '/img/SciLab/professor/dashboard_student_professor.png', alt: 'SciLab professor dashboard' },
          { src: '/img/SciLab/professor/history_professor.png', alt: 'SciLab professor history' },
          { src: '/img/SciLab/professor/pending_professor.png', alt: 'SciLab professor pending reservations' },
          { src: '/img/SciLab/professor/reservation_professor.png', alt: 'SciLab professor reservation screen' },
          { src: '/img/SciLab/professor/students_with_unra.png', alt: 'SciLab students with unreturned items' },
          { src: '/img/SciLab/professor/student_approval_professor.png', alt: 'SciLab professor student approval screen' },
          { src: '/img/SciLab/professor/student_approved_professor.png', alt: 'SciLab approved students screen' },
        ],
      },
      {
        label: 'Student portal',
        images: [
          { src: '/img/SciLab/student/ladningpage.png', alt: 'SciLab student landing page' },
          { src: '/img/SciLab/student/login.png', alt: 'SciLab student login' },
          { src: '/img/SciLab/student/register.png', alt: 'SciLab student registration' },
          { src: '/img/SciLab/student/createreserve.png', alt: 'SciLab create reservation screen' },
          { src: '/img/SciLab/student/reservation.png', alt: 'SciLab student reservations' },
          { src: '/img/SciLab/student/pendingapproval.png', alt: 'SciLab pending approval screen' },
          { src: '/img/SciLab/student/history.png', alt: 'SciLab student reservation history' },
        ],
      },
    ],
  },
  {
    title: 'Kids E',
    type: 'Educational web game',
    description: 'An interactive vocabulary and spelling experience designed to help children practice foundational English skills.',
    stack: ['JavaScript', 'HTML5', 'CSS3'],
    repo: 'https://github.com/jrofuoco/Kids-E-Language-Learning',
    sections: [],
  },
  {
    title: 'Gym Guide',
    type: 'Mobile fitness application',
    description: 'A mobile workout companion with exercise instructions and structured fitness routines that help users stay consistent.',
    stack: ['React Native', 'Firebase', 'Node.js'],
    repo: 'https://github.com/jrofuoco/Gym-Guide',
    sections: [],
  },
]

function ProjectsPage() {
  const pageRef = useRef<HTMLElement | null>(null)
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const viewerBackRef = useRef<HTMLButtonElement | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)
  const activeProject = activeProjectIndex === null ? null : projects[activeProjectIndex]
  const activeImages = activeProject?.sections.flatMap((section) => section.images.map((image) => ({ ...image, section: section.label }))) ?? []

  useGSAP(() => {
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power2.out' } })
        .from('.projects-hero .eyebrow', { opacity: 0, y: 8, duration: .35 })
        .from('.projects-hero h1', { opacity: 0, y: 18, duration: .7 }, '-=.16')
        .from('.projects-lead > *', { opacity: 0, y: 12, duration: .45, stagger: .08 }, '-=.3')

      gsap.utils.toArray<HTMLElement>('.project-entry').forEach((entry) => {
        gsap.from(entry.children, {
          opacity: 0,
          y: 14,
          duration: .48,
          stagger: .055,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 88%',
            end: 'bottom 12%',
            once: true,
            toggleActions: 'play none none none',
          },
        })
      })
    })
    return () => motion.revert()
  }, { scope: pageRef })

  useGSAP(() => {
    if (!activeProject) return
    const dialog = dialogRef.current
    const backdrop = dialog?.parentElement
    if (!dialog || !backdrop) return
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline()
        .fromTo(backdrop, { autoAlpha: 0 }, { autoAlpha: 1, duration: .2, ease: 'power1.out' })
        .fromTo(dialog, { autoAlpha: 0, y: 16, scale: .985 }, { autoAlpha: 1, y: 0, scale: 1, duration: .38, ease: 'power3.out' }, 0)
    })
    return () => motion.revert()
  }, { dependencies: [activeProjectIndex], revertOnUpdate: true })

  useGSAP(() => {
    if (selectedImageIndex === null) return
    const figure = dialogRef.current?.querySelector('.gallery-viewer figure')
    if (!figure) return
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(figure, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .28, ease: 'power1.out' })
    })
    return () => motion.revert()
  }, { dependencies: [selectedImageIndex], revertOnUpdate: true })

  const openGallery = (index: number, trigger: HTMLButtonElement) => {
    lastTriggerRef.current = trigger
    setActiveProjectIndex(index)
    setSelectedImageIndex(null)
  }

  const closeGallery = () => {
    setActiveProjectIndex(null)
    setSelectedImageIndex(null)
    requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }

  useEffect(() => {
    if (activeProjectIndex === null) return
    const previousOverflow = document.body.style.overflow
    const smoother = ScrollSmoother.get()
    smoother?.paused(true)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeButtonRef.current?.focus())
    return () => {
      document.body.style.overflow = previousOverflow
      smoother?.paused(false)
    }
  }, [activeProjectIndex])

  useEffect(() => {
    if (selectedImageIndex !== null) requestAnimationFrame(() => viewerBackRef.current?.focus())
  }, [selectedImageIndex])

  useEffect(() => {
    if (activeProjectIndex === null) return
    const handleGalleryKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (selectedImageIndex !== null) setSelectedImageIndex(null)
        else closeGallery()
      } else if (selectedImageIndex !== null && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault()
        const direction = event.key === 'ArrowRight' ? 1 : -1
        setSelectedImageIndex((selectedImageIndex + direction + activeImages.length) % activeImages.length)
      }
    }
    document.addEventListener('keydown', handleGalleryKeys)
    return () => document.removeEventListener('keydown', handleGalleryKeys)
  }, [activeImages.length, activeProjectIndex, selectedImageIndex])

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !dialogRef.current) return
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute('hidden'))
    if (!focusable.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <main ref={pageRef} className="projects-page">
      <header className="projects-hero">
        <p className="eyebrow">Selected work · 2024—2026</p>
        <h1>Projects<span>.</span></h1>
        <div className="projects-lead">
          <p>Practical systems designed around the people who operate them—from field readers and laboratory teams to online buyers.</p>
          <span>{projects.length.toString().padStart(2, '0')} projects · 65 recovered screens</span>
        </div>
      </header>

      <section className="project-index" aria-label="Project collection">
        {projects.map((project, index) => {
          const imageCount = project.sections.reduce((count, section) => count + section.images.length, 0)
          const cover = project.sections[0]?.images[0]
          return (
            <article className="project-entry" key={project.title}>
              <div className="project-entry-meta">
                <span>0{index + 1}</span>
                <span>{project.type}</span>
              </div>
              <div className="project-entry-copy">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <ul className="project-stack" aria-label={`${project.title} technologies`}>
                  {project.stack.map((technology) => <li key={technology}>{technology}</li>)}
                </ul>
                <div className="project-links">
                  <a href={project.repo} target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a>
                  {imageCount > 0 && <span>{imageCount.toString().padStart(2, '0')} screens</span>}
                </div>
              </div>
              {cover ? (
                <button className="project-preview" type="button" onClick={(event) => openGallery(index, event.currentTarget)} aria-label={`Open ${project.title} gallery with ${imageCount} images`}>
                  <img src={cover.src} alt="" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                  <span className="project-preview-action">View gallery <i aria-hidden="true">↗</i></span>
                </button>
              ) : (
                <div className="project-preview project-preview-empty" aria-label="No recovered screenshots available">
                  <span>Gallery<br />not available</span>
                  <i aria-hidden="true">{String(index + 1).padStart(2, '0')}</i>
                </div>
              )}
            </article>
          )
        })}
      </section>

      {activeProject && createPortal((
        <div className="gallery-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && closeGallery()}>
          <div ref={dialogRef} className="project-gallery" role="dialog" aria-modal="true" aria-labelledby="gallery-title" onKeyDown={handleDialogKeyDown}>
            <header className="gallery-header">
              <div>
                <span className="gallery-kicker">Project archive · {activeImages.length.toString().padStart(2, '0')} screens</span>
                <h2 id="gallery-title">{activeProject.title}</h2>
              </div>
              <button ref={closeButtonRef} type="button" className="gallery-close" onClick={closeGallery} aria-label={`Close ${activeProject.title} gallery`}>
                <span aria-hidden="true">×</span>
              </button>
            </header>

            {selectedImageIndex === null ? (
              <div className="gallery-scroll">
                {activeProject.sections.map((section) => (
                  <section className="gallery-section" key={section.label} aria-labelledby={`gallery-${section.label.replace(/\s+/g, '-').toLowerCase()}`}>
                    <div className="gallery-section-heading">
                      <h3 id={`gallery-${section.label.replace(/\s+/g, '-').toLowerCase()}`}>{section.label}</h3>
                      <span>{section.images.length.toString().padStart(2, '0')}</span>
                    </div>
                    <div className="gallery-grid">
                      {section.images.map((image) => {
                        const globalIndex = activeImages.findIndex((candidate) => candidate.src === image.src)
                        return (
                          <button key={image.src} type="button" className="gallery-thumb" onClick={() => setSelectedImageIndex(globalIndex)} aria-label={`Enlarge ${image.alt}`}>
                            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                            <span aria-hidden="true">View</span>
                          </button>
                        )
                      })}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="gallery-viewer">
                <div className="viewer-toolbar">
                  <button ref={viewerBackRef} type="button" onClick={() => setSelectedImageIndex(null)}>← Back to gallery</button>
                  <span>{String(selectedImageIndex + 1).padStart(2, '0')} / {String(activeImages.length).padStart(2, '0')}</span>
                </div>
                <figure>
                  <img src={activeImages[selectedImageIndex].src} alt={activeImages[selectedImageIndex].alt} />
                  <figcaption><span>{activeImages[selectedImageIndex].section}</span>{activeImages[selectedImageIndex].alt}</figcaption>
                </figure>
                <div className="viewer-controls">
                  <button type="button" onClick={() => setSelectedImageIndex((selectedImageIndex - 1 + activeImages.length) % activeImages.length)} aria-label="Previous image">←</button>
                  <button type="button" onClick={() => setSelectedImageIndex((selectedImageIndex + 1) % activeImages.length)} aria-label="Next image">→</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ), document.body)}
    </main>
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
  const homeRef = useRef<HTMLElement | null>(null)
  const today = new Date()
  const birthdayPassed = today.getMonth() > 7 || (today.getMonth() === 7 && today.getDate() >= 8)
  const age = today.getFullYear() - 2002 - (birthdayPassed ? 0 : 1)

  useGSAP(() => {
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power2.out' } })
        .from('.hero-meta > *', { opacity: 0, y: 8, duration: .32, stagger: .05 })
        .from('.hero-heading > p', { opacity: 0, y: 10, duration: .38 }, '-=.12')
        .from('.hero-heading h1', { opacity: 0, y: 20, duration: .72 }, '-=.22')
        .from('.hero-bottom > p', { opacity: 0, y: 12, duration: .45 }, '-=.28')
        .from('.hero-actions > *', { opacity: 0, y: 10, duration: .36, stagger: .06 }, '-=.28')
        .from('.scroll-cue', { opacity: 0, y: 8, duration: .3 }, '-=.16')

      const reveals: Array<[string, string]> = [
        ['.intro-content', '.intro-content > *'],
        ['.fact-grid', '.fact-grid > *'],
        ['.landing-services', '.section-heading > *, .service-grid > *'],
        ['.landing-resume', '.landing-resume h2, .resume-row'],
        ['.landing-cta', '.landing-cta h2, .email-link, .social-row'],
      ]

      reveals.forEach(([trigger, targets]) => {
        gsap.from(targets, {
          opacity: 0,
          y: 14,
          duration: .46,
          stagger: .055,
          ease: 'power1.out',
          scrollTrigger: {
            trigger,
            start: 'top 86%',
            end: 'bottom 14%',
            once: true,
            toggleActions: 'play none none none',
          },
        })
      })
    })
    return () => motion.revert()
  }, { scope: homeRef })

  return (
    <main ref={homeRef} className="landing-page">
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
  const contentRef = useRef<HTMLElement | null>(null)
  const content = pageContent[page]
  const [pinnedRow, setPinnedRow] = useState<number | null>(null)
  const [previewRow, setPreviewRow] = useState<number | null>(null)
  const detailTriggerRefs = useRef<Record<number, HTMLButtonElement | null>>({})
  const suppressNextHoverRef = useRef(false)

  useGSAP(() => {
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power2.out' } })
        .from('.eyebrow', { opacity: 0, y: 8, duration: .32 })
        .from('h1', { opacity: 0, y: 18, duration: .68 }, '-=.16')
        .from('.page-intro', { opacity: 0, y: 12, duration: .42 }, '-=.3')
        .from('.page-list > li', { opacity: 0, y: 9, duration: .34, stagger: .045 }, '-=.28')
    })
    return () => motion.revert()
  }, { scope: contentRef, dependencies: [page], revertOnUpdate: true })

  const closeDetails = (index: number, suppressNextHover = false) => {
    suppressNextHoverRef.current = suppressNextHover
    setPinnedRow(null)
    setPreviewRow(null)
    requestAnimationFrame(() => detailTriggerRefs.current[index]?.focus())
  }

  return (
    <main ref={contentRef} className={`content-page page-${page}`}>
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

  useGSAP(() => {
    const motion = gsap.matchMedia()
    motion.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)', () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: .85,
        speed: .94,
        effects: false,
        normalizeScroll: false,
      })
      return () => smoother.kill()
    })
    return () => motion.revert()
  })

  useEffect(() => {
    const smoother = ScrollSmoother.get()
    smoother?.paused(menuOpen)
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
      if (menuOpen) smoother?.paused(false)
    }
  }, [menuOpen])

  useEffect(() => setMenuOpen(false), [location.pathname])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const smoother = ScrollSmoother.get()
      if (smoother) smoother.scrollTo(0, false)
      else window.scrollTo(0, 0)
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(frame)
  }, [location.pathname])

  return (
    <div className="app-shell">
      <SiteHeader menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <TileMenu open={menuOpen} close={() => setMenuOpen(false)} />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Routes>
            <Route path="/" element={<Home openMenu={() => setMenuOpen(true)} />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<ContentPage page="about" />} />
            <Route path="/services" element={<ContentPage page="services" />} />
            <Route path="/contact" element={<ContentPage page="contact" />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
