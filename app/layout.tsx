import React from "react"
import type { Metadata, Viewport } from 'next'
import { Scheherazade_New, Cormorant_Garamond, DM_Mono } from 'next/font/google'
import './globals.css'

const scheherazadeNew = Scheherazade_New({ 
  subsets: ["latin", "arabic"],
  weight: "400",
  variable: '--font-scheherazade',
  display: 'swap',  // use fallback while loading
});

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-cormorant',
  display: 'swap',  // use fallback while loading
});

const dmMono = DM_Mono({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-dm-mono',
  display: 'swap',  // use fallback while loading
});

export const metadata: Metadata = {
  title: 'Hidayah OS - Privacy-First Islamic Linux',
  description: 'An operating system built with Islamic values at its core. Zero telemetry, kernel-level content filtering, Athan daemon, and beautiful design for Muslims worldwide.',
  generator: 'v0.app',
  icons: {
    icon: '/hidayah-os-icon.png',
  },
  openGraph: {
    title: 'Hidayah OS - Privacy-First Islamic Linux',
    description: 'An operating system built with Islamic values at its core. Zero telemetry, kernel-level content filtering, Athan daemon, and beautiful design for Muslims worldwide.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0a1f0a',
  colorScheme: 'dark',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        {/* Preconnect to video CDN for faster resource loading */}
        <link
          rel="preconnect"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
          crossOrigin="anonymous"
        />
        {/* DNS Prefetch for faster DNS resolution */}
        <link
          rel="dns-prefetch"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
        />
      </head>
      <body className={`${scheherazadeNew.variable} ${cormorantGaramond.variable} ${dmMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
