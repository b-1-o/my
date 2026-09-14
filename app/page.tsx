'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const PROFILE_IMAGE = 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/49d31e9662d2d97d97e08ae40327fe00-1789350656264/060a52f2-b6e4-431a-bcc0-8b814c764ec9.jpeg'
const ASSET_BASE = process.env.NODE_ENV === 'production' ? '/my/assets/' : '/assets/'

const orbitCards = [
  { title: 'GRAPHIC DESIGN', tag: 'VISUAL', image: `${ASSET_BASE}01-graphic-designer (1).png` },
  { title: 'BUSINESS', tag: 'WEB', image: `${ASSET_BASE}02-business-consultant (1).png` },
  { title: 'FOOD & BRAND', tag: 'LANDING', image: `${ASSET_BASE}03-pastry-chef (1).png` },
  { title: 'PHOTOGRAPHY', tag: 'PORTFOLIO', image: `${ASSET_BASE}04-photographer (1).png` },
  { title: 'LAW FIRM', tag: 'BUSINESS WEB', image: `${ASSET_BASE}05-law-firm (1).png` },
  { title: 'FITNESS', tag: 'SERVICE', image: `${ASSET_BASE}06-fitness-coach (1).png` },
  { title: 'RESTAURANT', tag: 'HOSPITALITY', image: `${ASSET_BASE}07-restaurant (1).png` },
  { title: 'ARCHITECTURE', tag: 'EDITORIAL', image: `${ASSET_BASE}08-architect (1).png` },
  { title: 'TECH STARTUP', tag: 'PRODUCT', image: `${ASSET_BASE}09-tech-startup (1).png` },
  { title: 'FLORIST', tag: 'E-COMMERCE', image: `${ASSET_BASE}10-florist (1).png` },
]

const services = [
  ['01', 'Custom websites', 'Modern websites for small businesses, freelancers and startups.'],
  ['02', 'Landing pages', 'Focused pages built around one goal: look credible and convert visitors.'],
  ['03', 'Website redesign', 'Modernize an old site without losing what already works.'],
  ['04', 'Responsive design', 'Layouts that feel right on desktop, tablet and phone.'],
  ['05', 'UI / visual design', 'Clean interfaces, product cards and visual systems with a premium feel.'],
  ['06', 'Performance + basics', 'Clean frontend, fast loading, forms, analytics and basic SEO setup.'],
]

const stack = ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Git', 'Vite', 'Framer Motion', 'Linux']

