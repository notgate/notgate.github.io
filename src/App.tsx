import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion, useTransform, useMotionValue } from 'framer-motion'
import Lenis from 'lenis'

declare global {
  interface Window {
    UnicornStudio?: {
      init: (config: {
        element: HTMLElement
        scale?: number
        dpi?: number
        fps?: number
        lazyLoad?: boolean
      }) => { destroy?: () => void }
    }
  }
}

const ease = [0.22, 1, 0.36, 1] as const
const heroImage = '/assets/ascii/asciiportrait-transparent.png'

/* ─── Lenis smooth scroll ─── */
function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    })
    let raf = 0
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    lenis.on('scroll', () => window.dispatchEvent(new Event('scroll')))
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])
}

/* ─── Story background ─── */
const storyPalette = ['#0a0a0a', '#0d0d0d', '#080808', '#0c0c0c', '#0a0a0a']

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i)
  if (!m) return [0, 0, 0]
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
}

function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a)
  const [br, bg, bb] = hexToRgb(b)
  return `rgb(${Math.round(ar + (br - ar) * t)}, ${Math.round(ag + (bg - ag) * t)}, ${Math.round(ab + (bb - ab) * t)})`
}

function StoryBackground({ progress }: { progress: any }) {
  const bg = useTransform(progress, (v: number) => {
    const segs = storyPalette.length - 1
    const idx = v * segs
    const i = Math.floor(idx)
    const t = idx - i
    if (i >= segs) return storyPalette[storyPalette.length - 1]
    return lerpColor(storyPalette[i], storyPalette[i + 1], t)
  })
  return <motion.div className="story-bg" style={{ backgroundColor: bg }} aria-hidden="true" />
}

/* ─── Logo / Nav ─── */
function MenuIcon({ open = false }: { open?: boolean }) {
  return (
    <span className={`menu-glyph ${open ? 'is-open' : ''}`} aria-hidden="true">
      <span /><span />
    </span>
  )
}

function SocialIcon({ name }: { name: 'github' | 'linkedin' | 'x' }) {
  if (name === 'github') return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.25c-5.45 0-9.87 4.42-9.87 9.87 0 4.36 2.83 8.05 6.75 9.35.49.09.67-.21.67-.47v-1.72c-2.75.6-3.33-1.18-3.33-1.18-.45-1.14-1.1-1.44-1.1-1.44-.9-.61.07-.6.07-.6.99.07 1.51 1.02 1.51 1.02.88 1.5 2.3 1.07 2.86.82.09-.64.34-1.07.62-1.32-2.19-.25-4.5-1.1-4.5-4.88 0-1.08.39-1.96 1.02-2.65-.1-.25-.44-1.26.1-2.61 0 0 .83-.27 2.72 1.01.79-.22 1.64-.33 2.48-.33.84 0 1.69.11 2.48.33 1.89-1.28 2.72-1.01 2.72-1.01.54 1.35.2 2.36.1 2.61.64.69 1.02 1.57 1.02 2.65 0 3.79-2.31 4.62-4.51 4.87.35.31.67.91.67 1.84V21c0 .26.18.57.68.47a9.88 9.88 0 0 0 6.74-9.35c0-5.45-4.42-9.87-9.87-9.87Z" /></svg>
  )
  if (name === 'linkedin') return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.36 8.75h3.18v10.2H5.36V8.75Zm1.6-5.07c1.02 0 1.85.83 1.85 1.85s-.83 1.85-1.85 1.85a1.85 1.85 0 1 1 0-3.7Zm3.56 5.07h3.05v1.4h.04c.42-.8 1.46-1.65 3-1.65 3.22 0 3.81 2.12 3.81 4.87v5.58h-3.18v-4.95c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.62v5.03h-3.17V8.75Z" /></svg>
  )
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.28 10.16 22.2 1h-1.88l-6.88 7.96L7.96 1H1.63l8.3 12.05L1.63 22.65h1.88l7.25-8.39 5.79 8.39h6.33l-8.6-12.49Zm-2.57 2.97-.84-1.2L4.18 2.42h2.88l5.4 7.68.84 1.2 7.02 9.98h-2.88l-5.73-8.15Z" /></svg>
  )
}

