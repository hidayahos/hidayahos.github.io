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
  title: 'Hidayah OS | Privacy-Hardened Islamic Linux Distribution',
  description: 'Hidayah OS 1.0 (Nur) is a privacy-hardened Islamic Linux distribution based on Debian 12, featuring custom Islamic tools, zero telemetry, and two beautiful editions: KDE Plasma and XFCE.',
  keywords: 'Islamic Linux, Hidayah OS, Nur 1.0, Privacy OS, Linux for Muslims, Debian 12, KDE Plasma, XFCE, Halal Linux, Islamic Operating System',
  authors: [{ name: 'Hidayah OS Project', url: 'https://hidayahos.github.io' }],
  creator: 'Hidayah OS Project',
  publisher: 'Hidayah OS Project',
  category: 'Operating System',
  openGraph: {
    title: 'Hidayah OS 1.0 (Nur) - Privacy-Hardened Islamic Linux',
    description: 'The light of Linux. A beautiful, stable, and purposed OS for the global Muslim community.',
    url: 'https://hidayahos.github.io/',
    siteName: 'Hidayah OS',
    images: [{ url: '/hidayah-os-icon.png', width: 512, height: 512, alt: 'Hidayah OS Logo' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hidayah OS 1.0 (Nur) - Privacy-Hardened Islamic Linux',
    description: 'Privacy-first Islamic Linux distribution with custom Islamic tools and zero telemetry.',
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
              "description": "Privacy-hardened Islamic Linux distribution with prayer times, Quran reader, and zero telemetry.",
              "url": "https://hidayahos.github.io",
              "downloadUrl": "https://mega.nz/file/x04gAZQD#A01yfX_ndx27WSug_AJZGyZVguR0KVnkopZ0MqfJiBg",
              "license": "https://www.gnu.org/licenses/gpl-3.0.html",
              "author": {
                "@type": "Organization",
                "name": "Hidayah OS Project",
                "url": "https://hidayahos.github.io"
              },
              "featureList": "Prayer Times, Quran Reader, Hijri Calendar, Tor Daemon, UFW Firewall, Zero Telemetry",
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
