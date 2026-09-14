'use client'

import { useEffect, useRef, useState } from 'react'

const PROFILE_IMAGE = 'https://fiverr-res.cloudinary.com/t_profile_thumb,q_auto,f_auto/attachments/profile/photo/49d31e9662d2d97d97e08ae40327fe00-1789350656264/060a52f2-b6e4-431a-bcc0-8b814c764ec9.jpeg'
const RAW = 'https://raw.githubusercontent.com/b-1-o/my-/main/'

const orbitCards = [
  { title: 'LANDING PAGES', tag: 'WEB', tone: 'light', image: `${RAW}skate-01.jpg` },
  { title: 'BUSINESS WEBSITES', tag: 'WEB', tone: 'dark', image: `${RAW}skate-02.jpg` },
  { title: 'WEBSITE REDESIGN', tag: 'REDESIGN', tone: 'paper', image: `${RAW}skate-03.jpg` },
  { title: 'RESPONSIVE UI', tag: 'UI / UX', tone: 'blue', image: `${RAW}skate-04.jpg` },
  { title: 'ROYAL TOUCH', tag: 'CLIENT PROJECT', tone: 'gold', image: `${RAW}skate-05.jpg` },
  { title: 'BIO / GOTH', tag: 'REACT / MOTION', tone: 'dark', image: `${RAW}skate-06.jpg` },
  { title: 'PRODUCT VISUALS', tag: 'E-COMMERCE', tone: 'paper', image: `${RAW}skate-07.jpg` },
  { title: 'FAST + MOBILE', tag: 'PERFORMANCE', tone: 'light', image: `${RAW}skate-08.jpg` },
  { title: 'B1O EXPERIMENTS', tag: 'CREATIVE DEV', tone: 'blue', image: `${RAW}skate-09.jpg` },
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
      target.current.x = (event.clientX / window.innerWidth - 0.5) * 18
      target.current.y = (event.clientY / window.innerHeight - 0.5) * 12
    }
    const onScroll = () => { target.current.scroll = window.scrollY * 0.055 }
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
    <div className="spiral-scene" aria-label="Interactive showcase of Erik's services and projects">
      <div className="spiral-glow" />
      <div className="spiral-floor" />
      <div ref={stage} className="spiral-stage">
        {orbitCards.map((card, i) => {
          const angle = (i / orbitCards.length) * 360
          const lift = (i - (orbitCards.length - 1) / 2) * 42
          return (
            <article
              className={`orbit-card ${card.tone}`}
              key={card.title}
              style={{ '--angle': `${angle}deg`, '--lift': `${lift}px` } as React.CSSProperties}
            >
              <div className="orbit-image">
                <img src={card.image} alt="" />
                <span>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="orbit-copy">
                <small>{card.tag}</small>
                <strong>{card.title}</strong>
              </div>
            </article>
          )
        })}
        <div className="spiral-core">
          <img src={PROFILE_IMAGE} alt="Erik" />
          <div><b>ERIK</b><span>@webbio</span></div>
          <small>WEB DEVELOPER / UI DESIGNER</small>
        </div>
      </div>
      <div className="spiral-hint"><span>DRAG WITH YOUR EYES</span><i>↻</i><span>SCROLL TO ROTATE</span></div>
    </div>
  )
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export default function Home() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'))
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />
      <header className="topbar">
        <a href="#top" className="brand">W<span>®</span></a>
        <nav>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
        </nav>
        <a href="#contact" className="top-cta">GET IN TOUCH <span>↗</span></a>
      </header>

      <main id="top">
        <section className="hero-fiverr">
          <div className="hero-copy">
            <div className="micro"><span className="dot" /> AVAILABLE FOR PROJECTS <b>UNITED STATES</b></div>
            <h1>WEB DESIGN<br /><em>& DEVELOPMENT</em><br />FOR PEOPLE<br />WHO <span>CARE.</span></h1>
            <p>I build clean, modern and conversion-focused websites for small businesses, freelancers and startups — without the agency price tag.</p>
            <div className="hero-actions">
              <a className="pill primary" href="#contact">START A PROJECT <span>↗</span></a>
              <a className="pill" href="#work">SEE MY WORK <span>↓</span></a>
            </div>
          </div>
          <SpiralGallery />
          <div className="hero-profile">
            <img src={PROFILE_IMAGE} alt="Erik" />
            <div><b>@webbio</b><span>WEB DEVELOPER</span></div>
            <strong>01 — 06</strong>
          </div>
          <div className="hero-side-note">CLEAN CODE<br />GOOD PERFORMANCE<br />MOBILE FIRST</div>
        </section>

        <Reveal className="trust-strip">
          <span>WHAT CLIENTS GET</span><b>DESIGN</b><i>×</i><b>DEVELOPMENT</b><i>×</i><b>RESPONSIVE</b><i>×</i><b>PERFORMANCE</b><i>×</i><b>SEO BASICS</b>
        </Reveal>

        <Reveal className="intro" id="about">
          <div className="eyebrow">01 / ABOUT</div>
          <div className="intro-main">
            <h2>I MAKE SMALL BUSINESSES <span>LOOK BIG.</span></h2>
            <p>Hi, I’m Erik. I’m a web developer based in the United States. I focus on clean interfaces, responsive layouts and websites that are easy to understand, fast to use and ready to help a business grow.</p>
            <div className="mini-facts"><span>US BASED</span><span>ENGLISH</span><span>FREELANCE</span><span>WEB / UI</span></div>
          </div>
        </Reveal>

        <section id="services" className="services-section">
          <Reveal className="section-heading"><div className="eyebrow">02 / SERVICES</div><h2>WHAT I CAN<br /><span>BUILD FOR YOU.</span></h2></Reveal>
          <div className="service-list">
            {services.map(([n, title, text]) => <Reveal className="service-row" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p><b>↗</b></Reveal>)}
          </div>
        </section>

        <section id="work" className="work-section">
          <Reveal className="section-heading"><div className="eyebrow">03 / SELECTED WORK</div><h2>PROJECTS<br /><span>FROM MY WORKBENCH.</span></h2></Reveal>
          <div className="work-grid">
            <a className="work-card work-large" href="#contact"><img src={`${RAW}skate-01.jpg`} alt="Royal Touch project" /><div><small>01 / WEB DESIGN + DEVELOPMENT</small><h3>ROYAL TOUCH</h3><p>Premium mobile car wash website with a strong visual identity and service-first structure.</p></div></a>
            <a className="work-card" href="#contact"><img src={`${RAW}skate-02.jpg`} alt="B1O project" /><div><small>02 / INTERACTIVE UI</small><h3>B1O</h3><p>Experimental personal digital interface and creative development work.</p></div></a>
            <a className="work-card" href="#contact"><img src={`${RAW}skate-03.jpg`} alt="Product design project" /><div><small>03 / E-COMMERCE VISUALS</small><h3>PRODUCT DESIGN</h3><p>Marketplace visuals and product-card concepts designed to feel clear and premium.</p></div></a>
          </div>
        </section>

        <Reveal className="process">
          <div className="eyebrow">04 / HOW I WORK</div>
          <div className="process-grid">
            <div><span>01</span><h3>UNDERSTAND</h3><p>We define the goal, audience, content and visual direction before building.</p></div>
            <div><span>02</span><h3>DESIGN</h3><p>I turn the idea into a clear layout, responsive system and polished visual language.</p></div>
            <div><span>03</span><h3>BUILD</h3><p>I develop the site, test it across screen sizes and clean up the details.</p></div>
            <div><span>04</span><h3>LAUNCH</h3><p>You get a finished website that is ready to show customers and clients.</p></div>
          </div>
        </Reveal>

        <Reveal className="skills-section">
          <div className="eyebrow">05 / SKILLS & TOOLS</div>
          <h2>THE TOOLS<br /><span>BEHIND THE WORK.</span></h2>
          <div className="skill-cloud">{stack.map((item) => <span key={item}>{item}</span>)}</div>
        </Reveal>

        <section id="contact" className="contact-section">
          <Reveal>
            <div className="eyebrow">06 / CONTACT</div>
            <h2>HAVE A WEBSITE<br />IN <span>MIND?</span></h2>
            <p>Tell me what you need. I’ll help turn the idea into a clean, modern web experience.</p>
            <a className="contact-button" href="mailto:hello@erik.dev">GET IN TOUCH <span>↗</span></a>
          </Reveal>
        </section>
      </main>

      <footer><b>W®</b><span>ERIK / WEB DEVELOPER</span><span>UNITED STATES / 2026</span><a href="https://github.com/b-1-o/my-">GITHUB ↗</a></footer>
    </>
  )
}
