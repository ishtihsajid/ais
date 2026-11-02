import React from 'react'
import { Footer } from '@/components/Footer'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const currentLocale = locale === 'bn' ? 'bn' : 'en'

  return (
    <div className={`relative min-h-screen ${currentLocale === 'bn' ? 'font-bengali' : 'font-sans'}`}>
      <main className="w-full">
        {children}
      </main>
      <Footer locale={currentLocale} />
    </div>
  )
}
