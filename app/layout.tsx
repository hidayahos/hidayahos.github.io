import React from "react"
import type { Metadata, Viewport } from 'next'
import { Scheherazade_New, Cormorant_Garamond, DM_Mono } from 'next/font/google'
import './globals.css'

const scheherazadeNew = Scheherazade_New({ 
  subsets: ["latin", "arabic"],
  weight: "400",
  variable: '--font-scheherazade',
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmMono = DM_Mono({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hidayahos.github.io"),
  title: 'Hidayah OS — Privacy-First Islamic Linux Distribution',
  description: 'Hidayah OS is a free, open-source Islamic Linux distribution built on Debian with KDE Plasma. Features halal content filtering, prayer times, Quran integration, and zero telemetry.',
  keywords: 'Hidayah OS, Islamic Linux, Muslim Linux, halal operating system, Islamic privacy OS, Muslim OS, Islamic distro, halal Linux, privacy Linux for Muslims, Islamic desktop',
  openGraph: {
    title: 'Hidayah OS — Privacy-First Islamic Linux',
    description: 'An Operating System Aligned With Your Values. Free, open-source Islamic Linux with built-in halal content filtering and prayer integration.',
    url: 'https://hidayahos.github.io',
    siteName: 'Hidayah OS',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hidayah OS — Islamic Linux Distribution',
    description: 'Privacy-first Islamic Linux OS with halal content filtering, prayer times, and Quran integration. Free forever.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true }
  },
  alternates: {
    canonical: 'https://hidayahos.github.io'
  }
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preconnect"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Hidayah OS",
              "operatingSystem": "Linux",
              "applicationCategory": "OperatingSystem",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Privacy-first Islamic Linux distribution with halal content filtering, prayer times, and Quran integration",
              "url": "https://hidayahos.github.io",
              "downloadUrl": "https://github.com/hidayahos/hidayah-os/releases",
              "license": "https://www.gnu.org/licenses/gpl-3.0.html",
              "author": {
                "@type": "Organization",
                "name": "Hidayah OS Project",
                "url": "https://hidayahos.github.io"
              }
            })
          }}
        />
      </head>
      <body className={`${scheherazadeNew.variable} ${cormorantGaramond.variable} ${dmMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
