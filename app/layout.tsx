import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ERIK — Digital Creative',
  description: 'Erik — web developer, UI designer and creative developer based in Los Angeles.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
