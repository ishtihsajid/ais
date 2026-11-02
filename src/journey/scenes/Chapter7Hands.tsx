'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hammer, PenTool, ShieldCheck, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Chapter7HandsProps {
  locale?: string
  isTouch?: boolean
}

const VOICES = [
  {
    roleEn: 'Master Fitter',
    roleBn: 'প্রধান টাইলস কারিগর',
    name: 'Kabir Hossain [sample]',
    location: 'Dhaka',
    quoteEn: '“Ultra Fine Squaring means corners meet flush with zero lippage. Fresh tiles save us hours of grinding on the jobsite.”',
    quoteBn: '“নিখুঁত স্কয়ারিং ও সোজা এজ থাকার কারণে কোনো ফাঁক থাকে না। সাইটে কাজ করা অনেক সহজ এবং নিখুঁত হয়।”',
    badge: '12 Years Crafting',
  },
  {
    roleEn: 'Lead Architect',
    roleBn: 'প্রধান স্থপতি',
    name: 'Tania Rahman [sample]',
    location: 'Studio Nexus, Gulshan',
    quoteEn: '“The 60x120 Double Charge porcelain allows expansive joint-free floor plains with structural longevity that luxury clients demand.”',
    quoteBn: '“৬০x১২০ সাইজের ডাবল চার্জ টাইলস আমাদের প্রজেক্টে আন্তর্জাতিক মানের নান্দনিকতা ও আভিজাত্য এনে দেয়।”',
    badge: 'AIA & IAB Specifier',
  },
  {
    roleEn: 'Authorised Dealer',
    roleBn: 'অনুমোদিত পরিবেশক',
    name: 'Rafiqul Islam [sample]',
    location: 'Chattogram Commercial Area',
    quoteEn: '“Corner caps and poly-wrap ensure zero shipping breakage. Guaranteed 4-day delivery makes customer commitments trustworthy.”',
    quoteBn: '“প্রতিটি কার্টনে কর্নার ক্যাপ ও পলি-র‍্যাপ থাকায় টাইলস সম্পূর্ণ সুরক্ষিত থাকে। ৪ দিনের ডেলিভারি প্রতিশ্রুতি অতুলনীয়।”',
    badge: 'Exclusive Partner',
  },
]

