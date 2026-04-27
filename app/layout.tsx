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
  title: 'Hidayah OS | The Modern Islamic Linux Distribution',
  description: 'Hidayah OS (Nur 1.0) is a privacy-focused, beautiful, and lightweight Linux distribution based on Debian, designed for the global Muslim community. Featuring the Emerald Luxe UI.',
  keywords: 'Islamic Linux, Hidayah OS, Emerald Luxe, Privacy OS, Linux for Muslims, Debian XFCE, Debian KDE, Halal OS',
  authors: [{ name: 'Ubaid Ur Rehman', url: 'https://hidayahos.github.io' }],
  creator: 'Ubaid Ur Rehman',
  publisher: 'Hidayah OS Project',
  category: 'Operating System',
  openGraph: {
    title: 'Hidayah OS - The Light of Linux',
    description: 'Download the Nur 1.0 release. Beautiful, Stable, and Purposed.',
    url: 'https://hidayahos.github.io/',
    siteName: 'Hidayah OS',
    images: [{ url: '/hidayah-os-icon.png', width: 512, height: 512, alt: 'Hidayah OS Logo' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hidayah OS - The Light of Linux',
    description: 'Download the Nur 1.0 release. Beautiful, Stable, and Purposed.',
    images: ['/hidayah-os-icon.png'],
    creator: '@hidayahos',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hidayahos.github.io',
  },
  icons: {
    icon: '/hidayah-os-icon.png',
    shortcut: '/hidayah-os-icon.png',
    apple: '/apple-icon.png',
  },
  verification: {
    google: 'E0Dnt6NfaWsOaTYS84XxWmH5Q9i1pLn-ueWW4ZGWe60',
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
              },
              "featureList": "Halal content filtering, Athan daemon, Hijri calendar, Quran integration, Zero telemetry, App sandboxing",
              "softwareVersion": "1.0",
              "applicationSubCategory": "Islamic Operating System"
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
