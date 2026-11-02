import React from 'react'
import type { Metadata } from 'next'
import { montserrat, notoSansBengali, hindSiliguri } from '@/lib/fonts'
import '@/styles/globals.css'

import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Fresh Ceramics - A Fresh Start to an Aesthetic Life',
  description: 'Highest selling tiles brand in Bangladesh every year since 2023. Double Charge, Mirror Polished, Slim and Heatproof Tiles.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${notoSansBengali.variable} ${hindSiliguri.variable}`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#FFFFFF] text-[#4A4A4A] antialiased selection:bg-[#E30613] selection:text-white"
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
