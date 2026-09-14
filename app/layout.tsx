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
    if (!cards.length) return false
    if (scene.dataset.carouselFixed === '1') return true
    scene.dataset.carouselFixed = '1'

    const total = cards.length
    let target = 0
    let current = 0
    let frame = 0
    let pointerActive = false
    let gestureAxis = null
    let pointerLastX = 0
    let pointerLastY = 0
    const isTouchLike = () => window.matchMedia('(max-width: 900px)').matches

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

    const tick = () => {
      current += (target - current) * 0.075
      if (Math.abs(target - current) < 0.0005) current = target
      render(current)
      frame = requestAnimationFrame(tick)
    }

    const onWheel = (event) => {
      if (!scene.contains(event.target)) return
      event.preventDefault()
      event.stopImmediatePropagation()
      const delta = Math.max(-120, Math.min(120, event.deltaY))
      target += delta * 0.006
    }

    const onPointerDown = (event) => {
      if (!scene.contains(event.target)) return
      if (event.pointerType === 'mouse' && event.button !== 0) return
      pointerActive = true
      gestureAxis = null
      pointerLastX = event.clientX
      pointerLastY = event.clientY
      if (isTouchLike()) {
        scene.style.touchAction = 'pan-y'
      } else {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
      scene.setPointerCapture?.(event.pointerId)
    }

    const onPointerMove = (event) => {
      if (!pointerActive) return

      const dx = event.clientX - pointerLastX
      const dy = event.clientY - pointerLastY

      if (isTouchLike()) {
        if (!gestureAxis) {
          const distance = Math.hypot(dx, dy)
          if (distance < 6) return
          gestureAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
          if (gestureAxis === 'x') {
            event.preventDefault()
            event.stopImmediatePropagation()
            scene.style.touchAction = 'none'
          } else {
            pointerActive = false
            scene.style.touchAction = 'pan-y'
            return
          }
        }

        if (gestureAxis === 'y') return
        event.preventDefault()
        event.stopImmediatePropagation()
      } else {
        event.preventDefault()
        event.stopImmediatePropagation()
      }

      target += -dx * 0.009
      pointerLastX = event.clientX
      pointerLastY = event.clientY
    }

    const stopPointer = (event) => {
      if (!pointerActive) return
      if (!isTouchLike() || gestureAxis === 'x') {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
      pointerActive = false
      gestureAxis = null
      scene.style.touchAction = isTouchLike() ? 'pan-y' : 'none'
    }

    render(0)
    frame = requestAnimationFrame(tick)
    window.addEventListener('wheel', onWheel, { capture: true, passive: false })
    window.addEventListener('pointerdown', onPointerDown, { capture: true, passive: false })
    window.addEventListener('pointermove', onPointerMove, { capture: true, passive: false })
    window.addEventListener('pointerup', stopPointer, { capture: true, passive: false })
    window.addEventListener('pointercancel', stopPointer, { capture: true, passive: false })

    return true
  }

  if (!init()) {
    const observer = new MutationObserver(() => {
      if (init()) observer.disconnect()
    })
    observer.observe(document.documentElement, { childList: true, subtree: true })
    window.setTimeout(() => observer.disconnect(), 15000)
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
    touch-action:pan-y;
    isolation:isolate;
  }
  .spiral-stage {
    position:absolute;
    left:50%;
    top:50%;
    width:720px;
    height:760px;
    z-index:2;
    transform:translate(-50%,-50%) rotateX(-2deg) rotateY(-2deg) scale(.66);
  }
  .spiral-track { position:absolute; inset:0; z-index:2; }
  .spiral-card { width:280px; height:177px; margin:-88.5px 0 0 -140px; }
  .spiral-axis { left:50%; top:3%; height:94%; z-index:1; }
  .spiral-trace { display:none; }
  .spiral-edge { height:18%; z-index:8; }
  .spiral-hint { left:50%; right:auto; bottom:12px; transform:translateX(-50%); white-space:nowrap; font-size:7px; z-index:10; }
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
  .spiral-scene { width:calc(100% + 32px); margin-left:-16px; margin-right:-16px; height:390px; min-height:390px; margin-top:12px; }
  .spiral-stage { left:50%; top:50%; width:700px; height:740px; transform:translate(-50%,-50%) rotateX(-2deg) rotateY(-2deg) scale(.58); }
  .spiral-card { width:270px; height:171px; margin:-85.5px 0 0 -135px; }
  .spiral-copy strong { font-size:20px; }
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