function PaullLogo() {
  return (
    <svg className="paull-logo-svg" width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M21.6268 12.1896V7.07785V0H-5.72205e-06L21.6268 27.9182V20.0539L11.7964 7.07785H17.3014L21.6268 12.1896Z" fill="currentColor"/>
      <path d="M0.786438 16.6313V20.3751V25.5589H17.3014L0.786438 5.11178V10.8715L8.29325 20.3751H4.08943L0.786438 16.6313Z" fill="currentColor"/>
    </svg>
  )
}

function NavMark() {
  return (
    <a className="nav-mark" href="#top" aria-label="Paul home">
      <PaullLogo />
      <span className="mark-word">Paull</span>
      <span className="mark-badge">R</span>
    </a>
  )
}

function PageIntro() {
  return (
    <motion.div className="page-intro" initial={{ y: 0, clipPath: 'inset(0% 0% 0% 0%)' }} animate={{ y: '-102%', clipPath: 'inset(0% 0% 100% 0%)' }} transition={{ duration: 1.08, delay: 0.34, ease }} aria-hidden="true">
      <motion.div className="intro-word intro-logo-mark" initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }} animate={{ opacity: [0, 1, 1, 0], y: [22, 0, 0, -18], filter: ['blur(10px)', 'blur(0px)', 'blur(0px)', 'blur(8px)'] }} transition={{ duration: 1.0, ease }}>
        <PaullLogo />
        <span className="mark-word">Paull</span>
        <span className="mark-badge">R</span>
      </motion.div>
      <div className="intro-scan" />
    </motion.div>
  )
}

function Navbar({ menuOpen, onMenuToggle }: { menuOpen: boolean; onMenuToggle: () => void }) {
  return (
    <motion.header className={`topbar ${menuOpen ? 'menu-is-open' : ''}`} initial={{ opacity: 0, y: -18, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.72, delay: 0.62, ease }}>
      <nav className="nav-shell" aria-label="Primary navigation">
        <NavMark />
        <div className="nav-actions">
          <a className="connect-pill" href="mailto:paulie@gmail.com">Let&apos;s connect</a>
          <button className={`menu-pill ${menuOpen ? 'is-open' : ''}`} type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={onMenuToggle}>
            <span className="menu-label">{menuOpen ? 'Close' : 'Menu'}</span>
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>
    </motion.header>
  )
}

