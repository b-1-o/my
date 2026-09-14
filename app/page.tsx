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
  const target = useRef({ rotation: -26, momentum: 0 })
  const current = useRef({ rotation: -26, momentum: 0 })
  const pointer = useRef({ active: false, lastY: 0 })

  useEffect(() => {
    const root = scene.current
    if (!root) return
    let frame = 0

    const addRotation = (amount: number) => {
      target.current.rotation += amount
      target.current.momentum = Math.max(-18, Math.min(18, target.current.momentum + amount * 0.075))
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      addRotation(event.deltaY * 0.34)
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
      addRotation(delta * 1.15)
    }

    const endPointer = () => {
      pointer.current.active = false
    }

    const tick = () => {
      current.current.rotation += (target.current.rotation - current.current.rotation) * 0.095
      current.current.momentum *= 0.92
      if (Math.abs(current.current.momentum) > 0.01) {
        current.current.rotation += current.current.momentum
        target.current.rotation = current.current.rotation
      }

      if (stage.current) {
        stage.current.style.setProperty('--helix-rotation', `${current.current.rotation}deg`)
      }
      frame = requestAnimationFrame(tick)
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('pointerdown', onPointerDown)
    root.addEventListener('pointermove', onPointerMove, { passive: false })
    root.addEventListener('pointerup', endPointer)
    root.addEventListener('pointercancel', endPointer)
    root.addEventListener('pointerleave', endPointer)
    frame = requestAnimationFrame(tick)

    return () => {
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('pointerdown', onPointerDown)
      root.removeEventListener('pointermove', onPointerMove)
      root.removeEventListener('pointerup', endPointer)
      root.removeEventListener('pointercancel', endPointer)
      root.removeEventListener('pointerleave', endPointer)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <style>{`
        .helix-scene{position:absolute;inset:0 0 0 20%;perspective:1700px;overflow:hidden;cursor:ns-resize;touch-action:none;user-select:none;}
        .helix-scene:before{content:"";position:absolute;inset:5% 8% 0 16%;background:radial-gradient(circle at 58% 46%,rgba(255,255,255,.105),transparent 35%),radial-gradient(circle at 58% 52%,rgba(130,155,255,.08),transparent 52%);filter:blur(18px);pointer-events:none;}
        .helix-glow{position:absolute;left:47%;top:50%;width:min(58vw,760px);aspect-ratio:1;margin:-29vw 0 0 -29vw;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.13),rgba(130,145,255,.05) 30%,transparent 67%);filter:blur(15px);pointer-events:none;}
        .helix-grid{position:absolute;inset:-10%;opacity:.22;background:linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px);background-size:70px 70px;transform:perspective(800px) rotateX(68deg) translateY(28%);transform-origin:50% 100%;mask-image:linear-gradient(to bottom,transparent 0%,#000 52%,transparent 100%);pointer-events:none;}
        .helix-stage{position:absolute;left:55%;top:51%;width:640px;height:640px;transform-style:preserve-3d;transform:translate(-50%,-50%) rotateX(-8deg) rotateY(12deg);will-change:transform;}
        .helix-track{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateY(var(--helix-rotation,-26deg));will-change:transform;}
        .helix-card{--radius:330px;--lift:0px;position:absolute;left:50%;top:50%;width:255px;height:165px;margin:-82px 0 0 -127px;padding:7px;border:1px solid rgba(255,255,255,.24);border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.16),rgba(255,255,255,.035));box-shadow:0 35px 100px rgba(0,0,0,.58),inset 0 1px rgba(255,255,255,.24);backdrop-filter:blur(18px) saturate(140%);-webkit-backdrop-filter:blur(18px) saturate(140%);transform-style:preserve-3d;transform:rotateY(var(--angle)) translateZ(var(--radius)) translateY(var(--lift)) rotateY(calc(var(--angle) * -1));transition:filter .35s,box-shadow .35s;}
        .helix-card:after{content:"";position:absolute;inset:-1px;border-radius:19px;padding:1px;background:linear-gradient(130deg,rgba(255,255,255,.65),transparent 26%,transparent 70%,rgba(255,255,255,.14));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none;}
        .helix-card:hover{filter:brightness(1.13) translateZ(5px);box-shadow:0 42px 110px rgba(0,0,0,.7),inset 0 1px rgba(255,255,255,.34);}
        .helix-image{position:absolute;inset:7px;overflow:hidden;border-radius:12px;background:#111;}
        .helix-image img{width:100%;height:100%;display:block;object-fit:cover;filter:saturate(.8) contrast(1.06);opacity:.84;transition:transform .8s,opacity .4s;}
        .helix-card:hover .helix-image img{transform:scale(1.045);opacity:1;}
        .helix-image:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 32%,rgba(0,0,0,.8) 100%);}
        .helix-number{position:absolute;top:9px;right:9px;z-index:2;padding:4px 7px;border:1px solid rgba(255,255,255,.22);border-radius:7px;background:rgba(0,0,0,.35);color:#fff;font:8px 'DM Mono';backdrop-filter:blur(10px);}
        .helix-copy{position:absolute;left:19px;right:19px;bottom:16px;z-index:2;display:flex;flex-direction:column;color:#fff;text-shadow:0 2px 20px #000;}
        .helix-copy small{font:7px 'DM Mono';letter-spacing:.13em;color:#ccc;}
        .helix-copy strong{font:600 20px 'Space Grotesk';letter-spacing:-.065em;}
        .helix-ring{position:absolute;left:55%;top:51%;width:520px;height:520px;margin:-260px;border:1px solid rgba(255,255,255,.08);border-radius:50%;transform:rotateX(70deg) rotateZ(-12deg);pointer-events:none;box-shadow:0 0 80px rgba(255,255,255,.04);}
        .helix-ring.second{width:720px;height:720px;margin:-360px;transform:rotateX(70deg) rotateZ(22deg);opacity:.55;}
        .helix-core{position:absolute;left:50%;top:50%;width:172px;height:172px;margin:-86px;border:1px solid rgba(255,255,255,.3);border-radius:50%;background:radial-gradient(circle at 33% 25%,rgba(255,255,255,.2),rgba(10,10,12,.84) 52%,rgba(0,0,0,.96));box-shadow:0 0 100px rgba(255,255,255,.08),0 28px 90px rgba(0,0,0,.8),inset 0 1px rgba(255,255,255,.22);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:12;overflow:hidden;}
        .helix-core:before{content:"";position:absolute;inset:10px;border-radius:50%;border:1px solid rgba(255,255,255,.08);}
        .helix-core .core-light{position:absolute;width:100px;height:100px;border-radius:50%;background:rgba(190,205,255,.12);filter:blur(25px);}
        .helix-core img{position:relative;width:52px;height:52px;border-radius:50%;object-fit:cover;filter:grayscale(1);border:1px solid rgba(255,255,255,.36);margin-bottom:8px;}
        .helix-core b{position:relative;font:700 20px 'Space Grotesk';letter-spacing:-.08em;}
        .helix-core span{position:relative;font:8px 'DM Mono';color:#888;margin-top:2px;}
        .helix-core small{position:relative;margin-top:12px;font:7px 'DM Mono';letter-spacing:.08em;color:#6f6f6f;}
        .helix-hint{position:absolute;right:4vw;bottom:5vh;z-index:20;display:flex;align-items:center;gap:9px;padding:11px 14px;border:1px solid rgba(255,255,255,.11);border-radius:999px;background:rgba(255,255,255,.035);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);color:#777;font:8px 'DM Mono';}
        .helix-hint i{width:6px;height:6px;border-radius:50%;background:#d8ff63;box-shadow:0 0 12px #d8ff63;}
        .helix-hint b{margin-left:8px;color:#eee;font-weight:500;}
        .helix-hint em{font-style:normal;color:#555;}
        @media(max-width:900px){.helix-scene{inset:0;top:37%;height:63%;}.helix-grid{background-size:48px 48px;}.helix-stage{left:56%;top:58%;width:560px;height:560px;transform:translate(-50%,-50%) rotateX(-7deg) rotateY(8deg) scale(.72);}.helix-ring{left:56%;top:58%;width:470px;height:470px;margin:-235px;}.helix-ring.second{display:none;}.helix-card{width:230px;height:150px;margin:-75px 0 0 -115px;--radius:285px;}.helix-core{width:150px;height:150px;margin:-75px;}.helix-hint{right:20px;bottom:20px;font-size:7px;}.hero-profile{z-index:30;}.hero-copy{z-index:40;}}
        @media(max-width:520px){.helix-scene{top:36%;height:64%;}.helix-stage{left:55%;top:60%;transform:translate(-50%,-50%) rotateX(-6deg) rotateY(6deg) scale(.54);}.helix-ring{left:55%;top:60%;width:400px;height:400px;margin:-200px;}.helix-card{width:220px;height:142px;margin:-71px 0 0 -110px;--radius:265px;}.helix-core{width:136px;height:136px;margin:-68px;}.helix-core img{width:44px;height:44px;}.helix-hint{left:50%;right:auto;bottom:18px;transform:translateX(-50%);white-space:nowrap;}.hero-fiverr{overflow:hidden;}.hero-copy p{max-width:300px;}.hero-profile strong{display:none;}}
      `}</style>
      <div ref={scene} className="helix-scene" aria-label="Interactive portfolio gallery. Scroll or drag inside to rotate.">
        <div className="helix-glow" />
        <div className="helix-grid" />
        <div className="helix-ring" />
        <div className="helix-ring second" />
        <div ref={stage} className="helix-stage">
          <div className="helix-track">
            {orbitCards.map((card, i) => {
              const angle = i * 72
              const lift = (i - (orbitCards.length - 1) / 2) * 55
              return (
                <article className="helix-card" key={card.title} style={{ '--angle': `${angle}deg`, '--lift': `${lift}px` } as CSSProperties}>
                  <div className="helix-image"><img src={card.image} alt={card.title} loading={i < 3 ? 'eager' : 'lazy'} /><span className="helix-number">{String(i + 1).padStart(2, '0')}</span></div>
                  <div className="helix-copy"><small>{card.tag}</small><strong>{card.title}</strong></div>
                </article>
              )
            })}
          </div>
          <div className="helix-core">
            <div className="core-light" />
            <img src={PROFILE_IMAGE} alt="Erik" />
            <b>ERIK</b>
            <span>@webbio</span>
            <small>WEB DEVELOPER / UI DESIGNER</small>
          </div>
        </div>
        <div className="helix-hint"><i /> SCROLL / DRAG <b>01</b><em>/ 10</em></div>
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
