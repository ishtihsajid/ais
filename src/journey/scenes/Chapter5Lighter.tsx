'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Feather, Sun, ShieldCheck, ArrowUpRight, Car } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Chapter5LighterProps {
  locale?: string
  isTouch?: boolean
}

const SQFT_TO_SQM = 0.092903
const CAR_EQUIVALENT_KG = 1330 // Toyota Corolla weight standard per section 7.3

const SLIM_VARIANTS = {
  A: {
    label: 'Variant A (Floor & Wall Slim)',
    conventionalKgPerSqm: 21.83,
    slimKgPerSqm: 16.38,
    reductionPercent: 25,
  },
  B: {
    label: 'Variant B (Heavy Duty Porcelain Slim)',
    conventionalKgPerSqm: 25.04,
    slimKgPerSqm: 17.83,
    reductionPercent: 29,
  },
}

export function Chapter5Lighter({ locale = 'en', isTouch = false }: Chapter5LighterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B'>('A')
  const [storeys, setStoreys] = useState<number>(10)
  const [areaSqft, setAreaSqft] = useState<number>(5000)
  const [mobileTab, setMobileTab] = useState<'slim' | 'heatproof'>('slim')

  const isBn = locale === 'bn'

  // Slim calculation
  const currentVariant = SLIM_VARIANTS[selectedVariant]
  const diffPerSqm = currentVariant.conventionalKgPerSqm - currentVariant.slimKgPerSqm
  const totalAreaSqm = areaSqft * storeys * SQFT_TO_SQM
  const savedKg = totalAreaSqm * diffPerSqm
  const savedMT = (savedKg / 1000).toFixed(1)
  const cars = Math.round(savedKg / CAR_EQUIVALENT_KG)

  useEffect(() => {
    const container = containerRef.current
    const scene = sceneRef.current
    if (!container || !scene) return

    const pinDistance = () => window.innerHeight * (isTouch ? 1.5 : 2.5)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${pinDistance()}`,
          pin: scene,
          scrub: 0.5,
          anticipatePin: 0,
        },
      })

      // Animate split panels
      tl.fromTo(
        '.split-left',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        0.1
      )
      tl.fromTo(
        '.split-right',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        0.2
      )

      // Closing line reveal (finishes at 1.0)
      tl.fromTo(
        '.closing-bar',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0.75
      )
    }, container)

    return () => ctx.revert()
  }, [isTouch])

  return (
    <section
      id="lighter"
      ref={containerRef}
      className="relative w-full bg-paper text-stone select-none transition-colors duration-700"
    >
      <div
        ref={sceneRef}
        className="w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between relative pt-20 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-8 md:px-12 lg:px-14 bg-[#F7F7F8]"
      >
        {/* Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone/15 pb-4 shrink-0">
          <div>
            <span className="text-[11px] font-display font-semibold tracking-widest uppercase text-fresh-red">
              {isBn ? 'অধ্যায় ০৫: টেকসই উদ্ভাবন' : 'Chapter 05: Sustainable Innovation'}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-light text-stone mt-1 tracking-tight">
              {isBn ? (
                <>হালকা এবং শীতল: <span className="font-semibold text-stone">স্লিম ও হিটপ্রুফ</span></>
              ) : (
                <>Lighter and cooler: <span className="font-semibold text-stone">Slim & Heatproof</span></>
              )}
            </h2>
          </div>
          <span className="text-xs font-display uppercase tracking-widest text-stone-dark/70 font-medium">
            {isBn ? 'ল্যাব পরীক্ষিত পরিবেশবান্ধব উদ্ভাবন' : 'Lab-tested green architectural solutions'}
          </span>
        </div>

        {/* Center Split Screen (Desktop): Left = Slim Tiles Calculator, Right = Heatproof Tiles */}
        <div className="hidden lg:grid relative z-10 grid-cols-2 gap-8 my-auto items-stretch overflow-hidden flex-1 min-h-0 py-2">
          {/* Left Column: Slim Tiles Calculator (Desktop) */}
          <div className="split-left bg-white p-6 lg:p-7 border border-stone/15 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Feather className="w-5 h-5 text-fresh-red" />
                  <h3 className="text-xl font-display font-bold text-stone">
                    {isBn ? 'স্লিম টাইলস ক্যালকুলেটর' : 'Slim Tiles Dead-Load Calculator'}
                  </h3>
                </div>
                <span className="text-xs font-mono font-semibold text-fresh-red bg-fresh-red/10 px-2 py-0.5">
                  -{currentVariant.reductionPercent}% {isBn ? 'ওজন হ্রাস' : 'Weight'}
                </span>
              </div>

              {/* Variant Selector */}
              <div className="flex gap-2 mb-5">
                {(['A', 'B'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`flex-1 py-1.5 px-3 text-xs font-display uppercase tracking-wider font-semibold border transition-all ${
                      selectedVariant === v
                        ? 'bg-stone text-paper border-stone'
                        : 'bg-white text-stone border-stone/20 hover:border-fresh-red'
                    }`}
                  >
                    Variant {v} ({SLIM_VARIANTS[v].reductionPercent}% lighter)
                  </button>
                ))}
              </div>

              {/* Sliders and Inputs */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-display font-medium text-stone mb-1">
                    <span>{isBn ? 'ভবনের তলা সংখ্যা' : 'Number of storeys'}:</span>
                    <span className="font-mono font-bold text-fresh-red">{storeys}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={storeys}
                    onChange={(e) => setStoreys(Number(e.target.value))}
                    className="w-full accent-fresh-red cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-display font-medium text-stone mb-1">
                    <span>{isBn ? 'প্রতি তলার ক্ষেত্রফল (বর্গফুট)' : 'Floor area per storey (sq ft)'}:</span>
                    <span className="font-mono font-bold text-stone">{areaSqft.toLocaleString()} sq ft</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    step="500"
                    value={areaSqft}
                    onChange={(e) => setAreaSqft(Number(e.target.value))}
                    className="w-full accent-fresh-red cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Live Acceptance Metric Badges */}
            <div className="mt-6 pt-5 border-t border-stone/15 grid grid-cols-2 gap-4 bg-stone/5 p-4">
              <div>
                <span className="text-[10px] font-display uppercase tracking-widest text-stone-dark/70 block">
                  {isBn ? 'অপসারিত অতিরিক্ত ওজন' : 'Dead Load Removed'}
                </span>
                <span className="text-3xl md:text-4xl font-mono font-bold text-stone">
                  {savedMT} <span className="text-sm font-normal text-stone-dark/70">MT</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] font-display uppercase tracking-widest text-stone-dark/70 block">
                  {isBn ? 'গাড়ির ওজনের সমতুল্য' : 'Car Load Equivalence'}
                </span>
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-fresh-red" />
                  <span className="text-3xl md:text-4xl font-mono font-bold text-fresh-red">
                    {cars} <span className="text-sm font-normal text-stone-dark/70">{isBn ? 'টি গাড়ি' : 'cars'}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heatproof Tiles Cross-Section & SDG 11 (Desktop) */}
          <div className="split-right bg-white p-6 md:p-8 border border-stone/15 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-fresh-red" />
                  <h3 className="text-xl font-display font-bold text-stone">
                    {isBn ? 'হিটপ্রুফ টাইলস' : 'Heatproof Ceramic Barrier'}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-fresh-red bg-fresh-red/10 px-2.5 py-1">
                  {isBn ? '৩০% পর্যন্ত বিদ্যুৎ সাশ্রয়' : 'Up to 30% Energy Saving'}
                </span>
              </div>

              {/* Thermal Cross-Section Representation */}
              <div className="p-4 bg-stone/5 border border-stone/10 mb-4 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs font-mono text-stone-dark/70 mb-2">
                  <span>OUTSIDE: 38°C</span>
                  <span className="text-fresh-red font-bold">THERMAL SHIELD</span>
                  <span>INSIDE: 26°C</span>
                </div>
                <div className="h-6 w-full flex items-center">
                  <div className="h-full flex-1 bg-gradient-to-r from-red-500/40 to-amber-500/30" />
                  <div className="h-8 w-4 bg-stone shadow-md flex items-center justify-center text-[8px] text-white font-mono">
                    FC
                  </div>
                  <div className="h-full flex-1 bg-gradient-to-r from-blue-300/20 to-emerald-200/20" />
                </div>
              </div>

              {/* Verified Lab Points */}
              <ul className="space-y-2 text-xs md:text-sm text-stone leading-relaxed">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-fresh-red shrink-0 mt-0.5" />
                  <span>
                    {isBn
                      ? 'সারাবছর কার্যকর থার্মাল বেরিয়ার: গ্রীষ্মে ঘরের ভেতরে তাপ প্রবেশ রোধ করে এবং শীতে উষ্ণতা ধরে রাখে।'
                      : 'Year-round thermal barrier: keeps scorching heat out in summer and retains warmth in winter.'}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-fresh-red shrink-0 mt-0.5" />
                  <span>
                    {isBn
                      ? 'এয়ার কন্ডিশনার ও হিটিং সিস্টেমের ওপর চাপ কমায়, যা বিদ্যুৎ খরচ সাশ্রয় করে।'
                      : 'Substantially reduces HVAC operational strain, cutting carbon footprint across building lifecycle.'}
                  </span>
                </li>
              </ul>
            </div>

            {/* UN SDG 11 Badge and Certifications */}
            <div className="mt-6 pt-5 border-t border-stone/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FD9D24] text-white flex flex-col items-center justify-center font-bold text-[9px] leading-tight text-center p-1 shadow-sm">
                  <span>SDG</span>
                  <span>11</span>
                </div>
                <div>
                  <span className="text-xs font-display font-semibold text-stone block">
                    UN Sustainable Development Goal 11
                  </span>
                  <span className="text-[10px] text-stone-dark/70">
                    Sustainable Cities and Communities
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={isBn ? '/bn/slim-tiles' : '/slim-tiles'}
                  className="text-xs font-display uppercase tracking-wider text-stone hover:text-fresh-red font-semibold py-1 px-2 border border-stone/20 hover:border-fresh-red"
                >
                  Slim Specs →
                </Link>
                <Link
                  href={isBn ? '/bn/heatproof-tiles' : '/heatproof-tiles'}
                  className="text-xs font-display uppercase tracking-wider text-stone hover:text-fresh-red font-semibold py-1 px-2 border border-stone/20 hover:border-fresh-red"
                >
                  Heatproof →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section (Mobile): Touch Segment Switcher for Slim vs. Heatproof */}
        <div className="block lg:hidden relative z-10 my-auto flex-1 min-h-0 flex flex-col justify-between py-1 overflow-hidden">
          {/* Mobile Top Segment Toggle */}
          <div className="flex bg-stone/10 p-1 border border-stone/15 mb-2.5 shrink-0">
            <button
              onClick={() => setMobileTab('slim')}
              className={`flex-1 py-1.5 px-2 text-xs font-display font-semibold transition-all flex items-center justify-center gap-1.5 ${
                mobileTab === 'slim'
                  ? 'bg-stone text-paper shadow-sm'
                  : 'text-stone-dark/80 hover:text-stone'
              }`}
            >
              <Feather className="w-3.5 h-3.5 text-fresh-red" />
              <span>{isBn ? 'স্লিম ক্যালকুলেটর' : 'Slim Calculator'}</span>
            </button>
            <button
              onClick={() => setMobileTab('heatproof')}
              className={`flex-1 py-1.5 px-2 text-xs font-display font-semibold transition-all flex items-center justify-center gap-1.5 ${
                mobileTab === 'heatproof'
                  ? 'bg-stone text-paper shadow-sm'
                  : 'text-stone-dark/80 hover:text-stone'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-fresh-red" />
              <span>{isBn ? 'হিটপ্রুফ বেরিয়ার' : 'Heatproof Barrier'}</span>
            </button>
          </div>

          {/* Mobile Slim Calculator Panel */}
          {mobileTab === 'slim' && (
            <div className="bg-white p-4 sm:p-5 border border-stone/15 shadow-sm flex flex-col justify-between flex-1 min-h-0 overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Feather className="w-4 h-4 text-fresh-red" />
                    <h3 className="text-base font-display font-bold text-stone">
                      {isBn ? 'স্লিম টাইলস ক্যালকুলেটর' : 'Slim Dead-Load Calculator'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-fresh-red bg-fresh-red/10 px-2 py-0.5">
                    -{currentVariant.reductionPercent}% {isBn ? 'ওজন হ্রাস' : 'Weight'}
                  </span>
                </div>

                {/* Variant Selector */}
                <div className="flex gap-2 mb-3">
                  {(['A', 'B'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex-1 py-1 px-2 text-[11px] font-display uppercase tracking-wider font-semibold border transition-all ${
                        selectedVariant === v
                          ? 'bg-stone text-paper border-stone'
                          : 'bg-white text-stone border-stone/20'
                      }`}
                    >
                      Variant {v} (-{SLIM_VARIANTS[v].reductionPercent}%)
                    </button>
                  ))}
                </div>

                {/* Sliders */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-display font-medium text-stone mb-1">
                      <span>{isBn ? 'ভবনের তলা' : 'Storeys'}:</span>
                      <span className="font-mono font-bold text-fresh-red">{storeys}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={storeys}
                      onChange={(e) => setStoreys(Number(e.target.value))}
                      className="w-full accent-fresh-red cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-display font-medium text-stone mb-1">
                      <span>{isBn ? 'ক্ষেত্রফল' : 'Area / Storey'}:</span>
                      <span className="font-mono font-bold text-stone">{areaSqft.toLocaleString()} sq ft</span>
                    </div>
                    <input
                      type="range"
                      min="1000"
                      max="20000"
                      step="500"
                      value={areaSqft}
                      onChange={(e) => setAreaSqft(Number(e.target.value))}
                      className="w-full accent-fresh-red cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Metric Badges */}
              <div className="mt-4 pt-3 border-t border-stone/15 grid grid-cols-2 gap-3 bg-stone/5 p-3 shrink-0">
                <div>
                  <span className="text-[9px] font-display uppercase tracking-widest text-stone-dark/70 block">
                    {isBn ? 'অপসারিত ওজন' : 'Dead Load Removed'}
                  </span>
                  <span className="text-2xl font-mono font-bold text-stone">
                    {savedMT} <span className="text-xs font-normal text-stone-dark/70">MT</span>
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-display uppercase tracking-widest text-stone-dark/70 block">
                    {isBn ? 'গাড়ির সমতুল্য' : 'Car Equivalence'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-fresh-red" />
                    <span className="text-2xl font-mono font-bold text-fresh-red">
                      {cars} <span className="text-xs font-normal text-stone-dark/70">{isBn ? 'গাড়ি' : 'cars'}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Heatproof Barrier Panel */}
          {mobileTab === 'heatproof' && (
            <div className="bg-white p-4 sm:p-5 border border-stone/15 shadow-sm flex flex-col justify-between flex-1 min-h-0 overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Sun className="w-4 h-4 text-fresh-red" />
                    <h3 className="text-base font-display font-bold text-stone">
                      {isBn ? 'হিটপ্রুফ সিরামিক বেরিয়ার' : 'Heatproof Ceramic Barrier'}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-fresh-red bg-fresh-red/10 px-2 py-0.5">
                    {isBn ? '৩০% বিদ্যুৎ সাশ্রয়' : 'Up to 30% Saving'}
                  </span>
                </div>

                {/* Thermal Cross-Section Graphic */}
                <div className="p-3 bg-stone/5 border border-stone/10 mb-3 relative overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-dark/70 mb-1.5">
                    <span>OUT: 38°C</span>
                    <span className="text-fresh-red font-bold">THERMAL SHIELD</span>
                    <span>IN: 26°C</span>
                  </div>
                  <div className="h-5 w-full flex items-center">
                    <div className="h-full flex-1 bg-gradient-to-r from-red-500/40 to-amber-500/30" />
                    <div className="h-7 w-4 bg-stone shadow-md flex items-center justify-center text-[7px] text-white font-mono">
                      FC
                    </div>
                    <div className="h-full flex-1 bg-gradient-to-r from-blue-300/20 to-emerald-200/20" />
                  </div>
                </div>

                {/* Lab points */}
                <ul className="space-y-2 text-xs text-stone leading-relaxed mb-3">
                  <li className="flex items-start gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-fresh-red shrink-0 mt-0.5" />
                    <span>
                      {isBn
                        ? 'গ্রীষ্মে তীব্র উত্তাপ প্রতিরোধ করে এবং শীতে উষ্ণতা ধরে রাখে।'
                        : 'Year-round thermal shield: keeps scorching heat out in summer.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-fresh-red shrink-0 mt-0.5" />
                    <span>
                      {isBn
                        ? 'HVAC এসি বিদ্যুৎ খরচ নাটকীয়ভাবে হ্রাস করে।'
                        : 'Reduces HVAC power strain, cutting lifecycle carbon footprint.'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* SDG 11 Footer on Mobile */}
              <div className="pt-3 border-t border-stone/15 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#FD9D24] text-white flex flex-col items-center justify-center font-bold text-[8px] leading-tight text-center p-0.5">
                    <span>SDG</span>
                    <span>11</span>
                  </div>
                  <span className="text-[11px] font-display font-semibold text-stone">
                    UN SDG 11 Certified
                  </span>
                </div>
                <Link
                  href={isBn ? '/bn/heatproof-tiles' : '/heatproof-tiles'}
                  className="text-xs font-display uppercase tracking-wider text-stone hover:text-fresh-red font-semibold py-1 px-2 border border-stone/20"
                >
                  Heatproof →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Closing Bar */}
        <div className="closing-bar relative z-10 flex items-center justify-between pt-3 border-t border-stone/15 text-xs font-display shrink-0">
          <p className="text-base sm:text-lg font-light text-stone tracking-wide">
            {isBn
              ? '“ভবনের ওপর হালকা। গৃহের আবহে শান্ত ও শীতল।”'
              : '“Lighter on the building. Easier on the home.”'}
          </p>
          <div className="flex gap-4">
            <Link
              href={isBn ? '/bn/sustainability' : '/sustainability'}
              className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-fresh-red hover:underline"
            >
              <span>{isBn ? 'আমাদের স্থায়িত্ব দর্শন' : 'Sustainability Philosophy'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
