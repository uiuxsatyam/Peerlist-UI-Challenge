import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Peerlist UI Menu',
  description: 'Designed by Satyam',
  generator: 'satyam',
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