const menuLinks = [
  { label: 'Works', href: '#works' },
  { label: 'About me', href: '#about' },
  { label: 'Contact', href: 'mailto:paulie@gmail.com' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/notgate', icon: 'github' as const },
  { label: 'LinkedIn', href: '#top', icon: 'linkedin' as const },
  { label: 'X / Twitter', href: '#top', icon: 'x' as const },
]

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside className="menu-overlay" aria-modal="true" role="dialog" aria-label="Site menu" initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.98 }} animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }} exit={{ clipPath: 'inset(0 0 100% 0)', opacity: 0.98 }} transition={{ duration: 0.56, ease }}>
          <div className="menu-noise" aria-hidden="true" />
          <div className="menu-overlay-inner">
            <div className="menu-overlay-top">
              <NavMark />
              <button className="menu-close-button" type="button" onClick={onClose} aria-label="Close menu">
                <span>Close</span><MenuIcon open />
              </button>
            </div>
            <nav className="menu-main-links" aria-label="Menu navigation">
              {menuLinks.map((link, index) => (
                <motion.a key={link.label} href={link.href} onClick={onClose} initial={{ opacity: 0, y: 52, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.72, delay: 0.12 + index * 0.08, ease }}>
                  <span className="menu-link-label">{link.label}</span>
                </motion.a>
              ))}
            </nav>
            <motion.div className="menu-contact-panel" initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.54, delay: 0.22, ease }}>
              <p className="menu-contact-label">Contact</p>
              <a className="menu-contact-email" href="mailto:paulie@gmail.com" onClick={onClose}>paulie@gmail.com</a>
              <div className="menu-contact-actions">
                <a href="#works" onClick={onClose}>View work</a>
                <a href="mailto:paulie@gmail.com" onClick={onClose}>Start a build</a>
              </div>
            </motion.div>
            <div className="menu-footer-row">
              <p>Socials</p>
              <div className="social-icon-row">
                {socialLinks.map((link) => (
                  <a href={link.href} key={link.label} onClick={onClose} aria-label={link.label} title={link.label}>
                    <SocialIcon name={link.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

/* ─── Hero Typewriter ─── */
function useTypewriter(entries: { word: string; article: string }[], opts?: { typeMin?: number; typeMax?: number; deleteMin?: number; deleteMax?: number; holdTime?: number }) {
  const { typeMin = 85, typeMax = 165, deleteMin = 55, deleteMax = 105, holdTime = 2800 } = opts ?? {}
  const [text, setText] = useState(entries[0].word)
  const [article, setArticle] = useState(entries[0].article)
  const idxRef = useRef(0)
  const charRef = useRef(entries[0].word.length)
  const rand = (min: number, max: number) => Math.floor(min + Math.random() * (max - min))

  useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    const run = () => {
      const entry = entries[idxRef.current % entries.length]
      timer = setTimeout(() => {
        if (cancelled) return
        const deleteOne = () => {
          if (cancelled) return
          if (charRef.current > 0) {
            charRef.current--
            setText(entry.word.slice(0, charRef.current))
            timer = setTimeout(deleteOne, rand(deleteMin, deleteMax))
          } else {
            idxRef.current++
            const next = entries[idxRef.current % entries.length]
            setArticle(next.article)
            timer = setTimeout(() => {
              if (cancelled) return
              const typeOne = () => {
                if (cancelled) return
                const current = entries[idxRef.current % entries.length]
                if (charRef.current < current.word.length) {
                  charRef.current++
                  setText(current.word.slice(0, charRef.current))
                  const base = rand(typeMin, typeMax)
                  timer = setTimeout(typeOne, Math.random() < 0.12 ? base + rand(120, 280) : base)
                } else { timer = setTimeout(run, holdTime) }
              }
              typeOne()
            }, 350)
          }
        }
        deleteOne()
      }, holdTime)
    }
    run()
    return () => { cancelled = true; clearTimeout(timer) }
  }, [entries, typeMin, typeMax, deleteMin, deleteMax, holdTime])

  return { text, article }
}

const heroWords = [
  { word: 'engineer', article: 'an' },
  { word: 'builder', article: 'a' },
  { word: 'systems thinker', article: 'a' },
  { word: 'problem solver', article: 'a' },
]

function HeroTypewriter() {
  const { text, article } = useTypewriter(heroWords)
  return (
    <span className="hero-typewriter-wrap" aria-label={`${article} ${text}`}>
      <span className="tw-article" aria-hidden="true">{article}</span>
      <span className="tw-live-text" aria-hidden="true">{text}</span>
      <span className="tw-cursor" aria-hidden="true" />
    </span>
  )
}

/* ═══════════════════════════════════════════════════
   SCROLL STORY STAGE
   A single sticky viewport containing all sections.
   Each section is absolutely positioned and driven by
   scroll progress through the tall outer container.
   ═══════════════════════════════════════════════════ */

function HeroStage({ progress, active }: { progress: any; active: boolean }) {
  const unicornRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let destroyed = false
    let interval: ReturnType<typeof setInterval>
    const init = () => {
      if (destroyed || typeof window.UnicornStudio === 'undefined') return
      try { window.UnicornStudio.init() } catch (e) { console.warn('Unicorn Studio init failed', e) }
    }
    if (typeof window.UnicornStudio !== 'undefined') { init() }
    else {
      interval = setInterval(() => {
        if (typeof window.UnicornStudio !== 'undefined') { clearInterval(interval); init() }
      }, 100)
      setTimeout(() => clearInterval(interval), 5000)
    }
    return () => { destroyed = true; if (interval) clearInterval(interval); try { window.UnicornStudio?.destroy?.() } catch {} }
  }, [])

  // Hero occupies 0% → 20% of scroll
  const contentY = useTransform(progress, [0, 0.15, 0.2], [0, -150, -300])
  const contentOpacity = useTransform(progress, [0, 0.12, 0.2], [1, 1, 0])
  const contentScale = useTransform(progress, [0, 0.2], [1, 0.88])
  const contentBlur = useTransform(progress, [0, 0.12, 0.2], ['blur(0px)', 'blur(0px)', 'blur(24px)'])
  const portraitY = useTransform(progress, [0, 0.2], [0, -250])
  const portraitScale = useTransform(progress, [0, 0.2], [1, 1.25])
  const portraitOpacity = useTransform(progress, [0, 0.12, 0.2], [1, 1, 0])
  const shaderOpacity = useTransform(progress, [0, 0.15], [0.5, 0])
  const sectionOpacity = useTransform(progress, [0, 0.18, 0.2], [1, 1, 0])

  return (
    <motion.section className={`story-stage-section story-hero ${active ? 'is-active' : ''}`} id="top" style={{ opacity: sectionOpacity }}>
      <motion.div ref={unicornRef} className="hero-unicorn-scene" aria-hidden="true"
        data-us-project="BX9TXhOJpVNQUH431cnU" data-us-scale="1" data-us-dpi="1.5" data-us-fps="60" data-us-lazyload="false"
        style={{ opacity: shaderOpacity }}
      />
      <motion.div className="hero-composition"
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale, filter: contentBlur }}
      >
        <motion.div className="hero-copy" initial={{ opacity: 0, x: -42, filter: 'blur(14px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ duration: 0.92, delay: 0.78, ease }}>
          <h1 className="hero-title">
            <span className="title-line title-line-a">I&apos;m Paul,</span>
            <span className="title-line title-line-b"><HeroTypewriter />, based in</span>
            <span className="title-line title-line-c">the U.S</span>
          </h1>
        </motion.div>
        <motion.figure className="hero-portrait" initial={{ opacity: 0, scale: 1.08, y: 18, clipPath: 'inset(30% 22% 30% 22%)' }} animate={{ opacity: 1, scale: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }} transition={{ duration: 1.28, delay: 0.5, ease }} style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}>
          <img src={heroImage} alt="ASCII portrait of Paul" />
        </motion.figure>
        <motion.aside className="hero-side" aria-label="Hero links" initial={{ opacity: 0, x: 32, filter: 'blur(10px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} transition={{ duration: 0.78, delay: 0.92, ease }}>
          <nav className="hero-link-row" aria-label="Section links">
            <a href="#works">Works</a>
            <a href="#about">About me</a>
            <a href="mailto:paulie@gmail.com">Contact</a>
          </nav>
        </motion.aside>
        <motion.a className="hero-email" href="mailto:paulie@gmail.com" initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.68, delay: 1.04, ease }}>
          paulie@gmail.com
        </motion.a>
      </motion.div>
    </motion.section>
  )
}

