'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const PROFILE_IMAGE = 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/49d31e9662d2d97d97e08ae40327fe00-1789350656264/060a52f2-b6e4-431a-bcc0-8b814c764ec9.jpeg'
const ASSET_BASE = process.env.NODE_ENV === 'production' ? '/my/assets/' : '/assets/'

const orbitCards = [
  { title: 'GRAPHIC DESIGN', tag: 'VISUAL', image: `${ASSET_BASE}01-graphic-designer.png` },
  { title: 'BUSINESS', tag: 'WEB', image: `${ASSET_BASE}02-business-consultant.png` },
  { title: 'FOOD & BRAND', tag: 'LANDING', image: `${ASSET_BASE}03-pastry-chef.png` },
  { title: 'PHOTOGRAPHY', tag: 'PORTFOLIO', image: `${ASSET_BASE}04-photographer.png` },
  { title: 'LAW FIRM', tag: 'BUSINESS WEB', image: `${ASSET_BASE}05-law-firm.png` },
  { title: 'FITNESS', tag: 'SERVICE', image: `${ASSET_BASE}06-fitness-coach.png` },
  { title: 'RESTAURANT', tag: 'HOSPITALITY', image: `${ASSET_BASE}07-restaurant.png` },
  { title: 'ARCHITECTURE', tag: 'EDITORIAL', image: `${ASSET_BASE}08-architect.png` },
  { title: 'TECH STARTUP', tag: 'PRODUCT', image: `${ASSET_BASE}09-tech-startup.png` },
  { title: 'FLORIST', tag: 'E-COMMERCE', image: `${ASSET_BASE}10-florist.png` },
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
  const stage = useRef<HTMLDivElement>(null)
  const target = useRef({ x: 0, y: 0, scroll: 0 })
  const current = useRef({ x: 0, y: 0, scroll: 0 })

  useEffect(() => {
    let frame = 0
    const onMove = (event: MouseEvent) => {
      target.current.x = (event.clientX / window.innerWidth - 0.5) * 20
      target.current.y = (event.clientY / window.innerHeight - 0.5) * 14
    }
    const onScroll = () => { target.current.scroll = window.scrollY * 0.045 }
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.055
      current.current.y += (target.current.y - current.current.y) * 0.055
      current.current.scroll += (target.current.scroll - current.current.scroll) * 0.055
      if (stage.current) {
        stage.current.style.setProperty('--mx', `${current.current.x}deg`)
        stage.current.style.setProperty('--my', `${current.current.y}deg`)
        stage.current.style.setProperty('--scroll-rot', `${current.current.scroll}deg`)
      }
      frame = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="spiral-scene" aria-label="Interactive portfolio gallery">
      <div className="spiral-glow" />
      <div className="spiral-floor" />
      <div ref={stage} className="spiral-stage">
        {orbitCards.map((card, i) => {
          const progress = i / (orbitCards.length - 1)
          const angle = -155 + progress * 310
          const lift = -230 + progress * 460
          const depth = 150 + Math.sin(progress * Math.PI) * 250
          return (
            <article className="orbit-card" key={card.title} style={{ '--angle': `${angle}deg`, '--lift': `${lift}px`, '--depth': `${depth}px` } as CSSProperties}>
              <div className="orbit-image"><img src={card.image} alt={card.title} loading={i < 4 ? 'eager' : 'lazy'} /><span>{String(i + 1).padStart(2, '0')}</span></div>
              <div className="orbit-copy"><small>{card.tag}</small><strong>{card.title}</strong></div>
            </article>
          )
        })}
        <div className="spiral-core"><img src={PROFILE_IMAGE} alt="Erik" /><div><b>ERIK</b><span>@webbio</span></div><small>WEB DEVELOPER / UI DESIGNER</small></div>
      </div>
      <div className="spiral-hint"><span>MOVE</span><i>↻</i><span>SCROLL TO ROTATE</span></div>
    </div>
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
        <section className="hero-fiverr"><div className="hero-copy"><div className="micro"><span className="dot" /> AVAILABLE FOR PROJECTS <b>UNITED STATES</b></div><h1>WEB DESIGN<br /><em>& DEVELOPMENT</em><br />FOR PEOPLE<br />WHO <span>CARE.</span></h1><p>I build clean, modern and conversion-focused websites for small businesses, freelancers and startups — with a strong visual direction and a fast frontend.</p><div className="hero-actions"><a className="pill primary" href="#contact">START A PROJECT <span>↗</span></a><a className="pill" href="#work">SEE MY WORK <span>↓</span></a></div></div><SpiralGallery /><div className="hero-profile"><img src={PROFILE_IMAGE} alt="Erik" /><div><b>@webbio</b><span>WEB DEVELOPER</span></div><strong>01 — 10</strong></div><div className="hero-side-note">DESIGN<br />DEVELOPMENT<br />MOTION<br />DETAIL</div></section>
        <Reveal className="trust-strip"><span>WHAT CLIENTS GET</span><b>DESIGN</b><i>×</i><b>DEVELOPMENT</b><i>×</i><b>RESPONSIVE</b><i>×</i><b>PERFORMANCE</b><i>×</i><b>SEO BASICS</b></Reveal>
        <Reveal className="intro" id="about"><div className="eyebrow">01 / ABOUT</div><div className="intro-main"><h2>I MAKE SMALL BUSINESSES <span>LOOK BIG.</span></h2><p>Hi, I’m Erik. I’m a web developer based in the United States. I focus on clean interfaces, responsive layouts and websites that are easy to understand, fast to use and ready to help a business grow.</p><div className="mini-facts"><span>US BASED</span><span>FREELANCE</span><span>WEB / UI</span><span>CREATIVE DEV</span></div></div></Reveal>
        <section id="services" className="services-section"><Reveal className="section-heading"><div className="eyebrow">02 / SERVICES</div><h2>WHAT I CAN<br /><span>BUILD FOR YOU.</span></h2></Reveal><div className="service-list">{services.map(([n, title, text]) => <Reveal className="service-row" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p><b>↗</b></Reveal>)}</div></section>
        <section id="work" className="work-section"><Reveal className="section-heading"><div className="eyebrow">03 / VISUAL REFERENCES</div><h2>THE KIND OF<br /><span>WORK I LIKE.</span></h2></Reveal><div className="work-grid">{orbitCards.slice(0, 3).map((card, i) => <a className={`work-card ${i === 0 ? 'work-large' : ''}`} href="#contact" key={card.title}><img src={card.image} alt={card.title} loading="lazy" /><div><small>{String(i + 1).padStart(2, '0')} / {card.tag}</small><h3>{card.title}</h3><p>Visual direction, responsive structure and a polished frontend experience built around the client’s goal.</p></div></a>)}</div></section>
        <Reveal className="process"><div className="eyebrow">04 / HOW I WORK</div><div className="process-grid"><div><span>01</span><h3>UNDERSTAND</h3><p>Define the goal, audience, content and visual direction before building.</p></div><div><span>02</span><h3>DESIGN</h3><p>Turn the idea into a clear layout, responsive system and visual language.</p></div><div><span>03</span><h3>BUILD</h3><p>Develop the site, test it across screen sizes and polish the details.</p></div><div><span>04</span><h3>LAUNCH</h3><p>Deliver a finished website ready to show customers and clients.</p></div></div></Reveal>
        <Reveal className="skills-section"><div className="eyebrow">05 / SKILLS & TOOLS</div><h2>THE TOOLS<br /><span>BEHIND THE WORK.</span></h2><div className="skill-cloud">{stack.map((item) => <span key={item}>{item}</span>)}</div></Reveal>
        <section id="contact" className="contact-section"><Reveal><div className="eyebrow">06 / CONTACT</div><h2>HAVE A WEBSITE<br />IN <span>MIND?</span></h2><p>Tell me what you need. I’ll help turn the idea into a clean, modern web experience.</p><a className="contact-button" href="https://www.fiverr.com/">START A PROJECT <span>↗</span></a></Reveal></section>
      </main>
      <footer><b>W®</b><span>ERIK / WEB DEVELOPER</span><span>UNITED STATES / 2026</span><a href="https://github.com/b-1-o/my">GITHUB ↗</a></footer>
    </>
  )
}
