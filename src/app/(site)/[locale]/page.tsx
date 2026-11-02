import React from 'react'
import { JourneyEngine } from '@/journey/JourneyEngine'

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <JourneyEngine locale={locale} />
}
