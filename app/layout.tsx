import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '哄娃导航',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
