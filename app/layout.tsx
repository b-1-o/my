import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ERIK — Digital Creative',
  description: 'Erik — web developer, UI designer and creative developer based in Los Angeles.',
}

const carouselScript = `
(() => {
  const init = () => {
    const scene = document.querySelector('.spiral-scene')
    if (!scene) return false
    const cards = Array.from(scene.querySelectorAll('.spiral-card'))
    if (!cards.length) return true

    const total = cards.length
    let phase = 0
    let animating = false
    let wheelLocked = false
    let pointerActive = false
    let pointerStartY = 0
    let pointerLastY = 0
    let pointerMoved = false

    const wrap = (value) => ((value + total / 2) % total + total) % total - total / 2

    const render = (value) => {
      cards.forEach((card, index) => {
        const slot = wrap(index - value)
        const abs = Math.abs(slot)
        const angle = -16 + slot * 38
        const lift = slot * 86
        const radius = 305 + Math.cos(slot * 0.88) * 24
        const scale = 1 - Math.min(abs * 0.035, 0.22)
        const opacity = Math.max(0, 1 - Math.max(0, abs - 2.1) * 0.3)
        const blur = Math.max(0, abs - 2.2) * 2.6
        const tilt = slot * -1.35

        card.style.transform = 'rotateY(' + angle + 'deg) translateZ(' + radius + 'px) translateY(' + lift + 'px) rotateY(' + (-angle) + 'deg) rotateZ(' + tilt + 'deg) scale(' + scale + ')'
        card.style.opacity = String(opacity)
        card.style.filter = 'blur(' + blur + 'px)'
      })
    }

    const animateStep = (direction) => {
      if (animating) return
      animating = true
      const from = phase
      const to = phase + direction
      const start = performance.now()
      const duration = 680

      const frame = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        phase = from + (to - from) * eased
        render(phase)
        if (t < 1) {
          requestAnimationFrame(frame)
        } else {
          phase = to
          render(phase)
          animating = false
        }
      }

      requestAnimationFrame(frame)
    }

    const onWheel = (event) => {
      if (!scene.contains(event.target)) return
      event.preventDefault()
      event.stopImmediatePropagation()
      if (wheelLocked || animating || Math.abs(event.deltaY) < 1) return

      wheelLocked = true
      animateStep(event.deltaY > 0 ? 1 : -1)
      window.setTimeout(() => { wheelLocked = false }, 760)
    }

    const onPointerDown = (event) => {
      if (!scene.contains(event.target)) return
      event.preventDefault()
      event.stopImmediatePropagation()
      if (event.pointerType === 'mouse' && event.button !== 0) return
      pointerActive = true
      pointerMoved = false
      pointerStartY = event.clientY
      pointerLastY = event.clientY
      scene.setPointerCapture?.(event.pointerId)
    }

    const onPointerMove = (event) => {
      if (!pointerActive) return
      event.preventDefault()
      event.stopImmediatePropagation()
      if (Math.abs(event.clientY - pointerStartY) > 8) pointerMoved = true
      pointerLastY = event.clientY
    }

    const finishPointer = (event) => {
      if (!pointerActive) return
      event.preventDefault()
      event.stopImmediatePropagation()
      pointerActive = false
      const delta = pointerStartY - pointerLastY
      if (pointerMoved && Math.abs(delta) >= 28 && !animating) {
        animateStep(delta > 0 ? 1 : -1)
      }
    }

    render(phase)
    window.addEventListener('wheel', onWheel, { capture: true, passive: false })
    window.addEventListener('pointerdown', onPointerDown, { capture: true, passive: false })
    window.addEventListener('pointermove', onPointerMove, { capture: true, passive: false })
    window.addEventListener('pointerup', finishPointer, { capture: true, passive: false })
    window.addEventListener('pointercancel', finishPointer, { capture: true, passive: false })

    return true
  }

  if (!init()) {
    const observer = new MutationObserver(() => {
      if (init()) observer.disconnect()
    })
    observer.observe(document.documentElement, { childList: true, subtree: true })
    window.setTimeout(() => observer.disconnect(), 10000)
  }
})()
`

const mobileCss = `
@media (max-width:900px) {
  .hero-fiverr {
    min-height:100svh;
    display:flex;
    flex-direction:column;
    padding:100px 20px 20px;
    overflow:hidden;
  }
  .hero-copy {
    flex:0 0 auto;
    align-self:stretch;
    padding:0;
    z-index:30;
  }
  .hero-copy h1 {
    font-size:clamp(42px,11.6vw,72px);
    line-height:.86;
  }
  .hero-copy p {
    max-width:360px;
    margin:24px 0 18px;
    font-size:12px;
    line-height:1.55;
  }
  .micro { margin-bottom:18px; }
  .hero-actions { position:relative; z-index:31; }
  .spiral-scene {
    position:relative;
    inset:auto;
    left:auto;
    top:auto;
    width:calc(100% + 40px);
    height:min(430px,48svh);
    min-height:340px;
    flex:0 0 auto;
    margin:16px -20px 0;
    z-index:8;
    touch-action:none;
  }
  .spiral-stage {
    left:50%;
    top:52%;
    width:700px;
    height:760px;
    transform:translate(-50%,-50%) rotateX(-2deg) rotateY(-3deg) scale(.48);
  }
  .spiral-axis { left:50%; top:4%; height:92%; }
  .spiral-trace { display:none; }
  .spiral-card { width:234px; height:147px; margin:-73px 0 0 -117px; }
  .spiral-edge { height:25%; }
  .spiral-hint { left:50%; right:auto; bottom:12px; transform:translateX(-50%); white-space:nowrap; font-size:7px; }
  .hero-profile, .hero-side-note { display:none; }
}

@media (max-width:520px) {
  .hero-fiverr { padding:92px 16px 14px; }
  .hero-copy h1 { font-size:clamp(40px,12.5vw,64px); }
  .micro { font-size:8px; white-space:nowrap; }
  .micro b { margin-left:10px; }
  .hero-copy p { max-width:310px; font-size:11.5px; }
  .pill { padding:12px 15px; font-size:8px; }
  .pill span { margin-left:12px; }
  .spiral-scene { width:calc(100% + 32px); margin-left:-16px; margin-right:-16px; height:360px; min-height:360px; margin-top:12px; }
  .spiral-stage { top:52%; scale:.41; }
  .spiral-card { width:220px; height:139px; margin:-69px 0 0 -110px; }
  .spiral-copy strong { font-size:18px; }
  .spiral-hint { bottom:8px; }
}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <style dangerouslySetInnerHTML={{ __html: mobileCss }} />
        <script dangerouslySetInnerHTML={{ __html: carouselScript }} />
      </body>
    </html>
  )
}