function SpiralGallery() {
  const scene = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])
  const phaseTarget = useRef(0)
  const phaseCurrent = useRef(0)
  const frame = useRef(0)
  const pointer = useRef({ active: false, axis: null as 'x' | 'y' | null, lastX: 0, lastY: 0 })
  const total = orbitCards.length

  useEffect(() => {
    const root = scene.current
    if (!root) return

    const cards = cardsRef.current.filter(Boolean)
    const wrap = (value: number) => ((value + total / 2) % total + total) % total - total / 2

    const render = () => {
      const phase = phaseCurrent.current
      cards.forEach((card, index) => {
        const slot = wrap(index - phase)
        const abs = Math.abs(slot)
        const angle = -16 + slot * 38
        const lift = slot * 68
        const radius = 315 + Math.cos(slot * 0.88) * 30
        const scale = 1 - Math.min(abs * 0.035, 0.22)
        const opacity = Math.max(0, 1 - Math.max(0, abs - 2.5) * 0.24)
        const blur = Math.max(0, abs - 2.6) * 2.2
        const tilt = slot * -1.35
        const depth = Math.max(0, 7 - abs)

        card.style.transform = `rotateY(${angle}deg) translateZ(${radius}px) translateY(${lift}px) rotateY(${-angle}deg) rotateZ(${tilt}deg) scale(${scale})`
        card.style.opacity = `${opacity}`
        card.style.filter = `blur(${blur}px)`
        card.style.zIndex = `${Math.round(depth * 100 - slot * 2)}`
      })
    }

    const animate = () => {
      frame.current = 0
      const delta = phaseTarget.current - phaseCurrent.current
      phaseCurrent.current += delta * 0.11

      if (Math.abs(delta) < 0.0004) {
        phaseCurrent.current = phaseTarget.current
        render()
        return
      }

      render()
      frame.current = requestAnimationFrame(animate)
    }

    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(animate)
    }

    const addPhase = (amount: number) => {
      phaseTarget.current += amount
      schedule()
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      const factor = window.matchMedia('(max-width: 900px)').matches ? 0.009 : 0.006
      addPhase(Math.max(-120, Math.min(120, event.deltaY)) * factor)
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return
      pointer.current.active = true
      pointer.current.axis = null
      pointer.current.lastX = event.clientX
      pointer.current.lastY = event.clientY
      root.setPointerCapture?.(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!pointer.current.active) return

      const dx = event.clientX - pointer.current.lastX
      const dy = event.clientY - pointer.current.lastY

      if (!pointer.current.axis) {
        if (Math.hypot(dx, dy) < 4) return
        pointer.current.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      }

      const mobile = window.matchMedia('(max-width: 900px)').matches

      if (mobile && pointer.current.axis === 'y') {
        pointer.current.active = false
        root.style.touchAction = 'pan-y'
        return
      }

      event.preventDefault()
      if (mobile) root.style.touchAction = 'none'

      if (mobile) {
        addPhase(-dx * 0.016)
      } else {
        addPhase(-dy * 0.018)
      }

      pointer.current.lastX = event.clientX
      pointer.current.lastY = event.clientY
    }

    const stopPointer = () => {
      pointer.current.active = false
      pointer.current.axis = null
      root.style.touchAction = 'pan-y'
    }

    root.style.touchAction = 'pan-y'
    render()

    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('pointerdown', onPointerDown)
    root.addEventListener('pointermove', onPointerMove, { passive: false })
    root.addEventListener('pointerup', stopPointer)
    root.addEventListener('pointercancel', stopPointer)

    return () => {
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('pointerdown', onPointerDown)
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerup', stopPointer)
      root.removeEventListener('pointercancel', stopPointer)
      if (frame.current) cancelAnimationFrame(frame.current)
    }
  }, [total])

  return (
    <>
      <style>{`/* existing SpiralGallery styles intentionally kept unchanged */`}</style>
      <div ref={scene} className="spiral-scene" aria-label="Infinite interactive 3D spiral carousel. Scroll or drag inside to rotate.">
        <div className="spiral-axis" />
        <div className="spiral-trace" />
        <div className="spiral-stage">
          <div className="spiral-track">
            {orbitCards.map((card, i) => (
              <article key={card.title} ref={(node) => { if (node) cardsRef.current[i] = node }} className="spiral-card">
                <div className="spiral-image"><img src={card.image} alt={card.title} loading={i < 6 ? 'eager' : 'lazy'} /><span className="spiral-number">{String(i + 1).padStart(2, '0')}</span></div>
                <div className="spiral-copy"><small>{card.tag}</small><strong>{card.title}</strong></div>
              </article>
            ))}
          </div>
        </div>
        <div className="spiral-edge top" />
        <div className="spiral-edge bottom" />
        <div className="spiral-hint"><i /> SCROLL / DRAG <b>∞</b><em> ONE BY ONE</em></div>
      </div>
    </>
  )
}