/* ─── About Stage ─── */
const aboutText = "I'm Paul, an electrical and computer engineer based in the U.S. I build practical systems across FPGA logic, embedded sensing, browser tooling, and networked software. My work sits at the edge between hardware and interface design: measuring real signals, debugging layered systems, and turning low-level technical problems into tools that feel clean, fast, and understandable."

function clamp01(v: number) { return Math.min(1, Math.max(0, v)) }

function ScrollTypewriterStage({ text, progress, start, end }: { text: string; progress: any; start: number; end: number }) {
  const chars = Array.from(text)
  const totalChars = chars.length
  const visible = useTransform(progress, (v: number) => {
    const local = clamp01((v - start) / (end - start))
    return Math.floor(local * (totalChars + 2))
  })
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    const unsub = visible.on('change', (v: number) => setVisibleCount(v))
    return () => unsub()
  }, [visible])

  let charIndex = 0

  return (
    <p className="about-story-text typewriter-story" aria-label={text}>
      {text.split(' ').map((word, wordIndex, words) => (
        <span className="tw-word" aria-hidden="true" key={`w-${wordIndex}`}>
          {Array.from(word).map((char, ci) => {
            const idx = charIndex++
            return (
              <span
                className={`tw-char ${idx < visibleCount ? 'is-revealed' : ''}`}
                key={`c-${wordIndex}-${ci}`}
                style={{ '--i': idx } as CSSProperties}
              >{char}</span>
            )
          })}
          {wordIndex < words.length - 1 && (() => {
            const si = charIndex++
            return <span className={`tw-space ${si < visibleCount ? 'is-revealed' : ''}`} aria-hidden="true" key={`s-${wordIndex}`}>&nbsp;</span>
          })()}
        </span>
      ))}
    </p>
  )
}

