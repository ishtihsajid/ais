'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, Users, HeartHandshake, Box, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Chapter9BeyondProps {
  locale?: string
  isTouch?: boolean
}

const INITIATIVES = [
  {
    year: '2023 - Present',
    titleEn: 'Knowledge Sharing Masterclass Series',
    titleBn: 'টাইলস প্রযুক্তি ও নলেজ শেয়ারিং সিরিজ',
    category: 'Education & Learning',
    summaryEn: 'Comprehensive educational video series on architectural tile history, choosing right tile types, and long-term care.',
    summaryBn: 'স্থপতি ও গৃহমালিকদের জন্য টাইলসের ইতিহাস, সঠিক টাইল নির্বাচন ও দীর্ঘস্থায়ী পরিচর্যা বিষয়ক বিশেষ টিউটোরিয়াল সিরিজ।',
    link: '/learn',
    icon: GraduationCap,
  },
  {
    year: 'Annual Program',
    titleEn: 'Nationwide Fitter Meets',
    titleBn: 'দেশব্যাপী কারিগর সম্মেলন',
    category: 'Artisan Community',
    summaryEn: 'Annual skill certification conferences empowering thousands of local tile setters with modern tools and precision training.',
    summaryBn: 'সারাদেশের টাইলস কারিগরদের আধুনিক যন্ত্রপাতি ও নিখুঁত ইনস্টলেশন কৌশল নিয়ে দেশব্যাপী প্রশিক্ষণ সম্মেলন।',
    link: '/fitters',
    icon: Users,
  },
  {
    year: 'Eid 2024',
    titleEn: 'Fresh Eid Express',
    titleBn: 'ফ্রেশ ঈদ এক্সপ্রেস',
    category: 'Community Support',
    summaryEn: 'Rapid complimentary logistics initiative easing holiday travel and transporting essential craft supplies to district hubs.',
    summaryBn: 'ঈদ মৌসুমে যাত্রী ও কারিগরদের নিরাপদে ঘরে ফেরা এবং প্রত্যন্ত অঞ্চলে সময়মতো পণ্য পৌঁছানোর বিশেষ লজিস্টিক উদ্যোগ।',
    link: '/initiatives',
    icon: HeartHandshake,
  },
  {
    year: '2025 Prototype',
    titleEn: 'The Fresh Pod',
    titleBn: 'ফ্রেশ পড আর্কিটেকচারাল ডিসপ্লে',
    category: 'Modular Innovation',
    summaryEn: 'Autonomous modular material display pavilion showcasing sustainable tiles directly in development zones. [OWNER TO SUPPLY: detail]',
    summaryBn: 'টেকসই টাইলস ও আর্কিটেকচারাল সারফেস প্রদর্শনের মডুলার পড প্যাভিলিয়ন। [মালিক বিস্তারিত প্রদান করবেন]',
    link: '/initiatives',
    icon: Box,
  },
]

