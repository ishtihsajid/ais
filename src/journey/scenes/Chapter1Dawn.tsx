'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DawnBottomBorder } from '../components/DawnBottomBorder'

gsap.registerPlugin(ScrollTrigger)

interface Chapter1DawnProps {
  locale?: string
  isTouch?: boolean
}

export function Chapter1Dawn({ locale = 'en', isTouch = false }: Chapter1DawnProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

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

      // Background camera descent (scale 1.15 -> 1.0, vertical drift)
      tl.to(bgRef.current, {
        scale: 1.0,
        y: '-4%',
        ease: 'none',
        duration: 1,
      }, 0)

      // Beat 1 (0 - 30%): Title reveal
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' },
        0.05
      )

      // Beat 2 (30 - 70%): Hold with line reveal and sunflare drift
      tl.fromTo(
        lineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power3.out' },
        0.35
      )

      // Beat 3 (70 - 100%): Three stats figures rise from bottom (finishes at 1.0)
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.28, ease: 'power3.out' },
        0.72
      )
    }, container)

    return () => ctx.revert()
  }, [isTouch])

  return (
    <section
      id="dawn"
      ref={containerRef}
      className="relative w-full bg-ember text-paper select-none"
    >
      <div
        ref={sceneRef}
        className="w-full h-[100dvh] max-h-[100dvh] overflow-hidden flex flex-col justify-between relative pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-8 md:px-12 lg:px-16"
      >
        {/* Real Factory Cinematography Background Video Loop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen pointer-events-none"
          src="/media/videos/test_30s_desktop.mp4"
        />

        {/* Procedural / Cinematographic Dawn Factory Sky & Solar Roof Background */}
        <div
          ref={bgRef}
          className="absolute inset-0 scale-110 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 70% 30%, #5A1219 0%, #3B0A10 50%, #200508 100%)',
          }}
        >
          {/* Subtle Dawn Light Ray Shimmer */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-screen"
            style={{
              background: 'linear-gradient(135deg, rgba(227,6,19,0.3) 0%, transparent 60%)',
            }}
          />
          {/* Solar Rooftop Architectural Grid Pattern */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(to right, #B3B3B3 1px, transparent 1px), linear-gradient(to bottom, #B3B3B3 1px, transparent 1px)',
              backgroundSize: '48px 32px',
              perspective: '600px',
              transform: 'rotateX(55deg) translateZ(0)',
              transformOrigin: 'bottom center',
            }}
          />
        </div>

        {/* Top Kicker */}
        <div className="relative z-10 flex items-center justify-between shrink-0">
          <span className="text-[11px] font-display font-semibold tracking-widest uppercase text-paper/70 border-l-2 border-fresh-red pl-3">
            {isBn ? 'মেঘনাঘাট, প্রথম আলো' : 'Meghnaghat, first light'}
          </span>
          <span className="text-[11px] font-mono tracking-wider text-grey/60 uppercase">
            Chapter 01 / 10
          </span>
        </div>

        {/* Center: Hero Title & Narrative Line (Hold) */}
        <div className="relative z-10 max-w-4xl mx-auto text-center my-auto px-4 min-h-0">
          <h1
            ref={titleRef}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-light tracking-tight leading-[1.08] mb-4 sm:mb-6"
          >
            {isBn ? (
              <>নান্দনিক জীবনের <span className="font-semibold text-fresh-red">ফ্রেশ সূচনা</span></>
            ) : (
              <>A Fresh Start to an <span className="font-semibold text-fresh-red">Aesthetic Life</span></>
            )}
          </h1>
          <p
            ref={lineRef}
            className="text-base sm:text-lg md:text-xl text-paper/85 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {isBn
              ? 'একটি গৃহের প্রতিটি তল কোথাও না কোথাও শুরু হয়। আমাদের শুরু মেঘনাঘাটের কারখানার ছাদে ভোরের সূর্যালোক দিয়ে।'
              : 'Every surface in a home begins somewhere. Ours begins with sunlight on a rooftop in Meghnaghat.'}
          </p>
        </div>

        {/* Bottom Beat: 3 Stat Figures */}
        <div
          ref={statsRef}
          className="relative z-10 border-t border-paper/15 pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-left max-w-6xl mx-auto w-full shrink-0"
        >
          <div>
            <span className="block text-2xl md:text-4xl font-display font-bold text-paper">
              {isBn ? '২০২১ সাল থেকে' : 'Since 2021'}
            </span>
            <span className="text-xs uppercase tracking-wider text-grey font-display">
              {isBn ? 'কারখানা প্রতিষ্ঠিত' : 'Tile plant established'}
            </span>
          </div>

          <div>
            <span className="block text-2xl md:text-4xl font-display font-bold text-fresh-red">
              {isBn ? '১ কোটি ৮৬ লাখ বর্গমিটার/বছর' : '18.6M sq m a year'}
            </span>
            <span className="text-xs uppercase tracking-wider text-grey font-display">
              {isBn ? 'বার্ষিক উৎপাদন ক্ষমতা' : 'Annual production capacity'}
            </span>
          </div>

          <div>
            <span className="block text-sm md:text-base font-display font-semibold text-paper/95 leading-snug">
              {isBn
                ? '২০২৩ সাল থেকে প্রতি বছর বাংলাদেশে সর্বাধিক বিক্রিত টাইলস ব্র্যান্ড।'
                : 'Highest selling tiles brand in Bangladesh every year since 2023.'}
            </span>
            <span className="text-xs uppercase tracking-wider text-grey font-display">
              {isBn ? 'বিক্রয় শীর্ষস্থান' : 'Market sales leadership'}
            </span>
          </div>
        </div>

        {/* Colorful Architectural Brand Border along the bottom edge of Chapter 1 */}
        <DawnBottomBorder className="absolute bottom-0 left-0 right-0 z-20" />
      </div>
    </section>
  )
}