function AboutStage({ progress }: { progress: any }) {
  // About: 15% → 35%. Typewriter runs 18% → 30%.
  const y = useTransform(progress, [0.15, 0.22, 0.32, 0.35], [100, 0, 0, -150])
  const opacity = useTransform(progress, [0.15, 0.22, 0.32, 0.35], [0, 1, 1, 0])
  const kickerX = useTransform(progress, [0.15, 0.22], [-40, 0])
  const kickerOpacity = useTransform(progress, [0.15, 0.2], [0, 1])

  return (
    <section className="story-stage-section story-about" id="about">
      <motion.div className="about-stage-inner" style={{ y, opacity }}>
        <motion.div className="section-kicker about-kicker" style={{ x: kickerX, opacity: kickerOpacity }}>
          <span>01</span><span>About</span>
        </motion.div>
        <ScrollTypewriterStage text={aboutText} progress={progress} start={0.18} end={0.3} />
      </motion.div>
    </section>
  )
}

/* ─── Projects Stage ─── */
const projects = [
  { number: '01', title: 'Akamai BMP Solver', description: 'Reverse-engineered Akamai Bot Manager Protocol to generate valid sensor data for headless browser automation. Built a fingerprinting engine that computes browser characteristics and solves the BMP challenge in real time.', image: '/assets/stock/project-akamai-bmp.jpg', tags: ['Security', 'Bot Detection', 'Reverse Engineering'], date: '2025', role: 'Security Systems', category: 'Software' },
  { number: '02', title: 'Switch Mod Chip', description: 'Designed a custom modchip for the Nintendo Switch using an RP2040 microcontroller. Implemented a payload delivery system that intercepts the boot process to enable custom firmware loading.', image: '/assets/stock/project-switch-modchip.jpg', tags: ['Hardware', 'Embedded', 'Modchip', 'Switch'], date: '2024', role: 'Hardware Systems', category: 'Hardware' },
  { number: '03', title: 'ASR Headphone Model', description: 'Trained an automatic speech recognition model fine-tuned for headphone microphone input with background noise. Achieved real-time transcription latency under 200ms using quantized inference on edge hardware.', image: '/assets/stock/project-asr-headphones.jpg', tags: ['ML', 'Audio', 'ASR', 'Model Training'], date: '2024', role: 'ML / Audio', category: 'Software' },
  { number: '04', title: 'Vibration Sensor Model', description: 'Built an IoT vibration monitoring node using an MPU-6050 accelerometer and ESP32. Developed a fault-detection model that classifies machine vibration patterns to predict bearing failure.', image: '/assets/stock/project-vibration-sensor.jpg', tags: ['Hardware', 'IoT', 'Sensors', 'Vibration'], date: '2023', role: 'Hardware Systems', category: 'Hardware' },
]

