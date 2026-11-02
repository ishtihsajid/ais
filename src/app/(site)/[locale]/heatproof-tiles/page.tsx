import React from 'react'
import Link from 'next/link'
import { Sun, ShieldCheck, ThermometerSnowflake, Zap, Leaf, ArrowRight, Compass } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function HeatproofTilesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const isBn = locale === 'bn'

  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-stone pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header Breadcrumb */}
        <div className="border-b border-stone/15 pb-8 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-fresh-red mb-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span className="text-stone-dark/70">Sustainable Surfaces</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-light text-stone mt-2 tracking-tight">
            Heatproof Tiles: <span className="font-semibold text-stone">Year-Round Thermal Barrier</span>
          </h1>
          <p className="text-sm md:text-base text-stone-dark/80 mt-2 max-w-2xl font-light">
            {isBn
              ? 'উচ্চ ইন্সুলেশন ক্ষমতাসম্পন্ন বিশেষ সিরামিক টাইলস যা গ্রীষ্মে ঘরের ভেতর তাপ ঢুকতে বাধা দেয় এবং শীতে উষ্ণতা ধরে রাখে। জ্বালানি খরচে সর্বোচ্চ ৩০% পর্যন্ত সাশ্রয়।'
              : 'Engineered high-insulation porcelain creating an impenetrable thermal barrier. Keeps excessive tropical solar heat outside during peak summer while conserving indoor comfort, reducing active cooling loads by up to 30%.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white border border-stone/15 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-fresh-red/10 text-fresh-red flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-fresh-red uppercase font-bold tracking-wider">
                Energy Conservation
              </span>
              <h3 className="text-2xl font-display font-bold text-stone mt-1">
                Up to 30%
              </h3>
              <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
                Significant reduction in annual HVAC electricity bills by insulating building envelopes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone/10 text-[10px] font-mono text-stone-dark/50">
              Lab-tested thermal insulation
            </div>
          </div>

          <div className="bg-white border border-stone/15 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-stone/10 text-stone flex items-center justify-center mb-4">
                <ThermometerSnowflake className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-stone uppercase font-bold tracking-wider">
                Micro-Climate Comfort
              </span>
              <h3 className="text-2xl font-display font-bold text-stone mt-1">
                Dual Season
              </h3>
              <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
                Repels external radiant solar heat in scorching summers and retains internal thermal warmth in winter.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone/10 text-[10px] font-mono text-stone-dark/50">
              Low thermal conductivity
            </div>
          </div>

          <div className="bg-white border border-stone/15 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-stone/10 text-stone flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-stone uppercase font-bold tracking-wider">
                Appliance Life
              </span>
              <h3 className="text-2xl font-display font-bold text-stone mt-1">
                Less Strain
              </h3>
              <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
                Minimizes compressor duty cycles on split air conditioners and commercial VRF chillers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone/10 text-[10px] font-mono text-stone-dark/50">
              Extended equipment longevity
            </div>
          </div>

          <div className="bg-white border border-stone/15 p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold tracking-wider">
                Global Goal
              </span>
              <h3 className="text-2xl font-display font-bold text-stone mt-1">
                UN SDG 11
              </h3>
              <p className="text-xs text-stone-dark/70 mt-2 leading-relaxed">
                Directly supports United Nations Sustainable Cities and Communities by lowering urban heat island effects.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone/10 text-[10px] font-mono text-emerald-700/60">
              Sustainable Urbanization
            </div>
          </div>
        </div>

        {/* Architectural Story & Cross-Section Simulation */}
        <div className="bg-stone text-paper p-8 md:p-12 border border-stone-dark mb-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-fresh-red font-bold">
                Thermal Physics & Envelope Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-light text-white tracking-tight">
                Lighter on the building. <span className="font-semibold text-white">Easier on the home.</span>
              </h2>
              <p className="text-xs sm:text-sm text-grey leading-relaxed">
                In tropical climates like Bangladesh, solar radiation directly transfers through exterior walls and roof slabs, escalating indoor cooling demand. Fresh Ceramics Heatproof tiles incorporate high-insulation microporous ceramic matrices that dissipate infrared radiation before it penetrates structural masonry.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-grey">
                <span className="border-l-2 border-fresh-red pl-3">Reduces Carbon Footprint</span>
                <span className="border-l-2 border-fresh-red pl-3">Zero Shade Variance</span>
                <span className="border-l-2 border-fresh-red pl-3">Ultra Fine Squaring</span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone-dark/80 p-6 border border-stone/40 text-center">
              <span className="text-[10px] font-mono uppercase text-grey tracking-wider block mb-2">
                UN Sustainable Development Goals
              </span>
              <div className="inline-block p-4 bg-emerald-900/40 border border-emerald-500/30 text-white my-2">
                <span className="text-2xl font-display font-bold block text-emerald-400">SDG 11</span>
                <span className="text-xs font-mono">Sustainable Cities & Communities</span>
              </div>
              <p className="text-[11px] text-grey mt-2">
                Engineered responsibly at the Meghnaghat plant under 14 factory tests.
              </p>
            </div>
          </div>
        </div>

        {/* Dual Navigation Strip */}
        <div className="bg-white border border-stone/15 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-xs font-mono uppercase text-stone-dark/60 block">Explore Companion Innovation</span>
            <h4 className="text-base font-display font-bold text-stone">Slim Tiles: 25% to 29% Weight Reduction</h4>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={isBn ? '/bn/slim-tiles' : '/slim-tiles'}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone hover:bg-stone-dark text-paper text-xs font-display font-semibold uppercase tracking-wider transition-colors"
            >
              <span>Explore Slim Tiles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={isBn ? '/bn/tiles' : '/tiles'}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-fresh-red hover:bg-ember text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Browse All Tiles</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
