'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Store, Compass, Download, MessageSquareQuote, ArrowUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Chapter10HorizonProps {
  locale?: string
  isTouch?: boolean
}

export function Chapter10Horizon({ locale = 'en', isTouch = false }: Chapter10HorizonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  const isBn = locale === 'bn'

  useEffect(() => {
    const container = containerRef.current
    const scene = sceneRef.current
    if (!container || !scene) return

    const pinDistance = () => window.innerHeight * (isTouch ? 1.2 : 1.8)

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

      // Horizon dawn glow arrival
      tl.fromTo(
        '.horizon-glow',
        { opacity: 0.2, scale: 0.95 },
        { opacity: 0.85, scale: 1.05, duration: 0.5, ease: 'power2.out' },
        0.1
      )

      // Vision line reveal
      tl.fromTo(
        '.horizon-vision',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' },
        0.3
      )

      // Conversion actions reveal
      tl.fromTo(
        '.horizon-actions',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
        0.6
      )
    }, container)

    return () => ctx.revert()
  }, [isTouch])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section
      id="horizon"
      ref={containerRef}
      className="relative w-full bg-[#1A0A0E] text-paper select-none transition-colors duration-700"
    >
      <div
        ref={sceneRef}
        className="w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between relative pt-20 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-8 md:px-12 lg:px-14 bg-gradient-to-b from-[#1C080C] via-[#2A0D12] to-[#121215]"
      >
        {/* Morning Sun Horizon Flare */}
        <div
          className="horizon-glow absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background:
              'radial-gradient(ellipse at 50% 85%, rgba(227,6,19,0.3) 0%, rgba(166,138,86,0.15) 45%, rgba(24,5,8,0.9) 100%)',
          }}
        />

        {/* Top Kicker */}
        <div className="relative z-10 flex items-center justify-between shrink-0">
          <span className="text-[11px] font-display font-semibold tracking-widest uppercase text-fresh-red">
            {isBn ? 'অধ্যায় ১০: বৃত্তের সমাপ্তি ও নতুন শুরু' : 'Chapter 10: Dawn Again'}
          </span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[11px] font-display uppercase tracking-widest text-grey hover:text-paper transition-colors py-1 px-3 border border-stone/50 hover:border-paper"
          >
            <span>{isBn ? 'শীর্ষে ফিরে যান' : 'Back to Top'}</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

        {/* Center: Vision Statement and Title */}
        <div className="relative z-10 max-w-4xl mx-auto text-center my-auto px-4 overflow-hidden py-2 min-h-0 flex-1 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-light text-paper tracking-tight mb-4">
            {isBn ? (
              <>নান্দনিক জীবনের <span className="font-semibold text-fresh-red">ফ্রেশ প্রভাত</span></>
            ) : (
              <>Dawn again: <span className="font-semibold text-fresh-red">A Fresh Beginning</span></>
            )}
          </h2>

          <div className="horizon-vision space-y-3 max-w-3xl mx-auto">
            <p className="text-base sm:text-lg md:text-xl text-paper font-light leading-relaxed">
              {isBn
                ? 'ফ্রেশ সিরামিকস সর্বোচ্চ গুণমান এবং দৃঢ় স্থায়িত্বের মূলবোধে বিশ্বাসী।'
                : 'Fresh stands for superior quality and strong sustainability values.'}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-paper/85 font-light leading-relaxed">
              {isBn
                ? 'ফ্রেশ নির্বাচন করা মানে আরও উন্নত মান, দায়িত্বশীল উৎপাদন এবং একটি টেকসই ভবিষ্যৎকে বেছে নেওয়া।'
                : 'To choose Fresh is to choose better quality, responsible manufacturing and a more sustainable future.'}
            </p>
          </div>

          {/* Action Row: 4 Clear Conversion Doors */}
          <div className="horizon-actions mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link
              href={isBn ? '/bn/showrooms' : '/showrooms'}
              className="inline-flex items-center gap-2 px-5 py-3 bg-fresh-red text-white hover:bg-ember text-xs font-display font-semibold uppercase tracking-wider transition-all shadow-lg"
            >
              <Store className="w-4 h-4" />
              <span>{isBn ? 'শোরুম খুঁজুন' : 'Find a Showroom'}</span>
            </Link>

            <Link
              href={isBn ? '/bn/tiles' : '/tiles'}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-paper text-xs font-display font-semibold uppercase tracking-wider border border-white/20 transition-all"
            >
              <Compass className="w-4 h-4" />
              <span>{isBn ? 'সকল টাইলস দেখুন' : 'Browse All Tiles'}</span>
            </Link>

            <Link
              href={isBn ? '/bn/downloads' : '/downloads'}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-paper text-xs font-display font-semibold uppercase tracking-wider border border-white/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isBn ? 'ক্যাটালগ ডাউনলোড' : 'Download Catalog'}</span>
            </Link>

            <Link
              href={isBn ? '/bn/contact' : '/contact'}
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-paper text-xs font-display font-semibold uppercase tracking-wider border border-white/20 transition-all"
            >
              <MessageSquareQuote className="w-4 h-4" />
              <span>{isBn ? 'যোগাযোগ ও তথ্য' : 'Enquire'}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