function ProjectCardStage({ project, index, progress }: { project: (typeof projects)[number]; index: number; progress: any }) {
  // Projects occupy 36% → 58% of scroll
  const baseDelay = 0.36 + index * 0.008
  const y = useTransform(progress, [baseDelay, baseDelay + 0.03, 0.52, 0.58], [80, 0, 0, -100])
  const opacity = useTransform(progress, [baseDelay, baseDelay + 0.03, 0.52, 0.58], [0, 1, 1, 0])

  return (
    <motion.div className="work-item" aria-label={project.title} style={{ y, opacity }}>
      <img src={project.image} alt={project.title} className="work-item-img" loading="lazy" />
      <div className="work-item-overlay">
        <div className="work-item-label">
          <span className="work-item-tag-line"><span className="work-item-tag-text">{project.category}</span></span>
          <div className="work-item-info">
            <span className="work-item-info-line"><span className="work-item-info-text">{project.title}</span></span>
            <span className="work-item-info-line"><span className="work-item-info-text">{project.description}</span></span>
            <span className="work-item-info-line"><span className="work-item-info-text">{project.role} · {project.date}</span></span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectsStage({ progress, active }: { progress: any; active: boolean }) {
  // Projects: 35% → 58%. Heading does a clip-path reveal (different from About's blur)
  const headingY = useTransform(progress, [0.34, 0.38, 0.52, 0.58], [50, 0, 0, -60])
  const headingOpacity = useTransform(progress, [0.34, 0.38, 0.52, 0.58], [0, 1, 1, 0])
  const headingClip = useTransform(progress, [0.34, 0.4], ['inset(0 0 100% 0)', 'inset(0 0 0% 0)'])
  const sectionY = useTransform(progress, [0.34, 0.4, 0.52, 0.58], [60, 0, 0, -80])
  const sectionOpacity = useTransform(progress, [0.34, 0.38, 0.52, 0.58], [0, 1, 1, 0])

  return (
    <section className={`story-stage-section story-projects ${active ? 'is-active' : ''}`} id="works">
      <motion.div className="projects-stage-inner" style={{ y: sectionY, opacity: sectionOpacity }}>
        <motion.div className="work-grid-heading" style={{ y: headingY, opacity: headingOpacity, clipPath: headingClip }}>
          <h2 className="work-grid-title">Works</h2>
          <p className="work-grid-subtitle">Projects</p>
        </motion.div>
        <div className="work-grid-wrap">
          <div className="work-grid">
            {projects.map((project, index) => (
              <ProjectCardStage key={project.title} project={project} index={index} progress={progress} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ─── Effectiveness Stage ─── */
const effectiveItems = [
  { title: 'Embedded Systems & FPGA Logic', body: 'Digital logic, timing, and board-level debugging for hardware that has to behave predictably.', icon: 'bars' },
  { title: 'Computer Architecture', body: 'Datapaths, registers, instruction flow, and memory movement broken into clear system behavior.', icon: 'chip' },
  { title: 'Signal & Measurement Systems', body: 'Real-world signals captured, filtered, and interpreted through practical measurement pipelines.', icon: 'wave' },
  { title: 'Hardware/Software Integration', body: 'Firmware, networking, and software connected into reliable working systems.', icon: 'bridge' },
  { title: 'Technical Interfaces', body: 'Control surfaces and workflows that make engineering systems easier to test and use.', icon: 'stack' },
  { title: 'Systems Debugging', body: 'Tracing behavior across layers until the fault is visible, measurable, and fixable.', icon: 'terminal' },
  { title: 'Networked Utilities', body: 'Small infrastructure tools built around remote access, visibility, and reliability.', icon: 'network' },
  { title: 'Rapid Prototyping', body: 'Moving from concept to tested artifact quickly without losing technical clarity.', icon: 'bolt' },
]

function EffectivenessIcon({ type }: { type: string }) {
  const iconPaths: Record<string, string[]> = {
    bars: Array.from({ length: 11 }).map((_, i) => `M${0.5 + i * 5.9},59.7V.4`),
    chip: ['M12 14h36v32H12z', 'M22 24h16v12H22z', 'M6 22h6M6 30h6M6 38h6M48 22h6M48 30h6M48 38h6M22 8v6M30 8v6M38 8v6M22 46v6M30 46v6M38 46v6'],
    wave: ['M5 35c7-18 13-18 20 0s13 18 20 0 7-18 10-18', 'M5 45h50', 'M5 15h50'],
    bridge: ['M8 42c8-24 36-24 44 0', 'M14 42V26M24 42V19M36 42V19M46 42V26', 'M8 42h44'],
    stack: ['M9 18 30 7l21 11-21 11L9 18Z', 'm9 30 21 11 21-11', 'm9 42 21 11 21-11'],
    terminal: ['M10 14h40v32H10z', 'm18 24 7 6-7 6', 'M29 37h12'],
    network: ['M12 16h14v14H12z', 'M34 30h14v14H34z', 'M26 23h8M41 16v14M19 30v14M19 44h15'],
    bolt: ['M34 4 14 34h15l-3 22 21-32H32l2-20Z'],
  }
  return (
    <svg viewBox="0 0 60 60" className="effective-svg-icon" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.15">
      {(iconPaths[type] ?? iconPaths.bars).map((p) => <path key={p} d={p} />)}
    </svg>
  )
}

function EffectivenessCard({ item, index, progress }: { item: (typeof effectiveItems)[number]; index: number; progress: any }) {
  // Effectiveness: 56% → 84%. Cards slide in from sides (different from Projects' y-slide)
  const baseDelay = 0.56 + index * 0.006
  const side = index % 2 === 0 ? -1 : 1
  const x = useTransform(progress, [baseDelay, baseDelay + 0.03, 0.8, 0.84], [60 * side, 0, 0, 80 * side])
  const opacity = useTransform(progress, [baseDelay, baseDelay + 0.03, 0.8, 0.84], [0, 1, 1, 0])

  return (
    <motion.article className={`effective-card ${index % 2 === 0 ? 'left' : 'right'}`} style={{ '--card-index': index } as CSSProperties}>
      <motion.div className="effective-card-inner" style={{ x, opacity }}>
        <div className="effective-card-top">
          <h3>{item.title}</h3>
          <EffectivenessIcon type={item.icon} />
        </div>
        <p>{item.body}</p>
      </motion.div>
    </motion.article>
  )
}

function EffectivenessStage({ progress }: { progress: any }) {
  const leftItems = effectiveItems.filter((_, i) => i % 2 === 0)
  const rightItems = effectiveItems.filter((_, i) => i % 2 === 1)
  // Effectiveness: true parallax. Columns drift at different speeds while cards slide in from sides.
  const opacity = useTransform(progress, [0.55, 0.6, 0.84, 0.88], [0, 1, 1, 0])
  const y = useTransform(progress, [0.55, 0.62, 0.84, 0.88], [80, 0, 0, -80])
  const fieldScale = useTransform(progress, [0.55, 0.62, 0.84, 0.88], [0.96, 1, 1, 0.98])
  const leftParallaxY = useTransform(progress, [0.56, 0.84], [44, -54])
  const rightParallaxY = useTransform(progress, [0.56, 0.84], [-36, 62])

  return (
    <section className="story-stage-section story-effective">
      <motion.div className="effective-stage-inner" style={{ opacity, y, scale: fieldScale }}>
        <div className="effective-card-field" aria-label="What Paul is effective in">
          <motion.div className="effective-column effective-column-left" style={{ y: leftParallaxY }}>
            {leftItems.map((item, i) => <EffectivenessCard key={item.title} item={item} index={i * 2} progress={progress} />)}
          </motion.div>
          <motion.div className="effective-column effective-column-right" style={{ y: rightParallaxY }}>
            {rightItems.map((item, i) => <EffectivenessCard key={item.title} item={item} index={i * 2 + 1} progress={progress} />)}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

/* ─── Footer Stage ─── */
function SplitLetters({ text }: { text: string }) {
  return (
    <span className="split-word" aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span className="split-char" style={{ '--delay': `${index * 22}ms` } as CSSProperties} key={`${char}-${index}`} aria-hidden="true">
          {char === ' ' ? '\u00a0' : char}
        </span>
      ))}
    </span>
  )
}

function FooterStage({ progress, active }: { progress: any; active: boolean }) {
  // CipherDigital structure + hero-section personality: serif headline, portrait echo, real social icons.
  const opacity = useTransform(progress, [0.84, 0.9, 0.98, 1], [0, 1, 1, 1])
  const y = useTransform(progress, [0.84, 0.92, 1], [90, 0, 0])
  const headingY = useTransform(progress, [0.88, 0.96], [52, 0])
  const asideY = useTransform(progress, [0.9, 0.98], [34, 0])
  const contentOpacity = useTransform(progress, [0.88, 0.95], [0, 1])

  const footerLinks = [
    { label: 'Works', href: '#works' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: 'mailto:paulie@gmail.com' },
  ]

  return (
    <section className={`story-stage-section story-footer ${active ? 'is-active' : ''}`} id="contact">
      <motion.div className="cipher-footer" style={{ opacity, y }}>
        <div className="cipher-footer-main">
          <motion.div className="cipher-footer-heading" style={{ y: headingY, opacity: contentOpacity }}>
            <span className="cipher-heading-line">Building precise</span>
            <span className="cipher-heading-line">technical systems.</span>
            <p className="cipher-footer-note">Hardware logic, browser tooling, and interfaces that feel as considered as the circuits underneath.</p>
          </motion.div>

          <motion.aside className="cipher-footer-aside" style={{ y: asideY, opacity: contentOpacity }}>
            <nav className="cipher-footer-nav" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <a className="cipher-footer-link" href={link.href} key={link.label}>{link.label}</a>
              ))}
            </nav>

            <a className="cipher-footer-cta" href="mailto:paulie@gmail.com" aria-label="Get in touch">
              <span>Get in Touch</span>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 17.7 16.7 8.2H9.1V6h11.3v11.3h-2.2V9.8l-9.5 9.5-1.5-1.6Z" /></svg>
            </a>

            <div className="cipher-footer-socials" aria-label="Social links">
              {socialLinks.map((link) => (
                <a href={link.href} key={link.label} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label}>
                  <SocialIcon name={link.icon} />
                </a>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div className="cipher-footer-bottom" style={{ opacity: contentOpacity }}>
          <span>© 2026 Paul</span>
          <span>Electrical & Computer Engineering</span>
          <a href="mailto:paulie@gmail.com">paulie@gmail.com</a>
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ─── Anti-inspect ─── */
function useAntiInspect() {
  useEffect(() => {
    const shield = document.createElement('canvas')
    shield.className = 'inspect-shield'
    shield.width = 1; shield.height = 1
    shield.setAttribute('aria-hidden', 'true')
    document.body.appendChild(shield)
    const onContext = (e: MouseEvent) => e.preventDefault()
    document.addEventListener('contextmenu', onContext)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'F12') { e.preventDefault(); return }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i')) { e.preventDefault(); return }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j')) { e.preventDefault(); return }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) { e.preventDefault(); return }
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) { e.preventDefault(); return }
    }
    document.addEventListener('keydown', onKey)
    let devtoolsOpen = false
    const checkDevtools = () => {
      const start = performance.now()
      debugger
      const isOpen = performance.now() - start > 160
      if (isOpen !== devtoolsOpen) { devtoolsOpen = isOpen; shield.classList.toggle('is-active', isOpen) }
    }
    const interval = setInterval(checkDevtools, 1000)
    const onResize = () => {
      const isOpen = ((window.outerWidth - window.innerWidth > 200) || (window.outerHeight - window.innerHeight > 200)) && !navigator.userAgent.includes('Mobile')
      if (isOpen !== devtoolsOpen) { devtoolsOpen = isOpen; shield.classList.toggle('is-active', isOpen) }
    }
    window.addEventListener('resize', onResize)
    return () => {
      shield.remove()
      document.removeEventListener('contextmenu', onContext)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      clearInterval(interval)
    }
  }, [])
}

/* ─── Dynamic logo color ─── */
function useDynamicLogoColor() {
  useEffect(() => {
    const navMark = document.querySelector('.nav-mark')
    if (!navMark) return
    let ticking = false
    const update = () => {
      ticking = false
      if (!navMark) return
      const rect = navMark.getBoundingClientRect()
      const stack = document.elementsFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
      let isLight = false
      for (const el of stack) {
        if (el === navMark || navMark.contains(el)) continue
        const bg = getComputedStyle(el).backgroundColor
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (m) {
          const lum = (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255
          if (lum > 0.55) { isLight = true; break }
        }
      }
      navMark.classList.toggle('logo-on-light', isLight)
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }
    const observer = new MutationObserver(() => { if (!ticking) { ticking = true; requestAnimationFrame(update) } })
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] })
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); observer.disconnect() }
  }, [])
}

