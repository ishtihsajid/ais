import React from 'react'
import Link from 'next/link'
import { ShieldCheck, Factory, Award, Users, ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isBn = locale === 'bn'

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="border-b border-stone/15 pb-8 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-fresh-red">
            {isBn ? 'কোম্পানি পরিচিতি' : 'Company & Heritage'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-2 tracking-tight">
            About <span className="font-semibold text-stone">Fresh Ceramics</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            A Bangladeshi tile brand built upon superior quality, responsible manufacturing, and enduring architectural aesthetics.
          </p>
        </div>

        {/* 3 Binding Facts Hero Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 border-l-4 border-fresh-red border border-stone/15 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-dark/70">Established</span>
            <p className="text-3xl font-display font-bold text-stone mt-1">Since 2021</p>
            <p className="text-xs text-stone-dark/70 mt-2">Meghnaghat, Sonargaon, Narayanganj</p>
          </div>

          <div className="bg-white p-6 border-l-4 border-fresh-red border border-stone/15 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-dark/70">Annual Capacity</span>
            <p className="text-3xl font-display font-bold text-fresh-red mt-1">18.6M sq m</p>
            <p className="text-xs text-stone-dark/70 mt-2">Wall and floor tile units under a single shed</p>
          </div>

          <div className="bg-white p-6 border-l-4 border-fresh-red border border-stone/15 shadow-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-dark/70">Market Leadership</span>
            <p className="text-base font-display font-semibold text-stone mt-1 leading-snug">
              Highest selling tiles brand in Bangladesh every year since 2023.
            </p>
            <p className="text-xs text-stone-dark/70 mt-2">Across 79 exclusive showrooms & 120+ dealers</p>
          </div>
        </div>

        {/* Narrative & Vision */}
        <div className="bg-white border border-stone/15 p-8 md:p-12 shadow-sm space-y-6 mb-12">
          <h2 className="text-2xl font-display font-bold text-stone">The Fresh Vision</h2>
          <blockquote className="border-l-4 border-fresh-red pl-6 py-2 text-lg md:text-xl font-light text-stone-dark italic leading-relaxed">
            “Fresh stands for superior quality and strong sustainability values. To choose Fresh is to choose better quality, responsible manufacturing and a more sustainable future.”
          </blockquote>
          <p className="text-sm text-stone-dark/80 leading-relaxed font-light">
            Located on the banks of the Meghna river in Sonargaon, Narayanganj, Fresh Ceramics operates the biggest single-shed production line in Bangladesh. With machinery from the USA, Germany, Italy, and China, and mineral colours from six countries, we engineer tiles that set new benchmarks for structural density, optical clarity, and environmental stewardship.
          </p>
        </div>

        {/* Quick Doors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-display font-semibold uppercase tracking-wider">
          <Link
            href="/sustainability"
            className="p-6 bg-stone text-paper hover:bg-stone-dark transition-colors flex items-center justify-between"
          >
            <span>Six Choices at the Plant</span>
            <ArrowRight className="w-4 h-4 text-fresh-red" />
          </Link>
          <Link
            href="/quality-and-technology"
            className="p-6 bg-stone text-paper hover:bg-stone-dark transition-colors flex items-center justify-between"
          >
            <span>14 Global Lab Tests</span>
            <ArrowRight className="w-4 h-4 text-fresh-red" />
          </Link>
          <Link
            href="/showrooms"
            className="p-6 bg-stone text-paper hover:bg-stone-dark transition-colors flex items-center justify-between"
          >
            <span>Showroom Network</span>
            <ArrowRight className="w-4 h-4 text-fresh-red" />
          </Link>
        </div>
      </div>
    </div>
  )
}
