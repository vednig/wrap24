import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: 'DevWrap 24 - Spotify Wrapped for Developers ',
  description: 'Get your Yearly Dose of Development and Stats for GitHub and StackOverflow',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">

      <body>{children}</body> 
      <Analytics/>

    </html>
  )
}