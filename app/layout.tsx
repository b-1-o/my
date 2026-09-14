import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ERIK — Digital Creative',
  description: 'Erik — web developer, UI designer and creative developer based in Los Angeles.',
}

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
      </body>
    </html>
  )
}
