'use client'

import { useEffect, useRef, useState } from 'react'

const projects = [
  { n:'01', title:'ROYAL TOUCH', type:'WEB / BRAND / DEVELOPMENT', text:'A premium mobile car wash experience designed and built from scratch.', image:'/skate-01.jpg' },
  { n:'02', title:'B1O', type:'INTERACTIVE / UI / DEVELOPMENT', text:'A glassmorphism-inspired digital playground for experiments, interfaces and ideas.', image:'/skate-02.jpg' },
  { n:'03', title:'PRODUCT DESIGN', type:'E-COMMERCE / VISUAL DESIGN', text:'Clean marketplace visuals and product cards made to make products feel premium.', image:'/skate-03.jpg' },
  { n:'04', title:'SYSTEMS', type:'LINUX / ASM / EXPERIMENTS', text:'Low-level and desktop experiments exploring what happens underneath the interface.', image:'/skate-04.jpg' },
]

function Orb() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (e.clientX / innerWidth - .5) * 24
      const y = (e.clientY / innerHeight - .5) * 24
      if (ref.current) ref.current.style.transform = `translate3d(${x}px,${y}px,0) rotateX(${-y/2}deg) rotateY(${x/2}deg)`
    }
    addEventListener('mousemove', move)
    return () => removeEventListener('mousemove', move)
  }, [])
  return <div className="orb-wrap"><div ref={ref} className="orb"><span>ERIK</span></div></div>
}

export default function Home() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => setProgress(scrollY / (document.documentElement.scrollHeight - innerHeight) * 100)
    addEventListener('scroll', onScroll, { passive:true }); onScroll()
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold:.12 })
    els.forEach(e => io.observe(e))
    return () => { removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return <>
    <div className="progress" style={{width:`${progress}%`}} />
    <nav>
      <a href="#top" className="logo">ERIK<span>®</span></a>
      <div className="nav-links"><a href="#work">Work</a><a href="#services">Services</a><a href="#about">About</a><a href="#contact">Contact</a></div>
      <a className="status" href="#contact"><i/> Available</a>
    </nav>

    <main id="top">
      <section className="hero">
        <div className="hero-kicker">INDEPENDENT DIGITAL CREATIVE — LOS ANGELES / 2026</div>
        <div className="hero-title"><span>I DESIGN</span><span className="indent">& BUILD</span><span>DIGITAL</span><span className="indent">EXPERIENCES.</span></div>
        <div className="hero-bottom"><p>Web development, UI design and creative technology. I turn ideas into fast, expressive digital experiences.</p><a href="#work" className="circle-link">↓<small>SCROLL</small></a></div>
        <Orb />
      </section>

      <section className="statement reveal"><div className="eyebrow">01 / APPROACH</div><h2>I LIKE DIGITAL WORK THAT FEELS <em>ALIVE.</em></h2><p>Not just another website. I care about typography, movement, interaction and the tiny details that make an interface memorable.</p></section>

      <section id="work" className="work"><div className="section-top reveal"><div><div className="eyebrow">02 / SELECTED WORK</div><h2>PROJECTS</h2></div><span>04 / 04</span></div>
        <div className="project-list">{projects.map((p,i)=><a className="project reveal" href="#contact" key={p.n}>
          <div className="project-info"><span>{p.n}</span><div><h3>{p.title}</h3><p>{p.type}</p></div><b>↗</b></div>
          <div className="project-preview"><img src={p.image} alt=""/><div className="preview-copy">{p.text}</div></div>
        </a>)}</div>
      </section>

      <section id="services" className="services reveal"><div className="eyebrow">03 / WHAT I DO</div><div className="service-grid">
        {['WEB DEVELOPMENT','UI / UX DESIGN','CREATIVE DEVELOPMENT','E-COMMERCE','INTERACTIVE EXPERIENCES','DIGITAL DIRECTION'].map((x,i)=><div className="service" key={x}><span>0{i+1}</span><h3>{x}</h3><b>↗</b></div>)}
      </div></section>

      <section id="about" className="about reveal"><div className="eyebrow">04 / ABOUT ERIK</div><div><h2>I BUILD FOR THE <span>WEB,</span><br/>BUT THINK IN <span>SYSTEMS.</span></h2><p>I'm Erik — a developer and digital creator based in Los Angeles. I work across websites, interfaces, product visuals, Linux and experimental software. My goal is simple: make useful things feel exceptional.</p><div className="stack">REACT / TYPESCRIPT / JAVASCRIPT / HTML / CSS / NEXT.JS / GIT / LINUX / THREE.JS</div></div></section>

      <section className="marquee" aria-hidden="true"><div>DESIGN — CODE — MOTION — DESIGN — CODE — MOTION —</div></section>

      <section id="contact" className="contact reveal"><div className="eyebrow">05 / LET'S WORK</div><h2>HAVE AN IDEA?<br/><span>LET'S BUILD IT.</span></h2><a className="contact-btn" href="mailto:hello@erik.dev">GET IN TOUCH ↗</a></section>
    </main>
    <footer><span>© 2026 ERIK</span><span>LOS ANGELES, CA</span><a href="https://github.com/b-1-o/my-">GITHUB ↗</a></footer>
  </>
}
