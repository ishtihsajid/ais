'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Chapter2GroundProps {
  locale?: string
  isTouch?: boolean
}

const PILLARS = [
  {
    num: '01',
    titleEn: 'Use of surface water',
    titleBn: 'সারফেস ওয়াটারের ব্যবহার',
    detailEn: '100% surface water recycling prevents groundwater depletion at our Meghnaghat plant.',
    detailBn: 'মেঘনাঘাট প্ল্যান্টে ভূগর্ভস্থ পানির অপচয় রোধে শতভাগ সারফেস ওয়াটার পুনর্ব্যবহার।',
    bg: 'radial-gradient(ellipse at center, #2C4A5E 0%, #1A2E3B 100%)',
    textColor: 'text-paper',
  },
  {
    num: '02',
    titleEn: 'No black smoke',
    titleBn: 'কালো ধোঁয়াহীন কারখানা',
    detailEn: 'Complete automated combustion filtration ensures zero black smoke discharge into the atmosphere.',
    detailBn: 'উন্নত অটোমেটেড ফিল্ট্রেশন প্রযুক্তির মাধ্যমে বায়ুমণ্ডলে শূন্য কালো ধোঁয়া নিঃসরণ।',
    bg: 'radial-gradient(ellipse at center, #4A5B63 0%, #2D393E 100%)',
    textColor: 'text-paper',
  },
  {
    num: '03',
    titleEn: 'Smart heat control',
    titleBn: 'স্মার্ট হিট কন্ট্রোল',
    detailEn: 'Kiln exhaust recovery units recapture thermal energy to preheat dryers and reduce fuel consumption.',
    detailBn: 'কিলন থেকে নির্গত তাপ পুনর্ব্যবহার করে শক্তির কার্যকর সাশ্রয়।',
    bg: 'radial-gradient(ellipse at center, #5A3528 0%, #3B2117 100%)',
    textColor: 'text-paper',
  },
  {
    num: '04',
    titleEn: 'Dust free workplace',
    titleBn: 'ধূলিমুক্ত কর্মপরিবেশ',
    detailEn: 'High-power negative pressure air scrubbers guarantee an immaculate dust-free environment for craftsmen.',
    detailBn: 'উচ্চক্ষমতাসম্পন্ন এয়ার স্ক্রাবিংয়ের মাধ্যমে কর্মীদের জন্য সম্পূর্ণ ধূলিমুক্ত স্বাস্থ্যকর পরিবেশ।',
    bg: 'radial-gradient(ellipse at center, #5E5E5E 0%, #454548 100%)',
    textColor: 'text-paper',
  },
  {
    num: '05',
    titleEn: 'Use of solar energy',
    titleBn: 'সৌর শক্তির ব্যবহার',
    detailEn: 'Fully covered solar power unit spanning the massive production shed roof generating clean green megawatts.',
    detailBn: 'কারখানার বিশাল ছাদজুড়ে স্থাপিত সোলার পাওয়ার ইউনিটের মাধ্যমে পরিচ্ছন্ন সবুজ শক্তি উৎপাদন।',
    bg: 'radial-gradient(ellipse at center, #A68A56 0%, #6E5A35 100%)',
    textColor: 'text-paper',
  },
  {
    num: '06',
    titleEn: 'Natural light design',
    titleBn: 'প্রাকৃতিক আলোর নান্দনিক ব্যবহার',
    detailEn: 'Architectural roof clerestory skylights maximize natural day lighting throughout the sorting and packing lines.',
    detailBn: 'স্থাপত্য নকশায় প্রাকৃতিক আলোর সর্বোচ্চ ব্যবহারের মাধ্যমে কৃত্রিম বিদ্যুতের অপচয় রোধ।',
    bg: 'radial-gradient(ellipse at center, #F3F3F3 0%, #E2E8F0 100%)',
    textColor: 'text-stone',
  },
]