function Reveal({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  return <div id={id} className={`reveal ${className}`}>{children}</div>
}

export default function Home() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? (window.scrollY / max) * 100 : 0) }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')) }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />
      <header className="topbar"><a href="#top" className="brand">W<span>®</span></a><nav><a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a></nav><a href="#contact" className="top-cta">GET IN TOUCH <span>↗</span></a></header>
      <main id="top">
        <section className="hero-fiverr"><div className="hero-copy"><div className="micro"><span className="dot" /> AVAILABLE FOR PROJECTS <b>UNITED STATES</b></div><h1>WEB DESIGN<br /><em>& DEVELOPMENT</em><br />FOR PEOPLE<br />WHO <span>CARE.</span></h1><p>I build clean, modern and conversion-focused websites for small businesses, freelancers and startups — with a strong visual direction and a fast frontend.</p><div className="hero-actions"><a className="pill primary" href="#contact">START A PROJECT <span>↗</span></a><a className="pill" href="#work">SEE MY WORK <span>↓</span></a></div></div><SpiralGallery /><div className="hero-profile"><img src={PROFILE_IMAGE} alt="Erik" /><div><b>@webbio</b><span>WEB DEVELOPER</span></div><strong>∞ / 10</strong></div><div className="hero-side-note">DESIGN<br />DEVELOPMENT<br />MOTION<br />DETAIL</div></section>
        <Reveal className="trust-strip"><span>WHAT CLIENTS GET</span><b>DESIGN</b><i>×</i><b>DEVELOPMENT</b><i>×</i><b>RESPONSIVE</b><i>×</i><b>PERFORMANCE</b><i>×</i><b>SEO BASICS</b></Reveal>
        <Reveal className="intro" id="about"><div className="eyebrow">01 / ABOUT</div><div className="intro-main"><h2>I MAKE SMALL BUSINESSES <span>LOOK BIG.</span></h2><p>Hi, I’m Erik. I’m a web developer based in the United States. I focus on clean interfaces, responsive layouts and websites that are easy to understand, fast to use and ready to help a business grow.</p><div className="mini-facts"><span>US BASED</span><span>FREELANCE</span><span>WEB / UI</span><span>CREATIVE DEV</span></div></div></Reveal>
        <section id="services" className="services-section"><Reveal className="section-heading"><div className="eyebrow">02 / SERVICES</div><h2>WHAT I CAN<br /><span>BUILD FOR YOU.</span></h2></Reveal><div className="service-list">{services.map(([n, title, text]) => <Reveal className="service-row" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></section>
        <section id="work" className="work-section"><Reveal className="section-heading"><div className="eyebrow">03 / VISUAL REFERENCES</div><h2>THE KIND OF<br /><span>WORK I LIKE.</span></h2></Reveal><div className="work-grid">{orbitCards.slice(0, 3).map((card, i) => <a className={`work-card ${i === 0 ? 'work-large' : ''}`} href="#contact" key={card.title}><img src={card.image} alt={card.title} loading="lazy" /><div><small>{String(i + 1).padStart(2, '0')} / {card.tag}</small><h3>{card.title}</h3><p>Visual direction, responsive structure and a polished frontend experience built around the client’s goal.</p></div></a>)}</div></section>
        <Reveal className="process"><div className="eyebrow">04 / HOW I WORK</div><div className="process-grid"><div><span>01</span><h3>UNDERSTAND</h3><p>Define the goal, audience, content and visual direction before building.</p></div><div><span>02</span><h3>DESIGN</h3><p>Turn the idea into a clear layout, responsive system and visual language.</p></div><div><span>03</span><h3>BUILD</h3><p>Develop the site, test it across screen sizes and polish the details.</p></div><div><span>04</span><h3>LAUNCH</h3><p>Deliver a finished website ready to show customers and clients.</p></div></div></Reveal>
        <Reveal className="skills-section"><div className="eyebrow">05 / SKILLS & TOOLS</div><h2>THE TOOLS<br /><span>BEHIND THE WORK.</span></h2><div className="skill-cloud">{stack.map((item) => <span key={item}>{item}</span>)}</div></Reveal>
        <section id="contact" className="contact-section"><Reveal><div className="eyebrow">06 / CONTACT</div><h2>HAVE A WEBSITE<br />IN <span>MIND?</span></h2><p>Tell me what you need. I’ll help turn the idea into a clean, modern web experience.</p><a className="contact-button" href="https://www.fiverr.com/">START A PROJECT <span>↗</span></a></Reveal></section>
      </main>
      <footer><b>W®</b><span>ERIK / WEB DEVELOPER</span><span>UNITED STATES / 2026</span><a href="https://github.com/b-1-o/my">GITHUB ↗</a></footer>
    </>
  )
}