export function Chapter7Hands({ locale = 'en', isTouch = false }: Chapter7HandsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  const [mobileVoiceIdx, setMobileVoiceIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const isBn = locale === 'bn'

  // 4-second continuous circular auto-slideshow on mobile
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setMobileVoiceIdx((prev) => (prev + 1) % VOICES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPaused])

  useEffect(() => {
    const container = containerRef.current
    const scene = sceneRef.current
    if (!container || !scene) return

    const pinDistance = () => window.innerHeight * (isTouch ? 1.2 : 2.0)

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

      // Staggered voices cards reveal
      tl.fromTo(
        '.voice-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.35, ease: 'power2.out' },
        0.2
      )

      // Door row reveal
      tl.fromTo(
        '.hands-doors',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        0.75
      )
    }, container)

    return () => ctx.revert()
  }, [isTouch])

  return (
    <section
      id="hands"
      ref={containerRef}
      className="relative w-full bg-[#18181A] text-paper select-none transition-colors duration-700"
    >
      <div
        ref={sceneRef}
        className="w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between relative pt-20 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-8 md:px-12 lg:px-14 bg-gradient-to-b from-[#18181B] via-[#222226] to-[#121214]"
      >
        {/* Top Header: Title & Bengali Kicker */}
        <div className="relative z-10 max-w-4xl shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-display font-semibold tracking-widest uppercase text-fresh-red">
              {isBn ? 'অধ্যায় ০৭: কারিগরের হাতের স্পর্শ' : 'Chapter 07: Finished by Hand'}
            </span>
            <span className="text-xs font-display font-bold text-paper/80 bg-stone/40 px-2 py-0.5 border-l-2 border-fresh-red">
              নান্দনিকতার কারিগর
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-light text-paper mt-2 tracking-tight">
            {isBn ? (
              <>দক্ষ কারিগরের স্পর্শে <span className="font-semibold text-white">পরিপূর্ণ রূপ</span></>
            ) : (
              <>Finished by hand: <span className="font-semibold text-white">The Craft of Installation</span></>
            )}
          </h2>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs md:text-sm text-grey leading-relaxed">
            <p>
              {isBn
                ? '“টাইলস কারিগররা আমাদের টাইলস পছন্দ করেন কারণ কোণা ও এজগুলো নিখুঁতভাবে মিলে যায়।”'
                : '“Fitters like our tiles because corners and edges meet seamlessly.”'}
            </p>
            <p className="text-paper/80">
              {isBn
                ? 'কর্নার ক্যাপ ও প্রোটেক্টিভ পলি র‍্যাপ নিশ্চিত করে প্রতিটি কার্টন সাইটের জন্য নিখুঁত থাকে।'
                : 'Corner caps and protective poly wrap keep every carton ready for the site.'}
            </p>
          </div>
        </div>

        {/* Center (Desktop): 3 Voice Cards from Voices Collection */}
        <div className="hidden md:grid relative z-10 grid-cols-3 gap-4 lg:gap-6 my-auto overflow-hidden flex-1 min-h-0 py-2 items-start">
          {VOICES.map((v, i) => (
            <div
              key={v.name}
              className="voice-card bg-stone/25 backdrop-blur-sm p-4 sm:p-5 lg:p-6 border border-white/10 hover:border-fresh-red/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-fresh-red font-semibold">
                    {isBn ? v.roleBn : v.roleEn}
                  </span>
                  <span className="text-[9px] font-mono text-grey/70 bg-stone/40 px-1.5 py-0.5">
                    {v.badge}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-paper font-light italic leading-relaxed">
                  {isBn ? v.quoteBn : v.quoteEn}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-display font-semibold text-paper">{v.name}</h4>
                  <p className="text-[10px] text-grey">{v.location}</p>
                </div>
                <ShieldCheck className="w-4 h-4 text-grey/60" />
              </div>
            </div>
          ))}
        </div>

        {/* Center (Mobile): 4-Second Auto-Rotating Testimonial Slideshow in a Circle */}
        <div
          className="block md:hidden relative z-10 my-auto flex-1 min-h-0 flex flex-col justify-between py-2 overflow-hidden"
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Active Voice Card */}
          <div className="bg-stone/30 backdrop-blur-md p-4 sm:p-5 border border-white/15 shadow-xl flex flex-col justify-between flex-1 min-h-0 overflow-y-auto transition-all duration-500">
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-fresh-red font-bold">
                    {isBn ? VOICES[mobileVoiceIdx].roleBn : VOICES[mobileVoiceIdx].roleEn}
                  </span>
                  <span className="text-[9px] font-mono text-grey/80 bg-stone/50 px-1.5 py-0.5">
                    {VOICES[mobileVoiceIdx].badge}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-grey/60">
                  {isPaused ? (isBn ? 'স্থগিত' : 'PAUSED') : 'AUTO 4S'}
                </span>
              </div>

              {/* Quote in full readable text */}
              <p className="text-xs sm:text-sm text-paper/95 font-light italic leading-relaxed mb-4">
                {isBn ? VOICES[mobileVoiceIdx].quoteBn : VOICES[mobileVoiceIdx].quoteEn}
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between shrink-0">
              <div>
                <h4 className="text-xs font-display font-semibold text-paper">
                  {VOICES[mobileVoiceIdx].name}
                </h4>
                <p className="text-[10px] text-grey">{VOICES[mobileVoiceIdx].location}</p>
              </div>
              <ShieldCheck className="w-4 h-4 text-fresh-red" />
            </div>
          </div>

          {/* Circular Pagination & Controls */}
          <div className="flex items-center justify-between pt-2.5 shrink-0 px-1">
            <button
              onClick={() =>
                setMobileVoiceIdx((prev) => (prev - 1 + VOICES.length) % VOICES.length)
              }
              className="text-[11px] font-display uppercase tracking-wider py-1 px-2 border border-white/15 text-grey hover:text-paper"
            >
              ←
            </button>

            {/* Circular dot indicators */}
            <div className="flex items-center gap-2">
              {VOICES.map((v, idx) => (
                <button
                  key={v.name}
                  onClick={() => setMobileVoiceIdx(idx)}
                  className={`transition-all ${
                    idx === mobileVoiceIdx
                      ? 'w-6 h-1.5 bg-fresh-red'
                      : 'w-2 h-2 rounded-full bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setMobileVoiceIdx((prev) => (prev + 1) % VOICES.length)
              }
              className="text-[11px] font-display uppercase tracking-wider py-1 px-2 border border-white/15 text-grey hover:text-paper"
            >
              →
            </button>
          </div>
        </div>

        {/* Bottom Door Row */}
        <div className="hands-doors relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10 text-xs font-display font-semibold uppercase tracking-wider shrink-0">
          <div className="flex flex-wrap gap-4">
            <Link
              href={isBn ? '/bn/fitters' : '/fitters'}
              className="inline-flex items-center gap-2 px-4 py-2 bg-fresh-red text-white hover:bg-ember transition-colors"
            >
              <Hammer className="w-3.5 h-3.5" />
              <span>{isBn ? 'কারিগরদের জন্য (ফিটার কমিউনিটি)' : 'For Fitters'}</span>
            </Link>
            <Link
              href={isBn ? '/bn/professionals' : '/professionals'}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-paper hover:border-fresh-red hover:text-fresh-red transition-colors"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>{isBn ? 'স্থপতি ও ইন্টেরিয়র ডিজাইনারদের জন্য' : 'For Architects & Designers'}</span>
            </Link>
            <Link
              href={isBn ? '/bn/become-a-dealer' : '/become-a-dealer'}
              className="px-4 py-2 border border-white/20 text-paper hover:border-fresh-red hover:text-fresh-red transition-colors"
            >
              {isBn ? 'ডিলার হিসেবে যুক্ত হোন' : 'Become a Dealer'}
            </Link>
          </div>

          <span className="text-[11px] font-normal text-grey lowercase">
            {isBn ? 'সবার সম্মিলিত যত্নে নান্দনিক গৃহ' : 'collective craft behind every home'}
          </span>
        </div>
      </div>
    </section>
  )
}