/* ─── App ─── */
export function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeStage, setActiveStage] = useState<'hero' | 'about' | 'projects' | 'effective' | 'footer'>('hero')
  const scrollRef = useRef<HTMLDivElement>(null)
  const progress = useMotionValue(0)

  useLenis()
  // useAntiInspect() // disabled during development — re-enable for production
  useDynamicLogoColor()

  useEffect(() => {
    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      progress.set(Math.min(1, Math.max(0, window.scrollY / max)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [progress])

  useEffect(() => {
    const unsub = progress.on('change', (v: number) => {
      if (v < 0.18) setActiveStage('hero')
      else if (v < 0.36) setActiveStage('about')
      else if (v < 0.58) setActiveStage('projects')
      else if (v < 0.86) setActiveStage('effective')
      else setActiveStage('footer')
    })
    return () => unsub()
  }, [progress])

  return (
    <main className="portfolio-shell" ref={scrollRef}>
      <StoryBackground progress={progress} />
      <PageIntro />
      <Navbar menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((v) => !v)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="story-scroll-container">
        <div className="story-sticky-stage">
          <HeroStage progress={progress} active={activeStage === 'hero'} />
          <AboutStage progress={progress} />
          <ProjectsStage progress={progress} active={activeStage === 'projects'} />
          <EffectivenessStage progress={progress} />
          <FooterStage progress={progress} active={activeStage === 'footer'} />
        </div>
      </div>
    </main>
  )
}