export function Chapter2Ground({ locale = 'en', isTouch = false }: Chapter2GroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const closingRef = useRef<HTMLDivElement>(null)

  const isBn = locale === 'bn'

  useEffect(() => {
    const container = containerRef.current
    const scene = sceneRef.current
    const track = trackRef.current
    if (!container || !scene || !track) return

    const pinDistance = () => window.innerHeight * (isTouch ? 3.0 : 5.0)

    const ctx = gsap.context(() => {
      // Horizontal slide of the 6 panels with smooth physical scrub
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

      // Slide 6 panels left: exactly 5 panels distance = -100 * (5/6)%
      tl.to(track, {
        xPercent: -100 * (PILLARS.length - 1) / PILLARS.length,
        ease: 'none',
        duration: 1,
      })

      // Reveal closing line on the 6th panel (0.85 to 1.0, duration 0.15 keeps total timeline at exactly 1.0)
      tl.fromTo(
        closingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.15, ease: 'power3.out' },
        0.85
      )
    }, container)

    return () => ctx.revert()
  }, [isTouch])

  return (
    <section
      id="ground"
      ref={containerRef}
      className="relative w-full select-none"
    >
      <div
        ref={sceneRef}
        className="w-full h-[100dvh] max-h-[100dvh] overflow-hidden relative flex flex-col justify-between"
      >
        {/* Horizontal Track of 6 Full-Screen Panels */}
        <div
          ref={trackRef}
          className="flex h-full w-[600vw] will-change-transform"
        >
          {PILLARS.map((p, idx) => (
            <div
              key={p.num}
              className={`relative w-screen shrink-0 h-[100dvh] max-h-[100dvh] flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-12 px-6 sm:px-10 md:px-16 ${p.textColor}`}
              style={{ background: p.bg }}
            >
              {/* Header / Chapter Label */}
              <div className="flex items-center justify-between shrink-0">
                <span className="text-xs font-display tracking-widest uppercase font-semibold opacity-75">
                  {isBn ? 'অধ্যায় ০২: দায়িত্বশীল উৎপাদন' : 'Chapter 02: Responsible Manufacturing'}
                </span>
                <span className="text-4xl md:text-6xl font-display font-light opacity-30">
                  {p.num} / 06
                </span>
              </div>

              {/* Panel Content (Arrive and Hold) */}
              <div className="max-w-3xl my-auto">
                <span className="text-sm font-display tracking-widest uppercase text-fresh-red font-semibold block mb-3">
                  {isBn ? `পদ্ধতি ${p.num}` : `Responsible Choice ${p.num}`}
                </span>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold leading-tight mb-6">
                  {isBn ? p.titleBn : p.titleEn}
                </h2>
                <p className="text-base sm:text-xl font-light leading-relaxed opacity-90 max-w-2xl">
                  {isBn ? p.detailBn : p.detailEn}
                </p>
              </div>

              {/* Bottom Footer or Closing Quote on Panel 6 */}
              {idx === 5 ? (
                <div ref={closingRef} className="border-t border-stone/20 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <p className="text-lg md:text-xl font-display font-medium text-stone">
                    {isBn
                      ? '“যখন মান ও দায়িত্ববোধ একত্রিত হয়, পছন্দটি সহজ হয়ে যায়।”'
                      : '“When quality and responsibility meet, the choice becomes simple.”'}
                  </p>
                  <Link
                    href="/sustainability"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-fresh-red text-paper text-xs font-display font-semibold uppercase tracking-wider hover:bg-ember transition-colors"
                  >
                    {isBn ? 'আমাদের দায়িত্বশীল উদ্যোগসমূহ →' : 'See how we make responsibly →'}
                  </Link>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs font-display tracking-wider uppercase opacity-60">
                  <span>{isBn ? 'স্ক্রল করে পরের পছন্দ দেখুন' : 'Scroll to advance pillar'}</span>
                  <span>Meghnaghat Tile Plant</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
