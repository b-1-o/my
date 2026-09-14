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
  const scene = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const target = useRef(-22)
  const current = useRef(-22)
  const pointer = useRef({ active: false, lastY: 0 })

  useEffect(() => {
    const root = scene.current
    if (!root) return
    let frame = 0

    const addRotation = (amount: number) => {
      target.current += amount
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      addRotation(event.deltaY * 0.46)
    }

    const onPointerDown = (event: PointerEvent) => {
      pointer.current.active = true
      pointer.current.lastY = event.clientY
      root.setPointerCapture?.(event.pointerId)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!pointer.current.active) return
      event.preventDefault()
      const delta = pointer.current.lastY - event.clientY
      pointer.current.lastY = event.clientY
      addRotation(delta * 1.35)
    }

    const stopPointer = () => {
      pointer.current.active = false
    }

    const tick = () => {
      current.current += (target.current - current.current) * 0.09
      if (stage.current) {
        stage.current.style.setProperty('--spiral-rotation', `${current.current}deg`)
      }
      frame = requestAnimationFrame(tick)
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('pointerdown', onPointerDown)
    root.addEventListener('pointermove', onPointerMove, { passive: false })
    root.addEventListener('pointerup', stopPointer)
    root.addEventListener('pointercancel', stopPointer)
    frame = requestAnimationFrame(tick)

    return () => {
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('pointerdown', onPointerDown)
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerup', stopPointer)
      root.removeEventListener('pointercancel', stopPointer)
      cancelAnimationFrame(frame)
    }
  }, [])

  const repeatedCards = Array.from({ length: 30 }, (_, i) => {
    const index = ((i % orbitCards.length) + orbitCards.length) % orbitCards.length
    return { ...orbitCards[index], index, copy: i }
  })

  return (
    <>
      <style>{`
        .spiral-scene{position:absolute;inset:0 0 0 16%;perspective:1800px;overflow:hidden;cursor:ns-resize;touch-action:none;user-select:none;z-index:5;}
        .spiral-scene:before{content:"";position:absolute;left:49%;top:50%;width:64%;height:94%;transform:translate(-50%,-50%);background:radial-gradient(ellipse at center,rgba(255,255,255,.13) 0%,rgba(140,155,255,.07) 28%,transparent 68%);filter:blur(30px);pointer-events:none;}
        .spiral-axis{position:absolute;left:57%;top:9%;width:1px;height:82%;background:linear-gradient(to bottom,transparent,rgba(255,255,255,.11) 14%,rgba(255,255,255,.17) 50%,rgba(255,255,255,.11) 86%,transparent);box-shadow:0 0 30px rgba(255,255,255,.12);opacity:.72;pointer-events:none;}
        .spiral-stage{position:absolute;left:57%;top:50%;width:860px;height:860px;transform-style:preserve-3d;transform:translate(-50%,-50%) rotateX(-4deg) rotateY(-8deg);will-change:transform;}
        .spiral-track{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateY(var(--spiral-rotation,-22deg));will-change:transform;}
        .spiral-card{--angle:0deg;--lift:0px;--radius:318px;--tilt:0deg;position:absolute;left:50%;top:50%;width:282px;height:176px;margin:-88px 0 0 -141px;padding:7px;border:1px solid rgba(255,255,255,.26);border-radius:20px;background:linear-gradient(145deg,rgba(255,255,255,.17),rgba(255,255,255,.04));box-shadow:0 36px 92px rgba(0,0,0,.56),inset 0 1px rgba(255,255,255,.28);backdrop-filter:blur(18px) saturate(145%);-webkit-backdrop-filter:blur(18px) saturate(145%);transform-style:preserve-3d;transform:rotateY(var(--angle)) translateZ(var(--radius)) translateY(var(--lift)) rotateY(calc(var(--angle) * -1)) rotateZ(var(--tilt));}
        .spiral-card:before{content:"";position:absolute;inset:0;border-radius:20px;background:linear-gradient(120deg,rgba(255,255,255,.16),transparent 24%,transparent 72%,rgba(255,255,255,.05));pointer-events:none;z-index:3;}
        .spiral-card:after{content:"";position:absolute;inset:-1px;border-radius:21px;padding:1px;background:linear-gradient(125deg,rgba(255,255,255,.72),transparent 25%,transparent 69%,rgba(255,255,255,.12));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;z-index:6;}
        .spiral-image{position:absolute;inset:7px;overflow:hidden;border-radius:13px;background:#101013;}
        .spiral-image img{display:block;width:100%;height:100%;object-fit:cover;opacity:.86;filter:saturate(.82) contrast(1.05);transition:transform .7s ease,opacity .35s ease;}
        .spiral-card:hover .spiral-image img{transform:scale(1.055);opacity:1;}
        .spiral-image:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(4,4,6,0) 35%,rgba(4,4,6,.9) 100%);}
        .spiral-number{position:absolute;right:10px;top:10px;z-index:4;padding:5px 7px;border:1px solid rgba(255,255,255,.18);border-radius:8px;background:rgba(0,0,0,.33);color:#fff;font:8px 'DM Mono';backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);}
        .spiral-copy{position:absolute;left:19px;right:19px;bottom:17px;z-index:4;display:flex;flex-direction:column;color:#fff;text-shadow:0 2px 20px #000;}
        .spiral-copy small{font:7px 'DM Mono';letter-spacing:.15em;color:#c8c8c8;margin-bottom:2px;}
        .spiral-copy strong{font:600 21px 'Space Grotesk';letter-spacing:-.07em;}
        .spiral-trace{position:absolute;left:50%;top:50%;width:500px;height:620px;margin:-310px 0 0 -250px;border:1px solid rgba(255,255,255,.045);border-radius:50%;transform:rotateX(76deg) rotateZ(24deg);box-shadow:0 0 72px rgba(255,255,255,.03);pointer-events:none;}
        .spiral-edge{position:absolute;left:0;right:0;height:24%;z-index:8;pointer-events:none;}
        .spiral-edge.top{top:-2%;background:linear-gradient(to bottom,rgba(7,7,7,.92) 0%,rgba(7,7,7,.54) 34%,rgba(7,7,7,0) 100%);backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);mask-image:linear-gradient(to bottom,#000 0%,#000 42%,transparent 100%);-webkit-mask-image:linear-gradient(to bottom,#000 0%,#000 42%,transparent 100%);}
        .spiral-edge.bottom{bottom:-2%;background:linear-gradient(to top,rgba(7,7,7,.92) 0%,rgba(7,7,7,.54) 34%,rgba(7,7,7,0) 100%);backdrop-filter:blur(9px);-webkit-backdrop-filter:blur(9px);mask-image:linear-gradient(to top,#000 0%,#000 42%,transparent 100%);-webkit-mask-image:linear-gradient(to top,#000 0%,#000 42%,transparent 100%);}
        .spiral-hint{position:absolute;right:4vw;bottom:5vh;z-index:10;display:flex;align-items:center;gap:9px;padding:10px 13px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.035);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:#777;font:8px 'DM Mono';}
        .spiral-hint i{width:6px;height:6px;border-radius:50%;background:#d8ff63;box-shadow:0 0 12px #d8ff63;}
        .spiral-hint b{color:#efefef;font-weight:500;margin-left:7px;}
        .spiral-hint em{font-style:normal;color:#555;}
        @media(max-width:1100px){.spiral-scene{inset:0;}.spiral-stage{left:61%;transform:translate(-50%,-50%) rotateX(-4deg) rotateY(-6deg) scale(.84);}.spiral-axis{left:61%;}.spiral-trace{left:50%;}.spiral-card{width:258px;height:161px;margin:-80px 0 0 -129px;--radius:290px;}.spiral-hint{right:22px;bottom:22px;}}
        @media(max-width:760px){.spiral-scene{top:40%;height:60%;}.spiral-stage{left:58%;top:52%;width:680px;height:720px;transform:translate(-50%,-50%) rotateX(-2deg) rotateY(-4deg) scale(.58);}.spiral-axis{left:58%;top:6%;height:88%;}.spiral-trace{display:none;}.spiral-card{width:234px;height:147px;margin:-73px 0 0 -117px;--radius:235px;}.spiral-edge{height:29%;}.spiral-hint{left:50%;right:auto;bottom:18px;transform:translateX(-50%);white-space:nowrap;font-size:7px;}.hero-copy{z-index:20;}.hero-profile{z-index:30;}}
        @media(max-width:480px){.spiral-scene{top:41%;height:59%;}.spiral-stage{left:56%;top:53%;width:650px;height:710px;transform:translate(-50%,-50%) rotateX(-2deg) rotateY(-3deg) scale(.49);}.spiral-axis{left:56%;}.spiral-card{width:220px;height:139px;margin:-69px 0 0 -110px;--radius:202px;}.spiral-edge{height:31%;}.spiral-copy strong{font-size:19px;}.spiral-hint{bottom:14px;}.hero-profile strong{display:none;}.hero-copy p{max-width:295px;}}
      `}</style>
      <div ref={scene} className="spiral-scene" aria-label="Infinite interactive 3D spiral carousel. Scroll or drag inside to rotate.">
        <div className="spiral-axis" />
        <div className="spiral-trace" />
        <div ref={stage} className="spiral-stage">
          <div className="spiral-track">
            {repeatedCards.map((card, i) => {
              const center = (repeatedCards.length - 1) / 2
              const position = i - center
              const angle = position * 37
              const lift = position * 72
              const tilt = position * -1.2
              const depth = 310 + Math.cos((position / 3.8) * Math.PI) * 24
              return (
                <article
                  className="spiral-card"
                  key={`${card.title}-${i}`}
                  style={{ '--angle': `${angle}deg`, '--lift': `${lift}px`, '--tilt': `${tilt}deg`, '--radius': `${depth}px` } as CSSProperties}
                >
                  <div className="spiral-image"><img src={card.image} alt={card.title} loading={i < 12 ? 'eager' : 'lazy'} /><span className="spiral-number">{String(card.index + 1).padStart(2, '0')}</span></div>
                  <div className="spiral-copy"><small>{card.tag}</small><strong>{card.title}</strong></div>
                </article>
              )
            })}
          </div>
        </div>
        <div className="spiral-edge top" />
        <div className="spiral-edge bottom" />
        <div className="spiral-hint"><i /> SCROLL / DRAG <b>∞</b><em> CYCLIC</em></div>
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
