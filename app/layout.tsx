import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'house',
  description: '私の家'
}

export default function Root({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  )
}