export function Chapter9Beyond({ locale = 'en', isTouch = false }: Chapter9BeyondProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const [activeCardIdx, setActiveCardIdx] = useState(0)

  const isBn = locale === 'bn'

  useEffect(() => {
    const container = containerRef.current
    const scene = sceneRef.current
    if (!container || !scene) return

    const pinDistance = () => window.innerHeight * (isTouch ? 1.5 : 2.4)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => `+=${pinDistance()}`,
        pin: scene,
        scrub: 0.5,
        anticipatePin: 0,
        onUpdate: (self) => {
          const progress = self.progress
          const idx = Math.min(
            INITIATIVES.length - 1,
            Math.max(0, Math.round(progress * (INITIATIVES.length - 1)))
          )
          setActiveCardIdx(idx)
        },
      })
    }, container)

    return () => ctx.revert()
  }, [isTouch])

  return (
    <section
      id="beyond"
      ref={containerRef}
      className="relative w-full bg-paper text-stone select-none transition-colors duration-700"
    >
      <div
        ref={sceneRef}
        className="w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between relative pt-20 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-8 md:px-12 lg:px-14 bg-[#FAFAF8]"
      >
        {/* Header */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone/15 pb-4 shrink-0">
          <div>
            <span className="text-[11px] font-display font-semibold tracking-widest uppercase text-fresh-red">
              {isBn ? 'অধ্যায় ০৯: টাইলসের বাইরে আমাদের দায়বদ্ধতা' : 'Chapter 09: Beyond the Tile'}
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-light text-stone mt-1 tracking-tight">
              {isBn ? (
                <>টাইলসের বাইরে <span className="font-semibold text-stone">আমাদের সামাজিক দায়</span></>
              ) : (
                <>What we owe <span className="font-semibold text-stone">beyond the tile</span></>
              )}
            </h2>
          </div>
          <span className="text-xs font-display uppercase tracking-widest text-stone-dark/70 font-medium">
            {isBn ? 'সমাজ, পরিবেশ ও কমিউনিটির উন্নয়ন' : 'Social responsibility & learning initiatives'}
          </span>
        </div>

        {/* Center (Desktop): Interactive 4-Column Initiative Grid */}
        <div className="hidden lg:grid relative z-10 grid-cols-4 gap-6 my-auto">
          {INITIATIVES.map((item, idx) => {
            const isFocused = idx === activeCardIdx
            const Icon = item.icon
            return (
              <div
                key={item.titleEn}
                onClick={() => setActiveCardIdx(idx)}
                className={`cursor-pointer bg-white p-6 md:p-8 border transition-all duration-300 flex flex-col justify-between shadow-sm ${
                  isFocused
                    ? 'border-fresh-red ring-2 ring-fresh-red/20 scale-[1.02] shadow-md'
                    : 'border-stone/15 hover:border-stone/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-fresh-red font-bold">
                      {item.year}
                    </span>
                    <Icon className={`w-5 h-5 ${isFocused ? 'text-fresh-red' : 'text-stone-dark/50'}`} />
                  </div>
                  <span className="text-[10px] font-display uppercase tracking-wider text-stone-dark/60 block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-display font-bold text-stone">
                    {isBn ? item.titleBn : item.titleEn}
                  </h3>
                  <p className="text-xs text-stone-dark/80 mt-3 leading-relaxed">
                    {isBn ? item.summaryBn : item.summaryEn}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone/10 flex items-center justify-between">
                  <Link
                    href={isBn ? `/bn${item.link}` : item.link}
                    className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-wider text-fresh-red hover:underline"
                  >
                    <span>{isBn ? 'বিস্তারিত দেখুন' : 'Explore Initiative'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-[10px] font-mono text-stone-dark/40">
                    0{idx + 1}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Center (Mobile): Interactive Synced Carousel of 4 Initiative Cards */}
        <div className="block lg:hidden relative z-10 my-auto flex-1 min-h-0 flex flex-col justify-between py-2 overflow-hidden">
          {/* Active Card */}
          {(() => {
            const currentItem = INITIATIVES[activeCardIdx] || INITIATIVES[0]
            const CurrentIcon = currentItem.icon
            return (
              <div className="bg-white p-5 sm:p-6 border border-fresh-red/40 shadow-md flex flex-col justify-between flex-1 min-h-0 overflow-y-auto transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-fresh-red font-bold">
                      {currentItem.year}
                    </span>
                    <CurrentIcon className="w-5 h-5 text-fresh-red" />
                  </div>

                  <span className="text-[10px] font-display uppercase tracking-wider text-stone-dark/60 block mb-1">
                    {currentItem.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-display font-bold text-stone mb-2">
                    {isBn ? currentItem.titleBn : currentItem.titleEn}
                  </h3>

                  {/* Complete, fully legible summary */}
                  <p className="text-xs sm:text-sm text-stone-dark/85 leading-relaxed mb-4">
                    {isBn ? currentItem.summaryBn : currentItem.summaryEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone/10 flex items-center justify-between shrink-0">
                  <Link
                    href={isBn ? `/bn${currentItem.link}` : currentItem.link}
                    className="inline-flex items-center gap-1.5 text-xs font-display font-semibold uppercase tracking-wider text-fresh-red hover:underline"
                  >
                    <span>{isBn ? 'বিস্তারিত দেখুন' : 'Explore Initiative'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs font-mono font-bold text-stone-dark/50">
                    0{activeCardIdx + 1} / 04
                  </span>
                </div>
              </div>
            )
          })()}

          {/* Carousel Step & Dot Controls */}
          <div className="flex items-center justify-between pt-2.5 shrink-0 px-1">
            <button
              disabled={activeCardIdx === 0}
              onClick={() => setActiveCardIdx((prev) => Math.max(0, prev - 1))}
              className={`text-[11px] font-display uppercase tracking-wider py-1 px-2.5 border transition-all ${
                activeCardIdx === 0
                  ? 'opacity-30 border-stone/15 text-stone/40 cursor-not-allowed'
                  : 'border-stone/20 text-stone hover:border-fresh-red'
              }`}
            >
              ←
            </button>

            {/* Circular dot indicators */}
            <div className="flex items-center gap-2">
              {INITIATIVES.map((item, idx) => (
                <button
                  key={item.titleEn}
                  onClick={() => setActiveCardIdx(idx)}
                  className={`transition-all ${
                    idx === activeCardIdx
                      ? 'w-6 h-1.5 bg-fresh-red'
                      : 'w-2 h-2 rounded-full bg-stone/25 hover:bg-stone/50'
                  }`}
                  aria-label={`Go to initiative ${idx + 1}`}
                />
              ))}
            </div>

            <button
              disabled={activeCardIdx === INITIATIVES.length - 1}
              onClick={() =>
                setActiveCardIdx((prev) => Math.min(INITIATIVES.length - 1, prev + 1))
              }
              className={`text-[11px] font-display uppercase tracking-wider py-1 px-2.5 border transition-all ${
                activeCardIdx === INITIATIVES.length - 1
                  ? 'opacity-30 border-stone/15 text-stone/40 cursor-not-allowed'
                  : 'border-stone/20 text-stone hover:border-fresh-red'
              }`}
            >
              →
            </button>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone/15 text-xs font-display font-semibold uppercase tracking-wider shrink-0">
          <div className="flex gap-4">
            <Link href={isBn ? '/bn/initiatives' : '/initiatives'} className="text-stone hover:text-fresh-red transition-colors">
              {isBn ? 'সকল উদ্যোগ' : 'All Initiatives'}
            </Link>
            <Link href={isBn ? '/bn/learn' : '/learn'} className="text-stone hover:text-fresh-red transition-colors">
              {isBn ? 'লার্নিং হাব' : 'Learning Hub'}
            </Link>
            <Link href={isBn ? '/bn/news' : '/news'} className="text-stone hover:text-fresh-red transition-colors">
              {isBn ? 'সংবাদ ও আয়োজন' : 'News & Events'}
            </Link>
          </div>
          <span className="text-[11px] font-normal text-stone-dark/70 lowercase">
            {isBn ? 'দায়িত্বশীল শিল্পচর্চা আমাদের অঙ্গীকার' : 'responsible stewardship beyond manufacturing'}
          </span>
        </div>
      </div>
    </section>
  )
}
